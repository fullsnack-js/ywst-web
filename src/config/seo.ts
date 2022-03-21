const url = "https://ywst.org/";

const title = "Yoga with Susan Turis";

const description = "Iyengar yoga teacher in NYC.";

export const seoConfig = Object.freeze({
  canonical: url,
  defaultTitle: title,
  description,
  openGraph: {
    description,
    images: [
      {
        alt: "",
        height: 630,
        url: "",
        width: 1200,
      },
      {
        alt: "",
        height: 800,
        url: "",
        width: 800,
      },
    ],
    locale: "en_US",
    site_name: title,
    title,
    type: "website",
    url,
  },
  titleTemplate: `%s | ${title}`,
  twitter: {
    cardType: "summary_large_image",
    handle: "@susanturisyoga",
    site: "@susanturisyoga",
  },
});
