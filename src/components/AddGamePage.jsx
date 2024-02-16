import { useState } from 'react';
import { gamesArray } from './GamesArray';
import { v4 as uuidv4 } from 'uuid';

const genres = [
  'Shooter',
  'MMOARPG',
  'ARPG',
  'Action RPG',
  'Battle Royale',
  'MMORPG',
  'Fighting',
  'MOBA',
  'Strategy',
  'Card'
];

const AddGamePage = () => {
  const [game, setGame] = useState({
    id: '',
    title: '',
    thumbnail: '',
    genres: [],
    description: '',
    website: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGame({
      ...game,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setGame({
        ...game,
        genres: [...game.genres, value]
      });
    } else {
      setGame({
        ...game,
        genres: game.genres.filter(genre => genre !== value)
      });
    }
  };

  const handleCreateGame = () => {
    const newGame = {
      ...game,
      id: uuidv4()
    };
    gamesArray.push(newGame);
    console.log('New game added:', newGame);
    setGame({
      id: '',
      title: '',
      thumbnail: '',
      genres: [],
      description: '',
      website: ''
    });
    localStorage.setItem('games', JSON.stringify(gamesArray));
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4">Adicionar Jogo</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Título</label>
        <input type="text" id="title" name="title" value={game.title} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="thumbnail" className="block text-gray-700 text-sm font-bold mb-2">Thumbnail</label>
        <input type="text" id="thumbnail" name="thumbnail" value={game.thumbnail} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Gêneros</label>
        {genres.map(genre => (
          <div key={genre} className="mb-2">
            <input type="checkbox" id={genre} name="genres" value={genre} onChange={handleCheckboxChange} className="mr-2 leading-tight" />
            <label htmlFor={genre} className="text-gray-700">{genre}</label>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Descrição</label>
        <textarea id="description" name="description" value={game.description} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="website" className="block text-gray-700 text-sm font-bold mb-2">Website</label>
        <input type="text" id="website" name="website" value={game.website} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <button onClick={handleCreateGame} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Criar</button>
    </div>
  );
};

export default AddGamePage;
