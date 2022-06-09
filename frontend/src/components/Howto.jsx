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
        <h4>Welcome and thank you for checking out my app!</h4>
        <h4>Here are some things you can do:</h4>
        <br />
        <p>
          <span>Move the map -</span> On desktop, move the map by holding
          left-click and dragging the mouse, tilt the map by holding right-click
          and dragging the mouse, or zoom in/out with the scroll wheel. <br />
          On mobile devices, move the map by dragging the screen, or zoom in/out
          by spreading/pinching the screen.
          <br />
          <br />
          <span>View pins -</span> Select a pin on the map to view its info. Red
          pins are pins created by your user account; orange pins are pins
          created by other users. <br />
          <br />
          <span>Create a pin -</span> Double-click (or double-press for mobile)
          the map to create a pin for that location. When not signed in, pins
          created will be anonymous and have no associated username. <br />
          <br />
          <span>Register an Account -</span> Select the "Register" button in the
          top right to register an account. Remember your username and password;
          it will be used for signing in. Your email will only be used for a
          future password recovery feature. <br />
          <br />
          <span>Sign in -</span> Select the "Sign in" button in the top right to
          sign in to a registered account. When signed in, pins you create will
          be associated to your username and be colored red.
          <br /> <br />
          <span>Delete your pin -</span> Feature to be added. Currently, you
          cannot delete your pins, so be certain of the pins you create!
          <br /> <br />
          <span className="sub">
            For any assistance, please feel open to contacting me: text +1 (253)
            391-0447 or email tydan.wk@gmail.com.
          </span>
        </p>
      </div>
      <Cancel className="howtoCancel" onClick={() => setShowHowto(false)} />
    </div>
  );
}
