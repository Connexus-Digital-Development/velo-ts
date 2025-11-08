import SoldSecure from "@/assets/images/sold-secure.png";

const NeedToPurchase = () => {
  return (
    <div className="container-fluid oh pr greyBG ">
      <div className="container mb-5 mt-5">
        <div className="row">
          <div className="col-12 col-sm-6 purchaseALock  mb-5">
            <h3>
              Need to purchase <span className="blueFont">a lock?</span>
            </h3>
            <p>Check out one of our partners, Warwickshire Ground Anchors. </p>
            <p>
              You will find everything you need here to ensure your bike is kept
              safe and that you meet the requirements set out in your policy.
            </p>
            <a
              href="https://warwickshiregroundanchors.co.uk/velosure-customers/ref/3/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-green btn-wider lufga"
            >
              Shop for lock
            </a>
          </div>
          <div className="col-12 col-sm-6 pr">
            <a href="https://soldsecure.com">
              <img
                className="securitySoldSecure d-none d-sm-block"
                src={SoldSecure}
                alt="Sold Secure logo"
              />
            </a>
            <a href="https://soldsecure.com" className="d-block d-sm-none pt-5">
              <img
                className="securitySoldSecure "
                src={SoldSecure}
                alt="Sold Secure logo"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeedToPurchase;
