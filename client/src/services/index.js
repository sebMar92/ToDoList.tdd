import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001';

export const getItems = async () => {
  const res = await axios.get('/todos');

  return res.data;
};

export const getItem = async (id) => {
  const res = await axios.get('/todos/' + id);

  return res.data;
};

export const createItem = async (name) => {
  const res = await axios.post('/todos/', { name: name });

  return res.data;
};

export const editItem = async (changes) => {
  const res = await axios.put('/todos/' + changes.id, changes);

  return res.data;
};

export const deleteItem = async (id) => {
  const res = await axios.delete('/todos/' + id);

  return res.data;
};

export const deleteAll = async () => {
  const res = await axios.delete('/todos');

  return res.data;
};
