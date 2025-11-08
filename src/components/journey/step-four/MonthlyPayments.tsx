import { useSafeContext } from "@/context/journeyStore/useSafeContext";
import currency from "currency.js";

const MonthlyPayments = () => {
  const [gState] = useSafeContext({
    componentName: "MonthlyPayments",
  });

  return (
    <div className="blueBox">
      <div className="row">
        <div className="col-12 col-md-6">
          <h2>Monthly payments</h2>
          <h1 className="mt-5 ">
            {" "}
            £
            {gState !== null
              ? currency(gState.instalmentsSubsequentPayments, {
                  symbol: "",
                  separator: ",",
                }).format()
              : "-"}
          </h1>
        </div>
        <div className="col-12 col-md-6">
          <div className="row">
            <div className="col-6">
              <p className="float-start lufga-light">Premium quoted </p>
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

            <div className="col-6">
              <p className="float-start  lufga-light">
                Fixed interest rate p/a:{" "}
              </p>
            </div>
            <div className="col-6">
              <p className="float-end lufga-regular">
                <span>
                  {gState !== null
                    ? currency(gState.instalmentsInterestPc, {
                        symbol: "",
                        separator: ",",
                      }).format() + "%"
                    : "-"}
                </span>
              </p>
            </div>
            <hr />

            <div className="col-6">
              <p className="float-start  lufga-light">(Representative APR): </p>
            </div>
            <div className="col-6">
              <p className="float-end lufga-regular">
                <span>
                  {gState !== null
                    ? currency(gState.instalmentsApr, {
                        symbol: "",
                        separator: ",",
                      }).format() + "%"
                    : "-"}
                </span>
              </p>
            </div>
            <hr />

            <div className="col-6">
              <p className="float-start  lufga-light">Deposit of: </p>
            </div>
            <div className="col-6">
              <p className="float-end lufga-regular">
                <span>
                  £
                  {gState !== null
                    ? currency(gState.deposit, {
                        symbol: "",
                        separator: ",",
                      }).format()
                    : "-"}
                </span>
              </p>
            </div>
            <hr />

            <div className="col-6">
              <p className="float-start  lufga-light">1 payment of: </p>
            </div>
            <div className="col-6">
              <p className="float-end lufga-regular">
                <span>
                  £
                  {gState !== null
                    ? currency(gState.instalmentsFirstPayment, {
                        symbol: "",
                        separator: ",",
                      }).format()
                    : "-"}
                </span>
              </p>
            </div>
            <hr />

            <div className="col-6">
              <p className="float-start  lufga-light">10 payments of: </p>
            </div>
            <div className="col-6">
              <p className="float-end lufga-regular">
                <span>
                  {" "}
                  £
                  {gState !== null
                    ? currency(gState.instalmentsSubsequentPayments, {
                        symbol: "",
                        separator: ",",
                      }).format()
                    : "-"}
                </span>{" "}
              </p>
            </div>
            <hr />
            <div className="col-6">
              <p className="float-start  lufga-light">
                Insurance Premium Tax:{" "}
              </p>
            </div>
            <div className="col-6">
              <p className="float-end lufga-regular">
                <span>
                  £
                  {gState !== null
                    ? currency(gState.ipt, {
                        symbol: "",
                        separator: ",",
                      }).format()
                    : "-"}
                </span>
              </p>
            </div>
            <hr />
            <div className="col-6">
              <p className="float-start lufga-medium">Total amount payable:</p>
            </div>
            <div className="col-6">
              <p className="float-end lufga-regular">
                {" "}
                £
                {gState !== null
                  ? currency(gState.instalmentsGrossPremium, {
                      symbol: "",
                      separator: ",",
                    }).format()
                  : "-"}
              </p>
            </div>
            <hr />
            <p className="float-center  lufga-light">
              *The duration of this agreement would be 12 months
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyPayments;
