import Helmet from "@/assets/images/helmets.png";
import Papers from "@/assets/images/papers.png";
import { Link } from "react-router-dom";
const IntroBlock = () => {
  return (
    <div className="container-fluid whiteBG pr oh ">
      <div className="container mb-5 mt-5">
        <div className="row">
          <div className="col-12 col-sm-6" id="left">
            <h3 className="text-left pt-4 pb-4">
              Understanding your{" "}
              <span className="blueFont">
                <br />
                cycle cover
              </span>
            </h3>
            <p>
              On this page you'll find links to download all relevant cycle
              insurance policy documents. This includes Policy Wording and
              Insurance Product Information Document (IPID). Click on the drop
              down menu that matches the date when your policy was purchased to
              download the available documents.
            </p>
            <p>
              If you are currently a Velosure Cycle Insurance customer and you
              are unsure of your policy start date, please refer to the Policy
              Documents that were sent to you by email at inception.
            </p>
          </div>
          <div className="col-12 col-sm-6 pr" id="right">
            <img src={Helmet} alt="Bike helmets" className="helmetImage" />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-sm-6 pr" id="left2">
            <img
              src={Papers}
              alt="Paper"
              className="paperImage d-none d-sm-block"
            />
          </div>
          <div className="col-12 col-sm-6 pr-30 mb-100" id="right2">
            <h3 className="text-left pt-4 mb-100">
              Misplaced<span className="blueFont"> your docs?</span>
            </h3>

            <p>
              You can download the standard policy documents on this page. If
              you have lost your own personal documents, you will need to{" "}
              <Link to="/contact"> contact us</Link> so we can send them to you.
            </p>

            <img
              src={Papers}
              alt="Paper"
              className="paperImage d-block d-sm-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroBlock;
