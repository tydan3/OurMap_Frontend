import "./howto.css";
import { Cancel, Room } from "@material-ui/icons";

export default function Howto({ setShowHowto }) {
  return (
    <div className="howtoContainer">
      <div className="logo">
        <Room />
        OurMaps
      </div>
      <div className="textContainer">
        <h3>Welcome and thank you for checking out my app!</h3>
        <h4>Here are some things you can currently do:</h4>
        <p>
          <span>View pins -</span> Select any pin on the map to view its info.
          Red pins are pins created by your user account, orange are pins
          created by other user accounts. <br />
          <br />
          <span>Create pins -</span> Double-click (or double-press for mobile)
          anywhere on the map to start creating a pin for that location. Pins
          created w/o being signed in will be anonymous and have no associated
          username. <br />
          <br />
          <span>Register an Account -</span> Select the "Register" button in the
          top right to register an account. You will be asked to enter a
          username, email, and password. Remember your username and password; it
          will be used for signing in. Your email will be used for a future
          password recovery feature. <br />
          <br />
          <span>Sign in-</span> Select the "Sign in" button in the top right to
          sign in to a registered account. You will be asked to enter your
          username and password. When signed in, pins you create will be
          associated to your username and be colored red.
        </p>
      </div>
      <Cancel className="howtoCancel" onClick={() => setShowHowto(false)} />
    </div>
  );
}
