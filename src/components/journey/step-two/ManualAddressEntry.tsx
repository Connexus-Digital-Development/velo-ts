import type { ChangeEvent } from "react";
import type { AboutYouSectionProps } from "./aboutYou.types";
import type { AboutYouFormValues, JourneyState } from "@/models";

const getValidationClass = (
  formik: AboutYouSectionProps["formik"],
  field: keyof AboutYouFormValues,
) => {
  if (formik.errors[field]) {
    return formik.touched[field] ? "is-invalid" : "";
  }

  return formik.touched[field] ? "is-valid" : "";
};

const ManualAddressEntry = ({
  formik,
  updateJourneyState,
}: AboutYouSectionProps) => {
  const handleChange =
    (
      field:
        | "houseNo"
        | "addressLine1"
        | "addressLine2"
        | "addressLine3"
        | "addressLine4"
        | "postcode",
      formatValue?: (value: string) => string,
    ) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      if (formatValue) {
        event.currentTarget.value = formatValue(event.currentTarget.value);
      }

      formik.handleChange(event);
      updateJourneyState({
        [field]: event.currentTarget.value,
      } as Partial<JourneyState>);
    };

  return (
    <div>
      <div className="mb-3">
        <label className="form-label">House name or number</label>
        <input
          type="text"
          className={`form-control ${getValidationClass(formik, "houseNo")}`}
          value={formik.values.houseNo}
          id="houseNo"
          onChange={handleChange("houseNo")}
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
          className={`form-control ${getValidationClass(formik, "addressLine1")}`}
          value={formik.values.addressLine1}
          id="addressLine1"
          onChange={handleChange("addressLine1")}
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
          className={`form-control ${getValidationClass(formik, "addressLine2")}`}
          value={formik.values.addressLine2}
          id="addressLine2"
          onChange={handleChange("addressLine2")}
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
          className={`form-control ${getValidationClass(formik, "addressLine3")}`}
          value={formik.values.addressLine3}
          id="addressLine3"
          onChange={handleChange("addressLine3")}
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
          className={`form-control ${getValidationClass(formik, "addressLine4")}`}
          value={formik.values.addressLine4}
          id="addressLine4"
          onChange={handleChange("addressLine4")}
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
          className={`form-control ${getValidationClass(formik, "postcode")}`}
          value={formik.values.postcode}
          id="postcode"
          onChange={handleChange("postcode", (value) => value.toUpperCase())}
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
