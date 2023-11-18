import { Routes, Route } from "react-router-dom";

import { Dashboard, Home, Login, Register, Profile, Category , User} from "./pages";
import { Layout } from "./components";
import PrivateRouter from "./PrivateRouter";





const App = () => {



  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="/app" element={<PrivateRouter/>}>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="categories" element={<Category/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="users" element={<User/>}/>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
