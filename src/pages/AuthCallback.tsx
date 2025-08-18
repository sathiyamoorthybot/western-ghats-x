// src/pages/AuthCallback.tsx
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const finishLogin = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Auth error:", error.message);
        navigate("/");
        return;
      }

      if (data.session) {
        console.log("✅ User logged in:", data.session.user);
        // You can also store session in context/localStorage here
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    };
    finishLogin();
  }, [navigate]);

  return <p className="text-center mt-10">Signing you in...</p>;
}
