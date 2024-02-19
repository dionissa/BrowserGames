import { useState, useEffect } from 'react';
import GameCard from './GameCard';

const GameList = ({ games, userGenres, user }) => {
  
  const [showUserGenres, setShowUserGenres] = useState(false);
  const [recommendedGames, setRecommendedGames] = useState([]);

  const getRandomRecommendedGames = () => {
    const recommended = games.filter(game => userGenres.includes(game.genre));
    const randomGames = recommended.sort(() => 0.5 - Math.random()).slice(0, 4);
    setRecommendedGames(randomGames);
  };

  const renderRecommendedGames = () => {
    if (user) {
      return (
        <div className='flex flex-col items-center justify-center'>
        <div className='bg-emerald-600 shadow-md rounded-md p-2 relative top-4 animate-bounce poin'>Jogos Recomendados!</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border-emerald-600 border-2 rounded-md">
          {recommendedGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    if (user) {
      getRandomRecommendedGames();
    }
  }, [user, userGenres]);

  return (
    <>
      {renderRecommendedGames()}
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
