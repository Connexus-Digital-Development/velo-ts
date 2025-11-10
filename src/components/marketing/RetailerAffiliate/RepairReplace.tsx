import Tools from "@/assets/images/tools.jpg";

const RepairReplace = () => {
  return (
    <div className="container-fluid whiteBG  pr oh AffiliateIntro2">
      <div className="container mt-4 ">
        <div className="row ">
          <div id="left" className="col-12 col-md-6">
            <h3>
              <span className="blueFont">Repair </span>& replacement
            </h3>
            <p>
              In the event of a total loss, our policyholders will be referred
              back to the original retailer for a replacement, allowing the
              affiliate retailer to move more bikes out of their premises and
              more importantly retain the custom.
            </p>
            <p>
              We will pay commission on all newly sold policies, which have been
              referred from the retailer. This will be paid as a BACS payment
              every month into your nominated account and is tracked through the
              use of a unique code.
            </p>
          </div>
          <div id="right" className="col-12 col-md-6 pr">
            <img className="toolsImage" src={Tools} alt="Bikes repair tools" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairReplace;
