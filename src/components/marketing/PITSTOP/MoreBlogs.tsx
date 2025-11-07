import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const size = window.innerWidth < 800 ? 1 : 3;

const limitText = (string: string, length: number) => {
  return string.length > length
    ? string.substring(0, length - 3) + "..."
    : string;
};

interface MoreBlogsProps {
  excludedArticleId: string;
}

const MoreBlogs = (params: MoreBlogsProps) => {
  const [articleData, setArticleData] = useState<any[]>([]);
  const excludedId = params.excludedArticleId;

  useEffect(() => {
    generateArticleData(excludedId);
  }, [excludedId]);

  const generateArticleData = async (excludedId: string) => {
    const options = {
      method: "GET",
      headers: {
        "X-API-KEY": import.meta.env.VITE_VELOSURE_API_KEY,
        "content-type": "application/json",
      },
    };
    const articles = await fetch(
      `${
        import.meta.env.VITE_VELOSURE_API_URL
      }/api/ConnexusCMS/Articles/GetNumberOfArticles/${
        import.meta.env.VITE_CONNEXUS_BRAND
      }/${size + 1}`,options
    )
      .then((response) => response.json())
      .then((data) => data);

    const filteredArticles: any[] = [];

    articles.forEach((article: any) => {
      if (article.id !== parseInt(excludedId)) {
        if (filteredArticles.length < size) {
          filteredArticles.push(article);
        }
      }
    });

    setArticleData(filteredArticles);
  };

  return (
    <div className="container-fluid rp oh lightBlueBG">
      <section className="container mt-4">
        <h4 className="mb-5 text-center">
          Check out some <span className="blueFont">more of our blogs...</span>
        </h4>
        <div className="row">
          {articleData.map((article, index) => (
            <div className="col-sm-4" key={index}>
                <Link className="pitstopAnchors" to={`/FullBlog/${article.pageURL}`}>
                <div className="card blog-card oh">
                  <div className="card-header">
                    <img src={article.imageUrl} alt={article.headline} />
                    <div className="card-divider"></div>
                    <div className="card-category">
                      <p className="lufga-medium">{article.category.name}</p>
                    </div>
                  </div>
                  <div className="card-body">
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
                        {limitText(article.subHeading, 125)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-5 mb-5">
          <Link className="pitstopAnchors btn btn-primary" to="/Pitstop">
            Visit the blog
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MoreBlogs;
