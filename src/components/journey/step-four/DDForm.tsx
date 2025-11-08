import { useEffect, useState, useCallback } from "react";
import { useSafeContext } from "@/context/journeyStore/useSafeContext";
import { loggingService } from "@/services/loggingService";
import { paymentService } from "@/services/paymentService";
import { restApiCommBaseService } from "@/services/restApiCommBaseService";
import { type DDFormProps } from "@/models/JourneyComponentTypes";

const DDForm = ({ formik }: DDFormProps) => {
  const [gState, setGState] = useSafeContext({
    componentName: "DDForm",
  });
  const [error, setError] = useState("");
  const [checkBottomLine, setCheckBottomLine] = useState(true);

  useEffect(() => {
    if (
      checkBottomLine === true &&
      formik.values.accountName.length > 1 &&
      formik.values.accountSortCode.toString().length === 6 &&
      formik.values.accountNumber.toString().length === 8
    ) {
      setCheckBottomLine(false);
      bottomLineCheck();
    }
  }, [formik, checkBottomLine, bottomLineCheck]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    formik.setFieldValue("accountBankName", "", false);
    formik.handleChange(e);
    setCheckBottomLine(true);
  };

  const bottomLineCheck = useCallback(() => {
    // check bottom line...
    //console.log("checking bottom Line");
    paymentService
      .bottomLineCheck(
        formik.values.accountSortCode,
        formik.values.accountNumber,
      )
      .then(restApiCommBaseService.handleResponse)
      .then((json) => {
        return json.value;
      })
      .then((data) => {
        setError("");
        if (data.ukBankBranch.bankName) {
          formik.setFieldValue(
            "accountBankName",
            data.ukBankBranch.bankName,
            false,
          );
        }
      })
      .catch(() => {
        setError(
          "These Direct Debit details could not be verified, please double check them and try again.",
        );
        loggingService.logWarning(
          `These Direct Debit details could not be verified, for Quote: ${gState.quoteReference}`,
        );
        setGState({ ...gState, DDFormIsValid: false }); // this flag is used to trigger the Bottom Line API call, it might be needed again
      });
  }, [formik.values.accountSortCode, formik.values.accountNumber, formik.setFieldValue, formik, setError, gState.quoteReference, setGState, gState]);

  return (
    <form id="ddForm" onSubmit={formik.handleSubmit} noValidate>
      <div className="row">
        <h4>
          Bank details <span className="blueFont"> Direct Debit</span>
        </h4>
        <div className="col-md-8">
          <div className="mb-3">
            <label className="form-label">Name on account*</label>
            <input
              type="text"
              className={`form-control ${
                formik.errors.accountName
                  ? formik.touched.accountName && "is-invalid"
                  : formik.touched.accountName && "is-valid"
              }`}
              id="accountName"
              required
              // onKeyUp={  return event.charCode >= 48 && event.charCode }
              // placeholder="Account name"
              value={formik.values.accountName}
              onChange={handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.accountName && formik.errors.accountName ? (
              <small className="redFont mt-1">
                {formik.errors.accountName}
              </small>
            ) : null}
          </div>

          <div className="mb-3">
            <label className="form-label">Account number*</label>
            <input
              type="text"
              className={`form-control ${
                formik.errors.accountNumber
                  ? formik.touched.accountNumber && "is-invalid"
                  : formik.touched.accountNumber && "is-valid"
              }`}
              id="accountNumber"
              required
              // placeholder="Account number"
              value={formik.values.accountNumber}
              onChange={handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.accountNumber && formik.errors.accountNumber ? (
              <small className="redFont mt-1">
                {formik.errors.accountNumber}
              </small>
            ) : null}
          </div>

          <div className="mb-3">
            <label className="form-label">Sort code*</label>
            <input
              type="text"
              className={`form-control ${
                formik.errors.accountSortCode
                  ? formik.touched.accountSortCode && "is-invalid"
                  : formik.touched.accountSortCode && "is-valid"
              }`}
              id="accountSortCode"
              required
              // placeholder="Sort code"
              value={formik.values.accountSortCode}
              onChange={handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.accountSortCode && formik.errors.accountSortCode ? (
              <small className="redFont mt-1">
                {formik.errors.accountSortCode}
              </small>
            ) : null}
          </div>

          <div className="mb-3">
            <label className="form-label">Bank name</label>
            <input
              type="text"
              className={`form-control`}
              readOnly
              id="accountBankName"
              value={formik.values.accountBankName}
            />
            {error != "" ? (
              <small className="redFont mt-1">{error}</small>
            ) : null}
          </div>
        </div>
      </div>
    </form>
  );
};

export default DDForm;
