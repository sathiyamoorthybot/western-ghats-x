import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

export default function GoogleSignInButton() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, // works for localhost & prod
      },
    });

    if (error) {
      console.error("Error logging in with Google:", error.message);
    }
  };

  return (
    <Button
      onClick={handleLogin}
      className="w-full bg-red-500 hover:bg-red-600 text-white"
    >
      Continue with Google
    </Button>
  );
}
