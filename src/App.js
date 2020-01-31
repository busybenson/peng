import React, { useContext } from "react";
import { AppContext } from "./authentication/AppProvider";
import AuthModal from "./authentication/AuthModal";
import BookingFlow from "./route-flows/bookingRoute";
import HomePage from "./external-pages/HomePage";
import CelebrityProfile from "./celebrity-ui/CelebrityProfile";
import BookingConfirmation from "./bookings/BookingConfirmation";
import Booking from "./bookings/Booking";

export default function App() {
  const { useAuthDisclosure } = useContext(AppContext);
  const { isOpen, onClose, headerElem, isLogin } = useAuthDisclosure();

  return (
    <div className="App">
      <BookingFlow />
      {/* <CelebrityProfile /> */}
      {/* <BookingConfirmation /> */}
      {/* <Booking /> */}
      {/* <HomePage /> */}

      <AuthModal {...{ isOpen, onClose, headerElem, isLogin }} />
    </div>
  );
}
