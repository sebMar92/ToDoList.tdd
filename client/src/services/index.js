import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001';

export const getItems = async () => {
  try {
    const res = await axios.get('/todos');

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getItem = async (id) => {
  try {
    const res = await axios.get('/todos/' + id);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createItem = async (name) => {
  try {
    const res = await axios.post('/todos/', { name: name });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const editItem = async (changes) => {
  try {
    const res = await axios.put('/todos/' + changes.id, changes);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = async (id) => {
  try {
    const res = await axios.delete('/todos/' + id);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAll = async () => {
  try {
    const res = await axios.delete('/todos');

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
