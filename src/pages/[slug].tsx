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

import { usePreviewSubscription, sanityClient } from '../lib/sanity';
import { pageSections } from '../../../ywst-cms/schemas/fields/page-sections';
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
    "slug": reference.slug.current,
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

    "siteTitle": title,
    footerNav[]{
      ...,
       navLink{
        linkType == "internal"=> {
          "link": internalReference->{
      ...,
            includeInSitemap,
            internalId,
            slug
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
            slug
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
// TODO: finish RouteProps type
type RouteProps = {
  data: {
    route: {
      _id: string;
      _type: 'route';
      includeInSitemap: boolean;
      internalId: string;
      page: {
        _id: string;
        _type: 'page';
        pageSections:
          | {
              _key: string;
              _type: 'cta';
              kind: string;
              url?: string;
              slug?: string;
              text: string;
            }
          | {
              _key: string;
              _type: 'videoSection';
              description: string;
              title: string;
              url: string;
            }
          | {
              _key: string;
              _type: 'scheduleSection';
              classes: {
                title: string;
                _id: string;
                description: string;
                eventCalendar?: {
                  _type: 'eventCalendar';
                  app: 'apple' | 'google';
                  calendarId: string;
                };
                level: string;
                schedule: {
                  _type: 'schedule';
                  weekday: 'string';
                  time: {
                    _type: 'timeRange';
                    end: string;
                    start: string;
                  };
                };
                setting:
                  | {
                      _type: 'setting';
                      classType: 'studio';
                      registerUrl: string;
                      venue: {
                        name: string;
                        url: string;
                        _type: 'venue';
                        _id: string;
                        acccesibility?: {
                          description?: any[];
                          wheelchair?: boolean;
                        };
                        directions?: any[];
                        address: {
                          street: string;
                          state: string;
                          postalCode: string;
                          other?: string;
                          country: string;
                          city: string;
                        };
                        geolocation?: {
                          _type: 'geopoint';
                          lat: number;
                          lng: number;
                        };
                      };
                    }
                  | {
                      _type: 'setting';
                      classType: 'hybrid';
                      streaming: string;
                      registerUrl: string;
                      venue: {
                        name: string;
                        url: string;
                        _type: 'venue';
                        _id: string;
                        acccesibility?: {
                          description?: any[];
                          wheelchair?: boolean;
                        };
                        directions?: any[];
                        address: {
                          street: string;
                          state: string;
                          postalCode: string;
                          other?: string;
                          country: string;
                          city: string;
                        };
                        geolocation?: {
                          _type: 'geopoint';
                          lat: number;
                          lng: number;
                        };
                      };
                    }
                  | {
                      _type: 'setting';
                      classType: 'online';
                      streaming: string;
                      registerUrl: string;
                    };
              }[];
            }[];
        title: 'Class Schedule';
      };
      seo: {
        _type: 'seo';
        metaTitle?: string;
        metaDescription?: string;
        metaImage?: any;
      };
      slug: {
        _type: 'slug';
        current: string;
      };
    }[];
    settings: {
      siteTitle: string;
      footerNav: {
        navLink: {
          linkType: 'internal';
          link:
            | {
                internalId: string;
                seo: {
                  _type: 'seo';
                  metaTitle: string;
                  metaDescription?: string | undefined;
                  metaImage?: any | undefined;
                };
                slug: {
                  _type: 'slug';
                  current: string;
                };
              }
            | {
                linkType: 'external';
                link: {
                  blank: boolean;
                  href: string;
                  title: string;
                };
              };
        };
      }[];

      mainNav: {
        navLink: {
          linkType: 'internal';
          link:
            | {
                internalId: string;
                seo: {
                  _type: 'seo';
                  metaTitle: string;
                  metaDescription?: string | undefined;
                  metaImage?: any | undefined;
                };
                slug: {
                  _type: 'slug';
                  current: string;
                };
              }
            | {
                linkType: 'external';
                link: {
                  blank: boolean;
                  href: string;
                  title: string;
                };
              };
        };
      }[];
      seo: {
        _type: 'seo';
        metaDescription: string;
        metaImage?: any | undefined;
      };
      socials: {
        _key: string;
        _type: 'social';
        type: string;
        url: string;
      }[];
    };
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
