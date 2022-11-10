import { sanityClient } from "../../lib/sanity";

sanityClient.config({
    token: "sk9nyOPpH3AaetXQI8FZr4DZ1Ble1Zi8mwLPMyiyoycMtD8gLTQfMPFVsDrbwlSUN65QRRvo58viXYJydVoexbD7y5Cl7AJiQTIbsOomkObo1VCrZeDSJEN7Rt4j3EusT7B1KhfbwpdeEqgBbWFkzwM1so1Dlq1kO2VrkwnmsjjQTOuUDcrZ",
});

export default async function likeButtonHandler(req, res) {
    const { _id } = JSON.parse(req.body)
    const data = await sanityClient
        .patch(_id)
        .setIfMissing({ likes: 0 })
        .inc({ likes: 1})
        .commit()
        .catch((err) => console.log(err))


    res.status(200).json({ likes: data.likes });
}