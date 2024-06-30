
import Navbar from "./component/Navbar";
import View from "./component/View";
import Home from "./pages/Home";
import Contact from "./pages/Contact";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";

function App() {
  return (
 <>
  <BrowserRouter>
  
    <Routes>
    <Route path="/" element={<Layout />}>
    <Route path="" element={<Home />}/>
    <Route path="/contact" element={<Contact />} />


    </Route>
    </Routes>
  </BrowserRouter>
  {/* <Navbar></Navbar>
  <View></View> */}

</>
  );
}

export default App;
