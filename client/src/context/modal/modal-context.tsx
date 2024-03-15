"use client";

import { createContext, useContext, useState, useRef } from "react";
import { ModalContextInterface, TaskData } from "../../types";

const ModalContext = createContext<ModalContextInterface | null>(null);

export const ModalContextProvider = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // Modal state

  const openModalRef = useRef<boolean>(false);

  const openModal = () => {
    openModalRef.current = true;
    setIsOpen(true);
    return;
  };
  const closeModal = () => {
    openModalRef.current = false;
    setIsOpen(false);
    return;
  };

  const modalProps = {
    isOpen,
    openModalRef,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={modalProps}>{children}</ModalContext.Provider>
  );
};

export function useModal() {
  const context = useContext(ModalContext);
  if (context === null) {
    throw new Error("Modal Error");
  }
  return context;
}
