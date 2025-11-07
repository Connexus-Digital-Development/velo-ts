import { JourneyContext } from "@/context/journeyStore";
import { useContext } from "react";
import { type AddressPreviewProps } from "@/models/JourneyComponentTypes";

const AddressPreview = ({ formik }: AddressPreviewProps) => {
  const [state, setState] = useContext(JourneyContext);
  const handleLinkClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setState({ ...state, hideAddressForm: false });
    formik.setFieldValue("showManualAddress", false);
    formik.setFieldValue("hideAddressForm", false);
  };

  return (
    <div className="col-12 col-sm-6 addressPreview">
      <address>
        {state.organisation !== null && <p>{state.organisation}</p>}
        <p>
          {state.subHouseName !== null && <>{state.subHouseName} </>}
          {state.houseName !== null && <>{state.houseName}</>}
          {(state.houseName == null || state.houseName?.length < 1) &&
            state.houseNo !== null && <>{state.houseNo}</>}
        </p>
        {state.addressLine1 !== null && <p> {state.addressLine1} </p>}
        {state.addressLine3 !== null && <p>{state.addressLine3} </p>}
        {state.addressLine2 !== null && <p>{state.addressLine2} </p>}
        {state.addressLine4 !== null && <p>{state.addressLine4} </p>}
        <p>{state.postcode}</p>
      </address>
      <button className="btn-link" onClick={handleLinkClick}>
        Change your address
      </button>
    </div>
  );
};

export default AddressPreview;
