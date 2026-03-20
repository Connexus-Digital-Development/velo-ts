import type { FormikProps } from "formik";
import { Checkbox } from "@mantine/core";
import { useSafeContext } from "@/context/journeyStore";
import type { AboutYouFormValues } from "@/models";

interface MarketingPreferencesProps {
  formik: FormikProps<AboutYouFormValues>;
}

interface PreferenceButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function PreferenceButton({ label, isActive, onClick }: PreferenceButtonProps) {
  return (
    <div className="col-4 preference-option">
      <button
        type="button"
        onClick={onClick}
        className="preferredMethodOfContact preference-icon marketing-preference-button"
        style={
          isActive
            ? { backgroundColor: "#00a8ff", color: "white" }
            : { backgroundColor: "#efefef" }
        }
      >
        {label}
      </button>
    </div>
  );
}

const MarketingPreferences = ({ formik }: MarketingPreferencesProps) => {
  const [gState, setGState] = useSafeContext({
    componentName: "MarketingPreferences",
  });
  const adminPhone = gState.adminPhone ?? false;
  const adminEmail = gState.adminEmail ?? false;
  const adminOptOut = gState.adminOptOut ?? false;
  const groupOptIn = gState.groupOptIn ?? false;
  const iConfirm = gState.iConfirm ?? false;

  const syncMarketingPreference = (
    nextAdminEmail: boolean,
    nextAdminPhone: boolean,
    nextAdminOptOut: boolean,
  ) => {
    formik.setFieldValue(
      "marketingPreferences",
      nextAdminEmail || nextAdminPhone || nextAdminOptOut,
      false,
    );
  };

  const handleIConfirmClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;

    setGState((previousState) => ({
      ...previousState,
      iConfirm: checked,
    }));
    formik.setFieldValue("iConfirm", checked, false);
  };

  const updateGroupMarketingOptIn = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const checked = event.target.checked;

    setGState((previousState) => ({
      ...previousState,
      groupOptIn: checked,
      thirdPartyEmail: checked ? previousState.adminEmail : false,
      thirdPartyPhone: checked ? previousState.adminPhone : false,
    }));
  };

  const handleAdminEmailClick = () => {
    const nextAdminEmail = !adminEmail;

    setGState((previousState) => ({
      ...previousState,
      adminEmail: nextAdminEmail,
      adminOptOut: false,
      thirdPartyEmail: previousState.groupOptIn ? nextAdminEmail : false,
    }));
    syncMarketingPreference(nextAdminEmail, adminPhone, false);
  };

  const handleAdminPhoneClick = () => {
    const nextAdminPhone = !adminPhone;

    setGState((previousState) => ({
      ...previousState,
      adminPhone: nextAdminPhone,
      adminOptOut: false,
      thirdPartyPhone: previousState.groupOptIn ? nextAdminPhone : false,
    }));
    syncMarketingPreference(adminEmail, nextAdminPhone, false);
  };

  const handleAdminOptOutClick = () => {
    const nextOptOut = !adminOptOut;

    setGState((previousState) => ({
      ...previousState,
      adminOptOut: nextOptOut,
      adminPhone: nextOptOut ? false : previousState.adminPhone,
      adminEmail: nextOptOut ? false : previousState.adminEmail,
      groupOptIn: nextOptOut ? false : previousState.groupOptIn,
      thirdPartyEmail: false,
      thirdPartyPhone: false,
    }));
    syncMarketingPreference(false, false, nextOptOut);
  };

  return (
    <>
      <div className="content_section mt-3">
        <h3 className="journey-section-titles mb-4">
          Marketing<span className="blueFont"> preferences</span>.
        </h3>
        <p className="lufga-light mb-4">
          We’d like to keep you up to date with the latest products, services,
          and exclusive offers and competitions from Velosure. We securely
          protect your personal data. You are welcome to unsubscribe at any
          time. If you wish to receive this information, please select your
          preferred method (s) of contact:
        </p>
        <div className="mb-5">
          <div className="row marketing-preference-buttons g-2">
            <PreferenceButton
              label="Telephone"
              isActive={adminPhone}
              onClick={handleAdminPhoneClick}
            />
            <PreferenceButton
              label="Email"
              isActive={adminEmail}
              onClick={handleAdminEmailClick}
            />
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
        <h3 className="journey-section-titles mb-4">
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

        <div className="mb-4">
          <div className="d-flex align-items-start">
            <Checkbox
              radius="md"
              size="lg"
              id="IConfirm"
              name="iConfirm"
              color="velo-blue"
              className="cursorPointer"
              checked={iConfirm}
              onChange={handleIConfirmClick}
            />
            <label
              htmlFor="IConfirm"
              className="pl-2 pt-1 form-check-label lufga-light"
              style={{ cursor: "pointer" }}
            >
              I confirm that I have read and understood the important
              information above.
            </label>
          </div>
          {formik.touched.iConfirm && formik.errors.iConfirm && (
            <div className="text-danger small">{formik.errors.iConfirm}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default MarketingPreferences;
