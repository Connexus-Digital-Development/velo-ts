import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import currency from "currency.js";
import { Link } from "react-router-dom";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { IndividualBikeFormValues } from "@/models/JourneyComponentTypes";
import type { Bike } from "@/models";
import { useSafeContext } from "@/context/journeyStore/useSafeContext";
import ElectricBikeIcon from "@/assets/svgs/electric-bike-icon.svg?url";
import RegularBikeIcon from "@/assets/svgs/regular-bike-icon.svg?url";

interface IndividualBikeProps {
  bike: import("@/models").Bike;
  validateNextButton?: boolean;
}
const createValidationSchema = (gState: any, bike: Bike) =>
  Yup.object({
    bikeMake: Yup.string()
      .required("Bike Make is required")
      .min(2, "This bike name is too short")
      .max(20, "This bike make name is too long"),
    bikeModel: Yup.string()
      .required("Bike Model is required")
      .min(2, "This bike model is too short")
      .max(40, "This bike model name is too long"),
    bikeValue: Yup.number()
      .required("Bike Value is required")
      .min(500, "Only bikes valued £500 or more can be insured")
      .max(
        20000 -
          ((gState?.bikes
            ?.map((m: Bike) => Number(m.value))
            .reduce((a: number, b: number) => a + b, 0) ?? 0) -
            Number(bike.value)),
        "Sorry, you've exceeded our £20,000 online quoting limit. Please call us on 0800 083 3035 for a personalised quote",
      ),
  });

