import axios from "axios";

export async function getPets(status) {
  return await axios.get(
    `https://petstore3.swagger.io/api/v3/pet/findByStatus?status=${status}`
  );
}

export async function getPetById(id) {
  return await axios.get(`https://petstore3.swagger.io/api/v3/pet/${id}`);
}

export async function postPet(petData) {
  return await axios.post(`https://petstore3.swagger.io/api/v3/pet`, petData);
}

export async function putPet(petData) {
  return await axios.put(`https://petstore3.swagger.io/api/v3/pet/`, petData);
}

export async function deletePetById(id) {
  return await axios.delete(`https://petstore3.swagger.io/api/v3/pet/${id}`);
}

export async function postUser(userData) {
  return await axios.post(`https://petstore3.swagger.io/api/v3/user`, userData);
}

export async function getUserLogin(username, password) {
  return await axios.get(
    `https://petstore3.swagger.io/api/v3/user/login?username=${username}&password=${password}`
  );
}

export async function getUser(username) {
  return await axios.get(
    `https://petstore3.swagger.io/api/v3/user/${username}`
  );
}

export async function putUserUpdate(userName, userData) {
  return await axios.put(
    `https://petstore3.swagger.io/api/v3/user/${userName}`,
    userData
  );
}

export async function getStoreInventory() {
  return await axios.get(
    `https://petstore3.swagger.io/api/v3/store/inventory?`
  );
}

export async function postOrder(userData) {
  return await axios.post(
    `https://petstore3.swagger.io/api/v3/store/order`,
    userData
  );
}
