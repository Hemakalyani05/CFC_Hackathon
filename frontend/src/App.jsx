import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BloodDonation from './pages/BloodDonation';
import PrivateRoute from './components/PrivateRoute';
// Dashboard to be created next
import Dashboard from './pages/Dashboard';
import HowItWorks from './pages/HowItWorks';

// Temporary placeholder for Dashboard to avoid build errors
// const Dashboard = () => <div className="p-10 text-2xl font-bold text-center">Dashboard (Under Construction)</div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route path="" element={<PrivateRoute />}>
                <Route path="/blood-donation" element={<BloodDonation />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
