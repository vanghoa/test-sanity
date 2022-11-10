import { useState } from "react";
import { useRouter } from "next/router";

import { 
    sanityClient, 
    urlFor, 
    usePreviewSubscription, 
    PortableText
} from "../../lib/sanity";

const recipeQuery = `*[_type == "recipe" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    mainImage{
        asset->{
            url,
            altText
        }
    },
    ingredient[]{
        unit,
        wholeNum,
        fract,
        ingredient->{
            name
        },
        _key
    },
    instructions,
    likes
}`;

export default function OneRecipe({data, preview}) {
    const router = useRouter();
    
    const { data: recipe } = usePreviewSubscription(recipeQuery, {
        params: {slug: data.recipe?.slug.current},
        initialData: data.recipe, //mtfk
        enabled: preview,
    });

    //const {recipe} = data;
    console.log(recipe);

    const [likes, setLikes] = useState(data?.recipe?.likes);

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    const addLike = async () => {
        const res = await fetch("/api/handle-like", {
            method: "POST",
            body: JSON.stringify({_id: recipe._id}),
        }).catch((err) => console.log(err))


        const data = await res.json();

        setLikes(data.likes);
    }

    return (
        <article className="recipe">
            <h1>{recipe.name}</h1>

            <button className="like-button" onClick={addLike}>
                {likes} yeu
            </button>

            <main className="content">
                <img src={recipe?.mainImage.asset.url} alt={recipe.name}/>
                <div className="breakdown">
                    <ul className="ingredients">
                        {recipe.ingredient?.map((ingredient) => { 
                            return (
                        <li key={ingredient._key} className="ingre">
                            {ingredient?.wholeNum}
                            {" "}
                            {ingredient?.fract}
                            {" "}
                            {ingredient?.unit}
                            <br />
                            {ingredient?.ingredient?.name}
                        </li>
                        ) }
                        )}
                    </ul>
                    <div>
                        <PortableText value={recipe?.instructions} className="instruct"/>
                    </div>
                    </div>
            </main>
        </article>
    )
}

export async function getStaticPaths() {
    const paths = await sanityClient.fetch(
        `*[_type == "recipe" && defined(slug.current)]{
            "params": {
                "slug": slug.current
            }
        }`
    );
    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({params}) {
    const { slug } = params;
    const recipe = await sanityClient.fetch(recipeQuery, { slug })
    return { props: {data: {recipe}, preview: true}}
}