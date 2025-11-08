import bannerData from "./bannerData";
import { useState } from "react";
import React from "react";

interface BannerStep2Props {
  retailerId: string | number;
  retailerComeFromUrl: boolean;
}

const BannerStep2 = ({ retailerId, retailerComeFromUrl }: BannerStep2Props) => {
  ////console.log("retailerId", retailerId);
  const options = bannerData();
  const [selectedID, setSelectedID] = useState(0);
  const [generatedLink, setGeneratedLink] = useState("");
  const startStep = retailerComeFromUrl ? 1 : 2;
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //////console.log(e.target.value);
    setSelectedID(parseInt(e.target.value));

    const thisOption = options.filter((element) => {
      return element.id == parseInt(e.target.value);
    });

    setGeneratedLink(
      `<a href="https://www.velosure.co.uk/?sourcebusid=${retailerId}"><img alt="Velosure Cycle Insurance" src="${thisOption[0].url}"/></a>`,
    );
  };
  return (
    <div className="row">
      <div className="col-12 col-md-5">
        <h3>Step {startStep}</h3>
        <p>Select your banner size(px)</p>
        <select
          className="form-control"
          value={selectedID}
          onChange={handleChange}
        >
          <option>Please select...</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div className="col-12 colo-sm-12">
        <p className="align-center mt-5">
          This will be the banner displayed on your website
        </p>
        <div className="justForTheBorder">
          {selectedID > 0 && (
            <img src={options[selectedID - 1].url} alt="Affilate Banner" />
          )}
        </div>
      </div>
      <div className="col-12 mt-5">
        <h3>Step {startStep + 1}</h3>
        <p>Place this code inside your website to display the banner.</p>
        <div className="justForTheBorder2">
          <p className="blueFont">{generatedLink}</p>
        </div>
      </div>
    </div>
  );
};

export default BannerStep2;
