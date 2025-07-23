import { Routes, Route } from 'react-router-dom';
import Login from './Login-page/Login';
import SignIn from './Login-page/SignIn';
import TenantDashboard from './Pages/TenantDashboard';
import LandlordDashboard from './Pages/LandlordDashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/tenant-dashboard" element={<TenantDashboard />} />
        <Route path="/landlord-dashboard" element={<LandlordDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
