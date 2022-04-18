import "./register.css";
import { Room, Cancel } from "@material-ui/icons";
import { useState, useRef } from "react";
import axios from "axios";

export default function Register({ setShowRegister }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const userRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: userRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post("/users/register", newUser);
      setError(false);
      setSuccess(true);
    } catch (error) {
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <div className="registerContainer">
      <div className="logo">
        <Room />
        OurMap
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={userRef} />
        <input type="email" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="registerButton">Register</button>
        {success && (
          <span className="success">Success! You can now sign in.</span>
        )}
        {error && <span className="error">Error! Something went wrong.</span>}
      </form>
      <Cancel
        className="registerCancel"
        onClick={() => setShowRegister(false)}
      />
    </div>
  );
}
