
interface PhonePePaymentRequest {
  merchantId: string;
  merchantTransactionId: string;
  merchantUserId: string;
  amount: number;
  redirectUrl: string;
  redirectMode: string;
  callbackUrl: string;
  mobileNumber?: string;
  paymentInstrument: {
    type: string;
  };
}

interface PhonePeResponse {
  success: boolean;
  code: string;
  message: string;
  data?: {
    merchantId: string;
    merchantTransactionId: string;
    instrumentResponse: {
      type: string;
      redirectInfo: {
        url: string;
        method: string;
      };
    };
  };
}

export class PhonePeService {
  private static readonly MERCHANT_ID = 'PGTESTPAYUAT'; // Test merchant ID
  private static readonly SALT_KEY = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399'; // Test salt key
  private static readonly SALT_INDEX = 1;
  private static readonly API_ENDPOINT = 'https://api-preprod.phonepe.com/apis/pg-sandbox'; // Test endpoint

  static generateTransactionId(): string {
    return 'TXN' + Date.now() + Math.random().toString(36).substr(2, 9);
  }

  static async initiatePayment(amount: number, userPhone?: string): Promise<string> {
    const transactionId = this.generateTransactionId();
    const userId = 'USER' + Date.now();
    
    const paymentRequest: PhonePePaymentRequest = {
      merchantId: this.MERCHANT_ID,
      merchantTransactionId: transactionId,
      merchantUserId: userId,
      amount: amount * 100, // Convert to paise
      redirectUrl: `${window.location.origin}/payment-status?transactionId=${transactionId}`,
      redirectMode: 'REDIRECT',
      callbackUrl: `${window.location.origin}/api/phonepe/callback`,
      mobileNumber: userPhone,
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    };

    try {
      // In a real implementation, this would be done on the backend
      // For demo purposes, we'll simulate the PhonePe payment flow
      const base64Payload = btoa(JSON.stringify(paymentRequest));
      const checksum = await this.generateChecksum(base64Payload);
      
      // Return PhonePe payment URL (simulated)
      const paymentUrl = `${this.API_ENDPOINT}/pg/v1/pay`;
      
      // For demo, we'll redirect to a simulated PhonePe page
      return this.createPhonePeUrl(base64Payload, checksum);
    } catch (error) {
      console.error('PhonePe payment initiation failed:', error);
      throw new Error('Payment initiation failed');
    }
  }

  private static async generateChecksum(payload: string): Promise<string> {
    // In production, this should be done on the backend for security
    // This is a simplified version for demo purposes
    const string = payload + '/pg/v1/pay' + this.SALT_KEY;
    const encoder = new TextEncoder();
    const data = encoder.encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex + '###' + this.SALT_INDEX;
  }

  private static createPhonePeUrl(payload: string, checksum: string): string {
    // For demo purposes, we'll create a simulated payment URL
    // In production, this would be the actual PhonePe payment page
    const params = new URLSearchParams({
      request: payload,
      checksum: checksum
    });
    return `${this.API_ENDPOINT}/pg/v1/pay?${params.toString()}`;
  }

  static async verifyPayment(transactionId: string): Promise<boolean> {
    // In production, this would verify the payment with PhonePe
    // For demo purposes, we'll simulate a successful payment after 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));
    return Math.random() > 0.1; // 90% success rate for demo
  }
}
