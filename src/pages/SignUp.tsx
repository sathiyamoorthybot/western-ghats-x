import AuthForm from "@/components/AuthForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SignUp = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 pt-16">
        <AuthForm type="signup" />
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;