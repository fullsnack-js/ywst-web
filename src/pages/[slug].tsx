import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { groq } from 'next-sanity';
import { ParsedUrlQuery } from 'querystring';
import { useEffect, useState } from 'react';
import { SANITY_ROUTE_QUERY } from 'src/lib/queries';
import NextLink from 'next/link';
import { usePreviewSubscription, sanityClient } from '../lib/sanity';
import { GlobalSettings, SanityRoute } from '@/types/schema.types';
interface Params extends ParsedUrlQuery {
  slug: string;
}
const ROUTE_QUERY = groq`
{
  "route": *[_type == "route" && slug.current == $slug][0]{
    ...,
    page->{
  ...,
  pageSections[]{
   _type == "cta" => {
    text,
    kind,
    "slug": reference->slug.current,
    url
  },
_type == "scheduleSection" => {
  _type,
    classes[]->{
    ...,
    setting{
    ...,
    "venue": venue->
  }
  }
}
  }
}
  },
  "settings": *[_id == "global-settings"][0]{
    ...,
    "siteTitle": title,
    footerNav[]{
      ...,
       navLink{
        linkType == "internal"=> {
          "link": internalReference->{
      ...,
            includeInSitemap,
            internalId,
           "slug": slug.current
          }
        },
        linkType == "external" => {
          ...,
          "link": externalLink{...,}
        },
      }
    },
    mainNav[]{
      ...,
       navLink{
        linkType == "internal"=> {
      ...,
          "link": internalReference->{
            includeInSitemap,
            internalId,
            "slug": slug.current
          }
        },
        linkType == "external" => {
          ...,
          "link": externalLink{...,}
        },
      }
    },
    seo,
    socials
  }
}
`;
// TODO: break up into subtypes
type RouteProps = {
  data: {
    route: SanityRoute[];
    settings: GlobalSettings;
  };
  preview: boolean;
} & Pick<Params, 'slug'>;

const Route = ({ data: initialData, slug, preview }: RouteProps) => {
  const {
    data: { route, settings },
  } = usePreviewSubscription(ROUTE_QUERY, {
    params: { slug },
    initialData,
    enabled: preview,
  });
  return (
    <div>
      {preview && (
        <NextLink href="/api/exit-preview">Preview Mode Activated!</NextLink>
      )}
      <pre>{JSON.stringify(initialData, null, 4)}</pre>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allRoutesWithSlug = groq`*[_type == "route" && defined(slug.current)][].slug.current`;
  const pageQueries = await sanityClient.fetch<string[]>(allRoutesWithSlug);
  console.log({ pageQueries });

  const paths = pageQueries.map((slug: string) => ({
    params: {
      slug,
    },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}): Promise<GetStaticPropsResult<RouteProps>> => {
  const { slug } = (params as Params) || '/';
  if (!slug) {
    console.log('no slug');
  }
  const data = await sanityClient.fetch(ROUTE_QUERY, { slug });
  console.log({ data });
  console.log(data?.route);
  if (!data?.route) {
    return { notFound: true };
  }

  return { props: { preview, data, slug } };
};

export default Route;
