import CTAButton from "@/components/shared/CTAButton";
import dumbfounded from "@/assets/images/dumbfounded.png";
const CantSeeAnswer = () => {
  return (
    <div className="container-fluid greyBG  pr oh mb-5 ">
      <img
        src={dumbfounded}
        alt="confused man image"
        className="dumbfoundedImage "
      />
      <div className="container mt-sm-4">
        <div className="row ">
          <div id="left" className="col-12 col-sm-6 mt-3 cantSeeAnswer">
            <h3>
              Can't see an answer to{" "}
              <span className="blueFont">your question?</span>
            </h3>
            <p className="pr-3">
              If you can find an answer for your question, our team are on hand
              and ready to help! Just fill out our enquiry form or even give us
              a call.
            </p>
          </div>
          <div className="mb-5">
            <CTAButton
              align="left"
              colour="green"
              additionalClass="ctaButtonImageMargin"
              CTAText="Contact us"
              Url="/contact"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CantSeeAnswer;
