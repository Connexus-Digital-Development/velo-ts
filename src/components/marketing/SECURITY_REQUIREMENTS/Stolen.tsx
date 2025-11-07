import Taxed from "@/assets/images/taxed.png";

const Stolen = () => {
  return (
    <div className="container-fluid  lightBlueBG oh">
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-xl-4 col-xxl-5">
            <h3>
              What happens if your{" "}
              <span className="blueFont">cycle is stolen?</span>
            </h3>
            <p>
              If your cycle is stolen, the first thing we need to establish is
              proof of ownership and value. To make this straightforward in the
              event of theft,
              <span className="blueFont">
                {" "}
                we strongly encourage our customers to keep a receipt of both
                their cycle(s) and lock(s) in a safe place
              </span>
              . We also recommend that you take a photo of your cycle(s) and
              lock(s) too.
            </p>
            <p>
              In some circumstances, we can also accept a screenshot of your
              bank statement showing payment for the cycle(s) and lock(s) along
              with photos, if you do not have the receipts.
            </p>
            <p>
              Having the receipts and photos makes proving ownership
              straightforward and avoids any delays in successfully handling
              your claim.
            </p>
            <p>
              Please note: If your bike is stolen and you wish to provide
              photographs as proof of ownership, we will need one close up shot
              to clearly show the make and model of your lock and also one of it
              locked to the cycle when not in use. All photographs used in
              support of a claim also need to be clearly date stamped.{" "}
            </p>
          </div>
          <div className="col-12 col-sm-4 col-xl-4 col-xxl-6 ">
            <img src={Taxed} alt="Stolen bike" className="bikeStolenImage" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stolen;
