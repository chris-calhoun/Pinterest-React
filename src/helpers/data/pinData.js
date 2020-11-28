import axios from 'axios';

const baseUrl = 'https://pinterest-aa40e.firebaseio.com/';

const getBoardPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins-boards.json?orderBy="boardId"&equalTo="${boardId}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getPin = (pinId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pin/${pinId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const getAllUserPins = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pin.json?orderBy="userId"&equalTo="${uid}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const createPin = (object) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/pin.json`, object)
    .then((response) => {
      axios.patch(`${baseUrl}/pin/${response.data.name}.json`, { firebaseKey: response.data.name }).then(resolve);
    }).catch((error) => reject(error));
});

const updatePin = (object) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/pin/${object.firebaseKey}.json`, object)
    .then(resolve).catch((error) => reject(error));
});

const deletePin = (fbKey) => axios.delete(`${baseUrl}/pin/${fbKey}.json`);

// eslint-disable-next-line
export default {
  getBoardPins,
  getPin,
  getAllUserPins,
  createPin,
  updatePin,
  deletePin,
};
