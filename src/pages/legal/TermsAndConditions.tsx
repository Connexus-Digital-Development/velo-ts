import { useEffect } from "react";
import { seoTags } from "@/components/shared/SeoEdit";
import TopNavBar from "@/components/shared/TopNavBar";
import RegularBanner from "@/components/shared/RegularBanner";
import WhatOurCustomersSay from "@/components/shared/WhatOurCustomersSay";
import { Helmet } from "react-helmet-async";

const TermsAndConditions = () => {
  useEffect(() => {
    seoTags(
      "Terms",
      "The Velosure Cycle Insurance Website General Terms of Use, which Cover all Areas Concerning Liability, Content, Data Protection And Privacy.",
      "",
    );
    return () => {
      seoTags("velosure ", "", "");
    };
  }, []);

  return (
    <div className="container-fluid officialDocs">
      <Helmet>
        <link rel="canonical" href="https://www.velosure.co.uk/Terms" />
      </Helmet>
      <TopNavBar theme={"white"} />
      <RegularBanner
        headlineLine1={""}
        headlineLine2={"Terms of Use Policy"}
        subheadlineLine1={
          "Please read this policy carefully before using this website"
        }
        subheadlineLine2={""}
        hasCTA={"false"}
        CTAText={"Get a quote"}
        requiresSpacer={true} // this is for the edge cases where title/sub title are one line each AND no CTA - Cog gets misplaced
        requiresExtraSpacer={true}
      />
      <div className="container-fluid greyBG oh pr">
        <div className="container">
          <h3 className="mt-5">What is this Terms of Use Policy?</h3>
          <p>
            The terms of Use Policy (“Terms”) tell you the important things for
            you to consider when using our website{" "}
            <a href="https://www.velosure.co.uk" target="_blank">
              www.velosure.co.uk
            </a>{" "}
            (our “Website”). Use of our site includes accessing, browsing or
            registering to use our site.
          </p>
          <h3>About us</h3>
          <p>
            <a
              href="https://www.velosure.co.uk"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              www.velosure.co.uk
            </a>{" "}
            is a website operated by Connexus Group (company number 10705026)
            and is registered as a company in England and Wales, with our
            registered address at 1210 Centre Park Square, Warrington, Cheshire,
            WA1 1RU ("Connexus", “we”, “us”, “our”).
          </p>

          <p>
            Velosure is a trading style of Lawshield UK Ltd. Lawshield UK Ltd is
            part of the Connexus Group. For more information about the Connexus
            Group, please visit{" "}
            <a
              href="https://www.connexus.co.uk"
              target="_blank"
              rel="noreferrer"
            >
              www.connexus.co.uk
            </a>
          </p>

          <p>
            Lawshield UK Ltd is authorised and regulated by the Financial
            Conduct Authority (“FCA”) under FCA reference number 306793. Details
            of Lawshield’s FCA authorisation can be found on the{" "}
            <a
              href="https://register.fca.org.uk/s/"
              target="_blank"
              rel="noreferrer"
            >
              FCA Register
            </a>
          </p>
          <p>
            If you have any queries about these Terms, or any questions about
            our relationship with you, please{" "}
            <a href="/contact" target="_blank" rel="noreferrer">
              contact us
            </a>
            .
          </p>
          <p>
            By using our Website, you confirm that you accept these Terms and
            that you agree to comply with them. If you do not agree to these
            Terms, you must not use our Website.
          </p>

          <p>
            We recommend that you download or print a copy of these Terms for
            future reference.
          </p>
          <p>
            Our Website is made available to you free of charge and is intended
            to be used for non-commercial purposes only. This means our Website
            is intended solely for your personal use or to be used by your
            business to seek a product for the purposes of that business.
          </p>
          <p>
            We may suspend, withdraw or restrict the availability of all or any
            part of our Website for business and operational reasons e.g. if we
            need to make updates or amendments to our Website. We will try to
            give you reasonable notice of any suspension or withdrawal.
          </p>
          <p>
            You are also responsible for ensuring that anyone who accesses our
            Website through your Internet connection, is aware of these Terms
            and complies with them.
          </p>

          <h3>Other terms that may apply to you</h3>

          <p>
            These Terms must also be read alongside the following additional
            terms and conditions, which also apply to your use of our Website:
          </p>
          <ul>
            <li>
              Our{" "}
              <a href="/Privacy" target="_blank" rel="noreferrer">
                {" "}
                Privacy Notice
              </a>{" "}
              which sets out the terms on which we process any personal data we
              collect from you, or that you provide to us. By using our Website,
              you consent to such processing and you warrant that all data
              provided by you is accurate.
            </li>
            <li>
              Our{" "}
              <a href="/Cookies" target="_blank" rel="noreferrer">
                Cookie Policy
              </a>{" "}
              which sets out information about the cookies on our Website and
              how to clear them from your computer.
            </li>
          </ul>

          <h3>Changes to these Terms and our Website</h3>

          <p>
            We amend these Terms from time to time. Every time you wish to use
            our Website, please check these Terms to ensure you understand the
            terms that apply at that time.
          </p>
          <p>
            We may update and change our Website from time to time to reflect
            changes to our products, the needs of our Website users and our
            business priorities.
          </p>
          <h3>Website access</h3>
          <p>
            Our Website is designed to be used by people residing in the United
            Kingdom only. We do not represent that content available on or
            through our Website is appropriate for use in other locations.
          </p>
          <h3>Our Trademarks</h3>
          <p>
            All names, logos, trademarks and images on our Website belong to
            Velosure or any applicable third party. Nothing on this Website
            shall grant you or any person a licence or right to use the names,
            logos, trademarks and images on our Website, without the prior
            written consent of Velosure or the applicable third party.
          </p>
          <h3>Intellectual property rights</h3>
          <p>
            We, or our licensors (including our insurer partners), are the
            owners of all intellectual property rights, including copyright
            laws, in the content of our Website, unless we have stated
            otherwise.
          </p>
          <p>
            You may print off one copy, and may download extracts, of any
            page(s) from our Website for your personal use.
          </p>
          <p>
            You must not modify the paper or digital copies of any materials you
            have printed off or downloaded in any way, and you must not use any
            illustrations, photographs, video or audio sequences or any graphics
            separately from any accompanying text from our Website.
          </p>
          <p>
            Our status (and that of any identified contributors) as the authors
            of content on our Website must always be acknowledged.
          </p>
          <p>
            If you print off, copy or download any part of our Website in breach
            of these Terms, your right to use our Website will cease immediately
            and you must, at our option, return or destroy any copies of the
            materials you have made.
          </p>

          <h3>Our Products and Services</h3>

          <p>
            Our Website provides information about our various insurance
            products and insurance broking services. Please note, the content of
            our Website, including any quotations provided by us, are not
            intended to be binding, and nothing on this Website is intended to
            be an offer by us to sell those products and services.
          </p>
          <p>
            When you make a request to purchase a product or service from
            Velosure, you are making an offer, which we then may accept or
            reject. If your offer is accepted by us, you will receive
            confirmation of that acceptance through our confirmation of purchase
            which may be by telephone, email or post.
          </p>
          <p>
            The information provided on our Website may not be a full
            description of the products and services we provide. You will find
            full descriptions of the services and products, including terms,
            conditions and exclusions, in the policy documents you receive via
            your online account or by post, when you purchase a product or
            service from us.
          </p>
          <p>
            You are solely responsible for ensuring that all information you
            provide is accurate and complete and that any products you purchase
            on our Website are suitable for your needs.
          </p>

          <h3>Complaints</h3>
          <p>
            We will aim to provide you with the best possible service. Should
            you at any time be unhappy with the service we provide to you, we
            would like you to tell us why. If you have any complaints or
            comments about our services, please let us know.{" "}
            <a href="/MakeAComplaint" target="_blank" rel="noreferrer">
              How to make a complaint
            </a>
          </p>

          <h3>Limitation of our liability</h3>
          <p>
            Nothing in these terms of use excludes or limits our liability for
            death or personal injury arising from our negligence, or our fraud
            or fraudulent misrepresentation, or any other liability that cannot
            be excluded or limited by English law.
          </p>

          <p>
            To the extent permitted by law, we exclude all conditions,
            warranties, representations or other terms which may apply to our
            site or any content on it, whether express or implied.
          </p>
          <p>
            We will not be liable to any user for any loss or damage, whether in
            contract, tort (including negligence), breach of statutory duty, or
            otherwise, even if foreseeable, arising under or in connection with:
          </p>

          <ul>
            <li>use of, or inability to use, our site; or</li>
            <li>use of or reliance on any content displayed on our site.</li>
          </ul>
          <p>
            If you are a business user, please note that in particular, we will
            not be liable for:
          </p>
          <ul>
            <li>loss of profits, sales, business, or revenue;</li>
            <li>business interruption;</li>
            <li>loss of anticipated savings;</li>
            <li>loss of business opportunity, goodwill or reputation; or</li>
            <li>any indirect or consequential loss or damage.</li>
          </ul>

          <p>
            If you are a consumer user, please note that we only provide our
            site for domestic and private use. You agree not to use our site for
            any commercial or business purposes, and we have no liability to you
            for any loss of profit, loss of business, business interruption, or
            loss of business opportunity.
          </p>
          <p>
            We will not be liable for any loss or damage caused by a virus,
            distributed denial-of-service attack, or other technologically
            harmful material that may infect your computer equipment, computer
            programs, data or other proprietary material due to your use of our
            site or to your downloading of any content on it, or on any website
            linked to it.
          </p>
          <p>
            We assume no responsibility for the content of websites linked on
            our site. Such links should not be interpreted as endorsement by us
            of those linked websites. We will not be liable for any loss or
            damage that may arise from your use of them.
          </p>
          <p>
            Different limitations and exclusions of liability will apply to
            liability if we agree to provide you with the finance to purchase a
            motor vehicle. Such limitations and exclusions will be set out in
            the agreement we provide you.
          </p>
          <h3>Viruses</h3>
          <p>
            We do not guarantee that our Website will be secure or free from
            bugs, errors or viruses.
          </p>
          <p>
            You are responsible for configuring your information technology,
            computer programmes and platform to access our Website. You should
            use your own virus protection software or service.
          </p>
          <p>
            You must not misuse our site by knowingly introducing viruses,
            trojans, worms, logic bombs or other material which is malicious or
            technologically harmful. You must not attempt to gain unauthorised
            access to our site, the server on which our site is stored, or any
            server, computer or database connected to our site. You must not
            attack our site via a denial-of-service attack or a distributed
            denial-of service attack. By breaching this provision, you would
            commit a criminal offence under the Computer Misuse Act 1990. We
            will report any such breach to the relevant law enforcement
            authorities, and we will co-operate with those authorities by
            disclosing your identity to them. In the event of such a breach,
            your right to use our site will cease immediately.
          </p>

          <h3>Waiver</h3>
          <p>
            In the event that you breach any of these Terms, and we decide not
            to take immediate action against you at that time, we may still
            later enforce our rights and remedies in respect of the breach by
            you.
          </p>

          <h3>Which country's laws apply to any disputes?</h3>
          <p>
            These Terms are governed by English law. You and we both agree that
            the courts of England and Wales will have exclusive jurisdiction of
            any disputes arising from these Terms.
          </p>
          <p>Thank you for visiting our site</p>
        </div>
      </div>
      <WhatOurCustomersSay />
    </div>
  );
};

export default TermsAndConditions;
