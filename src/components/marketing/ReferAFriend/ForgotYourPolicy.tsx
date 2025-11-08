import CTAButton from "@/components/shared/CTAButton";

const ForgotYourPolicy = () => {
  return (
    <div className="container-fluid lightblueBG  pr oh">
      <div className="container">
        <div className="row">
          <div
            id="left"
            className="col-12 col-sm-6 forgottenPolicyContainer order-2 order-sm-1 mt-md-5"
          >
            <img
              src="/static/media/policy.3bb531a26441d54d4754.png"
              alt="policy docs"
              className="policyImage d-block d-sm-block"
            />
          </div>
          <div
            id="right"
            className="col-12 mt-3 col-sm-6  responsiveAlign order-1 order-sm-2 mt-5"
          >
            <h3>
              <span className="blueFont">Forgotten </span>your policy number?
            </h3>
            <p className="pr-4 mt-3">
              If you need a reminder of your policy number, just drop us an
              email.
            </p>
            <CTAButton
              align="left"
              colour="blue"
              CTAText="Contact us"
              Url={`/contact`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotYourPolicy;
