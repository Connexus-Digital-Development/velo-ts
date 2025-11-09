import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useSafeContext } from "@/context/journeyStore/useSafeContext";
import { Link } from "react-router-dom";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { BikeFormValues } from "@/models";

interface AboutYourBikeProps {
  validateNextButton?: boolean;
}

const AboutYourBike = ({ validateNextButton }: AboutYourBikeProps) => {
  const [_addAnotherBike, setAddAnotherBike] = useState(false);
  const [gState, setGState] = useSafeContext({
    componentName: "AboutYourBike",
  });
  const [opened, { close, open }] = useDisclosure(false);
  const [showAddBikeMessage, setShowAddBikeMessage] = useState(false);
  const [isElectric, setIsElectric] = useState(false);
  const [electricAgreed, setElectricAgreed] = useState(false);
  useEffect(() => {
    if (validateNextButton && gState.currentlyAddingABike) {
      setShowAddBikeMessage(true);
    }
  }, [validateNextButton, gState.currentlyAddingABike]);

  useEffect(() => {
    // users could reset the page, clearing the journey context - if this happens we want them to be returned to the step one. We'll use the bike count to test for a reset
    if (gState.bikes.length === 0) {
      setGState({
        ...gState,
        yourCoverCrumb: 0,
        paymentCrumb: 0,
        yourQuoteCrumb: 0,
        yourDetailsCrumb: 0,
        generateQuote: true,
      });
    }
  }, [gState, setGState]);

  const formik = useFormik<BikeFormValues>({
    initialValues: {
      bikeMake: "",
      bikeModel: "",
      bikeValue: "",
      isElectric: gState.isElectric,
    },
    validationSchema: Yup.object({
      bikeMake: Yup.string()
        .required("Bike make is required")
        .min(2, "This bike name is too short")
        .max(20, "This bike make name is too long"),
      bikeModel: Yup.string()
        .required("Please enter a valid model")
        .min(2, "This bike model is too short")
        .max(40, "This bike model name is too long"),
      bikeValue: Yup.number()
        .required("Bike Value is required")
        .min(500, "Only bikes valued £500 or more can be insured")
        .max(
          20000 -
            (gState?.bikes
              ?.map((m) => Number(m.value))
              .reduce((a, b) => a + b, 0) || 0),
          "Sorry, you've exceeded our £20,000 online quoting limit. Please call us on 0800 083 3035 for a personalised quote",
        ),
      isElectric: Yup.boolean()
        .nullable()
        .oneOf([false, true], "Please specify if your bike is electric or not")
        .required("Please specify if your bike is electric or not"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (isElectric && !electricAgreed) {
        return open();
      }
      setElectricAgreed(false);
      close();
      const bike = {
        id: gState.bikes.length + 1,
        make: values.bikeMake,
        model: values.bikeModel,
        value: Number(values.bikeValue),
        isElectric: values.isElectric ?? false,
        AccessoryCover: false,
        SportsCover: false,
        WorldWideCover: false,
        PublicAccidentRoadRage: false,
        lockChecked: false,
      };
      setShowAddBikeMessage(false);
      //update state so that the bikes will be displayed
      const newBikeList = gState.bikes;
      newBikeList.push(bike);

      setGState((prevState) => {
        return {
          ...prevState,
          bikes: newBikeList,
          currentlyAddingABike: false,
          resetAwayValue: true,
          awayValue: 0,
          yourQuoteCrumb:
            gState.validatedRules !== null ? 0 : gState.yourQuoteCrumb,
        };
      });

      const ele = document.getElementById("add-new-bike");
      if (ele !== null)
        ele.scrollIntoView({ behavior: "smooth", block: "center" });
      resetForm();
    },
  });

  // useEffect(() => {
  //   if (gState.bikes.length === 0) {
  //     return setGState(
  //       {
  //         ...gState,
  //         yourCoverCrumb: 2,
  //         paymentCrumb: 0,
  //         yourQuoteCrumb: 0,
  //         yourDetailsCrumb: 0,
  //         generateQuote: true,
  //         selectedCoreScheme: null
  //       },
  //       []
  //     );
  //   }
  //   const updatedState =
  //     modelAdaptorHelper.resetAssumptionsAndDeclarations(gState);
  //   setGState({
  //     ...updatedState,
  //     generateQuote: true,
  //     yourCoverCrumb: 2,
  //     paymentCrumb: 0,
  //     yourQuoteCrumb: gState.yourQuoteCrumb === 2 ? 1 : gState.yourQuoteCrumb,
  //     yourDetailsCrumb:
  //       gState.yourDetailsCrumb === 2 ? 1 : gState.yourDetailsCrumb,
  //     selectedCoreScheme: null
  //   });
  // }, [gState, setGState]);

  const resetForm = () => {
    setAddAnotherBike(false);
    setGState((prevState) => {
      return {
        ...prevState,
        make: "",
        model: "",
        value: 0,
        isElectric: false,
        accessoryCover: false,
        worldwideCover: false,
        sportsCover: false,
        personalAccident: false,
        currentlyEditingABike: false,
        currentlyAddingABike: false,
      };
    });
    formik.resetForm();
  };
  const handleAddAnotherBike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAddAnotherBike(true);
    setGState({ ...gState, currentlyAddingABike: true });
  };

  const handleIsElectric = (
    e: React.MouseEvent<HTMLButtonElement>,
    flag: boolean,
  ) => {
    e.preventDefault(); //
    setIsElectric(flag);
    formik.setFieldValue("isElectric", flag);
  };
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) =>
    e.target.select();

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    resetForm();
  };

  return (
    <section className="container container_narrow ">
      <Modal
        opened={opened}
        onClose={close}
        className="electricBikeModal"
        centered
        withCloseButton={false}
      >
        <p>
          Please confirm the electric cycle maximum motor power does not exceed
          250 Watts and the electric assistance cut-off speed does not exceed
          15.5mph. We do not insure electric cycles that exceed this criteria,
          as the bike comes under the Road Traffic Act, which means tax and
          licensing –{" "}
          <a
            href="https://www.gov.uk/electric-bike-rules"
            target="_blank"
            rel="noreferrer"
          >
            see Electric bikes: licensing, tax and insurance
          </a>{" "}
          for further details.
        </p>
        <div className="row">
          <div className="col-6 mt-3">
            <button
              type="submit"
              id="Add-this-bike"
              onClick={() => {
                setElectricAgreed(true);
                formik.submitForm();
              }}
              className="btn btn-primary m-1 btn-100 pt-2 pb-2"
            >
              Add this bike
            </button>
          </div>

          <div className="col-6  mt-3">
            <button
              onClick={(e) => {
                handleCancel(e);
                close();
              }}
              className="btn btn-secondary btn-100 pt-2 pb-2"
            >
              Don't add this bike
            </button>
          </div>
        </div>
      </Modal>
      {gState.bikes.length > 0 && !gState.currentlyAddingABike && (
        <div className="content_section_transparent mb-5 mt-2">
          <button
            id="add-new-bike"
            disabled={gState.currentlyEditingABike}
            className="btn btn-primary float-start lufga"
            onClick={handleAddAnotherBike}
          >
            Add another bike
          </button>
        </div>
      )}

      {gState.currentlyAddingABike && <div id="add-new-bike"></div>}

      {(gState.bikes.length === 0 || gState.currentlyAddingABike) && (
        <div className="content_section mt-3">
          <h3 className="journey-section-titles">
            About<span className="blueFont"> your bike</span>.
          </h3>
          <div className="row">
            <form onSubmit={formik.handleSubmit} noValidate>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">Make*</label>
                  <input
                    type="text"
                    maxLength={20}
                    className={`form-control ${
                      formik.errors.bikeMake
                        ? formik.touched.bikeMake && "is-invalid"
                        : formik.touched.bikeMake && "is-valid"
                    }`}
                    id="bikeMake"
                    required
                    placeholder="e.g. Cube"
                    value={formik.values.bikeMake}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.bikeMake && formik.errors.bikeMake ? (
                    <small className="redFont mt-1 lufga-light">
                      {formik.errors.bikeMake}
                    </small>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label className="form-label">Model*</label>
                  <input
                    type="text"
                    maxLength={40}
                    className={`form-control ${
                      formik.errors.bikeModel
                        ? formik.touched.bikeModel && "is-invalid"
                        : formik.touched.bikeModel && "is-valid"
                    }`}
                    id="bikeModel"
                    placeholder="e.g. Attention SI"
                    value={formik.values.bikeModel}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.bikeModel && formik.errors.bikeModel ? (
                    <small className="redFont mt-1 lufga-light">
                      {formik.errors.bikeModel}
                    </small>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label className="form-label">Value*</label>
                  <input
                    type="number"
                    className={`form-control ${
                      formik.errors.bikeValue
                        ? formik.touched.bikeValue && "is-invalid"
                        : formik.touched.bikeValue && "is-valid"
                    }`}
                    id="bikeValue"
                    step="100"
                    placeholder="£"
                    value={formik.values.bikeValue}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onFocus={handleFocus}
                  />
                  {formik.touched.bikeValue && formik.errors.bikeValue ? (
                    <div className="redFont  mt-1 lufga-light">
                      {formik.errors.bikeValue}
                    </div>
                  ) : null}
                </div>
                <div className="mb-1 mt-3">
                  <label className="form-label">Is this bike electric?*</label>
                  <br /> {}
                  <div className="row">
                    <div className="col-6 col-md-4">
                      <button
                        className={`btn btn-secondary btn-100 mb-2 mr-1 lufga ${
                          formik.values.isElectric === true
                            ? "primaryFocussed"
                            : ""
                        }`}
                        value="true"
                        onClick={(e) => handleIsElectric(e, true)}
                      >
                        Yes
                      </button>
                    </div>
                    <div className="col-6 col-md-4">
                      <button
                        className={`btn btn-secondary btn-100 mb-2 mr-1 ${
                          formik.values.isElectric === false
                            ? "primaryFocussed"
                            : ""
                        }`}
                        value="false"
                        onClick={(e) => handleIsElectric(e, false)}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
                {formik.touched.isElectric && formik.errors.isElectric ? (
                  <small className="redFont mt-1">
                    {formik.errors.isElectric}
                  </small>
                ) : null}
              </div>

              <div className="col-md-10">
                <p className="bulletPoint">
                  Full information on our policy features can be found{" "}
                  <Link
                    to="/types-we-cover"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    here
                  </Link>
                  .
                </p>
              </div>

              <div className="row">
                <div className="col-6 col-md-2  mt-3">
                  <button
                    type="submit"
                    id="Add-this-bike"
                    className="btn btn-primary m-1 btn-100 pt-2 pb-2"
                  >
                    Add this bike
                  </button>
                </div>
                {gState.bikes?.length > 0 && (
                  <div className="col-6 col-md-2  mt-3">
                    <button
                      onClick={handleCancel}
                      className="btn btn-secondary btn-100 pt-2 pb-2"
                    >
                      Cancel
                    </button>
                  </div>
                )}
                {showAddBikeMessage && (
                  <small className="redFont mt-1">
                    Please add this bike before continuing
                  </small>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutYourBike;
