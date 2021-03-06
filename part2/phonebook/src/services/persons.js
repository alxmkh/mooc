import axios from "axios";

const baseURL = `http://localhost:3001/persons/`;

const getAll = () => {
    const request = axios.get(baseURL);
    return request.then(response => response.data);
}

const createPerson = (newPerson) => {
    const request = axios.post(baseURL, newPerson);
    return request.then(response => response.data);
}

const deletePerson = (id) => {
    const request = axios.delete(baseURL+id);
    return request.then(response => response.data);
}

const updatePersonPhoneNumber = (id, newObj) => {
    const request = axios.put (`${baseURL}/${id}`, newObj);
    return request.then(response => response.data);
}

export default {getAll, createPerson, deletePerson, updatePersonPhoneNumber};