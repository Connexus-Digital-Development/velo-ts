import { Link } from "react-router-dom";

interface CTAButtonProps {
  align: "left" | "right" | "center";
  colour: "blue" | "green" | "orange" | "grey" | "mustard";
  CTAText: string;
  Url: string;
  id?: string;
  externalLink?: boolean;
  additionalClass?: string;
  onClick?: () => void;
}

const CTAButton = ({
  align,
  colour,
  CTAText,
  Url,
  id = "",
  externalLink = false,
  additionalClass = "",
  onClick,
}: CTAButtonProps) => {
  const showButton = true;

  const GetAlign = () => {
    switch (align) {
      case "left":
        return "align-left!important";
      case "right":
        return "align-right!important;";
      case "center":
        return "align-center";
      default:
        return "align-center";
    }
  };

  const GetColour = () => {
    switch (colour) {
      case "blue":
        return "btn-primary";
      case "green":
        return "btn-green";
      case "orange":
        return "orangeBG";
      case "grey":
        return "greyBG";
      case "mustard":
        return "mustardWhiteBG btn-mustard ";
      default:
        return "left";
    }
  };

  return (
    <div className={GetAlign()}>
      {showButton === true && externalLink === false && (
        <Link
          className={
            "btn lufga CTAButton  " + GetColour() + " " + additionalClass
          }
          to={Url}
          id={id}
          onClick={onClick}
        >
          {CTAText}
        </Link>
      )}
      {showButton === true && externalLink === true && (
        <a
          className={
            "btn lufga CTAButton  " + GetColour() + " " + additionalClass
          }
          href={Url}
          id={id}
          target="_blank"
          rel="noreferrer"
          onClick={onClick}
        >
          {CTAText}
        </a>
      )}
    </div>
  );
};

export default CTAButton;
