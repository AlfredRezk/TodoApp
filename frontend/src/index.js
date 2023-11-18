import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { AuthProvider } from "./context/auth";
import { UiProvider } from "./context/ui";
import { CategoryProvider } from "./context/category";
import { TodoProvider } from "./context/todo";
import { UserProvider } from "./context/user";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <UiProvider>
      <AuthProvider>
       
        <UserProvider>
        <TodoProvider>

          <CategoryProvider>
            <App />
          </CategoryProvider>
                 
 
        </TodoProvider>
        </UserProvider>
      </AuthProvider>
      <ToastContainer />
      </UiProvider>
    </BrowserRouter>
  </React.StrictMode>
);
