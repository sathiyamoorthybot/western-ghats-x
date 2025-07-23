// pages/checkout.tsx
import { useRouter } from "next/router";

const CheckoutPage = () => {
  const router = useRouter();
  const { teamName, captainName, phone, email } = router.query;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 py-10 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Confirm Team Registration</h1>

        <div className="space-y-4 text-lg">
          <p><strong>Team Name:</strong> {teamName}</p>
          <p><strong>Captain Name:</strong> {captainName}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Email:</strong> {email}</p>
        </div>

        <div className="mt-8 text-center">
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            onClick={() => alert("Proceed to PhonePe Payment here")}
          >
            Pay ₹2,000 with PhonePe
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
