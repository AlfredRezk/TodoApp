import { createContext, useContext, useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const URL = process.env.REACT_APP_API_URL;

  const register = async (userData) => {
    try{
        const res = await axios.post(`${URL}/api/auth/register`, userData);
        if (!res.data.success) throw new Error("Something went wrong !");
        toast.success("Verify your Email!");
        navigate('/login');
    }catch(error){
        console.log(error);
        toast.error(error.response.data.error)
    }
  };

  const login = async(userData)=>{
    try{
      const res = await axios.post(`${URL}/api/auth/login`, userData);
      setUser(res.data.user);
      // Store the token, username
      localStorage.setItem("username", res.data.user?.username);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.user?.email);
      localStorage.setItem("name", res.data.user?.name);
      localStorage.setItem("role", res.data.user?.role);
      localStorage.setItem("id", res.data.user?._id);
      toast.success("User logged in successfully");

      navigate('/app/dashboard');
  }catch(error){
      console.log(error);
      toast.error(error.response.data.error)
  }
  }

  const logout = async()=>{
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${URL}/api/auth/logout/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        setUser({})
        localStorage.clear();
        toast.success("User successfully Logged out!");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const updatePassword = async(userData)=>{
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`${URL}/api/auth/updatepassword/`, userData,{
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 200) {
        toast.success("Password changed");

      }
    } catch (error) {
      toast.error(error.message);
    }
  }



  return (
    <AuthContext.Provider value={{ register, user, login , logout, updatePassword}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = ()=> useContext(AuthContext);
