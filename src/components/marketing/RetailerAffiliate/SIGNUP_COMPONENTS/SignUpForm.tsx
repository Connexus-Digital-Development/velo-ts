import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { recaptchaHelper } from "@/services/recaptchaHelper";
import Spinner from "@/components/shared/Spinner";

interface SignUpFormProps {
  onFromSumitted: (values: any) => void;
}

const typedWindow = window as Window &
  typeof globalThis & {
    grecaptcha: any;
  };

const SignUpForm = (props: SignUpFormProps) => {
  const botThreshold = 0.6;
  const [recaptcha, setRecaptcha] = useState<number | null>(null);
  const formik = useFormik({
    initialValues: {
      name: "",
      businessName: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .matches(
          /^(?=.{1,50}$)[a-z]+(?:[-'.\s][a-z]+)*$/i,
          "Please enter a valid name",
        )
        .min(1, "This name is too short")
        .max(40, "This name is too long"),
      businessName: Yup.string()
        .required("Business name is required")
        .matches(
          /^(?=.{1,50}$)[a-z]+(?:[-'.\s][a-z]+)*$/i,
          "Please enter a valid business name",
        )
        .min(1, "This business name is too short")
        .max(40, "This business name name is too long"),
      email: Yup.string().required("Email is required").email(),
    }),
    onSubmit: (values, { resetForm }) => {
      props.onFromSumitted(values);
      resetForm();
    },
  });
  const handleLoaded = (_: any) => {
    typedWindow.grecaptcha.ready((_: any) => {
      typedWindow.grecaptcha
        .execute("6LdtJZ8kAAAAABNNgFl7grzMWoDca_yC_Vp4CBSF", {
          action: "homepage",
        })
        .then((token: any) => {
          recaptchaHelper.ProcessToken(token).then((v) => setRecaptcha(v));
        });
    });
  };

  useEffect(() => {
    // Add reCaptcha
    const script = document.createElement("script");
    script.src =
      "https://www.google.com/recaptcha/api.js?render=6LdtJZ8kAAAAABNNgFl7grzMWoDca_yC_Vp4CBSF";
    script.addEventListener("load", handleLoaded);
    document.body.appendChild(script);
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <div className="row ">
        {recaptcha == null && (
          <div>
            <div className="container my-5 py-5 text-center ">
              {" "}
              <h4>
                {" "}
                <Spinner colour="velo-blue" />{" "}
              </h4>
            </div>
          </div>
        )}
        {recaptcha != null && recaptcha < botThreshold && (
          <div>
            <h3>This form is currently unavailable.</h3>
            <p>Please try again or contact our customer services team.</p>
          </div>
        )}
        {recaptcha != null && recaptcha >= botThreshold && (
          <div>
            <div className="col-12 align-center">
              <h3>
                Ready to
                <span className="blueFont"> sign up? </span>
              </h3>
              <p className="mt-4 mb-4">
                If you would like to find out more or want to sign up as an
                affiliate, all you need to do is contact us to request your
                initial forms. Once these are completed and sent back to us,
                we'll create your unique code and provide you with any
                supporting materials or assets that you wish to use.
              </p>
            </div>

            <div className="col-12 col-sm-4">
              <label className="lufga-regular">Name*</label>
              <br />
              <input
                type="text"
                id="name"
                className={`form-control ${
                  formik.errors.name
                    ? formik.touched.name === true && "is-invalid"
                    : formik.touched.name === true && "is-valid"
                }`}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <small className="redFont mt-1">{formik.errors.name}</small>
              ) : null}
            </div>
            <div className="col-12 col-sm-4">
              <label className="lufga-regular">Business Name*</label>
              <br />
              <input
                type="text"
                id="businessName"
                className={`form-control ${
                  formik.errors.businessName
                    ? formik.touched.businessName === true && "is-invalid"
                    : formik.touched.businessName === true && "is-valid"
                }`}
                value={formik.values.businessName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.businessName && formik.errors.businessName ? (
                <small className="redFont mt-1">
                  {formik.errors.businessName}
                </small>
              ) : null}
            </div>
            <div className="col-12 col-sm-4">
              <label className="lufga-regular">Email Address*</label>
              <br />
              <input
                type="email"
                id="email"
                className={`form-control ${
                  formik.errors.email
                    ? formik.touched.email === true && "is-invalid"
                    : formik.touched.email === true && "is-valid"
                }`}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <small className="redFont mt-1">{formik.errors.email}</small>
              ) : null}
            </div>
            <div className="col-12 align-center">
              <button
                type="submit"
                className="btn btn-green lufga btn-wider mt-5 mb-2 center-on-mobile"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default SignUpForm;
