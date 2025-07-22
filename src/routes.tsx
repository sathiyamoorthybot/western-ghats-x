import { Routes, Route } from "react-router-dom";
import Profile from "@/pages/Profile";
// ... other imports

const AppRoutes = () => (
  <Routes>
    {/* other routes */}
    <Route path="/profile" element={<Profile />} />
  </Routes>
);

export default AppRoutes;
