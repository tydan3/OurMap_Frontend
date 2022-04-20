import "./signin.css";
import { Room, Cancel } from "@material-ui/icons";
import { useState, useRef } from "react";
import axios from "axios";

export default function Signin({ setShowSignin, myStorage, setCurrentUser }) {
  const [error, setError] = useState(false);
  const userRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: userRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post("/users/signin", user);
      myStorage.setItem("user", res.data.username);
      setCurrentUser(res.data.username);
      setShowSignin(false);
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="signinContainer">
      <div className="logo">
        <Room />
        OurMap
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={userRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="signinButton">Sign in</button>
        {error && <span className="error">Error! Something went wrong.</span>}
      </form>
      <Cancel className="signinCancel" onClick={() => setShowSignin(false)} />
    </div>
  );
}
