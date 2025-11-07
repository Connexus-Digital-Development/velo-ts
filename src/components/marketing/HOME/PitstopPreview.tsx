import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const PitstopPreview = () => {
  const getSize = () => {
    if (windowSize < 768) return 1;
    if (windowSize < 1025) return 2;
    return 3;
  };

  const [articleData, setArticleData] = useState<any[]>([]);
  const [windowSize] = useState(window.innerWidth);
  const [size] = useState(getSize());

  useEffect(() => {
    generateArticleData();
  }, [windowSize]);

  const generateArticleData = async () => {
    const options = {
      method: "GET",
      headers: {
        "X-API-KEY": import.meta.env.VITE_VELOSURE_API_KEY,
        "content-type": "application/json",
      },
    };
    const articles = await fetch(
      `${import.meta.env.VITE_VELOSURE_API_URL}/api/ConnexusCMS/Articles/GetNumberOfArticles/${import.meta.env.VITE_CONNEXUS_BRAND}/${size}`,
      options,
    )
      .then((response) => response.json())
      .then((data) => data);

    setArticleData(articles);
  };

  return (
    <div className="container-fluid rp oh greyBG">
      <section className="container mt-4">
        <h1>The Pitstop.</h1>
        <h4 className="blueFont mb-5 lufga-light">
          Your one stop place for all stories, tips and insights from the
          cycling world.
        </h4>
        <div className="row">
          {articleData.map((article) => (
            <div className="col-xl-4  col-sm-6 mb-sm-5" key={article.id}>
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
                      <p className="clampedToTwoLines">{article.subHeading}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mb-5">
          <Link className="pitstopAnchors btn btn-primary" to="/Pitstop">
            Visit the blog
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PitstopPreview;
