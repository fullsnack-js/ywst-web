export type NavLink = {
  navLink: {
    //TODO: title?
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
};

export type SEO = {
  _type: 'seo';
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: any;
};

export type SocialLink = {
  _key: string;
  _type: 'social';
  type: string;
  url: string;
};

export type CTA = {
  _type: 'cta';
  _key: string;
  kind: string;
  url?: string;
  slug?: string;
  text: string;
};

export type VideoSection = {
  _type: 'videoSection';
  _key: string;
  description: string;
  title: string;
  url: string;
};

export type Venue = {
  _type: 'venue';
  _id: string;
  name: string;
  url: string;
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

//TODO: change back value to lowercase weekday
export type ClassSchedule = {
  _type: 'schedule';
  weekday: 'string';
  time: {
    _type: 'timeRange';
    end: string;
    start: string;
  };
};

export type StudioClass = {
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
};

export type HybridClass = {
  _type: 'setting';
  classType: 'hybrid';
  streaming: string;
  registerUrl: string;
  venue: Venue;
};

export type OnlineClass = {
  _type: 'setting';
  classType: 'online';
  streaming: string;
  registerUrl: string;
};

export type ClassSetting = StudioClass | HybridClass | OnlineClass;

export type ScheduleSection = {
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
    schedule: ClassSchedule;
    setting: ClassSetting;
  }[];
};

/** Sanity Documents */

export type GlobalSettings = {
  _type: 'globalSettings';
  siteTitle: string;
  contactEmail: string;
  footerNav: NavLink[];
  mainNav: NavLink[];
  seo: SEO;
  socials: SocialLink[];
};

export type SanityPage = {
  _id: string;
  _type: 'page';
  pageSections: (CTA | VideoSection | ScheduleSection)[];
  title: 'Class Schedule';
};

export type SanityRoute = {
  _id: string;
  _type: 'route';
  includeInSitemap: boolean;
  internalId: string;
  page: SanityPage;
  seo: SEO;
  slug: string;
};

// TODO:ROUTEPROPS
// &preview: boolean; Pick<Params, 'slug'>;
