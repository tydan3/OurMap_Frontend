import "./howto.css";
import { Cancel } from "@material-ui/icons";

export default function Howto({ setShowHowto }) {
  return (
    <div className="howtoContainer">
      <div className="howtoLogo">
        <img src="./logo.png" alt="logo icon" />
        <h3>How to Use</h3>
      </div>
      <h4>
        Welcome and thank you for checking out my app! <br />
      </h4>

      <div className="textContainer">
        <p>
          <span>What is this?</span> - This is a shared map where users can
          share their thoughts about a place by creating 'pins'. Pins are the
          markers you see on the map. Click/tap them to see more.
          <br />
          <br />
          <span> Here are some things you can do:</span>
          <br /> <span>Register -</span> Select the "Register" button to
          register an account. Your username and password are case-sensitive and
          will be used for signing in. Entering an email is optional; it will
          only be used for a future password recovery feature.
          <br />
          <br />
          <span>Sign in -</span> Select the "Sign in" button to sign in to your
          registered account. When signed in, the pins you create will be
          associated with your username and be colored red. Contact me if you
          forget your information and I can reset it.
          <br />
          <br />
          <span>Move the map -</span> Move the map by dragging with a mouse or
          finger. Zoom in/out with a scroll wheel or by pinching/spreading.
          Tilt/rotate the map by holding right-click and dragging.
          <br />
          <br />
          <span>Search locations -</span> Enter a term into the search bar to
          search for a location (e.g., cities, street addresses, restaurants,
          etc.).
          <br />
          <br />
          <span>View pins -</span> View a pin by clicking or tapping on it to
          bring up its info. Blue pins are created by users who are local to
          that area. Red pins are created by tourists/non-locals. <br />
          <br />
          <span>Create a pin -</span> Double-click or double-tap a spot to
          create a pin. <span>You must be signed-in to create a pin.</span> You
          may use the anon account below if you do not want to create an
          account.
          <br />
          <br />
          <span>Delete pins -</span> You may only delete pins that belong to
          your account. To delete a pin, select your pin and click/press the
          delete button in the pin's info window.
          <br />
          <br />
          <span>
            For demonstration or anonymity purposes, sign in with the following
            account:
            <br />
            username: anon
            <br />
            password: anon123?
          </span>
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
