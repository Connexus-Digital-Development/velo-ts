import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { type FormikProps } from "formik";
import { type AboutYouFormValues } from "@/models/JourneyComponentTypes";

interface CoverSectionProps {
  formik: FormikProps<AboutYouFormValues>;
  gState: any;
  setGState: (state: any) => void;
  minDate: Date;
  maxDate: () => Date;
  handleStartEndDate: (date: Date | null) => void;
  customReference: boolean;
  retailerReference: boolean;
  marketingReference: string;
  handleMarketingReferenceChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => void;
}

const CoverSection = ({
  formik,
  gState,
  setGState,
  minDate,
  maxDate,
  handleStartEndDate,
  customReference,
  retailerReference,
  marketingReference,
  handleMarketingReferenceChange,
}: CoverSectionProps) => {
  return (
    <div className="row">
      <div className="col-md-8">
        <div className="mb-3">
          <label className="form-label">
            When would you like your cover to begin, within the next 45 days? *
          </label>

          <DatePicker
            onChange={(date) => handleStartEndDate(date)}
            onBlur={formik.handleBlur}
            selected={formik.values.coverStart}
            minDate={minDate}
            id="coverStart"
            maxDate={maxDate()}
            showDisabledMonthNavigation
            // type="date"
            autoComplete="new-password"
            placeholderText={"Click to select"}
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

        <div className="" hidden={gState.disableSOB ?? false}>
          <label className="form-label">Where did you hear about us?</label>
          <select
            className="form-control form-select"
            id="marketingReference"
            onChange={handleMarketingReferenceChange}
            value={
              customReference
                ? "Other"
                : marketingReference?.startsWith("Retailer")
                  ? "Retailer"
                  : (marketingReference ?? 1)
            }
          >
            <option value={1} disabled>
              Select...
            </option>
            <option value="Search engine">Search engine</option>
            <option value="Social media">Social media</option>
            <option value="Recommended">Recommended</option>
            <option value="Retailer">Retailer</option>
            <option value="Cycle club">Cycle club</option>
            <option value="Event">Event</option>
            <option value="Previous policyholder">
              Previous policy holder
            </option>
            <option value="Other">Other</option>
          </select>
        </div>
        {customReference && (
          <div className="mt-3">
            <label className="form-label">Please specify Other*</label>
            <input
              type="text"
              className="form-control"
              id="customSource"
              defaultValue={marketingReference}
              onBlur={(e) => {
                if (e.currentTarget.value.length > 0) {
                  formik.setFieldValue(
                    "marketingReference",
                    e.currentTarget.value,
                  );
                  // setMarketingReference(e.currentTarget.value);
                  setGState({
                    ...gState,
                    marketingReference: e.currentTarget.value,
                    generateQuote: true,
                    yourQuoteCrumb: 0,
                  });
                } else {
                  formik.setFieldValue("marketingReference", null);
                }
              }}
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
              defaultValue={marketingReference
                ?.replace("Retailer -", "")
                ?.replace("Retailer", "")
                ?.trim()}
              onBlur={(e) => {
                if (e.currentTarget.value.length > 0) {
                  const ref = `Retailer - ${e.currentTarget.value}`;
                  formik.setFieldValue("marketingReference", ref);
                  // setMarketingReference(ref);
                  setGState({
                    ...gState,
                    marketingReference: ref,
                    generateQuote: true,
                    yourQuoteCrumb: 0,
                  });
                } else {
                  formik.setFieldValue("marketingReference", null);
                }
              }}
            />
          </div>
        )}
        {formik.touched.marketingReference &&
        formik.errors.marketingReference ? (
          <small className="redFont mt-1">
            {formik.errors.marketingReference}
          </small>
        ) : null}
      </div>
    </div>
  );
};

export default CoverSection;
