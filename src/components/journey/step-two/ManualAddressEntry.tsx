interface ManualAddressEntryProps {
  formik: any; // TODO: Replace with proper Formik type when available
  gState: any; // TODO: Replace with proper JourneyState type when available
  setGState: (state: any) => void; // TODO: Replace with proper types when available
}

const ManualAddressEntry = ({
  formik,
  gState,
  setGState,
}: ManualAddressEntryProps) => {
  // const regex = new RegExp("^[A-Za-z0-9 ]*$");
  //
  return (
    <div>
      <div className="mb-3">
        <label className="form-label">House name or number</label>
        <input
          type="text"
          className={`form-control ${
            formik.errors.houseNo
              ? formik.touched.houseNo === true && "is-invalid"
              : formik.touched.houseNo === true && "is-valid"
          }`}
          value={formik.values.houseNo}
          id="houseNo"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            formik.handleChange(e);
            setGState({
              ...gState,
              generateQuote: true,
              yourQuoteCrumb: 0,
            });
          }}
          onBlur={formik.handleBlur}
        />
        {formik.touched.houseNo && formik.errors.houseNo ? (
          <small className="redFont mt-1">{formik.errors.houseNo}</small>
        ) : null}
      </div>

      <div className="mb-3">
        <label className="form-label">Address Line 1*</label>
        <input
          type="text"
          className={`form-control ${
            formik.errors.addressLine1
              ? formik.touched.addressLine1 === true && "is-invalid"
              : formik.touched.addressLine1 === true && "is-valid"
          }`}
          value={formik.values.addressLine1}
          id="addressLine1"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            formik.handleChange(e);
            setGState({
              ...gState,
              generateQuote: true,
              yourQuoteCrumb: 0,
            });
          }}
          onBlur={formik.handleBlur}
        />

        {formik.touched.addressLine1 && formik.errors.addressLine1 ? (
          <small className="redFont mt-1">{formik.errors.addressLine1}</small>
        ) : null}
      </div>
      <div className="mb-3">
        <label className="form-label">Address Line 2*</label>
        <input
          type="text"
          className={`form-control ${
            formik.errors.addressLine2
              ? formik.touched.addressLine2 === true && "is-invalid"
              : formik.touched.addressLine2 === true && "is-valid"
          }`}
          value={formik.values.addressLine2}
          id="addressLine2"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            formik.handleChange(e);
            setGState({
              ...gState,
              generateQuote: true,
              yourQuoteCrumb: 0,
            });
          }}
          onBlur={formik.handleBlur}
        />
        {formik.touched.addressLine2 && formik.errors.addressLine2 ? (
          <small className="redFont mt-1">{formik.errors.addressLine2}</small>
        ) : null}
      </div>

      <div className="mb-3">
        <label className="form-label">Address Line 3</label>
        <input
          type="text"
          className={`form-control ${
            formik.errors.addressLine3
              ? formik.touched.addressLine3 === true && "is-invalid"
              : formik.touched.addressLine3 === true && "is-valid"
          }`}
          value={formik.values.addressLine3}
          id="addressLine3"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            formik.handleChange(e);
            setGState({
              ...gState,
              generateQuote: true,
              yourQuoteCrumb: 0,
            });
          }}
          onBlur={formik.handleBlur}
        />
        {formik.touched.addressLine3 && formik.errors.addressLine3 ? (
          <small className="redFont mt-1">{formik.errors.addressLine3}</small>
        ) : null}
      </div>
      <div className="mb-3">
        <label className="form-label">Address Line 4</label>
        <input
          type="text"
          className={`form-control ${
            formik.errors.addressLine4
              ? formik.touched.addressLine4 === true && "is-invalid"
              : formik.touched.addressLine4 === true && "is-valid"
          }`}
          value={formik.values.addressLine4}
          id="addressLine4"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            formik.handleChange(e);
            setGState({
              ...gState,
              generateQuote: true,
              yourQuoteCrumb: 0,
            });
          }}
          onBlur={formik.handleBlur}
        />
        {formik.touched.addressLine4 && formik.errors.addressLine4 ? (
          <small className="redFont mt-1">{formik.errors.addressLine4}</small>
        ) : null}
      </div>
      <div className="mb-3">
        <label className="form-label">Postcode*</label>
        <input
          type="text"
          className={`form-control ${
            formik.errors.postcode
              ? formik.touched.postcode === true && "is-invalid"
              : formik.touched.postcode === true && "is-valid"
          }`}
          value={formik.values.postcode}
          id="postcode"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.currentTarget.value = e.currentTarget.value.toUpperCase();
            formik.handleChange(e);
            setGState({
              ...gState,
              generateQuote: true,
              yourQuoteCrumb: 0,
            });
          }}
          onBlur={formik.handleBlur}
        />
        {formik.touched.postcode && formik.errors.postcode ? (
          <small className="redFont mt-1">{formik.errors.postcode}</small>
        ) : null}
      </div>
    </div>
  );
};

export default ManualAddressEntry;
