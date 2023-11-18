import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const URL = process.env.REACT_APP_API_URL;
  const list = async() => {
    try{
        const token = localStorage.getItem("token");
        const url = `${URL}/api/todos/`
        const res = await axios.get(url, 
        {headers: { Authorization: `Bearer ${token}` }});
   
        setTodos(res.data.data.data);
    }catch(error){
        console.log(error);
        toast.error(error.response.data.error)
    }
  };
  const create = async(data) => {
    try{
        const token = localStorage.getItem("token");
       await axios.post(`${URL}/api/todos/`,data, 
        {headers: { Authorization: `Bearer ${token}` }});
        toast.success("Todo created successfully");
        list();
    }catch(error){
        console.log(error);
        toast.error(error.response.data.error)
    }
  };

  const remove = async(id) => {
  
    try{
        const token = localStorage.getItem("token");
      await axios.delete(`${URL}/api/todos/${id}`, 
        {headers: { Authorization: `Bearer ${token}`}});
        toast.success("Todo removed successfully");
        list();
    }catch(error){
        console.log(error);
        toast.error(error.response.data.error)
    }
  };

  const update = async(id, data) => {
    try{
        const token = localStorage.getItem("token");
         await axios.put(`${URL}/api/todos/${id}`,data, 
        {headers: { Authorization: `Bearer ${token}` }});
        toast.success("Todo updated successfully");
        list();
    }catch(error){
        console.log(error);
        toast.error(error.response.data.error)
    }
  };

  const read = async(id) => {
    try{
        const token = localStorage.getItem("token");
        const url = `${URL}/api/todos/${id}`
        const res = await axios.get(url, 
        {headers: { Authorization: `Bearer ${token}` }});
        return res.data
    }catch(error){
        console.log(error);
        toast.error(error.response.data.error)
    }
  };

  return (
    <TodoContext.Provider value={{todos, list, create, remove, update, read}}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = ()=> useContext(TodoContext);