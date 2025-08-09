import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Mail, Phone, User } from 'lucide-react';

interface Player {
  name: string;
  age: string;
  phone: string;
}

interface TeamData {
  teamName: string;
  captainName: string;
  captainPhone: string;
  captainEmail: string;
  players: Player[];
}

interface RegistrationConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  teamData: TeamData;
  onProceedToPayment: () => void;
}

const RegistrationConfirmDialog: React.FC<RegistrationConfirmDialogProps> = ({
  isOpen,
  onClose,
  teamData,
  onProceedToPayment
}) => {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleProceedToPayment = async () => {
    if (isProcessingPayment) return; // Prevent multiple clicks
    
    setIsProcessingPayment(true);
    try {
      await onProceedToPayment();
    } catch (error) {
      console.error('Payment initiation error:', error);
      // Reset on error so user can try again
      setIsProcessingPayment(false);
    }
    // Don't reset isProcessingPayment on success - keep it disabled
  };

  return (
    <Dialog open={isOpen} onOpenChange={isProcessingPayment ? () => {} : onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-green-700">Registration Summary</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Team Details Card */}
          <Card>
            <CardContent className="pt-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Team Name</p>
                    <p className="font-medium">{teamData.teamName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Captain</p>
                    <p className="font-medium">{teamData.captainName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{teamData.captainPhone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{teamData.captainEmail}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Players List */}
          <Card>
            <CardContent className="pt-4">
              <h3 className="text-lg font-semibold mb-4">Team Players</h3>
              <div className="space-y-3">
                {teamData.players.map((player, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-lg">
                            {index + 1}. {player.name}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            index < 7 
                              ? "bg-green-100 text-green-700" 
                              : "bg-blue-100 text-blue-700"
                          }`}>
                            {index < 7 ? "Playing XI" : "Substitute"}
                          </span>
                        </div>
                        <div className="flex gap-6 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>Age: {player.age}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            <span>Phone: {player.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-4">
              <h3 className="text-lg font-semibold text-green-700 mb-2">Payment Details</h3>
          
               <p className="text-gray-700">
      Registration Fee: <span className="font-bold text-xl">₹2,299</span>{" "}
      + Service Fee (2.35%): <span className="font-bold text-xl">₹54</span>{" "}
      = Total: <span className="font-bold text-xl">₹2,353</span>
    </p>
              <p className="text-sm text-gray-600 mt-1">Payment will be processed securely through Razorpay</p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="flex-1"
              disabled={isProcessingPayment}
            >
              Edit Details
            </Button>
            <Button 
              onClick={handleProceedToPayment} 
              className="flex-1 bg-gradient-to-r from-mountain-green to-mountain-blue disabled:opacity-50"
              disabled={isProcessingPayment}
              style={{ pointerEvents: isProcessingPayment ? 'none' : 'auto' }}
            >
              {isProcessingPayment ? (
                <>
                  <span className="mr-2">⏳</span>
                  Processing...
                </>
              ) : (
                "Proceed to Payment (₹2,353)"
              )}
            </Button>
          </div>
          
          {isProcessingPayment && (
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Please wait, initiating payment gateway...
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationConfirmDialog;
