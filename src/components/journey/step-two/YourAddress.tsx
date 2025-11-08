import { useContext, useState } from "react";
import { JourneyContext } from "@/context/journeyStore";
import AddressDropdown from "./AddressDropdown";
import AddressPreview from "./AddressPreview";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import {
  type YourAddressFormValues,
  type AddressLookupResponse,
  type AddressItem,
} from "@/models/JourneyComponentTypes";

const YourAddress = () => {
  const [gState, setGState] = useContext(JourneyContext)!;
  const [data, setData] = useState<AddressLookupResponse | null>(null);
  const [_isPending, setIsPending] = useState<boolean>(true);
  const [_error, setError] = useState<string | null>(null);
  const [addressesFound, setAddressesFound] = useState<boolean>(false); //use to show/hide the postcode select list

  const formik = useFormik<YourAddressFormValues>({
    initialValues: {
      postalCode: "",
      houseNumber: "",
    },
    validationSchema: Yup.object({
      postalCode: Yup.string()
        .required("Postcode required to add address.")
        .min(6, "Postcode is too short")
        .max(10, "Postcode is too long"),
    }),
    onSubmit: (_values, { resetForm: _resetForm }) => {},
  });

  useEffect(() => {
    if (!data) return;

    const filtered = data.value.filter((hn: AddressItem) => {
      return hn.houseNumber === formik.values.houseNumber;
    });

    if (filtered.length === 1) {
      //we found one matching address so lets hide all the guff and show this address.
      showSingleAddress(filtered[0]);
    }
  }, [data]);

  const showSingleAddress = (selectedAddress: AddressItem): void => {
    //set the globalstate with these address details
    //console.log(selectedAddress);
    setGState({
      ...gState,
      organisation:
        selectedAddress.organisation !== null
          ? selectedAddress.organisation
          : "",
      houseNo:
        selectedAddress.houseNumber !== null ? selectedAddress.houseNumber : "",
      houseName:
        selectedAddress.houseName !== null ? selectedAddress.houseName : "",
      houseSubName:
        selectedAddress.subHouseName !== null
          ? selectedAddress.subHouseName
          : "",
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
      hideAddressForm: true,
    });

    setAddressesFound(false);
  };

  useEffect(() => {
    if (formik.touched.postalCode) {
      //this effect will trigger on load, so ignore it unless the postcode box has been touched
      setAddressesFound(false);
      setGState({ ...gState, hideAddressForm: true });
      formik.resetForm({ values: 0 });
    }
  }, [gState.showAddressPreview]);

  const handleFindAddress = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const url = `${import.meta.env.VITE_VELOSURE_API_URL}/api/AddressLookup/AddressLookup?postcode=${formik.values.postalCode}`;
    //console.log(url);
    const options = {
      method: "GET",
      headers: {
        "X-API-KEY": import.meta.env.VITE_VELOSURE_API_KEY,
        "content-type": "application/json",
      },
    };

    fetch(url, options)
      .then((res) => {
        //console.log(res);
        if (!res.ok) {
          throw Error("No address data could be found.");
        }
        return res.json();
      })
      .then((data: AddressLookupResponse) => {
        setData(data);
        setIsPending(false);
        setError(null);
        setAddressesFound(true);
      })
      .catch((err: Error) => {
        setIsPending(false);
        setError(err.message);
      });
  };

  return (
    <section className="container container_narrow mt-4">
      <div className="content_section">
        <h3 className="journey-section-titles">
          Address where the{" "}
          <span className="blueFont"> bike is usually kept</span>?
        </h3>
        {gState.hideAddressForm == false && (
          // <form onSubmit={formik.handleSubmit} noValidate>
          <div className="row">
            <div id="left" className="col-12 col-sm-6">
              <div className="col-12 col-sm-12 mb-3">
                <label className="form-label">House number or name</label>
                <input
                  type="text"
                  className="form-control"
                  id="houseNumber"
                  placeholder="Enter house name or house number"
                  value={formik.values.houseNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                <label className="form-label mt-3">Postcode*</label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.errors.postalCode
                      ? formik.touched.postalCode && "is-invalid"
                      : formik.touched.postalCode && "is-valid"
                  }`}
                  id="postalCode"
                  placeholder="Enter postcode to search"
                  value={formik.values.postalCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.postalCode && formik.errors.postalCode ? (
                  <small className="redFont mt-1">
                    {formik.errors.postalCode}
                  </small>
                ) : null}
              </div>

              <button
                className="btn btn-primary btn-wider"
                onClick={handleFindAddress}
              >
                Find Address
              </button>

              {addressesFound === true && (
                <AddressDropdown addressList={data} />
              )}
            </div>
          </div>
          // </form>
        )}

        {gState.hideAddressForm == true && <AddressPreview formik={formik} />}
      </div>
    </section>
  );
};

export default YourAddress;
