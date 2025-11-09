// Auth data interface matching CentralPayment.Models.GlobalPay.AuthData
export interface AuthData {
  appId?: string;
  appKey?: string;
  apiPath?: string;
  merchant?: string;
  account?: string;
  key?: string;
  testMode?: boolean;
}

// Payment interface matching CentralPayment.Models.GlobalPay.Payment
export interface PaymentData {
  card?: CardData;
  amount: number;
  currencyCode?: string;
}

// Address interface matching CentralPayment.Models.GlobalPay.Address
export interface AddressData {
  streetAddress1?: string;
  streetAddress2?: string;
  streetAddress3?: string;
  city?: string;
  province?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  countryCode?: string;
  name?: string;
}

// Card interface matching CentralPayment.Models.GlobalPay.Card
export interface CardData {
  number?: string;
  expMonth?: number;
  expYear?: number;
  cvn?: string;
  cardHolderName?: string;
}

// Browser data interface (inferred from PaymentRequest usage)
export interface BrowserData {
  acceptHeader?: string;
  ipAddress?: string;
  userAgent?: string;
  colorDepth?: number;
  javaEnabled?: boolean;
  language?: string;
  screenHeight?: number;
  screenWidth?: number;
  timeZoneOffset?: number;
}

// Payment request interface matching CentralPayment.Models.GlobalPay.PaymentRequest
export interface PaymentRequest {
  token?: string;
  site?: string;
  paymentRef?: string;
  browserData?: BrowserData;
  payment?: PaymentData;
  address?: AddressData;
  authData?: AuthData;
  challenged?: boolean;
  transactionID?: string;
  serverTransactionID?: string;
  ipAddress?: string;
  errorMessage?: string;
}

// PayPal response interface (simplified from CentralPayment.Models.Paypal.PaypalResponse)
export interface PaypalResponse {
  id?: string;
  intent?: string;
  status?: string;
  purchase_units?: any[];
  payer?: any;
  create_time?: string;
  update_time?: string;
  links?: any[];
}

// PayPal request interface matching CentralPayment.Models.Paypal.PaypalRequest
export interface PaypalRequest {
  paypalResponse?: PaypalResponse;
  authData: AuthData;
  success: boolean;
  amount?: number;
  orderId?: string;
  errorMessage?: string;
}

// Payment response interface matching CentralPayment.Models.PaymentResponse
export interface PaymentResponse {
  id?: number;
  paymentType?: string;
  responseCode?: string;
  responseMessage?: string;
  orderId?: string;
  authorizationCode?: string;
  amount?: number;
  pasRef?: string;
  serverTransactionId?: string;
  srd?: string;
  isErrored?: boolean;
  errorMessage?: string;
  createdDate?: string;
  requiresChallenge: boolean;
  challengeLocation: string;
  challengeData: string;
  paymentRef?: string;
}

// Apple Pay validation request interface matching CentralPayment.Models.ApplePay.ValidateRequest
export interface AppleValidationRequest {
  appleUrl: string;
  store: string;
  host: string;
}

// Apple Pay validation response interface matching CentralPayment.Models.ValidateResponse
export interface AppleValidationResponse {
  token?: string;
}

// 3DS Challenge result interface matching CentralPayment.Models.GlobalPay.PaymentChallengeResult
export interface PaymentChallengeResult {
  cres?: string;
}
