const ComplaintDetails = () => {
  return (
    <div className="container-fluid lightblueBG">
      <div className="container mt-5 mb-3">
        <div className="row">
          <div className="col-12">
            <p>
              If you remain dissatisfied after Velosure has considered your
              complaint, you may have the right to refer your complaint to the
              Financial Ombudsman Service.
            </p>
            <p>
              The Financial Ombudsman Service is an independent service in the
              UK for settling disputes between consumers and businesses
              providing financial services. You can find more information on the
              Financial Ombudsman Service at{" "}
              <a
                className="blueFont"
                target="_blank"
                rel="noreferrer"
                href="https://www.financial-ombudsman.org.uk"
              >
                www.financial-ombudsman.org.uk
              </a>
              .
            </p>
            {/* <p>
              If you have purchased your policy online you can also make a
              complaint via the EU's online dispute resolution (ODR) platform.
              The website for the ODR platform is:{" "}
              <a className="blueFont" target="_blank" href="http://ec.europa.eu/odr" rel="noreferrer">
                http://ec.europa.eu/odr
              </a>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;
