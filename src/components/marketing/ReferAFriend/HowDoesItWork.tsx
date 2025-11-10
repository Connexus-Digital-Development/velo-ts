import BikeCouple from "@/assets/images/ReferalImageSmaller.png";

const HowDoesItWork = () => {
  return (
    <div className="container-fluid whiteBG  pr oh">
      <div className="container">
        <div className="row ">
          <div id="left" className="col-12 col-sm-6 mt-md-5 mb-md-5">
            <h1>
              How <span className="blueFont">does it work?</span>
            </h1>

            <h4 className="blueFont mt-3">Step 1</h4>
            <p>
              Tell your friend(s) how good we are and get them to contact us
              directly by either email or telephone.
            </p>
            <h4 className="blueFont">Step 2</h4>
            <p>
              Your friend(s) must quote your full name and policy number when
              they contact us to obtain a quote and purchase a policy .
            </p>
            <h4 className="blueFont">Step 3</h4>
            <p>
              Once we’ve got them covered, you’ll then both receive your £10
              Amazon Gift Voucher via an email from us within 60 days of the new
              policy start date.
            </p>
            <p className="smaller mt-md-5">
              *This offer is subject to the following terms and conditions:
              Existing customers can refer an unlimited number of family &
              friends but can only redeem up to 2 vouchers. This offer cannot be
              used in conjunction with any other offer. The individual(s) being
              referred must not hold an existing policy with Velosure. The
              vouchers will only be issued if the existing policyholder's full
              name and policy number is quoted and the new policy is active for
              at least 30 days. Please note that a cancelled policy will incur a
              fee of £15. Amazon Gift Vouchers are valid for up to 10 years as
              per their terms and conditions.
            </p>
          </div>
          <div id="right" className="col-12 col-sm-6 pr">
            <img
              src={BikeCouple}
              alt="biker"
              className="bikeCoupleRefer d-block"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowDoesItWork;
