import { useEffect, useState } from 'react';
import { FaGamepad } from 'react-icons/fa';
import GameList from './GameList';

const MainPage = ({ user, filteredGames }) => { // Receive filteredGames prop
  const [userGenres, setUserGenres] = useState([]);

  useEffect(() => {
    if (user && user.genres) {
      setUserGenres(user.genres);
    }
  }, [user]);

  return (
    <div className="bg-gray-800 text-white">
      <header className="relative">
        <img
          src="wallpaper.jpg"
          alt="Header"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center ">
          <h1 className="text-4xl font-bold shadow text-gray-900">BrowserGames</h1>
          <FaGamepad className="ml-2 text-4xl text-gray-900" />
        </div>
      </header>
      <div className="container mx-auto py-8">
        <GameList games={filteredGames} userGenres={userGenres} user={user} />
      </div>
    </div>
  );
};

export default MainPage;