// the template for each bike in the bike list
const IndividualBike = ({ bike, validateNextButton }: IndividualBikeProps) => {
  const [gState, setGState] = useSafeContext({
    componentName: "IndividualBike",
  });
  const [editMode, SetEditMode] = useState(false);
  const [showEditBikeMessage, setShowEditBikeMessage] = useState(false);
  const [opened, { close, open }] = useDisclosure(false);
  const [electricAgreed, setElectricAgreed] = useState(false);

  function enforceMinMax(el: HTMLInputElement) {
    if (el.value !== "") {
      if (parseInt(el.value) < parseInt(el.min)) {
        el.value = el.min;
      }
      if (parseInt(el.value) > parseInt(el.max)) {
        el.value = el.max;
      }
    }
  }

  useEffect(() => {
    if (validateNextButton && gState.currentlyEditingABike) {
      setShowEditBikeMessage(true);
    }
  }, [validateNextButton, gState.currentlyEditingABike]);

  const formik = useFormik<IndividualBikeFormValues>({
    initialValues: {
      //usually these are set to null/empty except we want to pre populate the data we wish to edit (passed as a prop)
      id: bike.id,
      bikeMake: bike.make,
      bikeModel: bike.model,
      bikeValue: bike.value,
      isElectric: bike.isElectric,
    },
    validationSchema: createValidationSchema(gState, bike),
    onSubmit: (values, { resetForm: _resetForm }) => {
      if (values.isElectric && !electricAgreed) {
        return open();
      }
      setElectricAgreed(false);
      close();
      setShowEditBikeMessage(false);
      const editedBike = {
        id: bike.id,
        make: values.bikeMake,
        model: values.bikeModel,
        value: values.bikeValue,
        isElectric: values.isElectric,
        AccessoryCover: bike.AccessoryCover,
        SportsCover: bike.SportsCover,
        WorldWideCover: bike.WorldWideCover,
        PublicAccidentRoadRage: bike.PublicAccidentRoadRage,
      };

      const bikes = gState.bikes.map((bike: Bike) => {
        if (bike.id === editedBike.id) {
          return editedBike;
        }
        return bike;
      });

      // bike = editedBike;

      setGState({
        ...gState,
        bikes: bikes,
        currentlyEditingABike: false,
        currentlyAddingABike: false,
        resetAwayValue: true,
        awayValue: 0,
        generateQuote: true,
        yourQuoteCrumb:
          gState.validatedRules !== null ? 0 : gState.yourQuoteCrumb,
      });
      SetEditMode(false);
    },
  });

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowEditBikeMessage(false);
    formik.setFieldValue("isElectric", bike.isElectric ?? false, false);
    resetForm();
    formik.resetForm();
  };

  const handleRemove = (id: number) => {
    const filteredArray = gState.bikes.map((a) => {
      // make a copy
      return { ...a };
    });
    // create a new array that doesnt include the bike we want to delete. Set this as the new bike collection.
    const filtered = filteredArray.filter((x) => x.id !== id);
    setGState({
      ...gState,
      bikes: filtered,
      currentlyEditingABike: false,
      currentlyAddingABike: false,
      resetAwayValue: true,
      awayValue: 0,
      generateQuote: true,
      yourQuoteCrumb:
        gState.validatedRules !== null ? 0 : gState.yourQuoteCrumb,
    }); // copy new version to the main object - dont change the state directly
    // resetForm();
  };

  const handleEdit = () => {
    // get the bike from journeyContext using this id above
    const bikeEdited = { ...bike };
    setGState((prevState) => {
      return {
        ...prevState,
        id: bikeEdited.id,
        make: bikeEdited.make,
        model: bikeEdited.model,
        value: bikeEdited.value,
        isElectric: bikeEdited.isElectric,
        currentlyEditingABike: true,
        resetAwayValue: true,
        awayValue: 0,
        generateQuote: true,
      };
    });

    // expand this form and display the fields to edit, hiding the top section
    SetEditMode(true);
  };

  const resetForm = () => {
    setGState((prevState) => {
      return {
        ...prevState,
        id: undefined,
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
    SetEditMode(false);
  };

  const thisBike = bike;

  const handleIsElectric = (
    e: React.MouseEvent<HTMLButtonElement>,
    flag: boolean,
  ) => {
    e.preventDefault();
    formik.setFieldValue("isElectric", flag, false);
  };

  return (
    <>
    <section className="container container_narrow mt-3">
      <Modal
        opened={opened}
        onClose={close}
        size="lg"
             centered
        withCloseButton={false}
      >
        <div>
          <p>
            Please confirm the electric cycle maximum motor power does not
            exceed 250 Watts and the electric assistance cut-off speed does not
            exceed 15.5mph. We do not insure electric cycles that exceed this
            criteria, as the bike comes under the Road Traffic Act, which means
            tax and licensing –{" "}
            <a
              href="https://www.gov.uk/electric-bike-rules"
              target="_blank"
              rel="noreferrer"
            >
              see Electric bikes: licensing, tax and insurance
            </a>{" "}
            for further details.
          </p>

          <div className="d-flex gap-2 mt-3">
            <div className="flex-fill">
            <button
              type="button"
              id="Add-this-bike"
              onClick={() => {
                setElectricAgreed(true);
                formik.submitForm();
              }}
              className="btn btn-primary m-1 btn-100 pt-2 pb-2"
            >
              Save Changes
            </button>
            </div>

            <div className="flex-fill">
            <button
              type="button"
              onClick={(e) => {
                handleCancel(e);
                close();
              }}
              className="btn btn-secondary btn-100 pt-2 pb-2"
            >
              Cancel
            </button>
            </div>
          </div>
        </div>
      </Modal>
      {editMode === false && (
        <div className="content_section">
          <div className="row mb-1">
            <div className="col-2 col-sm-1">
              {thisBike.isElectric === true ? (
                <img src={ElectricBikeIcon} alt="Electric bike icon" />
              ) : (
                <img src={RegularBikeIcon} alt="Regular bike icon" />
              )}
            </div>
            <div className="col-6 col-sm-4 col-lg-5">
              <h3 className="lufga-medium font-21 break">
                {thisBike.make} {thisBike.model}
              </h3>
            </div>
            <div className="col-4 col-sm-1">
              <h3 className="lufga-medium font-21">
                {currency(thisBike.value, {
                  symbol: "£",
                  separator: ",",
                  precision: 0,
                }).format()}
              </h3>{" "}
            </div>
            <div className="offset-4 col-4 offset-sm-1 col-sm-2">
              {" "}
              <button
                className="remove-button btn btn-wider"
                disabled={
                  gState.currentlyEditingABike || gState.currentlyAddingABike
                }
                onClick={(_e) => {
                  handleRemove(bike.id ?? 0);
                }}
              >
                REMOVE
              </button>
            </div>
            <div className="col-4 col-lg-2  offset-sm-1 offset-lg-0 col-sm-1 ">
              <button
                className="edit-button btn btn-wider"
                disabled={
                  gState.currentlyEditingABike || gState.currentlyAddingABike
                }
                onClick={(_e) => {
                  handleEdit();
                }}
              >
                EDIT
              </button>
            </div>
          </div>
          {gState.bikes.length === 1 && (
            <div className="row">
              <div className="col-2 col-sm-1"> </div>
              <div className="col-12 col-sm-8 lighterGreyFont">
                Your cycle will be covered away from home up to £{bike.value}
              </div>{" "}
            </div>
          )}
        </div>
      )}

      {editMode === true && (
        <div className="content_section mt-3">
          <h3 className="lufga-medium">
            Edit<span className="blueFont"> your bike</span>.
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
                    placeholder="Make/manufacturer of your bike"
                    value={formik.values.bikeMake}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.bikeMake && formik.errors.bikeMake ? (
                    <small className="redFont mt-1">
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
                    placeholder="Model of your bike"
                    value={formik.values.bikeModel}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.bikeModel && formik.errors.bikeModel ? (
                    <small className="redFont mt-1">
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
                    min={0}
                    max={10000}
                    onKeyUp={(e) => enforceMinMax(e.currentTarget)}
                    onKeyDown={(e) => enforceMinMax(e.currentTarget)}
                    placeholder="Value of your bike"
                    value={formik.values.bikeValue}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.bikeValue && formik.errors.bikeValue ? (
                    <small className="redFont mt-1">
                      {formik.errors.bikeValue}
                    </small>
                  ) : null}
                </div>
                <div className="mb-3 mt-3">
                  <label className="form-label">Is this bike electric?*</label>
                  <div className="row">
                    <div className="col-6 col-md-4">
                      <button
                        type="button"
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
                        type="button"
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

              <div className="col-12 col-md-6 mb-5 mt-3">
                <div className="form-group">
                  <div className="row">
                    <div className="col-6 col-md-4">
                      <button
                        id="edit-this-bike"
                        type="submit"
                        className="btn btn-primary  mb-2 btn-100"
                      >
                        Save changes
                      </button>
                    </div>
                    <div className="col-6 col-md-4">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="btn btn-secondary  mb-2 btn-100"
                      >
                        Cancel update
                      </button>
                    </div>
                    {showEditBikeMessage && (
                      <small className="redFont mt-1">
                        Please finish editing this bike before continuing
                      </small>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
    </>
  );
};

export default IndividualBike;
