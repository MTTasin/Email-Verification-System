import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import DashboardLayout from "./Dashboard/DashboardLayout";
import DashboardPage from "./Dashboard/DashboardPage";
import SingleVerify from "./Dashboard/SingleVerify";
import BulkVerify from "./Dashboard/BulkVerify";
import ApiKeys from "./Dashboard/ApiKeys";
import Billing from "./Dashboard/Billing";
import Settings from "./Dashboard/Settings";
import ProtectedRoute from "./Components/ProtectedRoute";
import ConnectionTest from "./Components/ConnectionTest";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/verify-single" element={<SingleVerify />} />
            <Route path="/dashboard/verify-bulk" element={<BulkVerify />} />
            <Route path="/dashboard/api-keys" element={<ApiKeys />} />
            <Route path="/dashboard/billing" element={<Billing />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/connection-test" element={<ConnectionTest />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
