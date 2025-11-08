import { useState, type RefObject } from "react";

import SignUpForm from "./SIGNUP_COMPONENTS/SignUpForm";
import SignUpSuccess from "./SIGNUP_COMPONENTS/SignUpSuccess";
import SignUpFailed from "./SIGNUP_COMPONENTS/SignUpFailed";

const ReadyToSignUp = ({
  signupRef,
}: {
  signupRef: RefObject<HTMLElement>;
}) => {
  const [formSubmitted, setFormSubmitted] = useState<boolean | null>(false);
  const [submitSuccessful, setSubmitSuccessful] = useState<boolean | null>(
    null,
  );

  const formSubmitHandler = (values: any) => {
    const options = {
      method: "POST",
      headers: {
        "X-API-KEY": import.meta.env.VITE_VELOSURE_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify(values),
    };

    fetch(
      `${import.meta.env.VITE_VELOSURE_API_URL}/api/Email/AffiliateSchemeRequest`,
      options,
    )
      .then((response) => response.json())
      .then((data) => setSubmitSuccessful(data.success))
      .catch((_error) => setSubmitSuccessful(false));

    setFormSubmitted(true);
  };

  return (
    <div
      className="container-fluid lightBlueBG  pr oh"
      id="readToSignup"
      ref={signupRef}
    >
      <div className="container mt-5 mb-5">
        {!formSubmitted && <SignUpForm onFromSumitted={formSubmitHandler} />}
        {formSubmitted && submitSuccessful && <SignUpSuccess />}
        {formSubmitted && submitSuccessful == false && <SignUpFailed />}
      </div>
    </div>
  );
};

export default ReadyToSignUp;
