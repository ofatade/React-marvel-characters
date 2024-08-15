import { useState, useEffect } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const CharacterList = ({ onSelectCharacter }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://gateway.marvel.com/v1/public/characters?ts=1&apikey=0ec5de34697a81d434e81762a1f7dbc5&hash=d4174a5272eaac6c0c6c9ea863a0add8');
        setCharacters(response.data.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching characters:', error);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) return <p>Loading characters...</p>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' }}>
      {characters.map((character) => (
        <div key={character.id} onClick={() => onSelectCharacter(character.id)} style={{ cursor: 'pointer' }}>
          <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} style={{ width: '100%' }} />
          <h3>{character.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;
