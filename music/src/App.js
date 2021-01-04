import React from "react";
import { Route, BrowserRouter as Router } from 'react-router-dom';

import Home from "./pages/Home.js";
import Search from "./pages/Search.js";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Search} />
      <Route path="/artist" component={Home} />
    </Router>
  );
}

export default App;
