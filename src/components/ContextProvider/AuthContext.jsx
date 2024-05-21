import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
export const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
  const [logindata, setLoginData] = useState("");

  useEffect(() => {
    // setLoginData("")
    const checkLoggedIn = async () => {
      try {
        const YOUR_TOKEN = localStorage.getItem("token");
        if (YOUR_TOKEN) {
          const user = await axios.get(
            "http://localhost:8080/api/user/fetchuser",
            {
              headers: {
                Authorization: `Bearer ${YOUR_TOKEN}`, // Assuming the token is a bearer token
              },
            }
          );
          if (user) {
            console.log(user.data.getUser);
            setLoginData(() => user.data.getUser);
          }
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    checkLoggedIn();
  }, []);
  useEffect(() => {
    console.log("Updated login data:", logindata);

    console.log(logindata);
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ logindata, setLoginData }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
