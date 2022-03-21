import type { ClientConfig } from "next-sanity";

const sanityBase: ClientConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_API_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_API_PROJECT_ID as string,

  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2022-03-10",
  useCdn: process.env.NODE_ENV === "production",
};

if (!sanityBase.projectId)
  throw Error("The Project ID is not set. Check your environment variables.");

if (!sanityBase.dataset)
  throw Error("The dataset name is not set. Check your environment variables.");

if (!sanityBase.apiVersion)
  throw Error("The API Version is not set. Check your environment variables.");

const preview: ClientConfig = {
  ...sanityBase,
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  useCdn: false,
  // withCredentials: true,
};

export const config = {
  sanityBase,
  preview,
};
