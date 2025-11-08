import Penny from "@/assets/images/PennyRepairsBikeExtendedShaft.png";

const CustomerLoyalty = () => {
  return (
    <div className="container-fluid whiteBG  pr oh customerLoyalityBlock">
      <div className="container mt-5 mb-5">
        <div className="row ">
          <div id="left" className="col-12 col-sm-6">
            <h3>
              Customer
              <span className="blueFont"> loyalty </span>
            </h3>
            <p className="mt-3 align-start">
              Recommending a quality insurance product or accident claims
              service to your customers helps to increase customer loyalty and
              retention.
            </p>
            <p>
              At Velosure Cycle Insurance, unlike other insurers, we allow
              customers to select a repairer of their choice in the event of a
              claim. This means that by recommending us to your own customers,
              you can ensure that any request for replacement hire or repair of
              cycles, clothing or accessories, comes directly back to you.
            </p>

            <div id="right" className="col-12 col-sm-6 pr">
              <img className="loyalty" src={Penny} alt="Bikes repair" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLoyalty;
