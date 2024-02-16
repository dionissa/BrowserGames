import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import MainPage from './components/MainPage';
import Welcome from './components/Welcome';
import AddGamePage from './components/AddGamePage';
import EditInfoPage from './components/EditInfoPage';
import { gamesArray } from './components/GamesArray';
import Navbar from './components/NavBar';

function App() {
  const [user, setUser] = useState(null);
  const [welcomeWasClicked, setWelcomeWasClicked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [filteredGames, setFilteredGames] = useState(gamesArray);

  const handleLogout = () => {
    setUser(null);
    setWelcomeWasClicked(false);
  };

  const handleWelcomeWasClicked = () => {
    setWelcomeWasClicked(true);
  };

  const determineAdminStatus = (user) => {
    if (user && user.isAdmin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const addGame = (newGame) => {
    setFilteredGames(prevGamesArray => [...prevGamesArray, newGame]);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <Router>
      <Navbar user={user} handleLogout={handleLogout} handleWelcomeWasClicked={handleWelcomeWasClicked} isAdmin={isAdmin} gamesArray={gamesArray} setFilteredGames={setFilteredGames} /> {/* Pass setFilteredGames to Navbar */}
      {!welcomeWasClicked && <Welcome handleWelcomeWasClicked={handleWelcomeWasClicked} />}
      <Routes>
        <Route path="/login" element={<LoginPage setUser={setUser} determineAdminStatus={determineAdminStatus} />} />
        <Route path="/signup" element={<SignupPage setUser={setUser} determineAdminStatus={determineAdminStatus} />} />
        <Route path="/add-game" element={<AddGamePage addGame={addGame} />} />
        <Route path="/main" element={<MainPage user={user} filteredGames={filteredGames} />} />
        <Route path="/edit-info" element={<EditInfoPage user={user} updateUser={updateUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
