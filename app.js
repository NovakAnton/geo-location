let lat = undefined;
let lon = undefined;
const button = document.querySelector("#locateBtn");

button.addEventListener("click", () => {
  lat = document.querySelector("#latitudeInput").value;
  // document.querySelector("#latitudeInput").value = "";
  lon = document.querySelector("#longitudeInput").value;
  // document.querySelector("#longitudeInput").value = "";
  displayGeoLocation(lat, lon);
});

function displayGeoLocation(lat, lon) {
  fetch(
    "https://nominatim.openstreetmap.org/reverse?format=json&lat=" +
      lat +
      "&lon=" +
      lon
  )
    .then((apiResonse) => {
      if (apiResonse.ok === true) {
        return apiResonse.json();
      } else {
        throw new Error("Invalid Input (" + apiResonse.status + ")");
      }
    })
    .then((jsonResponse) => {
      let city = jsonResponse.address.city;
      let country = jsonResponse.address.country;
      let suburb = jsonResponse.address.suburb;
      let road = jsonResponse.address.road;
      let house_number = jsonResponse.address.house_number;
      document.querySelector("#coordinates").textContent =
        city + ", " + country;
      document.querySelector("#details").textContent =
        road + " " + house_number + ", " + suburb;
    })
    .catch((error) => {
      alert(error.message);
    });
}
