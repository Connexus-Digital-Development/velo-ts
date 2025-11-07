import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import transactorService from "../../../services/transactorService";
import { useCallback, useState } from "react";
import BannerStep2 from "./BannerStep2";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "@/components/shared/Spinner";
import Laptops from "@/assets/images/BannerLaptops.png";
import React from "react";

const GenerateBanners = () => {
  const query = new URLSearchParams(useLocation().search);
  const sourceOfBusiness = query.get("sourcebusid") ?? 0;
  const [sob, setSob] = useState(false);
  const [pending, setPending] = useState(false);
  const [retailerId, setRetailerId] = useState(sourceOfBusiness);
  const [retailerComeFromUrl, setRetailerComeFromUrl] = useState(false);

  const formik = useFormik({
    initialValues: {
      retailerId: 0,
    },
    validationSchema: Yup.object({
      retailerId: Yup.number().required("Id is required"),
    }),
    onSubmit: (values, { resetForm: _resetForm }) => {
      // use checkSourceOfBusinessIdExists from TransactorService to check if ID exists
      if (values.retailerId > 0) {
        verifyRetailerId(values.retailerId);
      }
    },
  });

  const verifyRetailerId = useCallback(
    (retailerId: string | number) => {
      setPending(true);
      formik.touched.retailerId = true;
      const promise = transactorService.checkSourceOfBusinessIdExists(
        retailerId as string,
      );

      promise.then(
        function (result) {
          if (result.success) {
            setSob(result.value); // sob will be true if the affiliate id is found
            setRetailerId(retailerId);
            if (!result.value && retailerComeFromUrl) {
              setRetailerId(0);
              formik.touched.retailerId = false;
              setRetailerComeFromUrl(false);
            }
            setPending(false);
          }
        },
        function (err: unknown) {
          console.log({ err });
          setPending(false);
          setRetailerComeFromUrl(false);
        },
      );
    },
    [formik.touched, retailerComeFromUrl],
  );

  useEffect(() => {
    if ((sourceOfBusiness as number) > 0) {
      setRetailerComeFromUrl(true);
      verifyRetailerId(sourceOfBusiness);
    }
  }, [sourceOfBusiness, verifyRetailerId]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) =>
    e.target.select();

  return (
    <div className="container-fluid whiteBG  pr oh">
      <div className="container mt-5 mb-5">
        <div className="row">
          <div id="left" className="col-12 col-md-6">
            {!retailerComeFromUrl && (
              <>
                <h3>Step 1</h3>
                <form onSubmit={formik.handleSubmit} noValidate>
                  <div className="col-12 col-md-5">
                    <label>Retailer Id*</label>
                    <br />
                    <input
                      type="text"
                      id="retailerId"
                      className={`form-control ${
                        formik.errors.retailerId
                          ? formik.touched.retailerId === true && "is-invalid"
                          : formik.touched.retailerId === true &&
                            sob === true &&
                            "is-valid"
                      }`}
                      value={formik.values.retailerId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      onFocus={handleFocus}
                    />
                    {formik.touched.retailerId &&
                    formik.errors.retailerId &&
                    !pending ? (
                      <small className="redFont mt-1">
                        {formik.errors.retailerId}
                      </small>
                    ) : null}

                    <p className="mt-3">
                      This will have been provided to you when you registered.
                      If you cannot find your affiliate retailer ID, please{" "}
                      <Link to="/contact">contact us</Link> and we will re-issue
                      it.
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-green btn-wider mt-2 mb-2 center-on-mobile lufga"
                  >
                    Verify Affiliate ID
                  </button>
                  {pending && <Spinner />}
                </form>

                {formik.touched.retailerId && sob === false && !pending && (
                  <p className="redFont">
                    Retailer ID not verified, please{" "}
                    <Link to="/contact">contact us</Link> for assistance.
                  </p>
                )}
              </>
            )}
            {formik.touched.retailerId && sob === true && (
              <>
                {retailerComeFromUrl ? (
                  <h4 className="pb-5 mb-5 pt-5 mt-5 underline">
                    Retailer Id: {retailerId}
                  </h4>
                ) : (
                  <p className="greenFont">Retailer ID verified</p>
                )}
              </>
            )}
          </div>

          <div id="right" className="col-12 col-md-6 pr">
            <img src={Laptops} className="bannerLaptopImage" alt="" />
          </div>

          <div className="col-12">
            {formik.touched.retailerId && sob === true && (
              <BannerStep2
                retailerId={retailerId}
                retailerComeFromUrl={retailerComeFromUrl}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateBanners;
