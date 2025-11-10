import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import CookieTable from "@/components/shared/CookieTable";
import { seoTags } from "@/components/shared/SeoEdit";
import TopNavBar from "@/components/shared/TopNavBar";
import RegularBanner from "@/components/shared/RegularBanner";
import WhatOurCustomersSay from "@/components/shared/WhatOurCustomersSay";

const CookiePolicy = () => {
  useEffect(() => {
    seoTags(
      "Cookie Policy",
      "The Velosure Cycle Insurance Website General Terms of Use, which Cover all Areas Concerning Liability, Content, Data Protection And Privacy.",
      "",
    );
    return () => {
      seoTags("velosure ", "", "");
    };
  }, []);
  return (
    <div className="container-fluid">
      <Helmet>
        <link rel="canonical" href="https://www.velosure.co.uk/Cookies" />
      </Helmet>
      <TopNavBar theme={"white"} />
      <RegularBanner
        headlineLine1={""}
        headlineLine2={"Cookie Policy"}
        subheadlineLine1={"Read our cookie policy"}
        subheadlineLine2={""}
        hasCTA={"false"}
        CTAText={"Get a quote"}
        requiresSpacer={true} // this is for the edge cases where title/sub title are one line each AND no CTA - Cog gets misplaced
        requiresExtraSpacer={true}
      />
      <div className="container-fluid greyBG oh pr">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="text-left pt-4 pb-4">
                <span className="blueFont">Cookie</span> Policy
              </h3>

              <h4>What are cookies?</h4>
              <p>
                We use the term cookie to describe cookies and similar
                technologies such as tags and pixels. Cookies are small data
                files that websites place on your computer, laptop or mobile
                device.
              </p>

              <h4>Our use of cookies</h4>
              <p>We use Cookies for the following purposes:</p>
              <ul>
                <li>
                  To improve the performance of our websites by understanding
                  which parts work well, and which don't.
                </li>
                <li>
                  To deliver relevant online advertising to you both on our
                  websites and elsewhere. This is sometimes done by combining
                  data that we already have about you with the data collected
                  through Cookies. These Cookies are placed by us and selected
                  third parties and enable adverts to be presented to you on our
                  and third-party websites.
                </li>
                <li>
                  To measure how effective our online advertising and marketing
                  communications are.
                </li>
                <li>
                  To enable us to collect information about how you and other
                  people use our websites.
                </li>
                <li>
                  To improve your experience on our websites, for example we use
                  Cookies to remember the products you’ve put in your basket and
                  to personalise your experience.
                </li>
              </ul>

              <h4>What cookies do we use?</h4>
              <p>We use the following Cookies:</p>
              <ul>
                <li>
                  <strong>Strictly Necessary Cookies</strong>.&nbsp;These are
                  Cookies that are required for the operation of our website.
                  They are necessary for the safety, security and integrity of
                  the site. For example, they help support the structure of the
                  pages that are displayed to you, help to improve navigation
                  and allow you to return to pages you have previously visited.
                  This type of Cookie only lasts for the duration of the time
                  you are visiting the website. When you leave the website, they
                  are deleted automatically.
                </li>
                <li>
                  <strong>Performance Cookies or Analytical Cookies</strong>
                  .&nbsp;They allow us to recognise and count the number of
                  visitors and to see how visitors move around our website when
                  they are using it. This helps us to improve the way our
                  website works, for example, by ensuring that users are finding
                  what they are looking for easily. The data is aggregated and
                  anonymised, which means we cannot identify you as an
                  individual.
                </li>
                <li>
                  <strong>Advertising &amp; Targeting Cookies</strong>
                  .&nbsp;These Cookies will collect information about your
                  browsing habits and allow us to show you adverts while you are
                  browsing our site and other sites on the internet. They are
                  set by us or by carefully selected third parties. They help us
                  to understand the performance of our marketing activities and
                  improve the relevance of the adverts that you see.
                </li>
              </ul>

              <h4>Blocking or restricting cookies</h4>
              <p>
                You can stop Cookies being used on your device by activating the
                setting on your browser that allows you to block the deployment
                of all or some Cookies. Please visit&nbsp;
                <a
                  href="http://www.allaboutcookies.org/"
                  target="_blank"
                  rel="noreferrer"
                >
                  www.allaboutcookies.org
                </a>
                &nbsp;to find out how. Please note, if you use your browser
                settings to block Cookies you may not be able to access all or
                parts of our site.
              </p>

              <h4>Contact us regarding cookies</h4>
              <p>
                If you have a question about this policy, please contact us by
                one of the following means:
              </p>
              <p>If your enquiry relates to Velosure Cycle Insurance:</p>
              <p>
                By email:&nbsp;
                <a href="mailto:compliance@connexus.co.uk">
                  compliance@connexus.co.uk
                </a>
              </p>
              <p>
                By post: Compliance Team, Connexus Group, 1210 Centre Park
                Square, Warrington, Cheshire, WA1 1RU
              </p>
              <p>
                You also have the right to lodge a complaint with the UK
                regulator, the Information Commissioner. Go to{" "}
                <a
                  href="https://ico.org.uk/make-a-complaint/"
                  target="_blank"
                  rel="noreferrer"
                >
                  ICO- Make a complaint
                </a>{" "}
                to find out more.
              </p>

              <h4>Cookie policy change</h4>
              <p>
                This cookie policy was most recently updated in January 2020. If
                we make changes to it, then we will take appropriate steps to
                bring those changes to your attention.
              </p>

              <h4>How long we keep your data</h4>
              <p>
                Your data will not be retained for longer than is necessary, and
                will be managed in accordance with our data retention policy. In
                most cases, the retention period will be for a period of six (6)
                years following the expiry of the insurance contract, or closure
                of claim, unless we are required to retain the data for a longer
                period due to business, legal or regulatory requirements.
              </p>

              <h3>Opting out of Marketing</h3>
              <p>
                We want to make it easy for you to make your own choices as to
                what information you receive from us and how we contact you.
                Therefore, whether you are an existing, former or prospective
                client, we will always remind you of your right to opt out of
                future marketing related communications each time we send such
                correspondence to you. You can elect not to receive any
                marketing related communications from us at all, or request that
                you only receive certain types of communication.
              </p>

              <h3>Your rights</h3>
              <ul>
                <li>Right to be informed</li>
                <li>Right of access</li>
                <li>Right to rectification</li>
                <li>Right to erase</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object</li>
                <li>
                  Rights in relation to automated decision making and profiling
                </li>
              </ul>
              <p>
                Upon receipt of such request, we will, after confirming
                identity, provide all relevant data we may hold to you in the
                most practical format unless otherwise stipulated and reasonably
                possible within 30 days. We will not charge you to do so,
                however we may charge you for duplicate copies should this be
                part of your request.
              </p>
              <p>
                For any questions or concerns regarding this Privacy Notice or
                to make a Subject Access Request, then please email{" "}
                <a
                  rel="noopener noreferrer"
                  href="mailto:dataprotection@lawshield.co.uk"
                  target="_blank"
                  title="Email our data protection team"
                >
                  dataprotection@lawshield.co.uk.
                </a>
              </p>
              <p>
                If you feel we have not dealt with your request satisfactorily
                you do have the ultimate recourse to refer your complaint to the
                ICO (Information Commissioner Officer). You can find out more
                details by visiting{" "}
                <a
                  rel="noopener noreferrer"
                  href="https://ico.org.uk"
                  target="_blank"
                  title="Information Commissioner Officer"
                >
                  https://ico.org.uk.
                </a>
              </p>
              <p>Updated: June 2020.</p>
            </div>
          </div>
        </div>
      </div>

      <CookieTable />

      <WhatOurCustomersSay />
    </div>
  );
};

export default CookiePolicy;
