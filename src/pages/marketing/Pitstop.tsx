import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import TopNavBar from "@/components/shared/TopNavBar";
import RegularBanner from "@/components/shared/RegularBanner";
import LatestBlog from "@/components/marketing/Pitstop/LatestBlog";
import { Pagination } from "@mantine/core";
import ProtectYourBike from "@/components/shared/ProtectYourBike";
import { seoTags } from "@/components/shared/SeoEdit";
import WhatOurCustomersSay from "@/components/shared/WhatOurCustomersSay";
import { Helmet } from "react-helmet-async";
import { type BlogPost } from "@/models/MarketingComponentTypes";
import { useAllArticles, useCategories } from "@/hooks/queries/useContent";

const Pitstop = () => {
  const brand = import.meta.env.VITE_CONNEXUS_BRAND;
  const categoryType = import.meta.env.VITE_ARTICLE_CATEGORY_TYPE;

  const {
    data: articlesResponse,
    isLoading: articlesLoading,
    error: articlesError,
  } = useAllArticles(brand);
  const {
    data: categoriesResponse,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories(categoryType);

  const articles = useMemo(() => articlesResponse || [], [articlesResponse]);
  const categories = useMemo(
    () => categoriesResponse || [],
    [categoriesResponse],
  );

  const hasApiError = articlesError || categoriesError;

  const structuredData = useMemo(() => {
    if (!articles.length || !categories.length) return [];

    const result = [{ name: "All", articles }];

    categories.forEach((category: any) => {
      const filteredArticles = articles.filter(
        (article: any) => article.category.id === category.id,
      );
      if (filteredArticles && filteredArticles.length > 0) {
        result.push({ name: category.name, articles: filteredArticles });
      }
    });

    return result;
  }, [articles, categories]);

  const [activeCategory, setActiveCategory] = useState<number | undefined>();
  const [latestArticle, setLatestArticle] = useState<BlogPost | null>(null);
  const [activePage, setPage] = useState(1);

  const filteredData =
    activeCategory !== undefined && structuredData[activeCategory]
      ? structuredData[activeCategory].articles
      : articles;

  useEffect(() => {
    seoTags("Blog | Pitstop", "", "");
    return () => {
      seoTags("velosure ", "", "");
    };
  }, []);

  // Set default category and latest article when data loads
  useEffect(() => {
    if (articles.length > 0 && !activeCategory) {
      setActiveCategory(0);
      setLatestArticle(articles[0]);
    }
  }, [articles, activeCategory]);

  const handleCategoryFilterChange = (index: number) => {
    setActiveCategory(index);
    setPage(1);
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
        {articlesLoading || categoriesLoading ? (
          <div className="text-center py-5">
            <p>Loading blog posts...</p>
          </div>
        ) : hasApiError ? (
          <div className="text-center py-5">
            <p>Error loading blog posts. Please try again later.</p>
          </div>
        ) : (
          <>
            <div className="row mb-4">
              {structuredData.map((object, index) => {
                return (
                  <div
                    className="col-6 col-sm-4 col-lg-3 col-xxl-2"
                    key={index}
                  >
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
                  <div
                    className="col-12 col-md-6 col-xl-4 mb-5"
                    key={article.id}
                  >
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
                              {moment(article.publishedDate).format(
                                "D MMMM YYYY",
                              )}
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
                value={activePage}
                onChange={setPage}
                total={Math.ceil(filteredData.length / 9)}
                // position="center"
                radius="md"
                // styles={() => ({
                //   item: {
                //     "&[data-active]": {
                //       "background-color": "#00a8ff",
                //     },
                //   },
                // })}
              />
            </div>
          </>
        )}
      </section>
      <WhatOurCustomersSay />
      <div className="lightBlueBG">
        <ProtectYourBike variant={3} />
      </div>
    </div>
  );
};

export default Pitstop;
