import PaymentSupport from "./PaymentSupport";
export class ApplePayments
{

    static processPayment(orderRef, tokenData, PaymentData) {
        var data = {
            Token: JSON.stringify(tokenData.token.paymentData),
            paymentRef: orderRef,
            authData: PaymentSupport.AuthData,
            Payment: PaymentData.payment
        };
        return PaymentSupport.PaymentAPIRequest("ProcessApple", data);
    }

    static validateSession(validateUrl)
    {
        return PaymentSupport.PaymentAPIRequest("ValidateAppleSession", {appleUrl: validateUrl, store:'Velosure', host:window.location.host });
    }

    
    static logCancellation(orderRef, PaymentData) {
        var data = {
            paymentRef: orderRef,
            authData: PaymentSupport.AuthData,
            Payment: PaymentData.payment
        };
        return PaymentSupport.PaymentAPIRequest("CancelApple", data);
    }

    static logError(message, orderRef, PaymentData) {
        var data = {
            paymentRef: orderRef,
            authData: PaymentSupport.AuthData,
            Payment: PaymentData.payment,
            ErrorMessage: message
        };
        return PaymentSupport.PaymentAPIRequest("ErrorApple", data);
    }

}

export default ApplePayments;
