const GameCard = ({ game }) => {
    return (
      <div className="bg-gray-700 text-white rounded-lg overflow-hidden shadow-lg">
        <img src={game.thumbnail} alt={game.title} className="w-full" />
        <div className="p-4">
          <h3 className="text-xl font-semibold">{game.title}</h3>
          <p className="text-gray-400">{game.genre}</p>
          <p className="text-gray-300">{game.description}</p>
          <a href={game.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-200">Visit Website</a>
        </div>
      </div>
    );
  };
  
  export default GameCard;