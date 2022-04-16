import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import "./app.css";

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 47.2445,
    longitude: -122.4379,
    zoom: 12,
  });

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/tydan/ckx7o6iwg00uj15lwubinqgib"
      >
        <Marker longitude={-122.4379} latitude={47.2445} anchor="bottom">
          <Room style={{ fontSize: viewport.zoom * 3, color: "Red" }}> </Room>
        </Marker>
        <Popup
          longitude={-122.4379}
          latitude={47.2445}
          closeButton={true}
          closeOnClick={false}
          anchor="bottom"
        >
          <div className="card">
            <label>Place</label>
            <h4 className="place">uwt</h4>
            <label>Review</label>
            <p className="desc">cool school</p>
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
              Created by <b>Dan</b>{" "}
            </span>
            <span className="date">1 hour ago</span>
          </div>
        </Popup>
      </ReactMapGL>
    </div>
  );
}

export default App;
