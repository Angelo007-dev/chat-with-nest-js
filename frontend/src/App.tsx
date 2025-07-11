
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './modules/Auth/components/Register';
import Home from './components/Home';
import SignIn from './modules/Auth/components/SignIn';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<SignIn/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
