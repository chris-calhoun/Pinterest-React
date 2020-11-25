import axios from 'axios';

const baseUrl = 'https://pinterest-aa40e.firebaseio.com';

const patchFBBoardKeys = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/board.json`).then((response) => {
    // console.warn(Object.keys(response.data));
    const keys = Object.keys(response.data);
    keys.forEach((key) => {
      axios.patch(`${baseUrl}/board/${key}.json`, { firebaseKey: key });
    });
  }).catch((error) => reject(error));
});

const patchFBPinKeys = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pin.json`).then((response) => {
    // console.warn(Object.keys(response.data));
    const keys = Object.keys(response.data);
    keys.forEach((key) => {
      axios.patch(`${baseUrl}/pin/${key}.json`, { firebaseKey: key });
    });
  }).catch((error) => reject(error));
});

export {
  patchFBBoardKeys,
  patchFBPinKeys,
};
