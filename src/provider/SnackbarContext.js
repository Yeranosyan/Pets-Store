import React, { createContext, useState, useContext } from "react";

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [isSnackbarOpenUserLogged, setIsSnackbarOpenUserLogged] =
    useState(false);
  const [isSnackbarOpenUserCreated, setIsSnackbarOpenUserCreated] =
    useState(false);
  const [isSnackbarUserUpdate, setIsSnackbarUserUpdate] = useState(false);
  const [isSnackbarOpenCreated, setIsSnackbarOpenCreated] = useState(false);
  const [isSnackbarOpenUpdate, setIsSnackbarOpenUpdate] = useState(false);
  const [isSnackbarOpenDelete, setIsSnackbarOpenDelete] = useState(false);
  const [isSnackbarOpenOrder, setIsSnackbarOpenOrder] = useState(false);

  const openSnackbarUserCreated = () => {
    setIsSnackbarOpenUserCreated(true);
  };
  const closeSnackbarUserCreated = () => {
    setIsSnackbarOpenUserCreated(false);
  };

  const openSnackbarLogged = () => {
    setIsSnackbarOpenUserLogged(true);
  };
  const closeSnackbarLogged = () => {
    setIsSnackbarOpenUserLogged(false);
  };

  const openSnackbarUserUpdated = () => {
    setIsSnackbarUserUpdate(true);
  };
  const closeSnackbarUserUpdated = () => {
    setIsSnackbarUserUpdate(false);
  };

  const openSnackbarCreated = () => {
    setIsSnackbarOpenCreated(true);
  };
  const closeSnackbarCreated = () => {
    setIsSnackbarOpenCreated(false);
  };

  const openSnackbarUpdate = () => {
    setIsSnackbarOpenUpdate(true);
  };
  const closeSnackbarUpdate = () => {
    setIsSnackbarOpenUpdate(false);
  };

  const openSnackbarDelete = () => {
    setIsSnackbarOpenDelete(true);
  };
  const closeSnackbarDelete = () => {
    setIsSnackbarOpenDelete(false);
  };

  const openSnackbarPetOrder = () => {
    setIsSnackbarOpenOrder(true);
  };
  const closeSnackbarPetOrder = () => {
    setIsSnackbarOpenOrder(false);
  };

  return (
    <SnackbarContext.Provider
      value={{
        isSnackbarOpenUserCreated,
        openSnackbarUserCreated,
        closeSnackbarUserCreated,

        isSnackbarOpenUserLogged,
        openSnackbarLogged,
        closeSnackbarLogged,

        isSnackbarUserUpdate,
        openSnackbarUserUpdated,
        closeSnackbarUserUpdated,

        isSnackbarOpenCreated,
        openSnackbarCreated,
        closeSnackbarCreated,

        isSnackbarOpenUpdate,
        openSnackbarUpdate,
        closeSnackbarUpdate,

        isSnackbarOpenDelete,
        openSnackbarDelete,
        closeSnackbarDelete,

        isSnackbarOpenOrder,
        openSnackbarPetOrder,
        closeSnackbarPetOrder,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};
