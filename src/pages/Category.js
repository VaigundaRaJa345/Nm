import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://exercisedb.p.rapidapi.com';
const API_KEY = 'ae40549393msh0c35372c617b281p103ddcjsn0f4a9ee43ffe'; // Your API key

function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(${API_URL}/exercises/bodyPartList, {  
      headers: {
        'X-RapidAPI-Key': 'ae40549393msh0c35372c617b281p103ddcjsn0f4a9ee43ffe',  
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
    })
    .then(response => setCategories(response.data))
    .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div>
      <h2>Workout Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <Link to={`/category/${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Category;