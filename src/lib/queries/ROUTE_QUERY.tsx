import { groq } from 'next-sanity';

export const ROUTE_QUERY = groq`
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
