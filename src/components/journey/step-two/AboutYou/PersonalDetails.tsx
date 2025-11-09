import { type FormikProps } from "formik";
import { type AboutYouFormValues } from "@/models/JourneyComponentTypes";

interface PersonalDetailsProps {
  formik: FormikProps<AboutYouFormValues>;
  gState: any;
  setGState: (state: any) => void;
  days: number[];
  months: number[];
  years: number[];
}

const PersonalDetails = ({
  formik,
  gState,
  setGState,
  days,
  months,
  years,
}: PersonalDetailsProps) => {
  return (
    <div className="row">
      <div className="col-md-8">
        <div className="mb-3">
          <label className="form-label">Title*</label>
          <div className="row" id="title">
            <div className="col-6 col-sm-2">
              <label
                id="title1"
                className={`btn mr-small btn-100 mb-1 ${
                  gState.title === "Mr" ? "btn-primary" : "btn-secondary"
                } ${
                  formik.errors.title
                    ? formik.touched.title && "is-invalid"
                    : formik.touched.title && "is-valid"
                }`}
                onClick={() => {
                  formik.setFieldValue("title", "Mr");
                  setGState({
                    ...gState,
                    title: "Mr",
                    titleId: 106,
                    generateQuote: true,
                    yourQuoteCrumb: 0,
                  });
                }}
              >
                Mr
              </label>
            </div>
            <div className="col-6 col-sm-2">
              <label
                id="title2"
                className={`btn mr-small btn-100 mb-1 ${
                  gState.title === "Mrs" ? "btn-primary" : "btn-secondary"
                }  ${
                  formik.errors.title
                    ? formik.touched.title && "is-invalid"
                    : formik.touched.title && "is-valid"
                }`}
                onClick={() => {
                  formik.setFieldValue("title", "Mrs");
                  setGState({
                    ...gState,
                    title: "Mrs",
                    titleId: 107,
                    generateQuote: true,
                    yourQuoteCrumb: 0,
                  });
                }}
              >
                Mrs
              </label>
            </div>
            <div className="col-6 col-sm-2">
              <label
                id="title3"
                className={`btn mr-small btn-100 mb-1 ${
                  gState.title === "Ms" ? "btn-primary" : "btn-secondary"
                }  ${
                  formik.errors.title
                    ? formik.touched.title && "is-invalid"
                    : formik.touched.title && "is-valid"
                }`}
                onClick={() => {
                  formik.setFieldValue("title", "Ms");
                  setGState({
                    ...gState,
                    title: "Ms",
                    titleId: 107,
                    generateQuote: true,
                    yourQuoteCrumb: 0,
                  });
                }}
              >
                Ms
              </label>
            </div>
            <div className="col-6 col-sm-2">
              <label
                id="title4"
                className={`btn mr-small btn-100 mb-1 ${
                  gState.title === "Miss" ? "btn-primary" : "btn-secondary"
                } ${
                  formik.errors.title
                    ? formik.touched.title && "is-invalid"
                    : formik.touched.title && "is-valid"
                }`}
                onClick={() => {
                  formik.setFieldValue("title", "Miss");
                  setGState({
                    ...gState,
                    title: "Miss",
                    titleId: 107,
                    generateQuote: true,
                    yourQuoteCrumb: 0,
                  });
                }}
              >
                Miss
              </label>
            </div>
            <div className="col-6 col-sm-2">
              <label
                id="title5"
                className={`btn mr-small btn-100 mb-1 ${
                  gState.title === "Dr" ? "btn-primary" : "btn-secondary"
                } ${
                  formik.errors.title
                    ? formik.touched.title && "is-invalid"
                    : formik.touched.title && "is-valid"
                }`}
                onClick={() => {
                  formik.setFieldValue("title", "Dr");
                  setGState({
                    ...gState,
                    title: "Dr",
                    titleId: 107,
                    generateQuote: true,
                    yourQuoteCrumb: 0,
                  });
                }}
              >
                Dr
              </label>
            </div>
            <div className="col-6 col-sm-2">
              <label
                id="title6"
                className={`btn mr-small btn-100 mb-1 ${
                  gState.title === "Mx" ? "btn-primary" : "btn-secondary"
                }  ${
                  formik.errors.title
                    ? formik.touched.title && "is-invalid"
                    : formik.touched.title && "is-valid"
                }`}
                onClick={() => {
                  formik.setFieldValue("title", "Mx");

                  setGState({
                    ...gState,
                    title: "Mx",
                    titleId: 107,
                    generateQuote: true,
                    yourQuoteCrumb: 0,
                  });
                }}
              >
                Mx
              </label>
            </div>
          </div>
          {formik.touched.title && formik.errors.title ? (
            <small className="redFont mt-1">{formik.errors.title}</small>
          ) : null}
        </div>
        <div className="mb-3">
          <label className="form-label">First name*</label>
          <input
            type="text"
            className={`form-control ${
              formik.errors.forename
                ? formik.touched.forename && "is-invalid"
                : formik.touched.forename && "is-valid"
            }`}
            id="forename"
            required
            value={formik.values.forename}
            maxLength={40}
            onChange={(e) => {
              formik.handleChange(e);
              setGState({
                ...gState,
                forename: e.currentTarget.value,
                generateQuote: true,
                yourQuoteCrumb: 0,
              });
            }}
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
            className={`form-control ${
              formik.errors.surname
                ? formik.touched.surname && "is-invalid"
                : formik.touched.surname && "is-valid"
            }`}
            id="surname"
            required
            value={formik.values.surname}
            maxLength={40}
            onChange={(e) => {
              formik.handleChange(e);
              setGState({
                ...gState,
                surname: e.currentTarget.value,
                generateQuote: true,
                yourQuoteCrumb: 0,
              });
            }}
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
            // type="number"
            id="dob_d"
            // placeholder="DD"
            // min="1"
            // max="31"
            className={`form-control Individual_Dateparts Individual_Dateparts_Day ${
              formik.errors.dob_d
                ? formik.touched.dob_d && "is-invalid"
                : formik.touched.dob_d && "is-valid"
            }`}
            value={formik.values.dob_d!}
            onChange={(e) => {
              formik.handleChange(e);
              setGState({
                ...gState,
                dob_d: e.currentTarget.value,
                generateQuote: true,
                yourQuoteCrumb: 0,
              });
            }}
            onBlur={formik.handleBlur}
          >
            <option>DD</option>
            {days.map((d, key) => {
              return <option key={key}>{d}</option>;
            })}
          </select>

          <select
            // type="number"
            id="dob_m"
            // placeholder="MM"
            // min="1"
            // max="12"
            className={`form-control Individual_Dateparts Individual_Dateparts_Month ${
              formik.errors.dob_m
                ? formik.touched.dob_m && "is-invalid"
                : formik.touched.dob_m && "is-valid"
            }`}
            value={formik.values.dob_m!}
            onChange={(e) => {
              formik.handleChange(e);
              setGState({
                ...gState,
                dob_m: Number(e.currentTarget.value!),
                generateQuote: true,
                yourQuoteCrumb: 0,
              });
            }}
            onBlur={formik.handleBlur}
          >
            <option>MM</option>
            {months.map((month, mkey) => {
              return <option key={mkey}>{month}</option>;
            })}
          </select>
          <select
            // type="number"
            id="dob_y"
            // placeholder="YYYY"
            // min="1"
            // max="31"
            className={`form-control Individual_Dateparts_Year Individual_Dateparts  ${
              formik.errors.dob_y
                ? formik.touched.dob_y && "is-invalid"
                : formik.touched.dob_y && "is-valid"
            }`}
            value={formik.values.dob_y!}
            onChange={(e) => {
              formik.handleChange(e);
              setGState({
                ...gState,
                dob_y: e.currentTarget.value,
                generateQuote: true,
                yourQuoteCrumb: 0,
              });
            }}
            onBlur={formik.handleBlur}
          >
            <option>YYYY</option>
            {years.map((year, ykey) => {
              return <option key={ykey}>{year}</option>;
            })}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Email address*</label>
          <input
            type="text"
            className={`form-control ${
              formik.errors.email
                ? formik.touched.email && "is-invalid"
                : formik.touched.email && "is-valid"
            }`}
            id="email"
            required
            value={formik.values.email}
            onChange={(e) => {
              formik.handleChange(e);
              setGState({
                ...gState,
                email: e.currentTarget.value.trim(),
                generateQuote: true,
                yourQuoteCrumb: 0,
              });
            }}
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
            className={`form-control ${
              formik.errors.telephoneNo
                ? formik.touched.telephoneNo && "is-invalid"
                : formik.touched.telephoneNo && "is-valid"
            }`}
            id="telephoneNo"
            required
            value={formik.values.telephoneNo}
            onChange={(e) => {
              formik.handleChange(e);
              setGState({
                ...gState,
                telephoneNo: e.currentTarget.value.trim(),
                generateQuote: true,
                yourQuoteCrumb: 0,
              });
            }}
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
