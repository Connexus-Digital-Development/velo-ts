import bikeFall from "@/assets/images/bikeFallMobAdjusted.png";
const IntroBlock = () => {
  return (
    <div className="container-fluid whiteBG pr oh ">
      <div className="container mb-5 mt-5">
        <div className="row">
          <div className="col-12 col-sm-6  pr order-2 order-sm-1 d-none d-lg-block">
            <img
              className="bikeFall"
              src={bikeFall}
              alt="man has fallen off a bike"
            />
          </div>
          <div className="col-12 col-sm-6  pr order-2 order-sm-1 d-lg-none">
            <img
              className="bikeFall"
              src={bikeFall}
              alt="man has fallen off a bike"
            />
          </div>

          <div className="col-12 col-sm-5 order-1 order-sm-2">
            <h3 className="text-left pt-4 pb-4">
              When cycle accidents happen, you need an{" "}
              <span className="blueFont">insurer you can trust</span>
            </h3>
            <p>
              Should the worst has happened and you have an accident, you don’t
              need to worry. We have an in-house claims team who will deal with
              you claim in a quick and stress-free fashion.{" "}
            </p>
            <p>
              If your bicycle is damaged, you can also choose who repairs it. We
              will liase with them and you can rest assured that is it being
              fixed by a repairer you trust.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroBlock;
