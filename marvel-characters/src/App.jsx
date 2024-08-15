import { useState } from 'react';
import CharacterList from "./components/CharacterList";
import CharacterDetail from './components/CharacterDetail';
import './App.css';

const App = () => {
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  const handleSelectCharacter = (characterId) => {
    setSelectedCharacterId(characterId);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Marvel Characters</h1>
      <CharacterList onSelectCharacter={handleSelectCharacter} />
      {selectedCharacterId && <CharacterDetail characterId={selectedCharacterId} />}
    </div>
  );
};

export default App;
