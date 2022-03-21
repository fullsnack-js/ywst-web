const IMAGE = "_type, alt, asset";
const SIMPLE_CALL_TO_ACTION = "text, url, reference->{slug}";
const BLOCK_CONTENT = `
  ...,
  markDefs[] {
    ...,
    reference-> {
      _type,
      slug,
    },
  },
`;
const SHARED_PAGE_SECTIONS = `
  _type == "cta" => {
    ...,
    reference->{..., "page": page->title}
  },
    _type == "scheduleSection" => {
    classes[]->{..., setting{...,venue->}}
  }
`;

export const SANITY_ROUTE_QUERY = `
  *[_type == "route"]{
    ...,
    page->{
      ...,
      pageSections[] {
        _type,
        ${SHARED_PAGE_SECTIONS}
      }
    }
  }
`;

export const GLOBAL_SETTINGS_QUERY = `
  footerNav->{...,},
  mainNav->{...,},
  seo->,
  socials[]->,
  title
`