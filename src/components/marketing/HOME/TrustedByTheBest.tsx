import CTAButton from "@/components/shared/CTAButton";
const TrustedByTheBest = () => {
  return (
    <div className="container-fluid greyBG pr">
      <div className="container text-left mt-5 pt-5 pb-5">
        <div className="row">
          <div className="col-12 col-sm-6">
            <h3 className="mb-4">
              Trusted <span className="blueFont ">by the best</span>.
            </h3>
            <p className="mb-5">
              With Velosure’s in-depth cover providing a high-level of
              protection on the road and during events, it made a perfect fit
              for Olympic Gold Medalist{" "}
              <span className="blueFont">Jonny Brownlee MBE.</span>
            </p>
            <CTAButton
              align="left"
              colour="green"
              CTAText="Learn more"
              Url={`/BrandAmbassador`}
            />
          </div>
          <div className="col-12 col-sm-6">
            <img
              src="/static/media/JBL.7d8cd20f81cbddb29b45.png"
              alt="Brand Ambassador - Jonny Brownlee"
              className="JBLImage"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedByTheBest;
