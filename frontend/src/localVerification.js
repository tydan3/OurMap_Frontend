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
const locRad = Math.sqrt(2131/Math.PI);

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

    r = 6371; //radius of earth
    latDif = Math.abs(lat - uLat);
    longDif = Math.abs(long - uLong);
    inner = sinSqr(latDif / 2) + Math.cos(lat) * Math.cos(uLat) * sinSqr(longDif / 2);
    distance = 2*r * Math.asin(sqrt(inner));
    return distance;
}

/**
 * @param {Number} x Number to process
 * @returns {Number} sin^2 (x)
 */
function sinSqr(x) {
    return (1 - Math.cos(2*x))/2;
}

/**
 * @param   {JSON}   nuPin   Pin currently being placed
 * @param   {JSON}   uPin    User's home pin
 * @returns {Boolean} Returns whether the two points are considered local to each other
 */

function checkLocal(nuPin, uPin) {
    distance = getDistance(nuPin.long, nuPing.lat, uPin.long, uPin.lat);
    return distance < locRad;
}

/**
 * @param {Number}  lat latitude to be converted
 * @returns {Number} Returns number in km
 */