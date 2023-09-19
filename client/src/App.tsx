import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import "./App.css";

const Layout = () => {
  return (
    <div>
      <h1>navbar</h1>
      <Outlet></Outlet>
    </div>
  );
};
function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline bg-amber-300">
        Hello world!
      </h1>
    </div>
  );
}

export default App;
