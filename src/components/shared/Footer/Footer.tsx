import { FooterSection1 } from "./SectionOne";
import { FooterSection2 } from "./SectionTwo";

export const Footer = () => {
  return (
    <div className="container-fluid oh">
      {/* <div className="blueDividerBar"></div> */}
      <FooterSection1 />
      <FooterSection2 />
    </div>
  );
};
