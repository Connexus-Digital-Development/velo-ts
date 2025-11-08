import LRQA from "@/assets/images/LRQA.png";

export function FooterSection2() {
  return (
    <section id="section2">
      <div className="container  container_medium">
        <div className="row">
          <div className="col-3 col-xl-2  col-sm-3">
            <a href="/Terms" className="footersection2link">
              <h5>Terms of Use</h5>
            </a>
          </div>
          <div className="col-3 col-xl-2 col-sm-3">
            <a href="/Privacy" className="footersection2link">
              <h5>Privacy Notice</h5>
            </a>
          </div>
          <div className="col-3 col-xl-2 col-sm-3">
            <a href="/Cookies" className="footersection2link">
              <h5>Cookie Policy</h5>
            </a>
          </div>
          <div className="col-3 col-xl-2 col-sm-3">
            <a href="/VulnerabilityPolicy" className="footersection2link">
              <h5>Vulnerability</h5>
            </a>
          </div>
          <div className="col-12 d-none d-sm-none pt-3">
            <img className="Lrqa" src={LRQA} alt="LRQA" />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6">
            <p>
              Authorised and Regulated by the Financial Conduct Authority.
              Velosure is a trading style of Lawshield UK Ltd (No. 3360532).
              Registered in England & Wales at 850 Ibis Court, Lakeside Drive,
              Centre Park, Warrington, Cheshire, WA1 1RL.
            </p>

            <p>© {new Date().getFullYear()} Lawshield UK Limited.</p>
          </div>
          <div className="col-8 offset-sm-4 col-sm-2 d-block d-sm-block">
            <img className="Lrqa" src={LRQA} alt="LRQA" />
          </div>
        </div>
      </div>
    </section>
  );
}
