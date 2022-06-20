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
      </h4>

      <div className="textContainer">
        <p>
          <span>What is this?</span> - This is a shared map where users can
          share their thoughts about a place in the form of a 'pin'.
          <br /> <br />
          <span> Here are some things you can do:</span>
          <br />
          <span>Move the map -</span> Move the map by dragging with mouse or
          finger. Zoom in/out with scroll wheel or by pinching/spreading. Tilt
          map by holding right-click and dragging.
          <br />
          <br />
          <span>View pins -</span> View a pin by clicking or tapping on it to
          bring up its info. <br />
          <br />
          <span>Create a pin -</span> Double-click or double-tap a spot to
          create a pin. You must be signed-in to create a pin.
          <br />
          <br />
          <span>Sign in -</span> Select the "Sign in" button in to sign in to a
          registered account. When signed in, pins you create will be associated
          to your username and be colored red. Contact me if you forget your
          information and I can reset it.
          <br /> <br />
          <span>
            For demonstration purposes or for anonymity, you may use this
            account:
            <br />
            username: anon
            <br /> password: anon123
          </span>
          <br /> <br />
          <span>Register -</span> Select the "Register" button to register an
          account. Your username and password are case-sensitive and will be
          used for signing in. Entering an email is optional; it will only be
          used for a future password recovery feature. <br />
          <br />
          <span>Delete pins -</span> You may only delete pins that belong to
          your account. To delete a pin, select your pin (they are the red ones)
          and click/press the delete button in the pin's info window.
          <br /> <br />
          <span>Search for a location -</span> Enter a term into the search bar
          to search for a location (e.g., cities, street addresses, restaurants,
          etc.).
          <br /> <br />
        </p>
      </div>
      <span className="sub">
        For help or suggestions, here is my contact: +1 (253) 391-0447 or
        tydan.wk@gmail.com.
      </span>
      <Cancel className="howtoCancel" onClick={() => setShowHowto(false)} />
    </div>
  );
}
