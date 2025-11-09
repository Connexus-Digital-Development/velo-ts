import { useSafeContext } from "@/context/journeyStore";
import {
  type AddressItem,
  type AddressLookupResponse,
} from "@/models/JourneyComponentTypes";

interface AddressDropdownProps {
  addressList: AddressLookupResponse | null;
}

const AddressDropdown = ({ addressList }: AddressDropdownProps) => {
  const [state, setState] = useSafeContext({
    componentName: "AddressDropdown",
  });

  if (!addressList) {
    return <div>No addresses found.</div>;
  }

  // const addressData: AddressItem[] = [];

  // useEffect(() => {
  //   if (addressList === null) {
  //     return;
  //   }
  //   addressData = addressList.value;
  // }, [addressList]);

  // const houseNameOrNumber = (addr: AddressItem): string => {
  //   // check number, then for name if that is blank
  //   if (addr.houseName !== null) return addr.houseNumber || "";
  //   if (addr.subHouseName !== null) return addr.subHouseName;

  //   if (addr.houseNumber !== "") return addr.houseNumber || "";

  //   return "-";
  // };

  const handleAddressSelect = (index: string): void => {
    const selectedAddress = addressList.value[parseInt(index)];
    //console.log(selectedAddress);
    setState({
      ...state,
      organisation:
        selectedAddress.organisation !== null
          ? selectedAddress.organisation
          : "",
      houseNo:
        selectedAddress.houseNumber !== null ? selectedAddress.houseNumber : "",
      houseName:
        selectedAddress.houseName !== null ? selectedAddress.houseName : "",
      subHouseName: selectedAddress.subHouseName ?? "",
      addressLine1:
        selectedAddress.street !== null ? selectedAddress.street : "-",
      addressLine2:
        selectedAddress.townOrCity !== null ? selectedAddress.townOrCity : "-",
      addressLine3:
        selectedAddress.county !== null ? selectedAddress.county : "-",
      addressLine4:
        selectedAddress.country !== null ? selectedAddress.country : "-",
      postcode:
        selectedAddress.postcode !== null ? selectedAddress.postcode : "-",
      showAddressPreview: true,
    });
    //console.log(gState)
  };

  return (
    <div className="container-fluid ">
      <select
        className="form-control form-select mt-3"
        id="AddressDD"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          handleAddressSelect(e.target.value);
        }}
      >
        {addressList.value.map((address: AddressItem, index: number) => {
          return (
            <option key={index} id={`opt-${index}`} value={index}>
              {address.organisation !== null && address.organisation}
              {address.subHouseName !== null && address.subHouseName + ", "}
              {address.houseName !== null && address.houseName + ", "}
              {address.houseNumber} {address.street}, {address.townOrCity}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default AddressDropdown;
