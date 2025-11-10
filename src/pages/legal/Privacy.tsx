import { useEffect } from "react";
import { seoTags } from "@/components/shared/SeoEdit";
import TopNavBar from "@/components/shared/TopNavBar";
import RegularBanner from "@/components/shared/RegularBanner";
import WhatOurCustomersSay from "@/components/shared/WhatOurCustomersSay";
import { Helmet } from "react-helmet-async";

const Privacy = () => {
  useEffect(() => {
    seoTags(
      "Privacy",
      "This privacy notice provides a clear explanation of when, why and how we collect and use your information which may relate to you.",
      "",
    );
    return () => {
      seoTags("velosure ", "", "");
    };
  }, []);
  return (
    <div className="container-fluid">
      <Helmet>
        <link rel="canonical" href="https://www.velosure.co.uk/Privacy" />
      </Helmet>
      <TopNavBar theme={"white"} />
      <RegularBanner
        headlineLine1={""}
        headlineLine2={"Privacy Notice"}
        subheadlineLine1={"Read our privacy notice"}
        subheadlineLine2={""}
        hasCTA={"false"}
        CTAText={"Get a quote"}
        requiresSpacer={true} // this is for the edge cases where title/sub title are one line each AND no CTA - Cog gets misplaced
        requiresExtraSpacer={true}
      />
      <div className="container-fluid greyBG oh pr">
        <div className="container officialDocs">
          <div className="row">
            <div className="col-12 mt-5 mb-5">
              <h3>Introduction</h3>
              <p>
                Velosure (referred to as "We”, “Our” or “Us") is committed to
                protecting the privacy and security of your personal
                information. We take care to protect the privacy of our clients
                that communicate (online or offline) with us, over the phone,
                via our website, helpdesk, and social media platforms.
              </p>
              <p>
                We have therefore developed this privacy policy to inform you of
                the data we collect, what we do with your information, what we
                do to keep it secure, as well as the rights and choices you have
                over your personal information.
              </p>
              <p>
                Throughout this document we refer to Data Protection Legislation
                which means the Data Protection Act 2018, UK-GDPR (United
                Kingdom General Data Protection Regulation), the Privacy and
                Electronic communications (EC Directive) Regulations 2003 and
                any legislation implemented in connection with the
                aforementioned legislation.
              </p>
              <p>
                This policy should be read together with our Cookie Policy that
                can be found on our website.
              </p>
              <h3>Data Controller</h3>
              <p>
                Velosure is a trading name of Lawshield UK Ltd who is the Data
                Controller for the personal information we process, unless
                otherwise stated. We are registered with the Information
                Commissioners Office (ICO) under registration number:- Z5685935.
              </p>
              <p>
                Lawshield UK Ltd are part of the Connexus Group of companies (a
                private limited company registered in England with the company
                number 03433312).
              </p>
              <p>You can contact us either by phone, email, or post.</p>
              <ul>
                <li>
                  By phone: <a href="tel:0800 083 3035">0800 083 3035</a>
                </li>
                <li>
                  By email:{" "}
                  <a href="mailto:enquiries@velosure.co.uk">
                    enquiries@velosure.co.uk
                  </a>
                </li>
                <li>By post: 1210 Centre Park Square, Warrington, WA1 1RU</li>
              </ul>
              <p>
                Our Data Protection team can be contacted at the above address
                or by emailing{" "}
                <a href="mailTo:dataprotection@lawshield.co.uk">
                  dataprotection@lawshield.co.uk
                </a>
              </p>
              <h2>How we collect your personal information</h2>
              <p>
                <strong>Prospective Insureds and Insured Persons</strong>
              </p>
              <p>
                We may collect information about you in different ways: -
                directly when you apply for a policy, information about you may
                also be provided to us by an insurance broker, a comparison
                website, Insurers, family member or any third party who may be
                applying for a policy which names or benefits you.
              </p>
              <p>
                We only collect personal information that we know we will
                genuinely use and in accordance with the Data Protection
                Legislation. The type of personal information that we will
                collect about you, from third party organisations or that you
                have voluntarily provided to us on this website or from
                enquiry/contact forms, or other contact methods includes:
              </p>
              <p>
                <strong>Identity Data </strong>includes first name, maiden name,
                last name, marital status, title, date of birth, gender, or
                other identification information, accident/incident details,
                cycle details.
              </p>
              <p>
                <strong>Contact Data </strong>includes address, email address or
                telephone numbers.
              </p>
              <p>
                <strong>Sensitive Personal Data </strong>includes Information
                relating to your health, or any criminal offence data or if you
                are a vulnerable customer. This information will only be
                collected to enable us to ensure any policy is suitable and
                assist you during the duration of your policy’s term to better
                meet your needs.
              </p>
              <p>
                <strong>Financial Data </strong>includes payment card details
                (processed in line with Payment Card Industry Data Security
                Standards), bank account details and basic credit information
              </p>
              <p>
                <strong>Technical Data </strong>includes internet protocol (IP)
                address, browser type and version, time zone setting and
                location, browser plug-in types and versions, operating system
                and platform and other technology on the devices you use to
                access the Website. Records of conversations. (Calls may be
                recorded for training and monitoring purpose)
              </p>
              <p>
                <strong>Profile Data </strong>includes information you provide
                us, services offered and used, your marketing preferences,
                feedback, and survey responses.
              </p>
              <p>
                <strong>Other Personal Data </strong>you voluntarily provide,
                which may include people appointed to act on your behalf and
                special category personal data, for example data which you
                provide about your health where this relates to your ability to
                meet your obligations under the agreement.
              </p>
              <p>
                <strong>Aggregated Data </strong>such as statistical or
                demographic data for any purpose. Aggregated Data may be derived
                from your personal data but is not considered personal data in
                law as this data does not directly or indirectly reveal your
                identity. For example, we may aggregate your Usage Data to
                calculate the percentage of users accessing a specific website
                feature.
              </p>
              <p>
                However, if we combine or connect Aggregated Data with your
                personal data so that it can directly or indirectly identify
                you, we treat the combined data as personal data which will be
                used in accordance with this privacy notice.
              </p>
              <p>
                <strong>Searches </strong>such as checking you are not listed on
                any financial sanctions list.
              </p>
              <p>
                <strong>CCTV </strong>if you visit our offices.
              </p>
              <p>
                <strong>Business Partners</strong>- if you are a business
                partner and visit our website, register for a newsletter, or
                attend one of our events, we may collect your business contact
                details.
              </p>
              <h3>How we use your information and Legal basis</h3>
              <p>
                We must have a legal basis (lawful reason) to process your
                personal data. In most cases, the legal basis will be one of the
                following.
              </p>
              <ul>
                <li>
                  Performance of a contract: the processing is necessary to
                  enter into a contract you have with us.
                </li>
                <li>
                  Legal obligation: the processing is necessary for us to comply
                  with the law. For example, Money Laundering Regulation and
                  associated laws.
                </li>
                <li>
                  Consent: where we have obtained appropriate consents to
                  collect or use your Personal Information for a particular
                  purpose.
                </li>
                <li>
                  Legitimate interests: the processing is necessary for our
                  legitimate interests or the legitimate interests of a third
                  party, unless there is a good reason to protect the
                  individual’s personal data which overrides those legitimate
                  interests. For example, to understand how customers use our
                  services so we can develop new services and improve the
                  services we currently provide.
                </li>
              </ul>
              <p>
                When we process your personal information for our legitimate
                interests, we make sure to consider and balance any potential
                impact on you and your rights under data protection laws.
              </p>
              <p>
                Where we need to collect personal information by law, or under
                the terms of a contract we have with you, and you choose not to
                provide it, we may not be able to perform the contract we have
                or are trying to enter into with you. In this case, we may have
                to cancel a service you have with us, but we will notify you if
                this is the case at the time.
              </p>
              <div>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th className="mr-5">Purpose/ Processing activity</th>
                      <th>
                        Lawful basis or bases for processing your personal data
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        To contact you, following your enquiry or to reply to
                        any questions.
                      </td>
                      <td>Performance of a contract</td>
                    </tr>

                    <tr>
                      <td>
                        Customer Service enquiries: reply to suggestions,
                        issues, or complaints you have contacted us about.
                      </td>
                      <td>Legitimate interest</td>
                    </tr>

                    <tr>
                      <td>
                        Helping us understand more about you as a client, the
                        services you consume, so we can serve you better and
                        advising you of any changes to our service.
                      </td>
                      <td>Legitimate interest</td>
                    </tr>

                    <tr>
                      <td>Taking payment from you or giving you a refund.</td>
                      <td>Performance of a contract</td>
                    </tr>

                    <tr>
                      <td>
                        To verify your identity for fraud prevention purposes.
                      </td>
                      <td>Legitimate interest Legal Obligation</td>
                    </tr>

                    <tr>
                      <td>
                        Marketing/Competitions/analytics from our website using
                        cookies.
                      </td>
                      <td>Consent</td>
                    </tr>

                    <tr>
                      <td>
                        For the purposes of arranging medical appointments with
                        medical experts and obtaining such medical reporting
                        either from the medical expert and your General
                        Practitioner following an accident.
                      </td>
                      <td>Performance of a contract Consent</td>
                    </tr>

                    <tr>
                      <td>
                        To review your financial situation to consider the
                        course of action to take to recover any outstanding
                        costs
                      </td>
                      <td>Legitimate interest</td>
                    </tr>

                    <tr>
                      <td>
                        To offer renewal terms and information prior to policy
                        expiring
                      </td>
                      <td>Legitimate interest</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h3>Who we might share your information with</h3>
              <p>
                We may share your personal data with other organisations in the
                following circumstances:
              </p>
              <ul>
                <li>
                  Our Group of Companies including
                  <ul>
                    <li>
                      <strong>Connexus Insurance Solutions</strong>- who may
                      handle any uninsured loss recovery claims
                    </li>
                    <li>
                      <strong>Connexus Vehicle Assessors</strong>- who may
                      assess the damage to your vehicle
                    </li>
                    <li>
                      <strong>Performance Car Hire</strong>- who may agree to
                      hire a vehicle to you
                    </li>
                    <li>
                      <strong>Connexus Car Hire</strong>- should we arrange a
                      hire vehicle from one of our carefully selected partners
                    </li>
                    <li>
                      <strong>KLS Law/Specters</strong>- should we require to
                      instruct solicitors to recover any losses for you
                      following an accident/loss
                    </li>
                    <li>
                      <strong>Connexus Medical Appointments</strong>- should you
                      require medical assistance
                    </li>
                  </ul>
                </li>
                <li>
                  If the law or a public authority says we must share the
                  personal data.
                </li>
                <li>
                  If we need to share personal data in order to establish,
                  exercise or defend our legal rights (this includes providing
                  personal data to others for the purposes of preventing fraud
                  and reducing credit risk).
                </li>
                <li>
                  Brokers, Insurers and Third-Party Administrators- who work
                  with us to administer policies and manage claims.{" "}
                </li>
                <li>
                  Assistance Providers- who can help provide assistance in the
                  event of a claim.
                </li>
                <li>
                  Solicitors/Legal Advisors who act to recover any uninsured
                  losses{" "}
                </li>
                <li>
                  Loss Adjusters and Claims Experts who help us assess and
                  manage claims,
                </li>
                <li>External Auditors who audit our business</li>
                <li>
                  Police/ Fraud Detection Agencies and Organisations working to
                  prevent fraud in financial services.
                </li>
                <li>
                  Service Providers- who help manage our IT and back-office
                  systems.
                </li>
                <li>
                  Finance Houses- where requested to do so, can facilitate
                  monthly finance payments.
                </li>
                <li>
                  In the event that we sell or buy any business or assets, in
                  which case we may disclose your personal data to the
                  prospective seller or buyer of such business or assets.
                </li>
                <li>
                  If the company or substantially all of its assets are acquired
                  by a third party, in which case personal data held by it about
                  its customers will be one of the transferred assets.
                </li>
                <li>
                  To protect the rights, or safety of our clients or others.
                </li>
              </ul>
              <p>
                If consent is necessary to facilitate this sharing, we will
                ensure it is obtained prior to processing.
              </p>
              <h3>How we keep you updated on our services</h3>
              <p>
                We will send you relevant news about our services in a number of
                ways including by email, but only if we have a legitimate
                interest to do so and we have completed a legitimate interest
                assessment for the processing activity.
              </p>
              <p>
                Newsletters and marketing communications might be sent from our
                own domain (www.velosure.co.uk){" "}
              </p>
              <p>
                Each email communication will have an option to object to the
                processing, if you wish to amend your marketing preferences, you
                can do so by calling us on the number displayed on our website
                and update your preferences.
              </p>
              <h3>Your rights over your information</h3>
              <p>
                Your personal information is protected under data protection law
                and you have several rights (see below) available to you
                depending on our reason for processing. Please contact our Data
                Protection team should you wish to exercise these rights. We may
                need to verify your identity before we can act on your request.
              </p>
              <p>You have the right to:</p>
              <ul>
                <li>
                  <strong>Request access </strong>to your personal data
                  (commonly known as a “data subject access request”). This
                  enables you to receive a copy of the personal data we hold
                  about you, subject to certain exceptions.
                </li>
                <li>
                  <strong>Request rectification </strong>of the personal data
                  that we hold about you. This enables you to have any
                  incomplete or inaccurate data we hold about you corrected,
                  though we may need to verify the accuracy of the new data you
                  provide to us. It is important that the personal data we hold
                  about you is accurate and current. Please keep us informed if
                  your personal data changes during your relationship with us.
                </li>
                <li>
                  <strong>Request erasure </strong>of your personal data. You
                  may ask us to delete information we hold about you in certain
                  circumstances, this is often referred to as the ‘right to be
                  forgotten’. This right is not absolute and only applies in
                  certain circumstances. It may not always be possible for us to
                  delete the information we hold about you, for example, if we
                  have an ongoing relationship with you or we are required to
                  retain information to comply with our legal obligations.
                </li>
                <li>
                  <strong>Object to processing </strong>
                  of your personal data when it is based upon our legitimate
                  interests or for the purpose of statistical analysis,
                  profiling, or direct marketing.
                </li>
                <li>
                  <strong>Request restriction </strong>of processing of your
                  personal data. This is not an absolute right and only applies
                  in certain circumstances. For example, where you contest the
                  accuracy of your personal information, it may be restricted
                  until the accuracy is verified, or where the processing is
                  unlawful but you object to it being deleted and request that
                  it is restricted instead.
                </li>
                <li>
                  <strong>Request data portability </strong>of your personal
                  data to you or to a third party. You have the right to
                  receive, move, copy, or transfer your personal information to
                  another controller.
                  <br />
                  We will provide to you, or a third party you have chosen, your
                  personal data in a structured, commonly used, machine-readable
                  format. Note that this right only applies to automated
                  information which you initially provided consent for us to use
                  or where we used the information to perform a contract with
                  you.
                </li>
                <li>
                  <strong>Withdraw consent </strong>for us to process your
                  personal data at any time when we are relying on your consent.
                  However, this will not affect the lawfulness of any processing
                  carried out before you withdraw your consent. If you withdraw
                  your consent, we may not be able to provide certain services
                  to you. We will advise you if this is the case at the time you
                  withdraw your consent.
                </li>
              </ul>
              <p>
                <strong>For more information about your privacy rights.</strong>{" "}
                The Information Commissioner’s Office (ICO) regulates data
                protection and privacy matters in the UK. They make a lot of
                information accessible to consumers on their website and they
                ensure that the registered details of all data controllers, such
                as us, are available publicly. You can access them here. Your
                data matters.{" "}
              </p>
              <p>
                You can make a complaint to the ICO at any time about the way we
                use your information. However, we hope that you would consider
                raising any issue or complaint you have with us first. Your
                satisfaction is extremely important to us, and we will always do
                our very best to solve any problems you may have.
              </p>
              <h3>How long we keep your information for</h3>
              <p>
                We retain a record of your personal information in order to
                provide you with a high quality and consistent service. We will
                always retain your personal information in accordance with the
                Data Protection Legislation and will never retain your
                information for longer than is necessary.
              </p>
              <p>
                Unless otherwise required by law, your data will be stored for a
                period of seven years after our contract with you expires or two
                years after our last contact with you or some other identifiable
                action, at which point it will be deleted.
              </p>

              <p>
                We may anonymise your personal data (so that it can no longer be
                associated with you) for research or statistical purposes in
                which case we may use this information indefinitely without
                further notice to you.
              </p>
              <p>
                If your information is transferred to a third party their Data
                Retention Policy may differ to ours.
              </p>
              <h3>Automated Processing</h3>
              <p>We do not automate any of our services.</p>
              <h3>Security</h3>
              <p>
                Data security is of great importance to Lawshield UK Ltd and, to
                protect your data, we have put in place suitable physical,
                electronic, and managerial procedures to safeguard and secure
                your collected data.
              </p>
              <p>
                We take security measures to protect your information including:
              </p>
              <ul>
                <li>
                  Limiting access to our buildings to those that we believe are
                  entitled to be there by use of passes.
                </li>
                <li>
                  Implementing access controls to our information technology;
                  and
                </li>
                <li>
                  We use appropriate procedures and technical security measures
                  (including strict encryption, anonymisation and archiving
                  techniques) to safeguard your information across all our
                  computer systems, website, and offices.
                </li>
                <li>
                  We ensure all our staff complete annual training on keeping
                  your data safe
                </li>
                <li>
                  We abide to maintain security of your personal data in line
                  with our ISO 27001 certification.
                </li>
              </ul>
              <h3>Transferring your data abroad</h3>
              <p>
                We do not transfer your personal data outside the UK and the
                European Economic Area (EEA) and, should we require to do so, we
                will ensure we have standard contractual clauses in place.
              </p>
              <h3>Keeping your information accurate</h3>
              <p>
                It is important that the personal data we hold about you is
                accurate and current. Please keep us informed of any changes
                during your relationship with us. This should include any change
                of address, telephone numbers and health matters that may affect
                the management of your account.
              </p>
              <h3>Complaints</h3>
              <p>
                If you have any questions about how we treat your personal data
                and protect your privacy, please email{" "}
                <a href="mailTo:dataprotection@lawshield.co.uk">
                  dataprotection@lawshield.co.uk
                </a>{" "}
                or call us on <a href="tel:0800 083 3035">0800 083 3035</a>.
              </p>
              <p>
                You also have the right to make a complaint to the Information
                Commissioner’s Office (ICO) make-a-complaint or call{" "}
                <a href="tel:0303 123 1113">0303 123 1113</a>.
              </p>
              <h3>Changes to this Privacy Policy</h3>
              <p>
                This version was last updated on 20<sup>th</sup> March 2024 and
                historic versions can be obtained by contacting us at{" "}
                <a href="mailto:compliance@lawshield.co.uk">
                  compliance@lawshield.co.uk
                </a>
                . If changes to this privacy notice have a major effect on what
                we do with your personal data or on you personally, we will give
                you enough notice to allow you to exercise your rights (for
                example, to object to the processing). We recommend that you
                check this policy regularly to keep up to date.
              </p>
            </div>
          </div>
        </div>
      </div>
      <WhatOurCustomersSay />
    </div>
  );
};

export default Privacy;
