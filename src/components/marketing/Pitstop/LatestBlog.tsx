import { Link } from "react-router-dom";
import Spinner from "@/components/shared/Spinner";
import type { LatestBlogProps } from "@/models/MarketingComponentTypes";

const LatestBlog = (props: LatestBlogProps) => {
  if (!props.latestBlog) return null;
  return (
    <div className="container-fluid whiteBG">
      {props.latestBlog.headline && (
        <div className="container container_narrow mb-5 pt-5">
          <h4>
            Our <span className="blueFont">latest blog</span>{" "}
          </h4>
          <div className="row">
            <div id="left" className="col-12 col-md-6 mb-3">
              <img
                src={props.latestBlog.imageUrl}
                alt={props.latestBlog.Headline}
                className="latestBlogImage mb-1"
              />
            </div>
            <div id="right" className="col-12 col-md-6 mb-3">
              <h4 className=" pr-4 mt-3">{props.latestBlog.headline}</h4>
              <p>{props.latestBlog.subHeading}</p>
              <Link
                className="btn btn-green"
                to={`/FullBlog/${props.latestBlog.pageURL}`}
              >
                Read more
              </Link>
            </div>
          </div>
        </div>
      )}
      {!props.latestBlog.headline && (
        <div className="container pb-5 pt-5 greyFont">
          <h4>
            <Spinner /> Loading latest blog posts...
          </h4>
        </div>
      )}
    </div>
  );
};

export default LatestBlog;
