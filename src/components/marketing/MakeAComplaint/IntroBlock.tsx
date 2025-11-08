const IntroBlock = () => {
  return (
    <div className="container-fluid whiteBG pr oh ">
      <div className="container mb-3 mt-2">
        <div className="row">
          <div className="col-12 col-sm-8">
            <h3 className="text-left pt-4 pb-4">
              <span className="blueFont">We're sorry</span> to hear that you're
              not completely satisfied
            </h3>
            <p>
              In the event that you are dissatisfied and wish to make a
              complaint, you can do so at any time by referring the matter to
              Complaints at Velosure Cycle Insurance.
            </p>
          </div>

          <div className="col-12 col-sm-6">
            <p>
              The address of the complaints team at Velosure is:
              <address className="blueFont mt-3">
                Complaints Team
                <br />
                Velosure Cycle Insurance <br />
                850 Ibis Court <br />
                Centre Park <br />
                Warrington <br />
                WA1 1RL <br />
              </address>
              <address className="mt-3">
                Tel:{" "}
                <a href="tel:08007313942" className="blueFont">
                  0800 731 3942
                </a>
                <br />
                Fax:{" "}
                <a href="tel:03330433798" className="blueFont">
                  0333 043 3798
                </a>
                <br />
                Email:{" "}
                <a
                  href="mailto:customerrelations@lawshield-uk.com"
                  className="blueFont"
                >
                  customerrelations@lawshield-uk.com
                </a>
                <br />
              </address>
            </p>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default IntroBlock;
