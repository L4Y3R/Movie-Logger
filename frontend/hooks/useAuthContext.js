import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
  if (typeof window === "undefined") {
    return {
      /* handle server-side behavior */
    };
  }

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used in an AuthContextProvider");
  }

  return context;
};
