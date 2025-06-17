import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", { email, password });
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      return true;
    } catch {
      return false;
    }
  };

  return <AuthContext.Provider value={{ user, login }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
