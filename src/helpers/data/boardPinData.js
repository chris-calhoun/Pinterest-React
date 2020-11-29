import axios from 'axios';

const baseUrl = 'https://pinterest-aa40e.firebaseio.com';

const pinToBoardJoin = (object) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/pins-boards.json`, object)
    .then((response) => {
      axios.patch(`${baseUrl}/pins-boards/${response.data.name}`, { firebaseKey: response.data.name }).then(resolve);
    }).catch((error) => reject(error));
});

// eslint-disable-next-line
export default { pinToBoardJoin };
