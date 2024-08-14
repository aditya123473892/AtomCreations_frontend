import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Contact from "./components/Contact";
import Explore from "./components/Explore";
import { Home } from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login";
import SignupPage from "./components/SignUp";
import ExploreSection from "./components/Explore";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import { CartProvider } from "./components/CartContext";
import AboutUs from "./components/AboutUs";
import JoinUs from "./components/JoinUs";
import PrivacyPolicy from "./components/PrivacyPolicy";
import HelpSupport from "./components/HelpSupport";
import TermsCondition from "./components/TermsCondition";
import CodeofConduct from "./components/CodeofConduct";
import { AuthProvider } from "./components/ContextProvider/AuthContext";
import UserProfile from "./components/UserProfile";
import CheckoutPage from "./components/CheckoutPage";
import RefundAndCancellation from "./components/RefundandCancellation";
import ShippingPolicy from "./components/ShippingPolicy";
import Verification from "./components/Verification";
import MyAccount from "./components/Account";
import ChangePassword from "./components/ChangePassword";
import Wishlist from "./components/Wishlist";
import Orders from "./components/Orders";
import AddressManagement from "./components/Address";
import ResetPassword from "./components/ResetPassword";
import ConfirmationPage from "./components/Conformation";
import PaymentSuccess from "./components/PaymentSuccess";
import ReactGA from "react-ga";
import DownImage from "./assets/down.jpeg"; // Import your image here

const TRACKING_ID = import.meta.env.VITE_TRACKING_ID;

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  const [isDown, setIsDown] = useState(true); // Set this to true when under maintenance
  const [isMobile, setIsMobile] = useState(false); // State to check if it's mobile

  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);

    // Check if the device is mobile
    const checkMobile = () => {
      if (window.innerWidth <= 768) { // You can adjust this breakpoint
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  window.dataLayer.push({
    event: "pageview",
  });

  if (isDown) {
    if (isMobile) {
      return (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
          color: "#000",
          padding: "20px",
        }}>
          <h1>We are currently down for maintenance. Please check back later.</h1>
        </div>
      );
    } else {
      return (
        <div style={{
          width: "90vw",
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${DownImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          textAlign: "center",
          color: "#fff",
          margin: "5vh auto",
          borderRadius: "10px",
          maxWidth: "1200px",
          maxHeight: "90vh",
        }}>
          <h1>We are currently under maintenance. Please check back later.</h1>
        </div>
      );
    }
  }

  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-otp" element={<Verification />} />
          <Route path="/" element={<ExploreSection />} />
          <Route path="/product" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/joinus" element={<JoinUs />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/help&support" element={<HelpSupport />} />
          <Route path="/T&C" element={<TermsCondition />} />
          <Route path="/codeofconduct" element={<CodeofConduct />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/refundandcancellation"
            element={<RefundAndCancellation />}
          />
          <Route path="/shippingpolicy" element={<ShippingPolicy />} />
          <Route path="/profile" element={<MyAccount />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="orders" element={<Orders />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="addresses" element={<AddressManagement />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
