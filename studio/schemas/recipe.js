export default {
    name: "recipe",
    title: "Recipe",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Recipe name",
            type: "string",
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 96
            }
        },
        {
            name: "chef",
            title: "Chef",
            type: "reference",
            to: {type: "chef"},
        },
        {
            name: "mainImage",
            title: "Recipe Main Image",
            type: "image",
            options: {
                hotspot: true
            }
        },
        {
            name: "ingredient",
            title: "Ingredient",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "ingredient",
                            title: "Ingredient",
                            type: "reference",
                            to: [{
                                type: "ingredients"
                            }]
                        },
                        {
                            name: "wholeNum",
                            title: "Whole Number",
                            type: "number"
                        },
                        {
                            name: "fract",
                            title: "Fraction",
                            type: "string",
                            options: {
                                list: ["1/2", "1/3", "1/4", "3/23"]
                            }
                        },
                        {
                            name: "unit",
                            title: "Unit",
                            type: "string",
                            options: {
                                list: ["gram", "cup", "Tpsn"]
                            }
                        }
                    ],
                    preview: {
                        select: {
                            title: "ingredient.Ingrename",
                            name: "ingredient.Ingrename",
                            media: "ingredient.image",
                            wholeNumber: "wholeNum",
                            fraction: "fract",
                            unit: "unit"
                        },
                        prepare({
                            title = "(concac)",
                            subtitle,
                            media,
                            wholeNumber = "(No Whole)",
                            fraction = "(No fract)",
                            unit = "(No unit)"
                        }) {
                            return {
                                title,
                                subtitle: `${wholeNumber} ${fraction} ${unit}`,
                                media
                            }
                        }
                    }
                
                }
            ]
        },
        {
            name: "instructions", 
            title: "Instructions",
            type: "array",
            of: [{
                type: "block"
            }]
        },
        {
            name: "likes",
            title: "Likes",
            type: "number",
        }
    ],
    initialValue: {
        likes: 0,
    },
}