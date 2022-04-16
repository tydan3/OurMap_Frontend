import { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { Room } from "@material-ui/icons";
import { red } from "@material-ui/core/colors";

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
      </ReactMapGL>
    </div>
  );
}

export default App;
