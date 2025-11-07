import { HashLink } from "react-router-hash-link";

const WhatWeDontCover = () => {
  return (
    <div className="container-fluid greyBG mt-5">
      <section className="container ">
        <div className="row">
          <div id="left" className="col-12 col-md-12 col-lg-7">
            <h1 className="mt-5 blueFont">Keeping it transparent</h1>
            <h4 className="mb-5 font-32">What we don't cover</h4>
            <div className="row">
              <div className="col-12 col-md-6">
                <h5>Accidental Damage as a result of:</h5>
                <ul className="no-bullets">
                  <li>Modification of your cycle</li>
                  <li>Abandonment of your cycle for more than 24 hours</li>
                  <li>Damage due to normal wear and tear</li>
                </ul>
              </div>
              <div className="col-12 col-md-6">
                <h5>Liability:</h5>
                <ul className="no-bullets">
                  <li>
                    Liability arising from loss or damage to property which
                    belongs to you or is in your care
                  </li>
                  <li>
                    Fines, penalties, or any punitive or exemplary damages
                    awarded against you
                  </li>
                  <li>Use of the cycle outside of the territorial limits</li>
                  <li>Use for sport unless shown in your policy schedule</li>
                </ul>
              </div>
              <div className="col-12 col-md-6">
                <h5>Theft due to:</h5>
                <ul className="no-bullets">
                  <li>
                    Theft occurring during the first 21 days of a new policy
                  </li>
                  <li>
                    The cycle not being locked with an approved lock to a fixed
                    attachment point
                  </li>
                  <li>
                    Theft not resulting from assault, breaking and entering, or
                    breaking of an approved lock from a fixed attachment point
                  </li>
                  <li>
                    Theft if the cycle is loaned out or hired to another person
                  </li>
                </ul>
              </div>
              <div className="col-12 col-md-6">
                <h5>Personal accident:</h5>
                <ul className="no-bullets">
                  <li>Anyone under 16 or over 85</li>
                  <li>Your illegal acts</li>
                  <li>Using the cycle for hire, reward, or courier services</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div id="right" className="d-none d-lg-block col-lg-5">
          <div className="image-placeholder"></div>
        </div>
        <div className="row mt-5">
          <div className="col-12 col-md-6">
            <p>
              Please read our{" "}
              <HashLink to="/policy-information">
                <span className="link">insurance policy document</span>
              </HashLink>{" "}
              for the terms and conditions. These give full details of what’s
              covered, and any excesses and exclusions that may apply.
            </p>
          </div>
        </div>{" "}
      </section>
    </div>
  );
};

export default WhatWeDontCover;
