import "./signin.css";
import { Cancel } from "@material-ui/icons";
import { useState, useRef } from "react";

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

    // try {
    // const res = await axios.post("/users/signin", user);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    fetch("http://localhost:8800/api/users/signin", requestOptions)
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
        myStorage.setItem("user", data.username);
        setCurrentUser(data.username);
        setShowSignin(false);
        setError(false);
      })
      .catch((error) => {
        console.error("Sign in error!", error);
        setError(true); //set error state
      });
  };

  return (
    <div className="signinContainer">
      <div className="signinlogo">
        <img src="./logo.png" alt="logo icon" />
        <h3>Sign In</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" ref={userRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button className="signinButton">Sign in</button>
        {error && (
          <span className="signinError">Wrong username or password.</span>
        )}
      </form>
      <Cancel className="signinCancel" onClick={() => setShowSignin(false)} />
    </div>
  );
}
