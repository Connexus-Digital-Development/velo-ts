import { HashLink } from "react-router-hash-link";

interface CTAButtonHashProps {
  align: "left" | "right" | "center";
  colour: "blue" | "green" | "orange" | "white" | "grey" | "mustard";
  CTAText: string;
  Url: string;
  id?: string;
  additionalClass?: string;
}

const CTAButtonHash = ({ align, colour, CTAText, Url, additionalClass = "" ,id = "" }: CTAButtonHashProps) => {
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
      case "white":
        return "whiteButton";
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
      <HashLink
        scroll={(el) =>
          el.scrollIntoView({ behavior: "smooth", block: "center" })
        }
        to={Url}
        id={id}
        className={"btn lufga CTAButton  " + GetColour() + " " + additionalClass}
      >
         {CTAText}
      </HashLink>
    </div>
  );
};

export default CTAButtonHash;