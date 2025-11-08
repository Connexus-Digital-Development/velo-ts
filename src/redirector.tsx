import { useNavigate } from "react-router-dom";

const Redirector = () => {
  const navigate = useNavigate();

  switch (window.location.pathname.toLowerCase()) {
    case "/sport-bike-cover": {
      navigate("/types-we-cover#sport");
      break;
    }
    case "/electric-bicycle-insurance": {
      navigate("/types-we-cover#electric");
      break;
    }
    case "/road-bike-insurance": {
      navigate("/types-we-cover#road");
      break;
    }
    case "/mountain-bike-insurance": {
      navigate("/types-we-cover#mountain");
      break;
    }
    case "/news":
    case "/news-post": {
      navigate("/Pitstop");
      break;
    }
    default: {
      navigate("/");
      break;
    }
  }

  return <></>;
};

export default Redirector;
