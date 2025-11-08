import PaymentSupport from "./PaymentSupport";

export class CardPayments
{
    static processPayment(data)
    {
        return PaymentSupport.PaymentAPIRequest('ProcessCard', data);
    }

    static trigger3dsChallenge(target, requestData)
    {
        if (requestData.requiresChallenge) {
            const form = document.createElement("form");
            form.setAttribute("method", "POST");
            form.setAttribute("action", requestData.challengeLocation);
            form.setAttribute("target", target);
            // form.style.width = "100%";
            // form.style.height = "100%";
            // form.style.position = "absolute";
            // form.style.display = "block";
            const input = document.createElement("input");
            input.setAttribute("type", "hidden");
            input.setAttribute("name", "creq");
            input.setAttribute("value", requestData.challengeData);
            form.appendChild(input);
            document.body.appendChild(form);
            form.submit();
        }
    }
}

export default CardPayments;

