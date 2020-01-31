import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/core";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthModal = ({ isOpen, onClose, headerElem, isLogin }) => {
  const [isFormLogin, setIsFormLogin] = useState(isLogin || true);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent py={5} rounded="lg">
        <ModalHeader>{headerElem}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{isFormLogin ? <LoginForm /> : <SignupForm />}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
