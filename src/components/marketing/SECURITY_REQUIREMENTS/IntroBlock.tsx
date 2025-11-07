const IntroBlock = () => {
  return (
    <div className="container mt-2 mb-4">
      <div className="row">
        <div className="col-12 col-sm-5">
          <h3 className="text-left pt-4 pb-4">
            Sold secure
            <span className="blueFont">
              <br />
              approved locks
            </span>
          </h3>
          <p className="mr-5">
            When purchasing your lock, look for the{" "}
            <a href="https://soldsecure.com">Sold Secure</a> logo to make sure
            you've got the right one. This logo will also identify the lock's
            security rating as Bronze, Silver or Gold. If you already have a
            bike lock, you can simply check its security rating on the Sold
            Secure website.
          </p>
          <p className="mr-5">
            Take a look at the different value ranges below to find out which
            security rating you need. This information is also given to you when
            obtaining a quote from us.
          </p>
        </div>
        <div className="col-12 offset-sm-1 col-sm-6">
          <div className="">
            <div className="d-flex locksRowHeight">
              <img
                src="/static/media/gold.5151535c76f684d8256e.png"
                alt="bronze lock"
                className="locks"
              />
              <div className=" pl-1">
                <div className="lock-labels">
                  <h4>Gold rated lock</h4>
                  <p className="blueFont">Insured value over £2500</p>
                </div>
              </div>
            </div>
            <div className="d-flex locksRowHeight">
              <img
                src="/static/media/silver.d9369dba4442314092c5.png"
                alt="silver lock"
                className="locks"
              />
              <div className=" pl-1">
                <div className="lock-labels">
                  <h4>Silver rated lock</h4>
                  <p className="blueFont">Insured value over £1500</p>
                </div>
              </div>
            </div>
            <div className="d-flex locksRowHeight">
              <img
                src="/static/media/bronze.1770ccbcb252eba35c6f.png"
                alt="gold lock"
                className="locks"
              />
              <div className=" pl-1">
                <div className="lock-labels">
                  <h4>Bronze rated lock</h4>
                  <p className="blueFont">Insured value over £500</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroBlock;
