import { useEffect, useState, useRef, useCallback } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Room, Star } from "@material-ui/icons";
import "./app.css";
import { format } from "timeago.js";
import Register from "./components/Register";
import Signin from "./components/Signin";
import Howto from "./components/Howto";

function App() {
  const myUrl = "http://localhost:8800"; // http://localhost:8800 : https://ourmapserver.click
  const myStorage = window.localStorage;
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX;

  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
  const [pins, setPins] = useState([]);
  const [pinId, setPinId] = useState(null);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(5);
  const [showRegister, setShowRegister] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [showHowto, setShowHowto] = useState(true);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 40,
    longitude: -101,
    zoom: 4,
  });

  // For geocoder search bar
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  // handle pin data from database
  useEffect(() => {
    // fetch pin
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

        // set "pins" array with fetched data
        setPins(data);
      })
      .catch((error) => console.error("Error retrieving pins!", error));
  }, []);

  // handle marker click
  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({
      ...viewport,
      latitude: lat,
      longitude: long,
    });

    // close other forms
    setNewPlace(null);
    setShowSignin(false);
    setShowRegister(false);
    setShowHowto(false);

    // set id for possible pin deletion
    setPinId(id);
  };

  // handle opening form for adding new marker
  const handleAddClick = (e) => {
    const [long, lat] = e.lngLat;
    setNewPlace({
      lat: lat,
      long: long,
    });
    // close other forms
    setCurrentPlaceId(null);
    setShowSignin(false);
    setShowRegister(false);
    setShowHowto(false);
  };

  // handle submitting creation of new marker
  const handleCreatePin = async (e) => {
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

    // post request for adding new pin to database
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
        console.error("Error creating pin!", error);
      });
  };

  // handle user signing out
  const handleSignout = () => {
    myStorage.removeItem("user");
    setCurrentUser(null);
  };

  // handle pin deletion
  const handleDelete = async (e) => {
    e.preventDefault();
    const pinToDelete = {
      _id: pinId,
    };

    // delete request for removing pin from database
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pinToDelete),
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

        // find index of pin in pins array using id
        const pinIndex = pins.indexOf(pins.find((e) => e._id === data._id));

        // remove pin from pins array and update map
        pins.splice(pinIndex, 1);
        setPins(pins);

        // close displayed pin's window
        setCurrentPlaceId(null);
      })
      .catch((error) => {
        console.error("Error deleting pin!", error);
      });
  };

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        ref={mapRef}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/tydan/ckx7o6iwg00uj15lwubinqgib"
        onDblClick={handleAddClick}
        doubleClickZoom={false}
        mapOptions={{}}

        // transitionDuration="20"
      >
        {/* Place pins from database onto the map */}
        {pins.map((p) => (
          <>
            {/* Marker from MapBox */}
            <Marker
              className="marker"
              longitude={p.long}
              latitude={p.lat}
              offsetLeft={-viewport.zoom * 3}
              offsetTop={-viewport.zoom * 3}
            >
              {/* Room icon for Marker */}
              <Room
                className="room"
                style={{
                  fontSize: viewport.zoom * 6,
                  color:
                    p.username === currentUser
                      ? "rgb(255, 75, 75)"
                      : "dodgerblue",
                  cursor: "pointer",
                }}
                // Handle state when pin marker is clicked
                onClick={() => {
                  handleMarkerClick(p._id, p.lat, p.long);
                }}
              />
            </Marker>

            {/* For viewing placed pins */}
            {p._id === currentPlaceId && (
              <Popup
                className="popup"
                longitude={p.long}
                latitude={p.lat}
                closeButton={true}
                closeOnClick={false}
                anchor="bottom"
                onClose={() => setCurrentPlaceId(null)}
              >
                {/* Display pin's info */}
                <div className="card">
                  <label>Title</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Note</label>
                  <p className="desc">{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(<Star className="star" />)}
                  </div>

                  {/* Display pin's user info*/}
                  <label>User</label>
                  <span className="username">
                    Created by <b>{p.username}</b>{" "}
                  </span>
                  <span className="date">{format(p.createdAt)}</span>

                  {/* Display delete option if pin belongs to current user */}
                  {currentUser === p.username && (
                    <button className="deleteButton" onClick={handleDelete}>
                      Delete Pin
                    </button>
                  )}
                </div>
              </Popup>
            )}
          </>
        ))}

        {/* For adding a new pin */}
        {newPlace && currentUser && (
          <Popup
            className="popup"
            longitude={newPlace.long}
            latitude={newPlace.lat}
            closeButton={true}
            closeOnClick={false}
            anchor="bottom"
            onClose={() => setNewPlace(null)}
          >
            <div>
              <form onSubmit={handleCreatePin}>
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
                  <option value="0">No Rating</option>
                </select>
                <button className="createpin">Create Pin</button>
              </form>
            </div>
          </Popup>
        )}

        <div className="topbar" />
        {/* buttons */}
        <button
          className="button howto"
          onClick={() => {
            setShowHowto(true);
            // close other forms
            setShowRegister(false);
            setShowSignin(false);
            setCurrentPlaceId(null);
            setNewPlace(null);
          }}
        >
          How to use
        </button>
        {currentUser ? (
          <button className="button signout" onClick={handleSignout}>
            Sign out
          </button>
        ) : (
          <div className="buttons">
            <button
              className="button signin"
              onClick={() => {
                setShowSignin(true);
                // close other forms
                setShowRegister(false);
                setShowHowto(false);
                setCurrentPlaceId(null);
                setNewPlace(null);
              }}
            >
              Sign in
            </button>
            <button
              className="button register"
              onClick={() => {
                setShowRegister(!showRegister);
                // close other forms

                setShowHowto(false);
                setShowSignin(false);
                setCurrentPlaceId(null);
                setNewPlace(null);
              }}
            >
              Register
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
        <Geocoder
          className="geocoder"
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-left"
        />
      </ReactMapGL>

      {/* logo icon */}
      <div className="imgContainer">
        <img src="./logo.png" alt="logo icon" />
        <h1>OurMaps</h1>
      </div>
      <div className="bottomBar" />
    </div>
  );
}

export default App;
