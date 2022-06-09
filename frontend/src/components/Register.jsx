import "./register.css";
import { Room, Cancel } from "@material-ui/icons";
import { useState, useRef } from "react";

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

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    };
    fetch("https://ourmapserver.click/api/users/register", requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        setError(false);
        setSuccess(true);
      })
      .catch((error) => {
        console.error("Register error!", error);
        setError(true);
        setSuccess(false);
      });
  };

  return (
    <div className="registerContainer">
      <div className="logo">
        <Room />
        OurMaps
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