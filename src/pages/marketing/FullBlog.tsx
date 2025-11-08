import { useState, useEffect } from "react";
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

const FullBlog = () => {
  const tags: string[] = [];
  const [articleData, setArticleData] = useState<any>({});
  const { id } = useParams() as { id: string };

  useEffect(() => {
    getArticleData(id);
    return () => {
      seoTags("velosure ", "", "");
      socialMediaTags("", "", "");
    };
  }, [id]);

  const getArticleData = async (id: string) => {
    const options = {
      method: "GET",
      headers: {
        "X-API-KEY": import.meta.env.VITE_VELOSURE_API_KEY as string,
        "content-type": "application/json",
      },
    };
    const article = await fetch(
      `${import.meta.env.VITE_VELOSURE_API_URL}/api/ConnexusCMS/Articles/GetArticleFromSlug/${id}`,
      options,
    )
      .then((response) => response.json())
      .then((data) => data);

    setArticleData(article);
    seoTags(
      article.seoTitle,
      article.seoDescription,
      articleTagsToCSV(article),
    );
    socialMediaTags(article.seoTitle, article.seoDescription, article.imageUrl);
  };

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
      <Helmet>
        <link
          rel="canonical"
          href={`https://www.velosure.co.uk/FullBlog/${articleData.pageURL}`}
        />
      </Helmet>

      <TopNavBar theme={"white"} />
      <BlogBanner
        headlineLine1={articleData.headline}
        headlineLine2={""}
        author={articleData.author}
        avatarImageURL={articleData.authorImage}
        hasCTA={"false"}
        CTAText={"Get a quote"}
      />

      <div className="container mb-5">
        <div className="row mt-3 mb-5">
          <div className="col-12 col-md-4 mb-4">
            <img
              alt={articleData.headline}
              className="latestBlogImage"
              src={articleData.imageUrl}
            />
          </div>

          <div
            className="col-12 col-md-7 font-27 mt-5 mb-3"
            dangerouslySetInnerHTML={{ __html: articleData.subHeading }}
          />

          {/* <div className="d-none d-md-block shareToSocialsBigVersion">
            <ShareToSocials articleData={articleData} />
          </div> */}

          <div
            className="col-12 "
            dangerouslySetInnerHTML={{ __html: articleData.body }}
          />
        </div>

        <ShareToSocials articleData={articleData} />
      </div>
      <MoreBlogs excludedArticleId={id} />
      <WhatOurCustomersSay />
      <div className="lightBlueBG">
        <ProtectYourBike variant={3} />
      </div>
    </div>
  );
};

export default FullBlog;
