import { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import "./app.css";
import axios from "axios";
import { format } from "timeago.js";

function App() {
  const currentUser = "Jane";
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 47.2445,
    longitude: -122.4379,
    zoom: 12,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/tydan/ckx7o6iwg00uj15lwubinqgib"
      >
        {pins.map((p) => (
          <>
            <Marker
              className="marker"
              longitude={p.long}
              latitude={p.lat}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <Room
                style={{
                  color: p.username === currentUser ? "gold" : "tomato",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                className="popup"
                longitude={p.long}
                latitude={p.lat}
                closeButton={true}
                closeOnClick={true}
                anchor="left"
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>{p.username}</b>{" "}
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        ))}
      </ReactMapGL>
    </div>
  );
}

export default App;
