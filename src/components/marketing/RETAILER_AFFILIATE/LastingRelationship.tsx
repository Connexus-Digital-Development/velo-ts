import mountainBike from "@/assets/images/mountainBikeGrey.jpg";
import React from "react";

interface LastingRelationshipProps {
  signupRef: React.RefObject<HTMLElement>;
}

const LastingRelationship = ({ signupRef }: LastingRelationshipProps) => {
  return (
    <div className="container-fluid oh pr greyBG">
      <div className="container">
        <div className="row mt-5">
          <div id="left" className="col-12 col-lg-6 responsiveAlign ">
            <h3 className="text-left pt-4 pb-4 pr-5">
              Create a<span className="blueFont"> lasting relationship </span>
              with your customers through Velosure
            </h3>

            <div className="col-12 d-none d-lg-block mobile-bike-container">
              <img
                src={mountainBike}
                className="introBlocKBike negZIndex"
                alt="Mountain Bike"
              />
            </div>
          </div>
          <div id="right" className="col-12 col-lg-6 pt-4 mb-3">
            <h5 className="blackFont lufga-regular font-27">
              What are the set up costs?{" "}
            </h5>
            <p className="pr-5">
              There aren’t any. There are no costs to the retailer at all, at
              any stage. We establish the relationship with the retailer through
              a standard Non-Regulated Introducer Agreement. We then set the
              retailer up on our transaction system with a unique code, which is
              usually the retailer name.
            </p>
            <p className="pr-5">
              We are then able to provide this code to you, the retailer, so
              that you can promote this to your customers. When your customers
              use this code at check out or clicks a unique tracking link on
              your site, this records your referral in our database. We can also
              provide you with a range of point of sales materials and digital
              assets.
            </p>

            <h5 className="blackFont mt-5 lufga-regular font-27">
              How will this be tracked?
            </h5>
            <p className="pr-5">
              Each retailer is assigned their own unique code, and this will be
              used to track the source of any new business to Velosure Cycle
              Insurance.
            </p>
            <p className="pr-5">
              We can give you code for you to promote to your customers and we
              can also give you a unique tracking link to place on your website
              which contains the code.
            </p>

            <p className="pr-5">
              Reporting will be done on a monthly basis so retailers can see
              exactly how many customers they are referring and can clearly
              track their commission.
            </p>
            <button
              className="btn lufga btn-green btn-wider mb-5 center-on-mobile"
              onClick={() => {
                signupRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
      <img
        src={mountainBike}
        className="affiliateMountainbikeMobile d-block d-lg-none"
        alt=""
      />
    </div>
  );
};

export default LastingRelationship;
