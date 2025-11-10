const IntroBlock = () => {
  return (
    <div className="container-fluid whyRefer lightblueBG  pr oh">
      <div className="container">
        <div className="row flex-column-reverse flex-md-row ">
          <div id="left" className="col-12 col-sm-6 f">
            <img
              src="/static/media/Gift Card.d6e8a4129fa10f6d17e8.png"
              alt="Gift card"
              className="giftCard d-block "
            />
          </div>
          <div id="right" className="col-12 col-sm-6 mt-md-5 mt-3 mb-md-5 ">
            <h3>
              <span className="blueFont">Why </span>refer someone to Velosure?
            </h3>
            <p className="pr-4 mt-3">
              Not only with your friend receive the benefits of a Velosure
              policy that you know and love, you will both receive a £10 Amazon
              gift voucher emailed straight to you!*
            </p>
            {/* <button className="btn btn-wider btn-green mt-3">Share</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroBlock;
