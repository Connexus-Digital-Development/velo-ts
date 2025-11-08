import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import { useLocation } from "react-router-dom";

interface ShareToSocialsProps {
  articleData: any;
}

const ShareToSocials = ({ articleData }: ShareToSocialsProps) => {
  const location = useLocation();
  return (
    <div className="row mt-2">
      <div className="col-12">
        <div className="float-end">
          <FacebookShareButton
            url={"https://velosure2022.connexus-test.co.uk" + location.pathname}
            // quote={articleData.headline}
            hashtag={
              articleData.articleSEOTags
                ? articleData.articleSEOTags
                    .map((m: any) => m.tag.name)
                    .join(",")
                : null
            }
            className="mt-4 ml-5"
          >
            <FacebookIcon size={36} />
          </FacebookShareButton>
          <TwitterShareButton
            url={"https://velosure2022.connexus-test.co.uk" + location.pathname}
            // quote={articleData.headline}
            hashtags={
              articleData.articleSEOTags
              // ? articleData.articleSEOTags.map((m: any) => m.tag.name).join(",")
              // : null
            }
            className=""
          >
            <TwitterIcon size={36} />
          </TwitterShareButton>
          <LinkedinShareButton
            url={"https://velosure2022.connexus-test.co.uk" + location.pathname}
            title={articleData.headline}
            summary={articleData.subheading}
            // hashtags={
            // articleData.articleSEOTags
            // ? articleData.articleSEOTags.map((m: any) => m.tag.name).join(",")
            // : null
            // }
            className=""
          >
            <LinkedinIcon size={36} />
          </LinkedinShareButton>
        </div>
        <p className="blueFont roboto float-end mt-4 mr-3">Share this blog</p>
      </div>
    </div>
  );
};

export default ShareToSocials;
