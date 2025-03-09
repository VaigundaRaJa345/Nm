import axios from 'axios';

const API_URL = 'https://exercisedb.p.rapidapi.com';
const API_KEY = 'YOUR_RAPIDAPI_KEY'; // Replace with your API Key

export const fetchCategories = async () => {
  const response = await axios.get(${API_URL}/exercises/bodyPartList, {
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    },
  });
  return response.data;
};