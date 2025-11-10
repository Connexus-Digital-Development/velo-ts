import { useState } from 'react';
import GenerateBanners from "./GenerateBanners";

const AlreadyAnAffiliate = () => {
  const [showBannerComponent, setShowBannerComponent] = useState(false);
  const handleGenerateBannersClick = (() => {
    setShowBannerComponent(true);
    const section = document.getElementById('generateBannersSection');
    section?.scrollIntoView({ behavior: 'smooth', inline: 'end' });
  });



  return (<>
    <div className="container-fluid lightBlueBG  pr oh">
      <div className="container pt-5 mb-5">
        <div className="row ">
          <div className="col-12 align-center">
            <h3>
              Already an
              <span className="blueFont"> affiliate? </span>
            </h3>
            <p className="mt-4 mb-4">
              Use the link below to generate a Velosure banner for your website
              to ensure you receive your commission whenever one of your
              visitors take out insurance with us.
            </p>
            <button id='generateBannersSection' onClick={handleGenerateBannersClick} className="btn lufga btn-green btn-wider mt-3 mb-2 center-on-mobile">
              Generate banners
            </button>
          </div>
        </div>
      </div>
    </div>
    <div >
      {showBannerComponent && <GenerateBanners />}
    </div>
  </>
  );
};

export default AlreadyAnAffiliate;
