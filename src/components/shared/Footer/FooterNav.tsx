import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export function FooterNav() {
  return (
    <nav>
      <div className="col-6 col-lg-2 offset-lg-1 mb-3">
        <h5>Our Cover</h5>
        <ul className="list-unstyled">
          <li className="mb-2">
            <Link to="/single-bike-insurance">Single bike cover</Link>
          </li>
          <li className="mb-2">
            <Link to="/multi-bike-insurance">Multi bike cover</Link>
          </li>
          <li className="mb-2">
            <Link to="/electric-bicycle-insurance">E-bike cover</Link>
          </li>

          {
            <li className="mb-2">
              <Link to="/bike-insurance-comparison-chart">
                Compare our cover
              </Link>
            </li>
          }
          <li className="mb-2">
            <Link to="/OurCoverLevels">Our cover levels</Link>
          </li>
          <li className="mb-2">
            <Link to="/bicycle-travel-insurance">Additional travel cover</Link>
          </li>
        </ul>
      </div>

      <div className="col-6 col-lg-2 mb-3">
        <h5>Bikes we cover</h5>
        {/* </HashLink> */}
        <ul className="list-unstyled">
          {" "}
          {/*note that the 'to' fields here are not pointing to the actual section, in fact, the one above for scroll performance */}
          <li className="mb-2">
            <HashLink
              scroll={(el) =>
                el.scrollIntoView({ behavior: "smooth", block: "center" })
              }
              to="/types-we-cover#electric"
            >
              E-bike
            </HashLink>
          </li>
          <li className="mb-2">
            <HashLink
              scroll={(el) =>
                el.scrollIntoView({ behavior: "smooth", block: "center" })
              }
              to="/types-we-cover#road"
            >
              Road bike
            </HashLink>
          </li>
          <li className="mb-2">
            <HashLink
              scroll={(el) =>
                el.scrollIntoView({ behavior: "smooth", block: "center" })
              }
              to="/types-we-cover#mountain"
            >
              Mountain bike
            </HashLink>
          </li>
          <li className="mb-2">
            <HashLink
              scroll={(el) =>
                el.scrollIntoView({ behavior: "smooth", block: "center" })
              }
              to="/types-we-cover#urban"
            >
              Urban bike
            </HashLink>
          </li>
          <li className="mb-2">
            <HashLink
              scroll={(el) =>
                el.scrollIntoView({ behavior: "smooth", block: "center" })
              }
              to="/types-we-cover#sport"
            >
              Sports bike
            </HashLink>
          </li>
          <li className="mb-2">
            <HashLink
              scroll={(el) =>
                el.scrollIntoView({ behavior: "smooth", block: "center" })
              }
              to="/types-we-cover#leisure"
            >
              Leisure bike
            </HashLink>
          </li>
        </ul>
      </div>

      <div className="col-6 col-lg-2 mb-3">
        <h5>Information</h5>
        <ul className="list-unstyled">
          <li className="mb-2">
            <Link to="/policy-information">Policy information</Link>
          </li>
          <li className="mb-2">
            <Link to="/security-requirements">Security requirements</Link>
          </li>
          <li className="mb-2">
            <Link to="/bicycle-insurance-faqs">FAQ</Link>
          </li>

          <li className="mb-2">
            <Link to="/Reviews">Reviews</Link>
          </li>

          <li className="mb-2">
            <Link to="/Pitstop">Blog</Link>
          </li>
          <li className="mb-2">
            <Link to="/accessories-we-cover">Accessories we cover</Link>
          </li>
        </ul>
      </div>

      <div className="col-6 col-lg-2 mb-3">
        <h5>Velosure</h5>
        <ul className="list-unstyled">
          <li className="mb-2">
            <Link to="/contact">Contact us</Link>
          </li>
          <li className="mb-2">
            <Link to="/about">About us</Link>
          </li>
          <li className="mb-2">
            <Link to="/SubmitAClaim">Submit a claim</Link>
          </li>
          <li className="mb-2">
            <Link to="/MakeAComplaint">Make a complaint</Link>
          </li>
          <li className="mb-2">
            <Link to="/ReferAFriend">Refer a friend</Link>
          </li>
          <li className="mb-2">
            <Link to="/affiliate-scheme">Affiliate scheme</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
