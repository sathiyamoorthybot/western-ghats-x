import crypto from "crypto";
import axios from "axios";

const merchantId = process.env.PHONEPE_MERCHANT_ID;
const saltKey = process.env.PHONEPE_SALT_KEY;
const saltIndex = process.env.PHONEPE_SALT_INDEX;

export const initiatePayment = async (req, res) => {
  const transactionId = "TID" + Date.now(); // generate unique txn ID
  const amountInPaise = 200000; // ₹2,000 in paise

  const redirectUrl = `https://yourdomain.com/payment-status?txnId=${transactionId}`;
  const callbackUrl = `https://yourdomain.com/api/payment-callback`;

  const payload = {
    merchantId,
    transactionId,
    merchantUserId: "user123", // replace as needed
    amount: amountInPaise,
    redirectUrl,
    redirectMode: "POST",
    callbackUrl,
    paymentInstrument: {
      type: "PAY_PAGE"
    }
  };

  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64");

  // Generate X-VERIFY hash
  const dataToHash = payloadBase64 + "/pg/v1/pay" + saltKey;
  const xVerify = crypto.createHash("sha256").update(dataToHash).digest("hex") + "###" + saltIndex;

  try {
    const response = await axios.post(
      "https://api.phonepe.com/apis/hermes/pg/v1/pay",
      { request: payloadBase64 },
      {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": xVerify,
          "X-MERCHANT-ID": merchantId
        }
      }
    );

    const { data } = response;

    if (data.success) {
      // Redirect user to PhonePe payment page
      return res.redirect(data.data.instrumentResponse.redirectInfo.url);
    } else {
      return res.status(400).json({ message: data.code });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Payment initiation failed" });
  }
};
