import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import CreateRecipe from './pages/CreateRecipe';
import SearchRecipe from './pages/SearchRecipe';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import SingleRecipe from './pages/SingleRecipe';
import EditRecipe from './pages/EditRecipe';
import DeleteRecipe from './pages/DeleteRecipe';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/create" element={<CreateRecipe/>}/>
          <Route path="/search" element={<SearchRecipe/>}/>
          <Route path="/recipe/:id" element={<SingleRecipe/>} />
          <Route path='/edit/:id' element={<EditRecipe/>} />
          <Route path='/delete/:id' element={<DeleteRecipe/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
