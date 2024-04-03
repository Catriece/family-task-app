"use client";

import { createContext, useContext, useState, useRef, FC } from "react";
import { ModalContextInterface, TaskData } from "../../types";

const ModalContext = createContext<ModalContextInterface | null>(null);

type ModalProviderProps = {
  children: React.ReactNode;
};

export const ModalContextProvider = ({ children }: ModalProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // Modal state
  const [addDescription, setAddDescription] = useState<boolean>(false);
  const [edits, setEdits] = useState<TaskData>({
    userId: "",
    title: "",
    description: "",
    priority: 0,
    //dueOn: "",
    index: "",
    completed: false,
  });

  const openModalRef = useRef<boolean>(false);

  const openModal = () => {
    openModalRef.current = true;
    setIsOpen(true);

    //return;
  };
  const closeModal = () => {
    setAddDescription(false);
    openModalRef.current = false;
    setIsOpen(false);
    setEdits({
      userId: "",
      title: "",
      description: "",
      priority: 0,
      //dueOn: "",
      index: "",
      completed: false,
    });

    //return;
  };

  const modalProps = {
    isOpen,
    openModal,
    closeModal,
    edits,
    setEdits,
    addDescription,
    setAddDescription,
  };

  return (
    <ModalContext.Provider value={modalProps}>{children}</ModalContext.Provider>
  );
};

export function useModal(): ModalContextInterface {
  const context = useContext(ModalContext);
  if (context === null) {
    throw new Error("Modal Error");
  }
  return context;
}
