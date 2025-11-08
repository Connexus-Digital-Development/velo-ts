import VelosureLogo from "@/assets/svgs/velosure-logo.svg?url";
import VelosureLogoDesktop from "@/assets/svgs/velosure-logo-desktop.svg?url";

import { FooterSocials } from "./FooterSocials";
import { FooterNav } from "./FooterNav";
// import { FooterSocials } from "./FooterSocials";

export function FooterSection1() {
  return (
    <section id="section1">
      <div className="container container_medium">
        <div className="row">
          <div className="col-6 d-block d-lg-none">
            <a
              className="d-inline-flex align-items-center mb-2 link-dark text-decoration-none velo-log"
              href="/"
              aria-label="Velosure Icon"
            >
              <img src={VelosureLogo} alt="Velosure Logo" />
            </a>
          </div>

          <div className="col-6 d-block d-lg-none">
            <FooterSocials isSmall={true} />
          </div>

          <div className="col-lg-3 mb-3">
            <a
              className="d-inline-flex align-items-center mb-2 link-dark text-decoration-none d-lg-block d-none"
              href="/"
              aria-label="Velosure Icon"
            >
              <img src={VelosureLogoDesktop} alt="Velosure Logo" />
            </a>

            <FooterSocials isSmall={false} />
          </div>

          <FooterNav />
        </div>
      </div>
    </section>
  );
}
