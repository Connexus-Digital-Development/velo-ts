import PaymentSupport from "./PaymentSupport";

export class PaymentData
{
    constructor()
    {
        this.SeverTransactionID = this.generateTransactionRef();
        this.Currency = 'GBP'
        this.Challenged = false
        this.Retries = 0
    }

    //Payment Data
    Price = "0.00"
    Currency = ""

    Number = ""
    ExpMonth = ""
    ExpYear = ""
    CVN = ""
    CardHolderName = ""

    AddressLine = ""
    City = ""
    Province = ""
    State = ""
    PostalCode = ""

    Challenged = ""
    SeverTransactionID = ""
    Quote = ""

    Retries = 0;

    forPost()
    {
        return {
            browserData: this.populateBrowserData(),
            store: this.populateStoreInfo(),
            payment:
            {
                card: {
                    number: this.Number,
                    expMonth: this.ExpMonth,
                    expYear: this.ExpYear,
                    cvn: this.CVN,
                    cardHolderName: this.CardHolderName
                },
                amount: this.Price,
                currencyCode: this.Currency
            },
            authData: PaymentSupport.AuthData,
            address: {
                streetAddress1 : this.AddressLine,
                city : this.City,
                province : this.Province,
                state : this.State,
                postalCode : this.PostalCode
            },
            challenged: this.Challenged,
            paymentRef: this.Quote,
            transactionID: this.ServerTransactionID,
        }
    }

    setPaymentData(quote, price, code, number, expMonth, expYear, cvn, holder)
    {
        this.Number = number;
        this.ExpMonth = expMonth;
        this.ExpYear = expYear;
        this.CVN = cvn;
        this.CardHolderName = holder;

        this.Price = price;
        this.Currency = code;

        if(this.Retries > 0)
        {
            this.Quote = quote + "_" + this.Retries;
        }
        else{
            this.Quote = quote;
        }
    }

    /*Replay of transaction - aka... on failure*/
    incrementRetries()
    {
        this.Retries = this.Retries + 1;

        if(this.Retries > 0)
        {
            this.Quote = this.Quote + "_" + this.Retries;
        }
        else{
            this.Quote = this.Quote;
        }
    }

    /*Retry of transaction, aka, resubmit of 3ds Authorised payment to API*/
    setRetryData(challenge, transactionID)
    {
        this.Challenged = challenge;
        this.ServerTransactionID = transactionID;
    }

    setAddressData(addressLine, city, province, county, postcode)
    {
        this.AddressLine = addressLine;
        this.City = city;
        this.Province = province;
        this.State = county;
        this.PostalCode = postcode;
    }

    populateStoreInfo()
    {
        return  {
            name: import.meta.env.VITE_PAYMENTS_SITE_NAME,
            code: import.meta.env.VITE_PAYMENTS_SITE_PREFIX,
            countryCode: import.meta.env.VITE_PAYMENTS_COUNTRY_CODE
        }
    }

    populateBrowserData()
    {
        return {
            javaEnabled: navigator && navigator.javaEnabled(),
            javascriptEnabled: true,
            language: navigator && navigator.language,
            screenHeight: 1080,
            screenWidth: 1920,
            time: new Date(),
            timezoneOffset: new Date() / 60,
            userAgent: navigator && navigator.userAgent,
        }
         
    }

    generateTransactionRef()
    {
        return  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8); return v.toString(16); });
    }
}

export default PaymentData;