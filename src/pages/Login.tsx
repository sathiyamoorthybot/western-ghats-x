import AuthForm from "@/components/AuthForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleSignInButton from "@/components/GoogleSignInButton";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 pt-2 flex flex-col items-center">
        {/* Email / Password Login */}
        <AuthForm type="login" />

        {/* Divider */}
        <div className="my-6 flex items-center w-full max-w-sm">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Sign-in Button */}
        <GoogleSignInButton />
      </div>
      <Footer />
    </div>
  );
};

export default Login;
