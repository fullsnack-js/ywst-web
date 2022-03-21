import { createClient } from "next-sanity";
import { config } from "src/config/sanity";

export const sanityClient = createClient(config.sanityBase);
export const previewClient = createClient(config.preview);
