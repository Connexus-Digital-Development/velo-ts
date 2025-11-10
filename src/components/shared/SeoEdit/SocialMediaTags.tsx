// TODO: Fix Seotags

export const socialMediaTags = (
  title: string,
  description: string,
  image: string,
) => {
  // Properly find and update Open Graph meta tags
  const ogTitleMeta = document.querySelector('meta[property="og:title"]');
  if (ogTitleMeta) {
    ogTitleMeta.setAttribute("content", title);
  }

  const ogDescriptionMeta = document.querySelector(
    'meta[property="og:description"]',
  );
  if (ogDescriptionMeta) {
    ogDescriptionMeta.setAttribute("content", description);
  }

  const ogImageMeta = document.querySelector('meta[property="og:image"]');
  if (ogImageMeta) {
    ogImageMeta.setAttribute("content", image);
  }
};
