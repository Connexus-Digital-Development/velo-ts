import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const ImportantInformation = () => {
  return (
    <div className="important-information py-4">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <div className="card shadow-sm p-4 p-md-5 mb-4" style={{border:"unset"}}>
            <p>
              Please ensure you take the time to read and understand the
              important information below. If you have any questions or would
              like further clarification, you can of course{" "}
              <Link to="/contact" className="blueFont">
                contact us
              </Link>
              .
            </p>
            <p>It is important that the information you provide throughout the 
              quote and duration of the policy is accurate. Failure to disclose 
              correct and complete information may result in increased premiums, 
              refusal of a claim or not being fully paid, or your policy being 
              cancelled.
            </p>
            <h2 className="blueFont mb-4">Data checks and credit searches</h2>
            <p>
              {" "}
              Information may be obtained from third parties at quotation and
              renewal, and in certain circumstances where policy amendments are
              requested. This is to ensure our insurer and credit provider has
              the necessary information to assess your insurance risk, verify
              your identity, to help prevent fraud and to provide you with their
              best premium and payment options. This information includes a
              Quotation Search from a credit referencing agency. The search will
              appear on your credit report as a quotation related search (rather
              than a credit application) and will be visible to other credit
              providers.
            </p>
            <h2 className="blueFont mb-4">Data Protection</h2>

            <p>
              Velosure Insurance is sold and administered by Lawshield UK Ltd,
              please refer to their <Link to="/privacy" className="blueFont">
              privacy policy
              </Link> for information regarding how
              your personal data will be used by them.{" "}
            </p>
            <p>
              Velosure Insurance is underwritten by Chubb European Group SE.
              Chubb will process your personal data for their own separate
              purposes, please refer to their {" "}
                <a href="https://www.chubb.com/uk-en/footer/privacy-policy.html" className="blueFont" target="_blank" rel="noopener noreferrer">privacy policy
              </a> for information
              regarding how your personal data will be used by them.
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ImportantInformation;
