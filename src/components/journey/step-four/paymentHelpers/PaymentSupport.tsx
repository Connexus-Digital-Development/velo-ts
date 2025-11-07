export class PaymentSupport
{
    static getPaymentValue(liveValue)
    {
        return liveValue ?? "0.00";    
    }

    static PaymentAPIRequest(methodUrl, data)
    {
        return fetch(`${import.meta.env.VITE_PAYMENTS_API_PATH}/api/payments/${methodUrl}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: this.DefaultPostHeaders,
        }).then(result => {
            return result.json();
        });
    }

    static DefaultPostHeaders = 
    {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
    }

    static AuthData =
    {
        merchant: import.meta.env.VITE_PAYMENTS_MERCHANT,
        account: import.meta.env.VITE_PAYMENTS_ACCOUNT,
        key: import.meta.env.VITE_PAYMENTS_KEY,
        appId: import.meta.env.VITE_PAYMENTS_API_TOKEN,
        appKey: import.meta.env.VITE_PAYMENTS_API_KEY,
        apiPath: `${import.meta.env.VITE_PAYMENTS_API_PATH}/api/payments`,
        testMode: import.meta.env.VITE_PAYMENTS_TEST_MODE === "true" ? true : false
    }

}

export default PaymentSupport;