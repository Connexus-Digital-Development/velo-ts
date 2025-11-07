import DatePicker from "react-datepicker";
import { type CardPayProps } from "@/models/JourneyComponentTypes";

const CardPay = ({ formik }: CardPayProps) => {
  const handleStartEndDate = (date) => {
    formik.setFieldValue("cardExpiry", date, false);
  };

  return (
    <form onSubmit={formik.handleSubmit} noValidate id="card-payment">
      <div className="row">
        <h4>Card Details</h4>
        <div className="col-md-8">
          <div className="mb-3">
            <label className="form-label">Card Number*</label>
            <input
              className={`form-control ${formik.errors?.cardNumber ? formik.touched.cardNumber && "is-invalid" : formik.touched.cardNumber && "is-valid"}`}
              id="cardNumber"
              required
              name="cardNumber"
              type="text"
              value={formik.values.cardNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.cardNumber && formik.errors.cardNumber ? (
              <small className="redFont mt-1">{formik.errors.cardNumber}</small>
            ) : null}
          </div>
          <div className="mb-3">
            <label className="form-label">Name on Card*</label>
            <input
              className={`form-control ${
                formik.errors.cardHolderName
                  ? formik.touched.cardHolderName && "is-invalid"
                  : formik.touched.cardHolderName && "is-valid"
              }`}
              id="cardHolderName"
              required
              name="cardHolderName"
              type="text"
              value={formik.values.cardHolderName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.cardHolderName && formik.errors.cardHolderName ? (
              <small className="redFont mt-1">
                {formik.errors.cardHolderName}
              </small>
            ) : null}
          </div>

          <div className="mb-3">
            <label className="form-label">CVV*</label>
            <input
              className={`form-control ${
                formik.errors.cardCVN
                  ? formik.touched.cardCVN && "is-invalid"
                  : formik.touched.cardCVN && "is-valid"
              }`}
              id="cardCVN"
              required
              type="text"
              value={formik.values.cardCVN}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.cardCVN && formik.errors.cardCVN ? (
              <small className="redFont mt-1">{formik.errors.cardCVN}</small>
            ) : null}
          </div>

          <div className="mb-3">
            <label className="form-label">Expiry MM/YYYY</label>

            <DatePicker
              onChange={(date) => handleStartEndDate(date)}
              onBlur={formik.handleBlur}
              selected={formik.values.cardExpiry}
              autoComplete="on"
              openTo="year"
              showMonthYearPicker
              type="date"
              placeholderText={"Click to select"}
              dateFormat="MM/yyyy"
              popperPlacement="top-start"
              popperModifiers={{
                offset: { enabled: true },
                preventOverflow: {
                  enabled: true,
                  escapeWithReference: false,
                  boundariesElement: "viewport",
                },
              }}
              className={`form-control ${
                formik.errors.cardExpiry
                  ? formik.touched.cardExpiry && "is-invalid"
                  : formik.touched.cardExpiry && "is-valid"
              }`}
            />
            {formik.touched.cardExpiry && formik.errors.cardExpiry ? (
              <small className="redFont mt-1">{formik.errors.cardExpiry}</small>
            ) : null}
          </div>
        </div>
      </div>
    </form>
  );
};

export default CardPay;
