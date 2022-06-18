import "./howto.css";
import { Cancel, Room } from "@material-ui/icons";

export default function Howto({ setShowHowto }) {
  return (
    <div className="howtoContainer">
      <div className="logo">
        <Room />
        OurMaps
      </div>
      <h4>
        Welcome and thank you for checking out my app! <br />
        Here are some things you can do:
      </h4>

      <div className="textContainer">
        <p>
          <span>Move the map -</span> On desktop, move the map by holding
          left-click and dragging the mouse, tilt the map by holding right-click
          and dragging the mouse, or zoom in/out with the scroll wheel. <br />
          On mobile devices, move the map by dragging the screen, or zoom in/out
          by spreading/pinching the screen.
          <br />
          <br />
          <span>View pins -</span> Select a pin on the map to view its info. Red
          pins are pins created by your user account; blue pins are pins created
          by other users. <br />
          <br />
          <span>Create a pin -</span> Double-click (or double-press on mobile
          devices) the map to create a pin for that location. When not signed
          in, pins created will be anonymous and have no associated username.{" "}
          <br />
          <br />
          <span>Register an Account -</span> Select the "Register" button in the
          top right to register an account. Your username and password will be
          case-sensitive and used for signing in. Your email will only be used
          for a future password recovery feature. <br />
          <br />
          <span>Sign in -</span> Select the "Sign in" button in the top right to
          sign in to a registered account. When signed in, pins you create will
          be associated to your username and be colored red.
          <br /> <br />
          For demonstration purposes, you may use this account:
          <br />
          username: demo, password: demo123.
          <br /> <br />
          <span>Delete your pin -</span> You may only delete pins that belong to
          your account. To delete a pin, select your pin (they are the red ones)
          and click/press the delete button in the pin's info window.
          <br /> <br />
          <span>Search a location -</span> Enter a term into the search bar to
          search for a location (e.g., cities, street addresses, restaurants,
          etc.).
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
