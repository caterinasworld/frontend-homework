import { useState } from 'react';
import axios from 'axios';

export default function Search() {
  const [name, setName] = useState('');
  const [foundName, setFoundName] = useState('');
  const [foundImgage, setFoundImage] = useState('');

  const url = 'https://thronesapi.com/api/v2/Characters';

  async function searchName(name) {
    try {
      const response = await axios.get(url);
      const characters = response.data;
      const foundCharacter = characters.find(
        (character) => character.fullName.toLowerCase() === name.toLowerCase(),
      );

      if (foundCharacter) {
        console.log('Character found', foundCharacter);
        setFoundName(foundCharacter.fullName);
        setFoundImage(foundCharacter.imageUrl);
      } else {
        console.log('Character not found', name);
        alert(`${name} not found`);
      }
    } catch (error) {
      console.error('Request failed', error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('target value:', name);
    searchName(name);
  }

  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search-input">Search</label>
        <input
          id="search-input"
          type="text"
          value={name}
          onChange={handleChange}
        />
      </form>
      <div className="result">
        <h3>{foundName}</h3>
        <img src={foundImgage} alt={foundName} />
      </div>
    </div>
  );
}
