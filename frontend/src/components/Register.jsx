import "./register.css";
import { Cancel } from "@material-ui/icons";
import { useState, useRef } from "react";

export default function Register({ setShowRegister }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [coords, setCoords] = useState(null);
  const [addClicked, setAddClicked] = useState(false);
  const userRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      username: userRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      lat: coords.lat,
      long: coords.long,
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

  const handleAddLocation = () => {
    // get user coordinates
    function getLoc(pos) {
      setCoords({
        lat: pos.coords.latitude,
        long: pos.coords.longitude,
      });
    }
    navigator.geolocation.getCurrentPosition(getLoc);
    setAddClicked(true);
  };

  return (
    <div className="registerContainer">
      <div className="logo">
        <img src="./logo.png" alt="logo icon" />
        <h3>Registration</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Enter an email" ref={emailRef} />
        <input type="text" placeholder="Enter a username" ref={userRef} />
        <input
          type="password"
          placeholder="Enter a password"
          ref={passwordRef}
        />

        {!addClicked && (
          <button
            className="registerButton addLocation"
            type="button"
            onClick={handleAddLocation}
          >
            Add Current Location
          </button>
        )}
        {addClicked && (
          <span className="success">Location recieved. Thank you!</span>
        )}
        <button className="registerButton" type="submit">
          Register
        </button>
        {success && (
          <span className="success">Success! You can now sign in.</span>
        )}
        {error && (
          <span className="registerError">Error! Something went wrong.</span>
        )}
      </form>
      <Cancel
        className="registerCancel"
        onClick={() => setShowRegister(false)}
      />
    </div>
  );
}
