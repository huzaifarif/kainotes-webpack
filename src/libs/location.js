import callAPI from '../utils/xhrHelper';

const LocationHelper = () => {
  let position, error, locationLabel;
  let isLocationFetched = false;

  const init = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => position = pos,
      (err) => error = err,
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  };

  const getLocation = async (callback) => {
    if (isLocationFetched) {
      return callback(locationLabel);
    }
    let url;
    let isIpBased = !position || error;
    if (isIpBased) {
      url = 'https://api.ipgeolocation.io/ipgeo?apiKey=4880135c7e29441299537c1bcaf9d1d6';
    } else {
      url = `http://api.positionstack.com/v1/reverse?access_key=50b98a4cdc9f503d8783b85c645c6290&query=${position.coords.latitude},${position.coords.longitude}`;
    }
    try {
      const res = await callAPI(url);
      if (isIpBased) {
        locationLabel = `${res.city}, ${res.country_name}`;
      } else {
        locationLabel = res.data[0].label;
      }
      isLocationFetched = true;
    } catch(err) {
      console.warn('Error:', err);
      locationLabel = 'Sorry, unable to get current location!';
    }
    return callback(locationLabel);
  };

  return {
    init,
    getLocation,
  }
};


export default LocationHelper();