import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { CreatePost } from "./pages/CreatePost";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  const [categories, setCategories] = useState([
    "Art",
    "Social",
    "Technology",
    "Literature",
    "News",
    "Other",
  ]);
  const [isAuth, setIsAuth] = useState(false);
  const signOutFunction = () => {
    signOut(auth);
    localStorage.clear();
    setIsAuth(false);
    window.location.pathname = "/login";
  };
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        {isAuth && <Link to="/createpost">Create Post</Link>}
        {!isAuth ? (
          <Link to="/login">Login</Link>
        ) : (
          <button onClick={signOutFunction} className="signoutButton">
            Sign Out
          </button>
        )}
      </nav>
      <Routes>
        <Route
          path="/"
          element={<Home isAuth={isAuth} categories={categories} />}
        />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route
          path="/createpost"
          element={<CreatePost isAuth={isAuth} categories={categories} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
