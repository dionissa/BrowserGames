import { useState } from 'react';
import GameCard from './GameCard';

const GameList = ({ games, userGenres, user }) => {
  
  const [showUserGenres, setShowUserGenres] = useState(false);

  return (
    <>
    {user && (
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setShowUserGenres(!showUserGenres)}
          className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Favoritos
        </button>
      </div>
    )}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {games.map(game => (
        (showUserGenres && userGenres.includes(game.genre)) || !showUserGenres ? (
          <GameCard key={game.id} game={game} />
        ) : null
      ))}
    </div>
    </>
  );
};

export default GameList;
