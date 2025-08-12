import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './landingpage';
import LoginPage from './login';
import SignupPage from './signup';
import DealsPage from './DealsPage';
import PaymentPage from './payment';
import ContactUs from './contactus';
import ConfirmationPage from './conifrmation';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
