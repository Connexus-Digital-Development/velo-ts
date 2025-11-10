import SportsEventsCoverIcon from "@/assets/svgs/sports-events-cover-icon.svg?url";

const WhyInsureWithVelosure = () => {
  return (
    <div className="container-fluid whiteBG pr oh">
      <div className="container Why_Icons">
        <div className="row">
          <div className="col-12 mt-3">
            <h3>
              Why Insure with
              <span className="blueFont"> Velosure?</span>
            </h3>
            <p className="blueFont">Looking to protect your cycle?</p>
            <p>
              We understand how important your bike is to you, which is why we
              include important features as standard. To view the full list of
              features, <a href="/coverfeatures">click here</a>.
            </p>
          </div>
          {/* Top row of icons */}
          <div className="col-12 col-md-6 col-lg-4 col-xl-4 pr-10">
            <div className="iconBlockBlueLeft mb-3 ">
              <img src={SportsEventsCoverIcon} alt="Sports & events cover icon" />
            </div>
            <h3>Sports & events cover</h3>
            <p>
              You are covered for participation in Competitive Road Racing,
              Mountain Bike Racing, Triathlons, Duathlons, Ironman™ events,
              Cyclo-Cross and Track Racing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyInsureWithVelosure;