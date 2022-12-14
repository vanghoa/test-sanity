import Head from 'next/head';
//import Image from 'next/image';
import Link from "next/link";
import {sanityClient, urlFor} from "../lib/sanity"

const recipesQuery = `*[_type == "recipe"]{
  _id,
  name,
  slug,
  mainImage
}`;

export default function Home({recipes}) {

  return (
    <div>
      <Head>
        <title>Kaps Kitchen cac</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Welcome to Kaps kitchen cac</h1>
      <ul className="recipe-list">
        {
          recipes?.length > 0 && 
          recipes.map(({_id,mainImage,name,slug}) => 
            <li key={_id} className="recipe-card">
              <Link legacyBehavior href={`/recipes/${slug.current}`}> 
                <a>
                  <img alt='ancac' src={urlFor(mainImage).url()}/>
                  <span>{name}</span>
                </a>
              </Link>
            </li>
          )
        }
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  const recipes = await sanityClient.fetch(recipesQuery);
  return {
    props: {recipes},
    revalidate: 1,
  };
}