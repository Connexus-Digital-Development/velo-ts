import type { ChangeEvent } from "react";
import { TITLE_OPTIONS } from "../aboutYou.shared";
import type { PersonalDetailsProps } from "../aboutYou.types";
import type { JourneyState } from "@/models";

const getValidationClass = (
  formik: PersonalDetailsProps["formik"],
  field:
    | "title"
    | "forename"
    | "surname"
    | "dob_d"
    | "dob_m"
    | "dob_y"
    | "email"
    | "telephoneNo",
) => {
  if (formik.errors[field]) {
    return formik.touched[field] ? "is-invalid" : "";
  }

  return formik.touched[field] ? "is-valid" : "";
};

const PersonalDetails = ({
  formik,
  updateJourneyState,
  days,
  months,
  years,
}: PersonalDetailsProps) => {
  const handleTitleSelect = (title: string, titleId: string) => {
    formik.setFieldValue("title", title, false);
    updateJourneyState({ title, titleId });
  };

  const handleTextChange =
    (field: "forename" | "surname" | "email" | "telephoneNo") =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value =
        field === "email" || field === "telephoneNo"
          ? event.currentTarget.value.trim()
          : event.currentTarget.value;

      formik.handleChange(event);
      updateJourneyState({ [field]: value } as Partial<JourneyState>);
    };

  const handleDatePartChange =
    (field: "dob_d" | "dob_m" | "dob_y") =>
    (event: ChangeEvent<HTMLSelectElement>) => {
      const value = event.currentTarget.value;
      const parsedValue = value === "" ? null : Number(value);

      formik.setFieldValue(field, parsedValue, false);
      updateJourneyState({
        [field]: parsedValue === null ? "" : String(parsedValue),
      } as Partial<JourneyState>);
    };

  return (
    <div className="row">
      <div className="col-md-8">
        <div className="mb-3">
          <label className="form-label">Title*</label>
          <div className="row" id="title">
            {TITLE_OPTIONS.map(({ label, titleId, value }) => (
              <div key={value} className="col-6 col-sm-2">
                <button
                  id={`title-${value.toLowerCase()}`}
                  type="button"
                  className={`btn mr-small btn-100 mb-1 ${
                    formik.values.title === value ? "btn-primary" : "btn-secondary"
                  } ${getValidationClass(formik, "title")}`}
                  onClick={() => handleTitleSelect(value, titleId)}
                >
                  {label}
                </button>
              </div>
            ))}
          </div>
          {formik.touched.title && formik.errors.title ? (
            <small className="redFont mt-1">{formik.errors.title}</small>
          ) : null}
        </div>

        <div className="mb-3">
          <label className="form-label">First name*</label>
          <input
            type="text"
            className={`form-control ${getValidationClass(formik, "forename")}`}
            id="forename"
            required
            value={formik.values.forename}
            maxLength={40}
            onChange={handleTextChange("forename")}
            onBlur={formik.handleBlur}
          />
          {formik.touched.forename && formik.errors.forename ? (
            <small className="redFont mt-1">{formik.errors.forename}</small>
          ) : null}
        </div>

        <div className="mb-3">
          <label className="form-label">Last name*</label>
          <input
            type="text"
            className={`form-control ${getValidationClass(formik, "surname")}`}
            id="surname"
            required
            value={formik.values.surname}
            maxLength={40}
            onChange={handleTextChange("surname")}
            onBlur={formik.handleBlur}
          />
          {formik.touched.surname && formik.errors.surname ? (
            <small className="redFont mt-1">{formik.errors.surname}</small>
          ) : null}
        </div>

        <div className="mb-3">
          <label className="form-label">Date of Birth*</label>
          <br />
          <select
            id="dob_d"
            className={`form-control Individual_Dateparts Individual_Dateparts_Day ${getValidationClass(formik, "dob_d")}`}
            value={formik.values.dob_d ?? ""}
            onChange={handleDatePartChange("dob_d")}
            onBlur={formik.handleBlur}
          >
            <option value="">DD</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

          <select
            id="dob_m"
            className={`form-control Individual_Dateparts Individual_Dateparts_Month ${getValidationClass(formik, "dob_m")}`}
            value={formik.values.dob_m ?? ""}
            onChange={handleDatePartChange("dob_m")}
            onBlur={formik.handleBlur}
          >
            <option value="">MM</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>

          <select
            id="dob_y"
            className={`form-control Individual_Dateparts_Year Individual_Dateparts ${getValidationClass(formik, "dob_y")}`}
            value={formik.values.dob_y ?? ""}
            onChange={handleDatePartChange("dob_y")}
            onBlur={formik.handleBlur}
          >
            <option value="">YYYY</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Email address*</label>
          <input
            type="text"
            className={`form-control ${getValidationClass(formik, "email")}`}
            id="email"
            required
            value={formik.values.email}
            onChange={handleTextChange("email")}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <small className="redFont mt-1">{formik.errors.email}</small>
          ) : null}
        </div>

        <div className="mb-3">
          <label className="form-label">Telephone number*</label>
          <input
            type="text"
            className={`form-control ${getValidationClass(formik, "telephoneNo")}`}
            id="telephoneNo"
            required
            value={formik.values.telephoneNo}
            onChange={handleTextChange("telephoneNo")}
            onBlur={formik.handleBlur}
          />
          {formik.touched.telephoneNo && formik.errors.telephoneNo ? (
            <small className="redFont mt-1">{formik.errors.telephoneNo}</small>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
