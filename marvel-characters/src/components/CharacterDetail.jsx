import { useState, useEffect } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const CharacterDetail = ({ characterId }) => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      try {
        const response = await axios.get(`https://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=0ec5de34697a81d434e81762a1f7dbc5&hash=d4174a5272eaac6c0c6c9ea863a0add8`);
        setCharacter(response.data.data.results[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching character details:', error);
        setLoading(false);
      }
    };

    if (characterId) {
      fetchCharacterDetail();
    }
  }, [characterId]);

  if (loading) return <p>Loading character details...</p>;
  if (!character) return null;

  return (
    <div>
      <h2>{character.name}</h2>
      {character.description && <p>{character.description}</p>}
      <h3>Comics:</h3>
      <ul>
        {character.comics.items.map((comic, index) => (
          <li key={index}>{comic.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterDetail;
