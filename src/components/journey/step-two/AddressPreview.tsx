import type { FormikProps } from "formik";
import { useSafeContext } from "@/context/journeyStore";
import type { AboutYouFormValues } from "@/models";

interface AddressPreviewProps {
  formik: FormikProps<AboutYouFormValues>;
}

const AddressPreview = ({ formik }: AddressPreviewProps) => {
  const [state, setState] = useSafeContext({
    componentName: "AddressPreview",
  });

  const handleLinkClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setState((previousState) => ({
      ...previousState,
      hideAddressForm: false,
    }));
    formik.setFieldValue("showManualAddress", false, false);
    formik.setFieldValue("hideAddressForm", false, false);
  };

  return (
    <div className="col-12 col-sm-6 addressPreview">
      <address>
        {state.organisation && <p>{state.organisation}</p>}
        <p>
          {state.subHouseName && <>{state.subHouseName} </>}
          {state.houseName && <>{state.houseName}</>}
          {!state.houseName && state.houseNo && <>{state.houseNo}</>}
        </p>
        {state.addressLine1 && <p>{state.addressLine1}</p>}
        {state.addressLine3 && <p>{state.addressLine3}</p>}
        {state.addressLine2 && <p>{state.addressLine2}</p>}
        {state.addressLine4 && <p>{state.addressLine4}</p>}
        <p>{state.postcode}</p>
      </address>
      <button type="button" className="btn-link" onClick={handleLinkClick}>
        Change your address
      </button>
    </div>
  );
};

export default AddressPreview;
