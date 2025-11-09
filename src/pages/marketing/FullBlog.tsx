import { useEffect } from "react";
import TopNavBar from "@/components/shared/TopNavBar";
import BlogBanner from "@/components/shared/BlogBanner";
import { useParams } from "react-router-dom";
import WhatOurCustomersSay from "@/components/shared/WhatOurCustomersSay";
import ProtectYourBike from "@/components/shared/ProtectYourBike";
import MoreBlogs from "@/components/marketing/Pitstop/MoreBlogs";
import { seoTags } from "@/components/shared/SeoEdit";
import { socialMediaTags } from "@/components/shared/SeoEdit";
import ShareToSocials from "@/components/marketing/Pitstop/ShareToSocials";
import { Helmet } from "react-helmet-async";
import { useArticle } from "@/hooks/queries/useContent";

// Type for article data
interface ArticleData {
  seoTitle: string;
  seoDescription: string;
  imageUrl: string;
  headline: string;
  subHeading: string;
  body: string;
  pageURL: string;
  author: string;
  authorImage: string;
  publishedDate: string;
  articleSEOTags: Array<{ tag: { name: string } }>;
}

const FullBlog = () => {
  const tags: string[] = [];
  const { id } = useParams() as { id: string };

  // Fetch article using React Query
  const { data, isLoading } = useArticle(id);

  const articleData = data?.Value;

  // Handle SEO updates when article data changes
  useEffect(() => {
    if (articleData && Object.keys(articleData).length > 0) {
      seoTags(
        (articleData as ArticleData).seoTitle,
        (articleData as ArticleData).seoDescription,
        articleTagsToCSV(articleData as ArticleData),
      );
      socialMediaTags(
        (articleData as ArticleData).seoTitle,
        (articleData as ArticleData).seoDescription,
        (articleData as ArticleData).imageUrl,
      );
    }
    return () => {
      seoTags("velosure ", "", "");
      socialMediaTags("", "", "");
    };
  }, [articleData]);

  /*
   * document.title = "Welcome | here is your page title to display";
   * document.getElementsByTagName("META")[2].content = "Your description about the page or site here to set dynamically";
   */

  type Item = {
    tag: { name: string };
  };

  function articleTagsToCSV(data: { articleSEOTags: Item[] }) {
    data.articleSEOTags.forEach(mapTagName);
    return tags.join(",");
  }

  function mapTagName(item: Item) {
    tags.push(item.tag.name);
  }

  return (
    <div className="container-fluid whiteBG">
      {isLoading ? (
        <div className="text-center mt-5">
          <p>Loading article...</p>
        </div>
      ) : (
        <>
          <Helmet>
            <link
              rel="canonical"
              href={`https://www.velosure.co.uk/FullBlog/${(articleData as ArticleData)?.pageURL}`}
            />
          </Helmet>

          <TopNavBar theme={"white"} />
          <BlogBanner
            headlineLine1={(articleData as ArticleData)?.headline}
            headlineLine2={""}
            author={(articleData as ArticleData)?.author}
            avatarImageURL={(articleData as ArticleData)?.authorImage}
            hasCTA={"false"}
            CTAText={"Get a quote"}
          />

          <div className="container mb-5">
            <div className="row mt-3 mb-5">
              <div className="col-12 col-md-4 mb-4">
                <img
                  alt={(articleData as ArticleData)?.headline}
                  className="latestBlogImage"
                  src={(articleData as ArticleData)?.imageUrl}
                />
              </div>

              <div
                className="col-12 col-md-7 font-27 mt-5 mb-3"
                dangerouslySetInnerHTML={{
                  __html: (articleData as ArticleData)?.subHeading,
                }}
              />

              {/* <div className="d-none d-md-block shareToSocialsBigVersion">
                <ShareToSocials articleData={articleData} />
              </div> */}

              <div
                className="col-12 "
                dangerouslySetInnerHTML={{
                  __html: (articleData as ArticleData)?.body,
                }}
              />
            </div>

            <ShareToSocials articleData={articleData as ArticleData} />
          </div>
          <MoreBlogs excludedArticleId={id} />
          <WhatOurCustomersSay />
          <div className="lightBlueBG">
            <ProtectYourBike variant={3} />
          </div>
        </>
      )}
    </div>
  );
};

export default FullBlog;
