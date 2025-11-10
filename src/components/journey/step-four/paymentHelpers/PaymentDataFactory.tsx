// import PaymentSupport from "./PaymentSupport";

export interface PaymentDataType {
  // Payment Data
  Price: string;
  Currency: string;

  Number: string;
  ExpMonth: string;
  ExpYear: string;
  CVN: string;
  CardHolderName: string;

  AddressLine: string;
  City: string;
  Province: string;
  State: string;
  PostalCode: string;

  Challenged: string;
  ServerTransactionID: string;
  Quote: string;

  Retries: number;

  forPost: () => any;
  setPaymentData: (
    quote: string,
    price: string,
    code: string,
    number: string,
    expMonth: string,
    expYear: string,
    cvn: string,
    holder: string,
  ) => void;
  incrementRetries: () => void;
  setRetryData: (challenge: string, transactionID: string) => void;
  setAddressData: (
    addressLine: string,
    city: string,
    province: string,
    county: string,
    postcode: string,
  ) => void;
}

// Factory function to create PaymentData instances
export const createPaymentData = (): PaymentDataType => {
  // Generate initial transaction reference
  const generateTransactionRef = (): string => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  };

  // Populate browser data for payment
  const populateBrowserData = () => {
    return {
      javaEnabled: navigator && navigator.javaEnabled(),
      javascriptEnabled: true,
      language: navigator && navigator.language,
      screenHeight: 1080,
      screenWidth: 1920,
      time: new Date(),
      timezoneOffset: new Date().getTimezoneOffset() / 60,
      userAgent: navigator && navigator.userAgent,
    };
  };

  // Populate store information
  const populateStoreInfo = () => {
    return {
      name: import.meta.env.VITE_PAYMENTS_SITE_NAME,
      code: import.meta.env.VITE_PAYMENTS_SITE_PREFIX,
      countryCode: import.meta.env.VITE_PAYMENTS_COUNTRY_CODE,
    };
  };

  const data: PaymentDataType = {
    // Initial values
    Price: "0.00",
    Currency: "GBP",

    Number: "",
    ExpMonth: "",
    ExpYear: "",
    CVN: "",
    CardHolderName: "",

    AddressLine: "",
    City: "",
    Province: "",
    State: "",
    PostalCode: "",

    Challenged: "false",
    ServerTransactionID: generateTransactionRef(),
    Quote: "",

    Retries: 0,

    forPost: function () {
      return {
        browserData: populateBrowserData(),
        store: populateStoreInfo(),
        payment: {
          card: {
            number: this.Number,
            expMonth: this.ExpMonth,
            expYear: this.ExpYear,
            cvn: this.CVN,
            cardHolderName: this.CardHolderName,
          },
          amount: this.Price,
          currencyCode: this.Currency,
        },
        // authData: PaymentSupport.AuthData,
        address: {
          streetAddress1: this.AddressLine,
          city: this.City,
          province: this.Province,
          state: this.State,
          postalCode: this.PostalCode,
        },
        challenged: this.Challenged,
        paymentRef: this.Quote,
        transactionID: this.ServerTransactionID,
      };
    },

    setPaymentData: function (
      quote: string,
      price: string,
      code: string,
      number: string,
      expMonth: string,
      expYear: string,
      cvn: string,
      holder: string,
    ) {
      this.Number = number;
      this.ExpMonth = expMonth;
      this.ExpYear = expYear;
      this.CVN = cvn;
      this.CardHolderName = holder;

      this.Price = price;
      this.Currency = code;

      if (this.Retries > 0) {
        this.Quote = quote + "_" + this.Retries;
      } else {
        this.Quote = quote;
      }
    },

    incrementRetries: function () {
      this.Retries = this.Retries + 1;

      if (this.Retries > 0) {
        this.Quote = this.Quote + "_" + this.Retries;
      }
    },

    setRetryData: function (challenge: string, transactionID: string) {
      this.Challenged = challenge;
      this.ServerTransactionID = transactionID;
    },

    setAddressData: function (
      addressLine: string,
      city: string,
      province: string,
      county: string,
      postcode: string,
    ) {
      this.AddressLine = addressLine;
      this.City = city;
      this.Province = province;
      this.State = county;
      this.PostalCode = postcode;
    },
  };

  return data;
};

// Export the factory function as default for backward compatibility
export default createPaymentData;
