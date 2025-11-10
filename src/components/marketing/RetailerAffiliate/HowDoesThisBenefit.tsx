import AffilateScreens from "@/assets/images/AffiliateScreens.png";

const HowDoesThisBenefit = () => {
  return (
    <div className="container-fluid greyBG pr oh AffiliateIntro1">
      <div className="container mt-4 mt-lg-5">
        <div className="row">
          <div id="left" className="col-12 col-md-6 pr">
            <img
              className="AffilateScreens d-none d-md-block"
              src={AffilateScreens}
              alt="Affiliate screens"
            />
          </div>
          <div id="right" className="col-12 col-md-6 mt-4">
            <h3>
              How does this
              <span className="blueFont"> benefit the retailer?</span>
            </h3>
            <p>
              It provides an opportunity to develop your relationship with your
              customers.
            </p>
            <p>
              If one of your customers suffers accidental damage to their
              bicycle, we can ensure they come back to you for the repair. In
              addition, for every new cycle insurance customer you refer, we can
              pay commission.
            </p>
            <img
              className="AffilateScreens d-block d-md-none"
              src={AffilateScreens}
              alt="Affiliate screens"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowDoesThisBenefit;
