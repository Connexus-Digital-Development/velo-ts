import { useState } from "react";
import { useSafeContext } from "@/context/journeyStore";

interface MarketingPreferencesProps {
  formik: any; // TODO: Replace with proper Formik type when available
}

interface PreferenceButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function PreferenceButton({ label, isActive, onClick }: PreferenceButtonProps) {
  return (
    <button
      type="button"
      onClick={() => {
        onClick();
      }}
      className="preferredMethodOfContact preference-icon"
      style={
        isActive
          ? { backgroundColor: "#00a8ff", color: "white" }
          : { backgroundColor: "#efefef" }
      }
    >
      {label}
    </button>
  );
}

const MarketingPreferences = ({ formik }: MarketingPreferencesProps) => {
  const [gState, setGState] = useSafeContext({
    componentName: "MarketingPreferences",
  });
  // const preferPhoneCode = "3EHPHIF7";
  // const preferEmailCode = "3EHPHID7";
  // const [optIn, setOptIn] = useState<boolean>(gState?.optIn ?? true);
  const [groupOptIn, setGroupOptIn] = useState<boolean>(
    gState?.groupOptIn ?? false,
  );
  // const [isMobile, setIsMobile] = useState(window.visualViewport.width < 770);

  const [_thirdPartyPhone, setThirdPartyPhone] = useState<boolean>(
    gState?.thirdPartyPhone ?? false,
  );
  const [_thirdPartyEmail, setThirdPartyEmail] = useState<boolean>(
    gState?.thirdPartyEmail ?? false,
  );
  const [adminPhone, setAdminPhone] = useState<boolean>(
    gState?.adminPhone ?? false,
  );
  const [adminEmail, setAdminEmail] = useState<boolean>(
    gState?.adminEmail ?? false,
  );
  const [adminOptOut, setAdminOptOut] = useState<boolean>(
    gState?.adminOptOut ?? false,
  );
  const [iConfirm, setIConfirm] = useState<boolean>(gState?.iConfirm ?? false);

  const handleIConfirmClick = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const checked = e.target.checked;
    setIConfirm(checked);
    setGState({ ...gState, iConfirm: checked });
    formik.setFieldValue("iConfirm", checked);
  };

  const updateGroupMarketingOptIn = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    /// for the Group Marketing
    const checked = e.target.checked;
    setGroupOptIn(checked);
    setGState({
      ...gState,
      groupOptIn: checked, // Add this line to persist to global state
      thirdPartyEmail: gState?.adminEmail,
      thirdPartyPhone: gState?.adminPhone,
    });
    setThirdPartyEmail(gState?.adminEmail);
    setThirdPartyPhone(gState?.adminPhone);
  };

  const handleAdminEmailClick = (): void => {
    const newAdminEmail = !adminEmail;
    setAdminEmail(newAdminEmail);
    setGState({
      ...gState,
      adminEmail: newAdminEmail,
      adminOptOut: false,
      thirdPartyEmail: groupOptIn ? newAdminEmail : false,
    });
    // if admin email is selected, deselect opt out
    if (newAdminEmail) {
      setAdminOptOut(false);
    }
    if (groupOptIn) {
      setThirdPartyEmail(newAdminEmail);
    }
    formik.setFieldValue(
      "marketingPreferences",
      newAdminEmail || gState?.adminPhone || gState?.adminOptOut,
    );
  };

  const handleAdminPhoneClick = (): void => {
    const newAdminPhone = !adminPhone;
    setAdminPhone(newAdminPhone);
    setGState({
      ...gState,
      adminPhone: newAdminPhone,
      adminOptOut: false,
      thirdPartyPhone: groupOptIn ? newAdminPhone : false,
    });
    // if admin phone is selected, deselect opt out
    if (newAdminPhone) {
      setAdminOptOut(false);
    }
    if (groupOptIn) {
      setThirdPartyPhone(newAdminPhone);
    }
    formik.setFieldValue(
      "marketingPreferences",
      gState?.adminEmail || newAdminPhone || gState?.adminOptOut,
    );
  };

  const handleAdminOptOutClick = (): void => {
    const newOptOut = !adminOptOut;
    setAdminOptOut(newOptOut);

    // if opt out is selected, deselect others and update global state
    if (newOptOut) {
      setAdminPhone(false);
      setAdminEmail(false);
      setGroupOptIn(false);
      setThirdPartyEmail(false);
      setThirdPartyPhone(false);
      setGState({
        ...gState,
        adminOptOut: newOptOut,
        adminPhone: false,
        adminEmail: false,
        groupOptIn: false, // Add this line to persist to global state
        thirdPartyEmail: false,
        thirdPartyPhone: false,
      });
    }
    formik.setFieldValue(
      "marketingPreferences",
      gState?.adminEmail || gState?.adminPhone || newOptOut,
    );
  };

  return (
    <>
      <div className="content_section mt-3">
        <h3 className="journey-section-titles  mb-4">
          Marketing<span className="blueFont"> preferences</span>.
        </h3>
        <p className="lufga-light mb-4">
          We’d like to keep you up to date with the latest products, services,
          and exclusive offers and competitions from Velosure. We securely
          protect your personal data. You are welcome to unsubscribe at any
          time. If you wish to receive this information, please select your
          preferred method (s) of contact:
        </p>
        <div className="d-flex mb-5">
          <div className="row">
            <PreferenceButton
              label="Telephone"
              isActive={adminPhone}
              onClick={handleAdminPhoneClick}
            />
            <PreferenceButton
              label="Email"
              isActive={adminEmail}
              onClick={handleAdminEmailClick}
            />{" "}
            <PreferenceButton
              label="Opt out"
              isActive={adminOptOut}
              onClick={handleAdminOptOutClick}
            />
            <div className="col-12 mt-2">
              {formik.touched.marketingPreferences &&
              formik.errors.marketingPreferences ? (
                <small className="redFont">
                  {formik.errors.marketingPreferences}
                </small>
              ) : null}
            </div>
          </div>
        </div>
        {(adminEmail || adminPhone) && (
          <div>
            <h3 className="journey-section-titles mb-4">
              Our<span className="blueFont"> group products</span>
            </h3>

            <div className="form-check mb-5 container">
              <div className="row">
                <div className="col-1">
                  <input
                    disabled={adminOptOut}
                    style={{ marginLeft: "0px" }}
                    className="form-check-input"
                    type="checkbox"
                    id="updateMarketingOptIn"
                    checked={groupOptIn}
                    onChange={updateGroupMarketingOptIn}
                  />
                </div>
                <div className="col-11">
                  {" "}
                  <p className="form-check-label lufga-light">
                    Velosure Cycle Insurance are part of the Connexus Group. All
                    of these companies are able to give preferential rates on
                    their products and services. If you would like to be
                    contacted about these additional products and services,
                    please tick this box.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="content_section mt-3">
        <h3 className="journey-section-titles  mb-4">
          Your data
          <span className="blueFont"> and how it will be used.</span>.
        </h3>

        <p className="lufga-light mb-4">
          We may check information with third parties to confirm your details,
          prevent fraud and give you the best price and payment options. A
          credit reference agency may carry out a quotation search, which will
          appear on your credit file as a soft quotation search (not a hard
          credit application).
        </p>
        <p className="lufga-light mb-4">
          Velosure Insurance is sold and administered by Lawshield UK Ltd,
          please refer to the{" "}
          <a
            href="/Privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="blueFont"
          >
            privacy policy
          </a>{" "}
          for information regarding how your personal data will be used.
        </p>
        <p className="lufga-light mb-4">
          Velosure Insurance is underwritten by Chubb European Group SE. Chubb
          use personal information which you supply to us for underwriting,
          policy administration, claims management and other insurance purposes,
          as further described in their Master Privacy Policy.
        </p>

        {/* confirmation button - linked to Formik, that will need to be ticked to proceed */}
        <div className="form-check mb-5 container">
          <div className="row">
            <div className="col-1">
              <input
                style={{ marginLeft: "0px" }}
                className="form-check-input"
                type="checkbox"
                id="IConfirm"
                name="iConfirm"
                checked={iConfirm}
                onChange={handleIConfirmClick}
              />
            </div>
            <div className="col-11">
              <p className="form-check-label lufga-light">
                <strong>
                  I confirm that I have read and understood the important
                  information above.
                </strong>
              </p>
              {formik.touched.iConfirm && formik.errors.iConfirm && (
                <div className="text-danger small">
                  {formik.errors.iConfirm}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketingPreferences;
