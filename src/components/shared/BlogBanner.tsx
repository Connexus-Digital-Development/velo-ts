import { Link } from "react-router-dom";
import BlogBannerBackground from "@/assets/svgs/blog-banner-background.svg?url";

interface BlogBannerProps {
  headlineLine1: string;
  author?: string;
  avatarImageURL?: string;
  headlineLine2: string;
  hasCTA?: string;
  CTAText?: string;
  hasScrollCTA?: boolean;
  scrollCTARef?: React.RefObject<HTMLElement>;
}

const BlogBanner = (props: BlogBannerProps) => {
  return (
    <div id="journeyHeadingBlock" className=" oh pr z0 ">
      <div className="container ">
        <div className="sharedHeaderBlockCopy">
          <h1 className="align-content-start heroText">
            {props.headlineLine1}
          </h1>

          {props.author && (
            <p className="writtenBy">
              <span>
                {props.avatarImageURL && (
                  <img
                    className="blogAvatar"
                    src={props.avatarImageURL}
                    alt="{props.author}"
                  />
                )}
              </span>
              Written by <strong>{props.author}</strong>
            </p>
          )}

          <h1 className="align-content-start heroText">
            {props.headlineLine2}
          </h1>
          {/* <p className="banner-subheadline">
            {props.subheadlineLine1} {props.subheadlineLine2}
          </p> */}
          <p className="banner-subheadline"></p>
          {props.hasCTA === "true" && (
            <Link
              to="/get-a-quote"
              className="btn btn-green btn-wider mt-3 mb-2 lufga"
            >
              {props.CTAText}
            </Link>
          )}
          {props.hasScrollCTA === true && props.scrollCTARef && (
            <button
              onClick={() => {
                props.scrollCTARef!.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
              className="btn btn-green mt-3 btn-wider mb-2 lufga"
            >
              {props.CTAText}
            </button>
          )}
        </div>
      </div>

      <div className="bannerSVG">
        <img src={BlogBannerBackground} alt="Blog banner background" />
      </div>
    </div>
  );
};

export default BlogBanner;
