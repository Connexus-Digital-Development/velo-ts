import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

const JourneyCheck = () => {
  const [isChecked, setIsChecked] = useState(false);
  const { search } = useLocation();
  const navigate = useNavigate();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleContinue = () => {
    if (isChecked) {
      handleNextPage(); //   navigate to step one
    }

    function handleNextPage() {
      navigate(`/stepOne${search}`);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="journey-check py-3">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <div
            className="card shadow-sm p-4 p-md-5 mb-4"
            style={{ border: "unset" }}
          >
            <Form>
              <Form.Group className="mb-4">
                <div className="d-flex align-items-start">
                  <Form.Check
                    type="checkbox"
                    id="confirmationCheck"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="custom-checkbox"
                    label=""
                    style={{ marginLeft: "30px", paddingTop: "20px" }}
                  />
                  <p style={{ marginLeft: "15px", paddingTop: "25px" }}>
                    I confirm that I have read and understood the important
                    information above.
                  </p>
                </div>
              </Form.Group>

              <div className="d-flex justify-content-right mb-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="blueButton px-5"
                  disabled={!isChecked}
                  onClick={handleContinue}
                >
                  Continue
                </Button>
              </div>

              <div className="text-left">
                <p className="text-muted">
                  <small>
                    Should you not agree with the above statement, please
                    contact Lawshield UK Ltd to discuss further options{" "}
                    <Link to="/contact" className="blueFont">
                      contact us
                    </Link>
                    .
                  </small>
                </p>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default JourneyCheck;
