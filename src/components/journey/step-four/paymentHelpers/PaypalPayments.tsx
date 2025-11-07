import PaymentSupport from "./PaymentSupport";

export class PaypalPayments
{
    static processPayment(details, orderRef, paymentAmount)
    {
        return PaymentSupport.PaymentAPIRequest("ProcessPaypal", { authData: PaymentSupport.AuthData, paypalResponse: details, orderId: orderRef, amount:  paymentAmount});
    }

    static logCancellation(orderRef, paymentAmount)
    {
        return PaymentSupport.PaymentAPIRequest("CancelPaypal", { authData: PaymentSupport.AuthData, paypalResponse: null, orderId: orderRef, amount:  paymentAmount});
    }

    static logError(message, orderRef, paymentAmount)
    {
        return PaymentSupport.PaymentAPIRequest("ErrorPaypal", { authData: PaymentSupport.AuthData, paypalResponse: null, orderId: orderRef, amount:  paymentAmount, errorMessage: message});
    }
}

export default PaypalPayments;