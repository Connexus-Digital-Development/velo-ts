interface DDGuaranteeProps {
  readyToRead?: boolean;
}

import ddGuaranteeIcon from "@/assets/svgs/dd-guarantee-icon.svg?url";

const DDGuarantee: React.FC<DDGuaranteeProps> = () => {
  return (
    <section className="container container_narrow ">
      <div className="content_section mt-3">
        <div className="row">
          <div className="col-12" id="left">
            <div className="row">
              <div className="col-8 col-md-9">
                <h2
                  className={`mb-4 greyFont"
                  }`}
                >
                  <span className="blueFont"> The Direct Debit Guarantee</span>
                </h2>
              </div>
              <div className="col-4 col-md-3 oh">
                <img src={ddGuaranteeIcon} alt="Direct Debit Guarantee" />
              </div>
            </div>

            <ul
              className={`mb-4 lufga-light DD greyFont "
              }`}
            >
              <li>
                This Guarantee is offered by all banks or building societies
                that accept instructions to pay Direct Debits.
              </li>
              <li>
                If there are any changes to the amount, date or frequency of
                your Direct Debit Close Brothers Ltd t/a Close Brothers Premium
                Finance will notify you 2 working days in advance of your
                account being debited or as otherwise agreed. If you request
                Close Brothers Ltd t/a Close Brothers Premium Finance to collect
                a payment, confirmation of the amount and date will be given to
                you at the time of the request.
              </li>
              <li>
                If an error is made in the payment of your Direct Debit, by
                Close Brothers Ltd t/a Close Brothers Premium Finance or your
                bank or building society, you are entitled to a full and
                immediate refund of the amount paid from your bank or building
                society.
              </li>
              <li>
                If you receive a refund you are not entitled to, you must pay it
                back when Close Brothers Ltd t/a Close Brothers Premium Finance
                asks you to.
              </li>
              <li>
                You can cancel a Direct Debit at any time by simply contacting
                your bank or building society. Written confirmation may be
                required. Please also notify us.
              </li>
            </ul>
          </div>
          {/* <div className="col-2 col-sm-2" id="right"></div> */}
        </div>
      </div>
    </section>
  );
};

export default DDGuarantee;
