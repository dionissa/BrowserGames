import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, handleLogout, handleWelcomeWasClicked, isAdmin, gamesArray, setFilteredGames }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [showUserGenres, setShowUserGenres] = useState(false);

  const handleSearchInputChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = gamesArray.filter(game => {
      return game.title.toLowerCase().includes(query);
    });
    setFilteredGames(filtered);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    if (genre === '') {
      setFilteredGames(gamesArray);
    } else {
      const filtered = gamesArray.filter(game => game.genre === genre);
      setFilteredGames(filtered);
    }
  };

  const handleLogoutClick = () => {
    handleLogout();
    handleWelcomeWasClicked();
  };

  const genres = [...new Set(gamesArray.map(game => game.genre))];

  return (
    <nav className="navbar p-4 flex justify-between items-center bg-gray-700 text-white">
      <div className="navbar__left flex-1">
        <Link to="/main" className="text-xl font-bold p-4">BrowserGames</Link>
      </div>
      <div className="navbar__center flex-1 flex gap-2 justify-center items-center">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:border-blue-500"
        />
      <div className="relative">
        <button onClick={() => setShowUserGenres(!showUserGenres)} className="btn bg-gray-500 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Gêneros
        </button>
        {showUserGenres && (
          <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg z-50 bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <button onClick={() => { handleGenreChange(''); setShowUserGenres(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">All Genres</button>
              {genres.map(genre => (
                <button key={genre} onClick={() => { handleGenreChange(genre); setShowUserGenres(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">{genre}</button>
              ))}
            </div>
          </div>
        )}
      </div>
      </div>
      <div className="navbar__right flex gap-2 items-center">

        {user ? (
          <>
            <p className="text-white mr-4">Olá, {user.name}</p>
            <img className='h-8 w-8 rounded-full' src={user.avatar} alt="" />
            <Link to="/edit-info" className="btn transition-all duration-300 ease-in-out bg-yellow-500 px-4 py-2 rounded-md text-white hover:bg-yellow-700 hover:px-4 hover:py-2">Editar Conta</Link>
            {isAdmin && <Link to="/add-game" className="btn transition-all duration-300 ease-in-out bg-green-500 px-4 py-2 rounded-md text-white hover:bg-green-700 hover:px-4 hover:py-2">Adicionar Jogo</Link>}
            <Link to="/main" onClick={handleLogoutClick} className="btn transition-all duration-300 ease-in-out bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-700 hover:px-4 hover:py-2">Logout</Link>
          </>
        ) : (
          <>
            <Link to="/main" className="btn transition-all duration-300 ease-in-out hover:bg-gray-200 px-4 py-2 rounded-md hover:text-gray-800 hover:px-4 hover:py-2">Home</Link>
            <Link to="/login" className="btn transition-all duration-300 ease-in-out hover:bg-gray-200 px-4 py-2 rounded-md hover:text-gray-800 hover:px-4 hover:py-2">Entrar</Link>
            <Link to="/signup" className="btn transition-all duration-300 ease-in-out bg-gray-200 px-4 py-2 rounded-md text-gray-800 hover:text-gray-800 hover:bg-gray-300 hover:px-4 hover:py-2">Cadastrar</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
