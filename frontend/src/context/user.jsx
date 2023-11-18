import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
const [users, setUsers] = useState([]);



  const URL = process.env.REACT_APP_API_URL;
  const list = async() => {
    try{
        const token = localStorage.getItem("token");
        const url = `${URL}/api/users/`
        const res = await axios.get(url, 
        {headers: { Authorization: `Bearer ${token}` }});
        setUsers(res.data.data.data);
    }catch(error){
        console.log(error);
        toast.error(error.response.data.error)
    }
  };
  const create = async(data) => {
    try{
        const token = localStorage.getItem("token");
       await axios.post(`${URL}/api/users/`,data, 
        {headers: { Authorization: `Bearer ${token}` }});
        toast.success("User created successfully");
        list();
    }catch(error){
        console.log(error);
        toast.error(error.response.data.error)
    }
  };

  const remove = async(id) => {
    try{
        const token = localStorage.getItem("token");
      await axios.delete(`${URL}/api/users/${id}`, 
        {headers: { Authorization: `Bearer ${token}` }});
        toast.success("User removed successfully");
        list();
    }catch(error){
        console.log(error);
        toast.error(error.response.data.error)
    }
  };

  const update = async(id, data) => {
    try{
        const token = localStorage.getItem("token");
         await axios.put(`${URL}/api/users/${id}`,data, 
        {headers: { Authorization: `Bearer ${token}` }});
        toast.success("User updated successfully");
        list();
    }catch(error){
        console.log(error);
        toast.error(error.response.data.error)
    }
  };

  const read = async(id) => {
    try{
        const token = localStorage.getItem("token");
        const url = `${URL}/api/users/${id}`
        const res = await axios.get(url, 
        {headers: { Authorization: `Bearer ${token}` }});
        return res.data
    }catch(error){
        console.log(error);
        toast.error(error.response.data.error)
    }
  };


  return (
    <UserContext.Provider value={{users, list, create, remove, update, read}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = ()=> useContext(UserContext);