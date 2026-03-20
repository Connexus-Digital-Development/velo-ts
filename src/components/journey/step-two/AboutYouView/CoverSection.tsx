import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MARKETING_REFERENCE_OPTIONS } from "../aboutYou.shared";
import type { CoverSectionProps } from "../aboutYou.types";

const CoverSection = ({
  formik,
  gState,
  minDate,
  maxDate,
  customReference,
  retailerReference,
  marketingReference,
  selectedMarketingReference,
  handleStartEndDate,
  handleMarketingReferenceChange,
  handleCustomReferenceChange,
  handleRetailerReferenceChange,
}: CoverSectionProps) => {
  return (
    <div className="row">
      <div className="col-md-8">
        <div className="mb-3">
          <label className="form-label">
            When would you like your cover to begin, within the next 45 days? *
          </label>

          <DatePicker
            onChange={handleStartEndDate}
            onBlur={formik.handleBlur}
            selected={formik.values.coverStart}
            minDate={minDate}
            id="coverStart"
            maxDate={maxDate}
            showDisabledMonthNavigation
            autoComplete="new-password"
            placeholderText="Click to select"
            dateFormat="d MMM yyyy"
            className={`form-control ${
              formik.errors.coverStart
                ? formik.touched.coverStart && "is-invalid"
                : formik.touched.coverStart && "is-valid"
            }`}
          />
          {formik.touched.coverStart && formik.errors.coverStart ? (
            <small className="redFont mt-1">{formik.errors.coverStart}</small>
          ) : null}
        </div>

        <div hidden={gState.disableSOB ?? false}>
          <label className="form-label">Where did you hear about us?</label>
          <select
            className="form-control form-select"
            id="marketingReference"
            onChange={handleMarketingReferenceChange}
            value={selectedMarketingReference}
          >
            <option value="" disabled>
              Select...
            </option>
            {MARKETING_REFERENCE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {customReference && (
          <div className="mt-3">
            <label className="form-label">Please specify Other*</label>
            <input
              type="text"
              className="form-control"
              id="customSource"
              value={marketingReference}
              onChange={handleCustomReferenceChange}
            />
          </div>
        )}

        {retailerReference && !(gState.disableSOB ?? false) && (
          <div className="mt-3">
            <label className="form-label">Retailer Name / Number*</label>
            <input
              type="text"
              className="form-control"
              id="retailerReference"
              value={marketingReference}
              onChange={handleRetailerReferenceChange}
            />
          </div>
        )}

        {formik.touched.marketingReference && formik.errors.marketingReference ? (
          <small className="redFont mt-1">
            {formik.errors.marketingReference}
          </small>
        ) : null}
      </div>
    </div>
  );
};

export default CoverSection;
