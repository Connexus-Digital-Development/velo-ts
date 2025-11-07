const ContactUsSuccess = () => {
  return (
    <div className="row mt-5 contactUsSuccess pr">
      <div className="col-12 col-sm-6">
        <img
          src="/static/media/thanks.3e70e255c34bfb18b32c.png"
          alt="Thankyou for contacting us"
          className="thanksImage d-none d-sm-block"
        />
      </div>

      <div className="col-12 col-sm-6 mt-lg-5">
        <h3>
          Thank<span className="blueFont"> you</span>!
        </h3>
        <p>
          Your enquiry has been successfully submitted. A member of the team
          will get back to you as soon as possible.
        </p>
      </div>
      <img
        src="/static/media/thanks.3e70e255c34bfb18b32c.png"
        alt="Thankyou for contacting us"
        className="thanksImage d-block d-sm-none"
      />
    </div>
  );
};

export default ContactUsSuccess;
