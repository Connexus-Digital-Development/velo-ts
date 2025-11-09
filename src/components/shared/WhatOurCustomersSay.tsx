import CogIcon from '@/assets/svgs/what-our-customers-say-cog-icon.svg?url'

const WhatOurCustomersSay = () => {
  return (
    <div className="container-fluid whiteBG oh pr">
      <div className="container">
        <div className="row">
          <div className=" col-sm-6 col-12">
            {" "}
            <h3 className="text-left pt-4 pb-4">
              What<span className="blueFont"> our customers say </span>
              about Velosure.
            </h3>
          </div>

          <div className="col-12 col-sm-12 mb-5 widget">
            <script
              src="https://apps.elfsight.com/p/platform.js"
              defer
            ></script>
            <div className="elfsight-app-c8159aed-abfc-45f6-8056-4f423889e394"></div>
          </div>
        </div>
      </div>

      <img src={CogIcon} alt="Decorative cog icon" className="whatOurCustomerssayCog" />
    </div>
  );
};

export default WhatOurCustomersSay;
