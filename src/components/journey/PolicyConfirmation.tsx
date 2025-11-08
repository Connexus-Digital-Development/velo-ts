import TopNavBlank from "@/components/shared/TopNavBlank";
import RegularBanner from "@/components/shared/RegularBanner";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSafeContext } from "@/context/journeyStore/useSafeContext";
import { initialJourneyState } from "@/context/journeyStore";
import currency from "currency.js";
import CompletedBreadcrumbs from "@/components/shared/CompletedBreadcrumbs";
import type { JourneyState } from "@/models";

const PolicyConfirmation = () => {
    const [gState, setGState] = useSafeContext({
        componentName: "PolicyConfirmation",
    });
    const [state, setState] = useState<JourneyState | null>(null);
    const navigate = useNavigate();
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const policyReference = params.get("policyReference");

    useEffect(() => {
        if (state === null) {
            setState(gState);
        }
        setGState(initialJourneyState);
        sessionStorage.removeItem("context");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!policyReference) {
        navigate(`/`);
    }
    if (state === null) {
        return <></>;
    }
    if (state !== null && state.annualGrossPremium < 1) {
        navigate(`/`);
    }
    return (
        <>
            <div className="container-fluid mb-5 blueBorderBott">
                <TopNavBlank theme={"white"} />
                <RegularBanner
                    headlineLine1={"Your bike insurance quote"}
                    headlineLine2={""}
                    subheadlineLine1={
                        "Tell us about you, your bike and cover you need."
                    }
                    subheadlineLine2={""}
                    hasCTA={"false"}
                    CTAText={"Get a quote"}
                />
                <CompletedBreadcrumbs />
                <section
                    className="container container_narrow mb-4"
                    id="confirmation-section"
                >
                    <div className="content_section mt-3 ">
                        <div className="greenBox">
                            <div className="row">
                                <div className="col-12">
                                    <h2></h2>
                                    <h2>
                                        {state.paymentTypeIsAnnual
                                            ? "Thank you! Your payment was successful."
                                            : "Thank you! Your Direct Debit has been successfully setup."}
                                    </h2>
                                    <svg
                                        className="mt-5 mb-5"
                                        width="258.329"
                                        height="239.724"
                                        viewBox="0 0 258.329 239.724"
                                    >
                                        <defs>
                                            <clipPath id="clip-path">
                                                <rect
                                                    id="Rectangle_1002"
                                                    data-name="Rectangle 1002"
                                                    width="258.329"
                                                    height="239.724"
                                                    fill="#fff"
                                                />
                                            </clipPath>
                                        </defs>
                                        <g
                                            id="Group_1948"
                                            data-name="Group 1948"
                                            transform="translate(-841 -473)"
                                        >
                                            <g
                                                id="Group_1952"
                                                data-name="Group 1952"
                                                transform="translate(841 473)"
                                            >
                                                <g
                                                    id="Group_1951"
                                                    data-name="Group 1951"
                                                    clipPath="url(#clip-path)"
                                                >
                                                    <path
                                                        id="Path_2165"
                                                        data-name="Path 2165"
                                                        d="M302.054,13.6a10.033,10.033,0,0,0-14.114,1.445L167.958,162.408l-53.274-53.422a10.032,10.032,0,1,0-14.206,14.168l61.131,61.3a10.03,10.03,0,0,0,7.1,2.948q.251,0,.505-.012a10.033,10.033,0,0,0,7.275-3.685L303.5,27.713A10.033,10.033,0,0,0,302.054,13.6"
                                                        transform="translate(-47.423 -5.516)"
                                                        fill="#fff"
                                                    />
                                                    <path
                                                        id="Path_2166"
                                                        data-name="Path 2166"
                                                        d="M203.738,119.769a84.124,84.124,0,0,1-54.146,78.6l-.038.014q-.921.35-1.852.68l-.161.057q-.871.306-1.751.594l-.279.09q-.823.266-1.654.515l-.395.117q-.778.23-1.562.444l-.5.135q-.738.2-1.48.381l-.6.145q-.7.168-1.406.324-.341.076-.682.149-.667.142-1.34.273-.381.075-.763.146-.638.119-1.28.228-.418.071-.836.138-.612.1-1.227.186c-.3.044-.6.086-.9.126q-.592.079-1.186.15-.475.057-.952.109-.575.062-1.153.116c-.332.031-.664.061-1,.088-.376.031-.752.058-1.129.084-.343.023-.686.046-1.03.065-.37.021-.743.038-1.115.054-.351.015-.7.029-1.057.04s-.736.019-1.105.026-.716.012-1.074.013c-.153,0-.3.006-.457.006-.219,0-.436-.007-.654-.008s-.424,0-.638,0c-.15,0-.3-.009-.448-.012-.345-.007-.689-.017-1.033-.028s-.7-.024-1.045-.04q-.587-.026-1.171-.061-.412-.024-.822-.052-.725-.049-1.445-.112l-.462-.041A84.1,84.1,0,1,1,183.274,64.788a1.6,1.6,0,0,0,2.451-.046l21.629-26.564a2.361,2.361,0,0,0-.149-3.142c-2.481-2.539-5.091-4.98-7.793-7.413a3.7,3.7,0,0,0-5.027.218,19.8,19.8,0,0,1-23.6,3.279,19.947,19.947,0,0,1-9.6-17.049,18.651,18.651,0,0,1,.637-4.564,3.509,3.509,0,0,0-.026-2.349,3.6,3.6,0,0,0-2.377-2.482,117.662,117.662,0,0,0-16.61-4.59,3.751,3.751,0,0,0-4.37,2.623,19.423,19.423,0,0,1-18.8,14.643A19.473,19.473,0,0,1,100.846,2.926,3.714,3.714,0,0,0,96.474.085a110.1,110.1,0,0,0-16.609,4.59,3.512,3.512,0,0,0-2.508,4.034,4.7,4.7,0,0,0,.1.8,19.437,19.437,0,0,1,.638,4.63,19.945,19.945,0,0,1-9.6,16.983A19.8,19.8,0,0,1,44.9,27.84a3.7,3.7,0,0,0-5.026-.218,107.911,107.911,0,0,0-12.24,12.239,3.842,3.842,0,0,0-.95,2.69,3.437,3.437,0,0,0,1.169,2.8,18.779,18.779,0,0,1,3.06,23.143,19.083,19.083,0,0,1-21.854,8.96,3.993,3.993,0,0,0-4.589,2.4A112.082,112.082,0,0,0,.094,96.684a3.9,3.9,0,0,0-.09.941A3.52,3.52,0,0,0,2.717,101.3a19.275,19.275,0,0,1,14.419,18.565A19.276,19.276,0,0,1,2.717,138.427a4.034,4.034,0,0,0-2.623,4.614,146.364,146.364,0,0,0,4.371,16.828,3.993,3.993,0,0,0,4.589,2.4,18.973,18.973,0,0,1,21.854,8.96,18.779,18.779,0,0,1-3.06,23.143,3.437,3.437,0,0,0-1.169,2.8,3.841,3.841,0,0,0,.95,2.69A129.419,129.419,0,0,0,39.871,212.1a3.7,3.7,0,0,0,5.026-.218,19.8,19.8,0,0,1,23.6-3.278,19.945,19.945,0,0,1,9.6,17.049,18.65,18.65,0,0,1-.639,4.564,3.52,3.52,0,0,0,.027,2.35,3.606,3.606,0,0,0,2.378,2.482,117.667,117.667,0,0,0,16.609,4.589,3.752,3.752,0,0,0,4.371-2.623,19.421,19.421,0,0,1,37.591-.218,3.712,3.712,0,0,0,4.37,2.841,110.094,110.094,0,0,0,16.61-4.589,3.514,3.514,0,0,0,2.508-4.034,4.563,4.563,0,0,0-.105-.8,19.512,19.512,0,0,1-.637-4.63,19.311,19.311,0,0,1,33.2-13.7,3.7,3.7,0,0,0,5.027.218,107.866,107.866,0,0,0,12.239-12.239,3.842,3.842,0,0,0,.951-2.69,3.439,3.439,0,0,0-1.17-2.8,18.783,18.783,0,0,1-3.059-23.143,19.084,19.084,0,0,1,21.854-8.96,3.993,3.993,0,0,0,4.59-2.4,111.946,111.946,0,0,0,4.37-16.828,3.8,3.8,0,0,0,.09-.942,3.518,3.518,0,0,0-2.712-3.672,19.16,19.16,0,0,1,0-37.129,3.527,3.527,0,0,0,2.7-3.8,3.4,3.4,0,0,0-.081-.818,146.154,146.154,0,0,0-4.37-16.828,3.994,3.994,0,0,0-4.59-2.4,18.989,18.989,0,0,1-7.943.558,2.544,2.544,0,0,0-2.34.9L202.609,100.2a3.007,3.007,0,0,0-.6,2.51,84.447,84.447,0,0,1,1.733,17.062"
                                                        transform="translate(0 0)"
                                                        fill="#fff"
                                                    />
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                    <h1>You're all set!</h1>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-sm-6 mt-5 whatNext">
                                <h2 className="blueFont">So, what next?</h2>
                                <p>
                                    You should shortly receive an email
                                    confirming your details and cover.
                                </p>
                                <p>
                                    In the meantime, why not check out what's
                                    been happening in the cycling world and drop
                                    by our <Link to="/Pitstop">blog</Link> page.
                                </p>
                            </div>
                            <div className="col-12 col-sm-6 mt-5">
                                <div className="bordered">
                                    <h4>
                                        Policy{" "}
                                        <span className="blueFont">
                                            details
                                        </span>
                                        .
                                    </h4>
                                    <div className="row d-none d-lg-block">
                                        <div className="row">
                                            <div className="col-6 align-left">
                                                <p>Policy reference</p>
                                                <p>Name</p>
                                                <p>Payment type</p>
                                                <p
                                                    hidden={
                                                        !state.paymentTypeIsAnnual
                                                    }
                                                >
                                                    Paid
                                                </p>
                                                <p
                                                    hidden={
                                                        state.paymentTypeIsAnnual
                                                    }
                                                >
                                                    Deposit Paid
                                                </p>
                                                <p
                                                    hidden={
                                                        state.paymentTypeIsAnnual
                                                    }
                                                >
                                                    First Instalment
                                                </p>
                                                <p
                                                    hidden={
                                                        state.paymentTypeIsAnnual
                                                    }
                                                >
                                                    Subsequent Payments
                                                </p>
                                            </div>
                                            <div className="col-6 blueFont align-right">
                                                <p>{policyReference}</p>
                                                <p>
                                                    {state.forename}{" "}
                                                    {state.surname}
                                                </p>
                                                <p>
                                                    {state.paymentTypeIsAnnual
                                                        ? "Annual"
                                                        : "Monthly"}
                                                </p>
                                                <p
                                                    hidden={
                                                        !state.paymentTypeIsAnnual
                                                    }
                                                >
                                                    £
                                                    {currency(
                                                        state.annualGrossPremium,
                                                        {
                                                            symbol: "",
                                                            separator: ",",
                                                        },
                                                    ).format()}
                                                </p>
                                                <p
                                                    hidden={
                                                        state.paymentTypeIsAnnual
                                                    }
                                                >
                                                    £
                                                    {currency(state.deposit, {
                                                        symbol: "",
                                                        separator: ",",
                                                    }).format()}
                                                </p>
                                                <p
                                                    hidden={
                                                        state.paymentTypeIsAnnual
                                                    }
                                                >
                                                    £
                                                    {currency(
                                                        state.instalmentsFirstPayment,
                                                        {
                                                            symbol: "",
                                                            separator: ",",
                                                        },
                                                    ).format()}
                                                </p>
                                                <p
                                                    hidden={
                                                        state.paymentTypeIsAnnual
                                                    }
                                                >
                                                    £
                                                    {currency(
                                                        state.instalmentsSubsequentPayments,
                                                        {
                                                            symbol: "",
                                                            separator: ",",
                                                        },
                                                    ).format()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row d-block d-lg-none">
                                        <div className="col-12 align-left">
                                            <p>Policy reference</p>
                                            <p className="blueFont">
                                                {policyReference}
                                            </p>
                                            <p>Name</p>
                                            <p className="blueFont">
                                                {state.forename} {state.surname}
                                            </p>
                                            <p>Payment type</p>
                                            <p className="blueFont">
                                                {state.paymentTypeIsAnnual
                                                    ? "Annual"
                                                    : "Monthly"}
                                            </p>
                                            <p
                                                hidden={
                                                    !state.paymentTypeIsAnnual
                                                }
                                            >
                                                Paid
                                            </p>
                                            <p
                                                className="blueFont"
                                                hidden={
                                                    !state.paymentTypeIsAnnual
                                                }
                                            >
                                                £
                                                {state.paymentTypeIsAnnual
                                                    ? currency(
                                                          state.annualGrossPremium,
                                                          {
                                                              symbol: "",
                                                              separator: ",",
                                                          },
                                                      ).format()
                                                    : currency(
                                                          state.instalmentsFirstPayment,
                                                          {
                                                              symbol: "",
                                                              separator: ",",
                                                          },
                                                      ).format()}
                                            </p>
                                            <p
                                                hidden={
                                                    state.paymentTypeIsAnnual
                                                }
                                            >
                                                Deposit Paid
                                            </p>
                                            <p
                                                className="blueFont"
                                                hidden={
                                                    state.paymentTypeIsAnnual
                                                }
                                            >
                                                £
                                                {currency(state.deposit, {
                                                    symbol: "",
                                                    separator: ",",
                                                }).format()}
                                            </p>
                                            <p
                                                hidden={
                                                    state.paymentTypeIsAnnual
                                                }
                                            >
                                                First Instalment
                                            </p>
                                            <p
                                                className="blueFont"
                                                hidden={
                                                    state.paymentTypeIsAnnual
                                                }
                                            >
                                                £
                                                {currency(
                                                    state.instalmentsFirstPayment,
                                                    {
                                                        symbol: "",
                                                        separator: ",",
                                                    },
                                                ).format()}
                                            </p>
                                            <p
                                                hidden={
                                                    state.paymentTypeIsAnnual
                                                }
                                            >
                                                Subsequent Payments
                                            </p>
                                            <p
                                                className="blueFont"
                                                hidden={
                                                    state.paymentTypeIsAnnual
                                                }
                                            >
                                                £
                                                {currency(
                                                    state.instalmentsSubsequentPayments,
                                                    {
                                                        symbol: "",
                                                        separator: ",",
                                                    },
                                                ).format()}
                                            </p>
                                        </div>
                                        <div className="col-6 blueFont align-right"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default PolicyConfirmation;
