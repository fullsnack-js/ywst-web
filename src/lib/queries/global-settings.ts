export const authorFields = `
  _id,
  name,
  bio,
  email,
  "slug": slug.current,
  "image": image.image{alt, "url":asset->url},
`;

export const navFields = `
  ...,
  navLink{
    linkType == "internal"=> {
      linkType,
      "link": internalLink{
        title,
        "route": link->{
          ...,
          "slug": slug.current,
          "landingPage": page.reference
        }
      }
    },
    linkType == "external" => {
      linkType,
      "link": externalLink{...,}
    },
  }
`;

export const portableTextMarks = `
...,
markDefs[]{
  ...,
  _type == "internalLink" => {
    title,
    "slug": @.link->slug.current,
    "type": @.link->_type
  }
}
`;

export const seoFields = `
  ...,
  "metaKeywords": metaKeywords[].value,
  metaImage{..., asset->},
`;
export const siteSettingsFields = `
  title,
  "footer": footerNav[]{${navFields}},
  "topNav": mainNav[]{${navFields}},
  contactEmail,
  socials,
  seo->
`;

export const SANITY_SETTINGS_QUERY = `
*[_id == "global-settings"]{
  ...,
}
`;
