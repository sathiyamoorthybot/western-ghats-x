export interface PhonePePaymentRequest {
  merchantId: string;
  amount: number;
  merchantTransactionId: string;
  redirectUrl: string;
  redirectMode: string;
  callbackUrl: string;
  paymentInstrument: {
    type: string;
  };
}

export interface PhonePePaymentResponse {
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
  private static readonly MERCHANT_ID = 'M223OJ2NC23VT';
  private static readonly BASE_URL = 'https://api-preprod.phonepe.com/apis/pg-sandbox';
  
  static async initiateCricketTournamentPayment(
    teamName: string, 
    captainPhone: string,
    amount: number = 2000
  ): Promise<PhonePePaymentResponse> {
    const merchantTransactionId = `CT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const paymentRequest: PhonePePaymentRequest = {
      merchantId: this.MERCHANT_ID,
      amount: amount * 100, // Amount in paise
      merchantTransactionId,
      redirectUrl: `${window.location.origin}/cricket-tournament?success=true&txnId=${merchantTransactionId}`,
      redirectMode: 'POST',
      callbackUrl: `${window.location.origin}/api/payment/callback`,
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    };

    try {
      // For now, we'll simulate the PhonePe integration
      // In production, you would make actual API calls to PhonePe
      
      // Simulate payment initiation
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            code: 'PAYMENT_INITIATED',
            message: 'Payment initiated successfully',
            data: {
              merchantId: this.MERCHANT_ID,
              merchantTransactionId,
              instrumentResponse: {
                type: 'PAY_PAGE',
                redirectInfo: {
                  url: `${this.BASE_URL}/pg/v1/pay/${merchantTransactionId}`,
                  method: 'GET'
                }
              }
            }
          });
        }, 1000);
      });
    } catch (error) {
      console.error('PhonePe payment initiation failed:', error);
      throw new Error('Payment initiation failed');
    }
  }

  static async verifyPayment(merchantTransactionId: string): Promise<boolean> {
    try {
      // Simulate payment verification
      // In production, you would verify with PhonePe's API
      
      return new Promise((resolve) => {
        setTimeout(() => {
          // For demo purposes, randomly succeed/fail
          resolve(Math.random() > 0.3); // 70% success rate
        }, 2000);
      });
    } catch (error) {
      console.error('Payment verification failed:', error);
      return false;
    }
  }

  static generatePaymentReference(): string {
    return `CT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}