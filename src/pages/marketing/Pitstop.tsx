import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import TopNavBar from "@/components/shared/TopNavBar";
import RegularBanner from "@/components/shared/RegularBanner";
import LatestBlog from "@/components/marketing/PITSTOP/LatestBlog";
import { Pagination } from "@mantine/core";
import ProtectYourBike from "@/components/shared/ProtectYourBike";
import { seoTags } from "@/components/shared/SeoEdit";
import WhatOurCustomersSay from "@/components/shared/WhatOurCustomersSay";
import { Helmet } from "react-helmet";
import { type BlogPost } from "@/models/MarketingComponentTypes";

const Pitstop = () => {
  const [structuredData, setStructuredData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | undefined>();
  const [latestArticle, setLatestArticle] = useState<BlogPost | null>(null);
  const [activePage, setPage] = useState(1);

  useEffect(() => {
    generateAndDefaultData();
    seoTags("Blog | Pitstop", "", "");
    return () => {
      seoTags("velosure ", "", "");
    };
  }, []);

  const generateAndDefaultData = async () => {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "X-API-KEY": import.meta.env.VITE_VELOSURE_API_KEY || "",
        "content-type": "application/json",
      },
    };
    const categories = await fetch(
      `${import.meta.env.VITE_VELOSURE_API_URL}/api/ConnexusCMS/Categories/GetCategoriesByType/${import.meta.env.VITE_ARTICLE_CATEGORY_TYPE}`,
      options,
    )
      .then((response) => response.json())
      .then((data) => data);

    const articles = await fetch(
      `${import.meta.env.VITE_VELOSURE_API_URL}/api/ConnexusCMS/Articles/GetArticles/${import.meta.env.VITE_CONNEXUS_BRAND}`,
      options,
    )
      .then((response) => response.json())
      .then((data) => data);

    // All Articles
    setStructuredData((prevState) => [
      ...prevState,
      { name: "All", articles: articles },
    ]);

    // Categorised Articles
    categories.forEach((category: any) => {
      const filteredArticles = articles.filter(
        (article: any) => article.category.id === category.id,
      );
      if (filteredArticles && filteredArticles.length > 0) {
        setStructuredData((prevState) => [
          ...prevState,
          { name: category.name, articles: filteredArticles },
        ]);
      }
    });

    // Default to show all
    setActiveCategory(0);
    setFilteredData(articles);

    // Get latest article
    setLatestArticle(articles[0]);
  };

  const handleCategoryFilterChange = (index: number) => {
    setActiveCategory(index);
    setPage(1);
    setFilteredData(structuredData[index].articles);
  };

  return (
    <div className="container-fluid rp oh lightBlueBG">
      <Helmet>
        <link rel="canonical" href="https://www.velosure.co.uk/Pitstop" />
      </Helmet>
      <TopNavBar theme={"white"} />
      <RegularBanner
        headlineLine1={"The"}
        headlineLine2={"Pitstop"}
        subheadlineLine1={
          "Your one stop place for all stories, tips and insights from the cycling world."
        }
        subheadlineLine2={""}
        hasCTA={"false"}
        CTAText={"Get a quote"}
        requiresSpacer={true}
      />

      <LatestBlog latestBlog={latestArticle} />

      <section className="container mt-4">
        <div className="row mb-4">
          {structuredData.map((object, index) => {
            return (
              <div className="col-6 col-sm-4 col-lg-3 col-xxl-2" key={index}>
                <button
                  className={
                    index === activeCategory
                      ? "btn btn-white btn-wider primaryFocussed filterBlogButton"
                      : "btn btn-white btn-wider filterBlogButton"
                  }
                  onClick={() => handleCategoryFilterChange(index)}
                >
                  {object.name}
                </button>
              </div>
            );
          })}
        </div>

        <div className="row">
          {filteredData
            .slice(activePage * 9 - 9, activePage * 9)
            .map((article) => (
              <div className="col-12 col-md-6 col-xl-4 mb-5" key={article.id}>
                <Link
                  className="pitstopAnchors"
                  to={`/FullBlog/${article.pageURL}`}
                >
                  <div className="card card blog-card oh">
                    <div className="card-header blog-card-header">
                      <img src={article.imageUrl} alt={article.headline} />
                      <div className="card-divider"></div>
                      <div className="card-category">
                        <p>{article.category.name}</p>
                      </div>
                    </div>
                    <div className="card-body blog-card-body">
                      <div className="blog-date">
                        <p>
                          {moment(article.publishedDate).format("D MMMM YYYY")}
                        </p>
                      </div>
                      <div className="blog-author">
                        <p>Written by {article.author}</p>
                      </div>
                      <div className="blog-heading">
                        <h2>{article.headline}</h2>
                      </div>
                      <div className="blog-sub-heading">
                        <p className="clampedToTwoLines">
                          {article.subHeading}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          <Pagination
            page={activePage}
            onChange={setPage}
            total={Math.ceil(filteredData.length / 9)}
            position="center"
            radius="md"
            styles={() => ({
              item: {
                "&[data-active]": {
                  "background-color": "#00a8ff",
                },
              },
            })}
          />
        </div>
      </section>
      <WhatOurCustomersSay />
      <div className="lightBlueBG">
        <ProtectYourBike variant={3} />
      </div>
    </div>
  );
};

export default Pitstop;
