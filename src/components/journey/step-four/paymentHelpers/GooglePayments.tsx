import PaymentSupport from "./PaymentSupport";

export class GooglePayments
{
    static processPayment(orderRef, tokenData, PaymentData) {
        const paymentToken = tokenData.paymentMethodData.tokenizationData.token;
        const data = {
            Token: paymentToken,
            paymentRef: orderRef,
            authData: PaymentSupport.AuthData,
            Payment: PaymentData.payment
        };
        return PaymentSupport.PaymentAPIRequest("ProcessGoogle", data);
    }

    static logCancellation(orderRef, PaymentData) {
        const data = {
            paymentRef: orderRef,
            authData: PaymentSupport.AuthData,
            Payment: PaymentData.payment
        };
        return PaymentSupport.PaymentAPIRequest("CancelGoogle", data);
    }

    static logError(message, orderRef, PaymentData) {
        const data = {
            paymentRef: orderRef,
            authData: PaymentSupport.AuthData,
            Payment: PaymentData.payment,
            ErrorMessage: message
        };
        return PaymentSupport.PaymentAPIRequest("ErrorGoogle", data);
    }
}

export default GooglePayments;