import { Link } from "react-router-dom";
import moment from "moment";
import { useArticles } from "@/hooks/queries/useContent";
import { type Article } from "@/models/api";

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
  const excludedId = params.excludedArticleId;
  const brand = import.meta.env.VITE_CONNEXUS_BRAND || "1";

  // Fetch articles using React Query
  const { data: allArticles = [], isLoading, error } = useArticles(brand, size + 1);

  // Filter out the excluded article and limit to the desired size
  const articleData: Article[] = (allArticles as Article[])
    .filter((article: Article) => article.id !== parseInt(excludedId))
    .slice(0, size);

  return (
    <div className="container-fluid rp oh lightBlueBG">
      <section className="container mt-4">
        <h4 className="mb-5 text-center">
          Check out some <span className="blueFont">more of our blogs...</span>
        </h4>
        <div className="row">
          {isLoading ? (
            <div className="text-center">
              <p>Loading articles...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <p>There was an error loading articles. Please try again later.</p>
            </div>
          ) : (
            articleData.map((article: Article, index) => (
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
            ))
          )}
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
