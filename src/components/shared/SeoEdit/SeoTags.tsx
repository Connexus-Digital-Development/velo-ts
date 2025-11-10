// TODO: Fix Seotags

export const seoTags = (
  title: string,
  description: string,
  keywords: string,
) => {
  document.title = title;

  // Properly find and update meta description tag
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) {
    descriptionMeta.setAttribute("content", description);
  }

  // Properly find and update meta keywords tag
  const keywordsMeta = document.querySelector('meta[name="keywords"]');
  if (keywordsMeta) {
    keywordsMeta.setAttribute("content", keywords);
  }
};
