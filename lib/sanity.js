import {
    createClient,
    createPreviewSubscriptionHook,
} from "next-sanity";

import createImageURLBuilder from '@sanity/image-url';
import { PortableText as PortableTextComponent } from '@portabletext/react'

const config = {
    projectId: "a346965f",
    dataset: "production",
    apiVersion: "2021-03-25",
    useCdn: false,
};

export const sanityClient = createClient(config);

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

export const urlFor = (source) => createImageURLBuilder(config).image(source);

export const PortableText = (props) => <PortableTextComponent components={{}} {...props} />