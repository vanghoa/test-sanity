export default {
    name: "ingredients",

    title: "Ingredients",

    type: "document",

    fields: [
        {
            title: "name",
            name: "Ingrename",
            type: "string"
        },
        {
            name: "image",
            title: "Image",
            type: "image",
            options: {
                hotspot: true,
            }
        },
        {
            name: "notes",
            title: "Notes",
            type: "text"
        }
    ]

}