//import distance from "@turf/distance";
//import Geocoder from "react-map-gl-geocoder";
//import { lngLatToWorld } from "viewport-mercator-project";

/**@const locRad comes from the radius of the biggest city in the world, Tokyo.
 * Tokyo's area (A) = 2131km^2
 * Area of a circle - A = π r^2
 * so knowing A, we need to isolate r
 * 2131 = π r^2
 * sqrt(2131) = sqrt(π) r
 * sqrt(2131)/sqrt(π) = r
 * sqrt(2131/π) = r
 *
 */
const locRad = Math.sqrt(2131 / Math.PI);

/**
 * @param   {Number}   long    A pin
 * @param   {Number}   lat    A second pin
 * @param   {Number}   uLong    A pin
 * @param   {Number}   uLat    A second pin
 * @returns {Number}   Uses the Haversine formula to find the distance between two pins
 * 0.5% error
 * You can check out more here: https://www.omnicalculator.com/other/latitude-longitude-distance#the-haversine-formula-or-haversine-distance
 * To test: Paris Lat: 48.8566, Long: 2.3522
 * Krakow: Lat: 50.0647° N, Long: 19.9450° E.
 * Distance between Paris and Krakow should be 1275.6 km
 */
function getDistance(long, lat, uLong, uLat) {
  // we'll make the formula more readable by breaking it into different terms
  let r = 6371; //radius of earth
  let latDif = Math.toRadians(lat - uLat);
  let longDif = Math.toRadians(long - uLong);
  let a =
    Math.sin(latDif / 2) * Math.sin(latDif / 2) +
    Math.cos(Math.toRadians(lat)) *
      Math.cos(Math.toRadians(uLat)) *
      Math.sin(longDif / 2) *
      Math.sin(longDif / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return r * c;
}

/**
 * @param   {JSON}   nuPin   Pin currently being placed
 * @param   {JSON}   uPin    User's home pin
 * @returns {Boolean} Returns whether the two points are considered local to each other
 */

function checkLocal(long, lat, uLong, uLat) {
  distance = getDistance(long, lat, uLong, uLat);
  return distance < locRad;
}

/**
 * @param {Number}  lat latitude to be converted
 * @returns {Number} Returns number in km
 */
