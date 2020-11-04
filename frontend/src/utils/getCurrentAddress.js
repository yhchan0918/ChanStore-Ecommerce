import GeoCode from 'react-geocode';

GeoCode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API_KEY);

export const getCurrentAddress = async (lat, lng) => {
  const { results } = await GeoCode.fromLatLng(lat, lng);
  const address = results[0].formatted_address,
    addressArray = results[0].address_components,
    city = getCity(addressArray),
    postalCode = getPostalCode(addressArray),
    country = getCountry(addressArray);

  const obj = {
    address: address ? address : '',
    city: city ? city : '',
    postalCode: postalCode ? postalCode : '',
    country: country ? country : '',
  };

  return obj;
};

const getCity = (addressArray) => {
  let city = '';
  for (let i = 0; i < addressArray.length; i++) {
    if (addressArray[i].types[0] && 'locality' === addressArray[i].types[0]) {
      city = addressArray[i].long_name;
      return city;
    }
  }
};

const getPostalCode = (addressArray) => {
  let postalCode = '';
  for (let i = 0; i < addressArray.length; i++) {
    if (
      addressArray[i].types[0] &&
      'postal_code' === addressArray[i].types[0]
    ) {
      postalCode = addressArray[i].long_name;
      return postalCode;
    }
  }
};
const getCountry = (addressArray) => {
  let country = '';
  for (let i = 0; i < addressArray.length; i++) {
    if (addressArray[i].types[0] && 'country' === addressArray[i].types[0]) {
      country = addressArray[i].long_name;
      return country;
    }
  }
};

// const getState = (addressArray) => {
//   let state = '';
//   for (let i = 0; i < addressArray.length; i++) {
//     for (let i = 0; i < addressArray.length; i++) {
//       if (
//         addressArray[i].types[0] &&
//         'administrative_area_level_1' === addressArray[i].types[0]
//       ) {
//         state = addressArray[i].long_name;
//         return state;
//       }
//     }
//   }
// };
