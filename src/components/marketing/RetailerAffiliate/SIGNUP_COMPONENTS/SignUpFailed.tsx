import { Link } from "react-router-dom";

const SignUpFailed = () => {
  return (
    <>
      <h1>Sorry, we could not process your request.</h1>
      <p>
        please <Link to="/contact"> contact us</Link> to register.
      </p>
    </>
  );
};

export default SignUpFailed;
