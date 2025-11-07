import { recaptchaHelper } from "@/services";
import Spinner from "@/components/shared/Spinner";
import ContactUsSuccess from "./ContactUsSuccess";

import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const ContactUsForm = () => {
  const botThreshold = 0.6;
  const [formSubmitClicked, setFormSubmitClicked] = useState(false);
  const [recaptcha, setRecaptcha] = useState<number | null>(null);

  const [sentSuccessfully, setSentSuccessfully] = useState(false);

  const schema = Yup.object().shape({
    forename: Yup.string()
      .required("First name is required")
      .matches(
        /^(?=.{1,50}$)[a-z]+(?:[-'.\s][a-z]+)*$/i,
        "Please enter a valid first name",
      )
      .min(2, "First name is too short")
      .max(40, "First name is too long"),
    surname: Yup.string()
      .matches(
        /^(?=.{1,50}$)[a-z]+(?:[-'.\s][a-z]+)*$/i,
        "Please enter a valid Surname",
      )
      .trim()
      .required("Surname is required")
      .min(2, "Surname  is too short")
      .max(40, "Surname is too long"),
    telephoneNo: Yup.string()
      .trim()
      .required("Telephone number is required")
      .min(9, "Telephone number is too short")
      .matches(
        /^(\+44\s?\d{10}|0044\s?\d{10}|0\s?\d{10})?$/,
        "Telephone number is invalid",
      ),
    email: Yup.string()
      .email()
      .required("Email address is required")
      .min(2, "Email address is too short")
      .max(40, "Email address name is too long"),
    enquiry: Yup.string()
      .required("Please provide more information.")
      .min(2, "Please provide more information."),
    confirmPrivacy: Yup.boolean().oneOf(
      [true],
      "*Please confirm that you have read and accepted the Privacy Policy",
    ),
  });

  const formik = useFormik({
    initialValues: {
      forename: "",
      surname: "",
      email: "",
      telephoneNo: "",
      enquiry: "",
      confirmPrivacy: false,
      marketByTelephone: false,
      marketByEmail: false,
      marketByTelephoneCarbon: false,
      marketByEmailCarbon: false,
    },
    validationSchema: schema,

    onSubmit: (values) => {
      {
        fetch(`${import.meta.env.VITE_VELOSURE_API_URL}/api/Email/ContactUs`, {
          method: "POST",
          headers: {
            "X-API-KEY": import.meta.env.VITE_VELOSURE_API_KEY,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            natureOfEnquiry: "General Enquiry",
            firstName: values.forename,
            lastName: values.surname,
            emailAddress: values.email.trim(),
            phoneNumber: values.telephoneNo.trim(),
            enquiry: values.enquiry,
            marketByTelephone: values.marketByTelephone ? true : false,
            marketByEmail: values.marketByEmail ? true : false,
            marketByTelephoneCarbon: values.marketByTelephoneCarbon
              ? true
              : false,
            marketByEmailCarbon: values.marketByEmailCarbon ? true : false,
            acceptedPrivacyPolicy: true,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw Error("The message could not be sent.");
            } else {
              setSentSuccessfully(true);
            }
            setFormSubmitClicked(true);

            return response.json();
          })
          // .then((_data) => {
          //   // Data handling can be added here if needed
          // })
          .catch((err: unknown) => {
            console.log({ err });
            // Error handling can be added here if needed
          });
        window.scrollTo(0, 0);
      }
    },
  });

  const handleLoaded = () => {
    (window as any).grecaptcha.ready(() => {
      (window as any).grecaptcha
        .execute("6LdtJZ8kAAAAABNNgFl7grzMWoDca_yC_Vp4CBSF", {
          action: "homepage",
        })
        .then((token: string) => {
          recaptchaHelper
            .ProcessToken(token)
            .then((v: any) => setRecaptcha(Number.parseFloat(v)));
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
    <div className="oh">
      <div className="container mt-5 mb-5">
        <div
          className="g-recaptcha"
          data-sitekey="6LdtJZ8kAAAAABNNgFl7grzMWoDca_yC_Vp4CBSF"
          data-size="invisible"
        ></div>

        {sentSuccessfully === false && (
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="row">
              {recaptcha == null && (
                <div id="left" className="order-2 order-lg-1 col-12 col-lg-7">
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
                <div id="left" className="order-2 order-lg-1 col-12 col-lg-7">
                  <h3>This form is currently unavailable.</h3>
                  <p>Please try again or contact our customer services team.</p>
                </div>
              )}
              {recaptcha != null && recaptcha >= botThreshold && (
                <div id="left" className="order-2 order-lg-1 col-12 col-lg-7">
                  <div className="row g-3">
                    <div className="mb-3 col-lg-6">
                      <label className="form-label blueFont">First name*</label>
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.forename && formik.errors.forename ? (
                        <small className="redFont mt-1">
                          {formik.errors.forename}
                        </small>
                      ) : null}
                    </div>
                    <div className="mb-3 col-lg-6">
                      <label className="form-label blueFont">Surname*</label>
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.surname && formik.errors.surname ? (
                        <small className="redFont mt-1">
                          {formik.errors.surname}
                        </small>
                      ) : null}
                    </div>

                    <div className="mb-3 col-lg-6">
                      <label className="form-label blueFont">
                        Email address*
                      </label>
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <small className="redFont mt-1">
                          {formik.errors.email}
                        </small>
                      ) : null}
                    </div>
                    <div className="mb-3 col-lg-6">
                      <label className="form-label blueFont">
                        Telephone number*
                      </label>
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.telephoneNo &&
                      formik.errors.telephoneNo ? (
                        <small className="redFont mt-1">
                          {formik.errors.telephoneNo}
                        </small>
                      ) : null}
                    </div>
                  </div>
                  <div className="mb-3 ">
                    <label className="form-label blueFont">Enquiry*</label>
                    <textarea
                      rows={6}
                      cols={5}
                      className={`textArea form-control ${
                        formik.errors.enquiry
                          ? formik.touched.enquiry && "is-invalid"
                          : formik.touched.enquiry && "is-valid"
                      }`}
                      id="enquiry"
                      required
                      value={formik.values.enquiry}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.enquiry && formik.errors.enquiry ? (
                      <small className="redFont mt-1">
                        {formik.errors.enquiry}
                      </small>
                    ) : null}
                  </div>
                </div>
              )}
              <div
                id="right"
                className="order-1 order-lg-2 col-12  offset-lg-1  col-lg-4"
              >
                <h4>Opening hours</h4>
                <div className="row lufga-regular">
                  <div className="col-6 col-sm-7">
                    <p>
                      <span className="blueFont lufga">Monday</span> to{" "}
                      <span className="blueFont lufga">Friday</span>
                    </p>
                  </div>
                  <div className="col-sm-4 col-5 col-lg-5">
                    <p className="align-left lufga-regular">9.00 to 17.00</p>
                  </div>
                  <div className="col-sm-7 col-6">
                    <p>
                      <span className="blueFont lufga">Weekends</span> and
                      <span className="blueFont lufga"> Bank Holidays</span>
                    </p>
                  </div>

                  <div className="col-sm-4 col-5">
                    <p className="align-left lufga-regular">Closed</p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-8 col-12 lufga-regular">
                    <h4 className="mt-4">Address</h4>
                    <p className="lufga-regular">850 Ibis Court,</p>
                    <p className="lufga-regular">Lakeside Drive,</p>
                    <p className="lufga-regular">Centre Park,</p>
                    <p className="lufga-regular">Warrington, Cheshire</p>
                    <p className="lufga-regular">WA1 1RL</p>
                    <h4 className="mt-4">Telephone</h4>
                    <p>
                      <a href="tel:0800 083 3035">0800 083 3035</a>
                    </p>
                  </div>
                </div>
              </div>
              {recaptcha != null && recaptcha >= botThreshold && (
                <div className=" order-3 col-12 col-sm-12 mt-2">
                  <h4>Marketing preferences</h4>
                  <p>
                    We’d like to keep you up to date with the latest products,
                    services, and exclusive offers and competitions from
                    Velosure. We securely protect your personal data. You are
                    welcome to unsubscribe at any time. If you wish to receive
                    this information, please tick one or all of the boxes below:
                  </p>
                  <div className="row mb-4 mt-4">
                    <div className="col-6 col-sm-2">
                      <div className="form-check">
                        <input
                          className="form-check-input nonMantine-Checkbox"
                          type="checkbox"
                          id="marketByTelephone"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label className="form-check-label pl-1 pt-2">
                          Telephone
                        </label>
                      </div>
                    </div>
                    <div className="col-6 col-sm-2">
                      <div className="form-check">
                        <input
                          className="form-check-input nonMantine-Checkbox"
                          type="checkbox"
                          id="marketByEmail"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label className="form-check-label pl-1 pt-2">
                          Email
                        </label>
                      </div>
                    </div>
                  </div>
                  <p>
                    We would also like to pass your details to our partners in
                    The Connexus Group*. We will not pass your personal details
                    outside The Connexus Group, and we always securely protect
                    your personal data. If you wish to receive information from
                    our partners, please tick below. You can unsubscribe at any
                    time.
                  </p>
                  <p className="smaller">
                    *The Connexus Group includes: Carbon Insurance Brokers who
                    offer a wide variety of insurance products. Performance Car
                    Hire who offer prestige and executive vehicles For hire.
                    Connexus Medical Appointments who arrange medical
                    examinations via our national panel of over 1500 members.
                    Connexus Health and Rehabilitation who offer bespoke
                    treatment packages to suit businesses and individuals,
                    including physiotherapy and counselling services. KLS Law
                    who offer a range of legal services.
                  </p>

                  <div className="row mb-4 mt-4">
                    <div className="col-6 col-sm-2">
                      <div className="form-check">
                        <input
                          className="form-check-input nonMantine-Checkbox"
                          type="checkbox"
                          id="marketByTelephoneCarbon"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label className="form-check-label pl-1 pt-2">
                          Telephone
                        </label>
                      </div>
                    </div>
                    <div className="col-4 col-sm-2">
                      <div className="form-check">
                        <input
                          className="form-check-input nonMantine-Checkbox"
                          type="checkbox"
                          id="marketByEmailCarbon"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label className="form-check-label pl-1 pt-2">
                          Email
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4 mt-4">
                    <div className="col-11 col-sm-9 col-md-12">
                      <div className="form-check">
                        <input
                          className="form-check-input nonMantine-Checkbox"
                          type="checkbox"
                          required
                          id="confirmPrivacy"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />{" "}
                        <label className="form-check-label confirmPrivacyLabel blueFont pl-1 pt-2">
                          <span className="">
                            I can confirm that I have read and accepted the{" "}
                            <a
                              href={"/Privacy"}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Privacy Policy
                            </a>
                            *
                          </span>
                        </label>
                      </div>
                      {formik.touched.confirmPrivacy &&
                      formik.errors.confirmPrivacy ? (
                        <small className="redFont mt-1">
                          {formik.errors.confirmPrivacy}
                        </small>
                      ) : null}
                    </div>
                  </div>

                  <div className="col-12">
                    <button type="submit" className="btn btn-wider btn-primary">
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        )}

        {sentSuccessfully === true && formSubmitClicked === true && (
          <ContactUsSuccess />
        )}
      </div>
    </div>
  );
};

export default ContactUsForm;
