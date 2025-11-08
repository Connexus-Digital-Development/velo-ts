import { useSafeContext } from "@/context/journeyStore/useSafeContext";
import currency from "currency.js";

const OneOffPayment = () => {
  const [gState] = useSafeContext({
    componentName: "OneOffPayment",
  });

  console.log("Annual Gross Premium:", gState.annualGrossPremium);
  console.log("Core Gross Premium:", gState.coreQuote.annualGrossPremium);
  console.log(
    "Performance Gross Premium:",
    gState.performanceQuote.annualGrossPremium,
  );

  return (
    // <section className="container container_narrow ">
    //   <div className="content_section mt-3">
    //     <h2 className="blueFont mb-4">Payment</h2>
    <div className="blueBox">
      <div className="row">
        <div className="col-12 col-md-6">
          <h2>One-off payment</h2>
          <h1 className="mt-5 ">
            £
            {gState !== null
              ? currency(gState.annualGrossPremium, {
                  symbol: "",
                  separator: ",",
                }).format()
              : "-"}
          </h1>
        </div>
        <div className="col-12 col-md-6">
          <div className="row">
            <div className="col-6">
              <p className="float-start lufga-light">Premium before tax: </p>
            </div>
            <div className="col-6">
              <p className="float-end lufga-regular">
                <span>
                  £
                  {gState !== null
                    ? currency(gState.netPremium, {
                        symbol: "",
                        separator: ",",
                      }).format()
                    : "-"}
                </span>
              </p>
            </div>
            <hr />
          </div>
          <div className="row">
            <div className="col-6">
              <p className="float-start lufga-light">Insurance premium tax: </p>
            </div>
            <div className="col-6">
              <p className="float-end lufga-regular">
                <span>
                  {" "}
                  £
                  {gState !== null
                    ? currency(gState.ipt, {
                        symbol: "",
                        separator: ",",
                      }).format()
                    : "-"}
                </span>{" "}
              </p>
            </div>
            <hr />
            <p className="float-center">Payable by credit/debit card</p>
          </div>
        </div>
      </div>
    </div>
    //     </div>

    // </section>
  );
};

export default OneOffPayment;
