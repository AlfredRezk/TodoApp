import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const URL = process.env.REACT_APP_API_URL;
  const list = async() => {
    try{
        const token = localStorage.getItem("token");
        const url = `${URL}/api/categories/`
        const res = await axios.get(url, 
        {headers: { Authorization: `Bearer ${token}` }});
        setCategories(res.data.data.data);
    }catch(error){
        console.log(error);
        toast.error(error.response.data.error)
    }
  };
  const create = async(data) => {
    try{
        const token = localStorage.getItem("token");
       await axios.post(`${URL}/api/categories/`,data, 
        {headers: { Authorization: `Bearer ${token}` }});
        list();
    }catch(error){
        console.log(error);
        toast.error(error.response.data.error)
    }
  };

  const remove = async(id) => {
    try{
        const token = localStorage.getItem("token");
      await axios.delete(`${URL}/api/categories/${id}`, 
        {headers: { Authorization: `Bearer ${token}` }});
        toast.success("Category removed successfully");
        list();
    }catch(error){
        console.log(error);
        toast.error(error.response.data.error)
    }
  };

  const update = async(id, data) => {
    try{
        const token = localStorage.getItem("token");
         await axios.put(`${URL}/api/categories/${id}`,data, 
        {headers: { Authorization: `Bearer ${token}` }});
        toast.success("Category updated successfully");
        list();
    }catch(error){
        console.log(error);
        toast.error(error.response.data.error)
    }
  };

  const read = async(id) => {
    try{
        const token = localStorage.getItem("token");
        const url = `${URL}/api/categories/${id}`
        const res = await axios.get(url, 
        {headers: { Authorization: `Bearer ${token}` }});
        return res.data
    }catch(error){
        console.log(error);
        toast.error(error.response.data.error)
    }
  };

  return (
    <CategoryContext.Provider value={{categories, list, create, remove, update, read}}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = ()=> useContext(CategoryContext);