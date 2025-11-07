const HowToMakeAClaim = () => {
  return (
    <div className="container-fluid greyBG oh">
      <div className="container ">
        <div className="row">
          <div className="col-12 col-sm-6 mt-5  mb-5 ">
            <h1>
              How to <span className="blueFont">make a claim?</span>
            </h1>
            <p>
              Here at Velosure Cycle Insurance, we aim to respond to your claim
              within 24 hours (excluding weekends) and to respond to all
              correspondence within 3 working days.
            </p>

            <p>
              When any event that may give rise to a claim occurs, we ask that
              you take the following steps as soon as possible:
            </p>
            <h4 className="blueFont">Step 1</h4>
            <p>
              Give immediate notice to the Police in respect of any theft,
              attempted theft, malicious damage or vandalism and obtain an
              incident number.
            </p>
            <h4 className="blueFont">Step 2</h4>
            <p>
              Check your policy booklet and your schedule to see if you are
              covered.
            </p>
            <h4 className="blueFont">Step 3</h4>
            <p>
              Contact us on{" "}
              <a href="tel:01925422773" className="blueFont">
                01925 422 773
              </a>{" "}
              or email{" "}
              <a href="mailto:claims@velosure.co.uk" className="blueFont">
                claims@velosure.co.uk
              </a>
              . You can also write to Claims, Velosure, 850 Ibis Court, Lakeside
              Drive, Centre Park, Warrington, WA1 1RL. Please do this as soon as
              reasonably possible and quote your policy number. We will register
              your claim and tell you what to do next.
            </p>
            <h4 className="blueFont">Step 4</h4>
            <p>
              Let us know if you receive any information or communication about
              the event or cause.
            </p>
          </div>
          <div className="col-12 col-sm-6 pr">
            <img
              className="claim-roadbike"
              src="/static/media/roadBike.b0babd393ac8359a8a59.png"
              alt="Roadbike"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToMakeAClaim;
