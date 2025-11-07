import { useFormik } from "formik";
import TopNavBlank from "@/components/shared/TopNavBlank";
import RegularBanner from "@/components/shared/RegularBanner";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { JourneyContext } from "@/context/journeyStore";
import useGlobalStateAdaptor from "@/hooks/useGlobalStateAdaptor";
import * as Yup from "yup";
import { type QRLandingPageProps } from "@/models/JourneyComponentTypes";

const QRLandingPage = (_props: QRLandingPageProps) => {
  const navigate = useNavigate();
  sessionStorage.setItem("fromExternalLink", "true");
  const [_gState, setGState] = useContext(JourneyContext);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const quoteId = params.get("PolicyReference") as string;
  const policyDetailsID = params.get("PolicyDetailsID");
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);
  const [expired, setExpired] = useState(false);
  const [vals, setVals] = useState<any>(null);
  const MIN_AGE = 18,
    MAX_AGE = 90;
  const upper = new Date().getFullYear() - MIN_AGE;
  const lower = upper - MAX_AGE + MIN_AGE;
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const days = [...Array(32).keys()].slice(1);
  const yearsList = () => {
    const years = [];
    for (let i = upper; i >= lower; i--) {
      years.push(i);
    }
    return years;
  };

  const years = yearsList();
  const stateFromExternalLink = useGlobalStateAdaptor(
    vals?.coreQuote,
    vals?.performanceQuote,
    vals?.selectedCoreScheme,
    quoteId,
  );

  useEffect(() => {
    if (!errored && !expired) {
      setGState(stateFromExternalLink);
      if (!stateFromExternalLink.loading) {
        navigate(`/QuoteRetrievalSummary`);
      }
    }
  }, [stateFromExternalLink, errored, expired, navigate, setGState]);

  const schema = Yup.object().shape({
    dob_d: Yup.number()
      .required("This is required")
      .min(1, "Please select a day.")
      .max(31, "Please select a day."),
    dob_m: Yup.number()
      .required("This is required")
      .min(1, "Please select a month.")
      .max(12, "Please select a month."),
    dob_y: Yup.number()
      .required("This is required")
      .min(lower, "Please select a year.")
      .max(upper),
    postcode: Yup.string()
      .required("Postcode is required")
      .min(6, "This postcode is too short")
      .max(10, "This postcode is too long"),
  });

  const formik = useFormik({
    initialValues: {
      postcode: "",
      dob_d: "",
      dob_m: "",
      dob_y: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      setLoading(true);
      setErrored(false);
      setExpired(false);
      const url = `${import.meta.env.VITE_TRANSACTOR_API_ENDPOINT}/PedalCycle/RetrieveQuote`;
      const options = {
        method: "POST",
        headers: {
          authKey: import.meta.env.VITE_TRANSACTOR_AUTH_KEY,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          QuoteReference: quoteId,
          DOB: new Date(
            Date.UTC(
              Number(values.dob_y),
              Number(values.dob_m) - 1,
              Number(values.dob_d),
            ),
          ),
          policyDetailsID: policyDetailsID,
          postcode: values.postcode.replaceAll(" ", "").toUpperCase(),
          newDD: true,
        }),

        mode: "cors" as RequestMode,
      };
      fetch(url, options)
        .then((res) => {
          if (!res.ok) {
            setErrored(true);
            setLoading(false);
          }
          return res.json();
        })
        .then((data) => {
          if (data?.success === false) {
            setErrored(true);
            setLoading(false);
            return;
          }

          if (data?.value?.coreQuote?.expired) {
            setExpired(true);
            setLoading(false);
            return;
          }

          setVals(data.value);
          setLoading(false);
        })
        .catch((_err) => {
          setErrored(true);
          setLoading(false);
        });
    },
  });

  return (
    <div className="container-fluid mb-5 oh">
      <TopNavBlank theme={"white"} />
      <RegularBanner
        headlineLine1={"Retrieve"}
        headlineLine2={"your quote"}
        subheadlineLine1={"Retrieve your quote and purchase your insurance"}
        subheadlineLine2={""}
        hasCTA={"false"}
        rotate={loading}
      />
      <div className={loading ? "overlay" : "overlay_hidden"}>
        <h1 className="GettingQuoteOverlayH1">Getting your quote...</h1>
      </div>
      <section className="container container_narrow">
        <form onSubmit={formik.handleSubmit} noValidate className="row">
          <div className="content_section mt-3">
            <h3 className="journey-section-titles">
              Confirm your<span className="blueFont"> details</span>.
            </h3>
            <div className="mb-3">
              <label className="form-label">Date of Birth*</label>
              <br />
              <select
                id="dob_d"
                placeholder="DD"
                className={`form-control Individual_Dateparts Individual_Dateparts_Day ${
                  formik.errors.dob_d
                    ? formik.touched.dob_d && "is-invalid"
                    : formik.touched.dob_d && "is-valid"
                }`}
                value={formik.values.dob_d}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
              >
                <option>DD</option>
                {days.map((d, key) => {
                  return <option key={key}>{d}</option>;
                })}
              </select>

              <select
                id="dob_m"
                placeholder="MM"
                className={`form-control Individual_Dateparts Individual_Dateparts_Month ${
                  formik.errors.dob_m
                    ? formik.touched.dob_m && "is-invalid"
                    : formik.touched.dob_m && "is-valid"
                }`}
                value={formik.values.dob_m}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
              >
                <option>MM</option>
                {months.map((month, mkey) => {
                  return <option key={mkey}>{month}</option>;
                })}
              </select>
              <select
                id="dob_y"
                placeholder="YYYY"
                className={`form-control Individual_Dateparts_Year Individual_Dateparts  ${
                  formik.errors.dob_y
                    ? formik.touched.dob_y && "is-invalid"
                    : formik.touched.dob_y && "is-valid"
                }`}
                value={formik.values.dob_y}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
              >
                <option>YYYY</option>
                {years.map((year, ykey) => {
                  return <option key={ykey}>{year}</option>;
                })}
              </select>
            </div>
            <div className="mb-3 col-12 col-md-6">
              <label className="form-label mt-3">Postcode*</label>
              <input
                type="text"
                className={`form-control ${
                  formik.errors.postcode
                    ? formik.touched.postcode && "is-invalid"
                    : formik.touched.postcode && "is-valid"
                }`}
                id="postcode"
                autoComplete="off"
                value={formik.values.postcode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.postcode && formik.errors.postcode ? (
              <small className="redFont mt-1">{formik.errors.postcode}</small>
            ) : null}
            {errored && (
              <div id="quote-retrieval-expired" className="mt-3 mb-1">
                <p className="agg-redFont">
                  Please check your Date of Birth and/or Postcode, which must
                  match the details you provided for your quote. If you are
                  still unable to retrieve your quote, please contact the
                  Velosure Team on{" "}
                  <a href="tel:08000833035" target="_blank" rel="noreferrer">
                    <strong>0800 083 3035 </strong>
                  </a>{" "}
                  with reference {quoteId}, who can help you with the purchase
                  of your policy.
                </p>
              </div>
            )}

            {expired && (
              <div id="quote-retrieval-expired" className="mt-3 mb-1">
                <p className="agg-redFont">
                  This quote has expired. If you require further assistance,
                  please contact our customer service team on{" "}
                  <a href="tel:08000833035" target="_blank" rel="noreferrer">
                    <strong>0800 083 3035 </strong>
                  </a>
                </p>
              </div>
            )}
          </div>

          <div className="col-6 offset-6 mb-4 mt-5">
            <button
              type="submit"
              className="btn btn-wider btn-green float-end mb-2"
              id="move-to-step-three"
            >
              Next step
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
export default QRLandingPage;
