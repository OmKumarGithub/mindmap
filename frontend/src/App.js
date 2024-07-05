
import Navbar from "./component/Navbar";
import View from "./component/View";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About  from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Mindmaps from "./pages/Mindmaps";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Workspace from "./pages/Workspace";

function App() {
  return (
 <>
  <BrowserRouter>
  
    <Routes>
    <Route path="/" element={<Layout />}>
    <Route path="" element={<Home />}/>
    <Route path="/contact" element={<Contact />} />
    <Route path="/about" element={<About />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/mindmaps" element={<Mindmaps></Mindmaps>} />
    <Route path= "workspace" element={<Workspace></Workspace>}/>
    </Route>
    <Route path="/login" element={<Login />} />
    <Route path="/signin" element={<SignIn />} />
    </Routes>
  </BrowserRouter>
  {/* <Navbar></Navbar>
  <View></View> */}

</>
  );
}

export default App;
