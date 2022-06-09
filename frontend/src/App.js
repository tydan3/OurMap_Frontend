import { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import "./app.css";
import { format } from "timeago.js";
import Register from "./components/Register";
import Signin from "./components/Signin";
import Howto from "./components/Howto";

function App() {
  const myUrl = "https://ourmapserver.click";
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [showRegister, setShowRegister] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [showHowto, setShowHowto] = useState(false);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 47.2445,
    longitude: -122.4379,
    zoom: 12,
  });

  useEffect(() => {
    fetch(myUrl + "/api/pins")
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

        setPins(data);
      })
      .catch((error) => console.error("Error retrieving pins!", error));
  }, []);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({
      ...viewport,
      latitude: lat,
      longitude: long,
    });
    // close new pin forms
    setNewPlace(null);
  };

  const handleAddClick = (e) => {
    const [long, lat] = e.lngLat;
    setNewPlace({
      lat: lat,
      long: long,
    });
    // close opened pins
    setCurrentPlaceId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPin),
    };

    fetch(myUrl + "/api/pins", requestOptions)
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

        setPins([...pins, data]);
        setNewPlace(null);
      })
      .catch((error) => {
        console.error("Error submitting pin!", error);
      });
  };

  const handleSignout = () => {
    myStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/tydan/ckx7o6iwg00uj15lwubinqgib"
        onDblClick={handleAddClick}
        doubleClickZoom={false}
        // transitionDuration="20"
      >
        {pins.map((p) => (
          <>
            <Marker
              className="marker"
              longitude={p.long}
              latitude={p.lat}
              offsetLeft={-viewport.zoom * 3}
              offsetTop={-viewport.zoom * 3}
            >
              <Room
                style={{
                  fontSize: viewport.zoom * 6,
                  color: p.username === currentUser ? "red" : "orange",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                className="popup"
                longitude={p.long}
                latitude={p.lat}
                closeButton={true}
                closeOnClick={false}
                anchor="left"
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className="card">
                  <label>Title</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Note</label>
                  <p className="desc">{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(<Star className="star" />)}
                  </div>
                  <label>User</label>
                  <span className="username">
                    Created by <b>{p.username}</b>{" "}
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace && (
          <Popup
            className="popup"
            longitude={newPlace.long}
            latitude={newPlace.lat}
            closeButton={true}
            closeOnClick={false}
            anchor="left"
            onClose={() => setNewPlace(null)}
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  placeholder="Enter a title for your pin"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Note</label>
                <textarea
                  placeholder="What did you do here? How was it?"
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="5">5 (Great)</option>
                  <option value="4">4 (Good)</option>
                  <option value="3">3 (Okay)</option>
                  <option value="2">2 (Bad)</option>
                  <option value="1">1 (Awful)</option>
                </select>
                <button className="addpin">Add Pin</button>
              </form>
            </div>
          </Popup>
        )}
        {currentUser ? (
          <button className="button signout" onClick={handleSignout}>
            Sign out
          </button>
        ) : (
          <div className="buttons">
            <button className="button howto" onClick={() => setShowHowto(true)}>
              How to use
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
            <button
              className="button signin"
              onClick={() => setShowSignin(true)}
            >
              Sign in
            </button>
          </div>
        )}
        {showHowto && <Howto setShowHowto={setShowHowto} />}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showSignin && (
          <Signin
            setShowSignin={setShowSignin}
            myStorage={myStorage}
            setCurrentUser={setCurrentUser}
          />
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;