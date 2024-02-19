import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EditInfoPage = ({ user, updateUser }) => {
  const [displayName, setDisplayName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);
  const [state, setState] = useState(user.state);
  const [country, setCountry] = useState(user.country);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [favoriteGenres, setFavoriteGenres] = useState(user.favoriteGenres || []);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleGenreChange = (genre) => {
    const isChecked = user.genres.includes(genre);
    const updatedGenres = isChecked
      ? user.genres.filter((g) => g !== genre)
      : [...user.genres, genre];
    const updatedUser = {
      ...user,
      genres: updatedGenres,
    };
    updateUser(updatedUser);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        ...user,
        displayName,
        email,
        dateOfBirth,
        state,
        country,
        favoriteGenres: user.favoriteGenres,
      };
      if (password && confirmPassword && password === confirmPassword) {
        updatedUser.password = password;
      }
      await axios.put(`https://65d00206bdb50d5e5f5bfd9a.mockapi.io/users/${user.id}`, updatedUser);
      updateUser(updatedUser);
      setSuccessMessage('User information updated successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating user information:', error);
      setErrorMessage('Failed to update user information. Please try again.');
      setSuccessMessage('');
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h2 className="text-3xl font-semibold mb-4">Edit Information</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2">Display Name:</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="form-input mt-1 block w-full rounded-md bg-gray-900 border-gray-700 text-gray-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input mt-1 block w-full rounded-md bg-gray-900 border-gray-700 text-gray-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2">Date of Birth:</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="form-input mt-1 block w-full rounded-md bg-gray-900 border-gray-700 text-gray-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2">State:</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="form-input mt-1 block w-full rounded-md bg-gray-900 border-gray-700 text-gray-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2">Country:</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="form-input mt-1 block w-full rounded-md bg-gray-900 border-gray-700 text-gray-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2">New Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="form-input mt-1 block w-full rounded-md bg-gray-900 border-gray-700 text-gray-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2">Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="form-input mt-1 block w-full rounded-md bg-gray-900 border-gray-700 text-gray-200"
          />
        </div>
        <div className="mb-4">
  <label className="block text-gray-200 text-sm font-bold mb-2">Favorite Genres:</label>
  <div className="flex flex-wrap">
    {[
      'Shooter',
      'MMOARPG',
      'ARPG',
      'Action RPG',
      'Battle Royale',
      'MMORPG',
      'Fighting',
      'MOBA',
      'Strategy',
      'Card',
    ].map((genre, index) => (
      <label key={index} className="inline-flex items-center mr-4 mb-2">
        <input
          type="checkbox"
          className="form-checkbox text-indigo-600 h-5 w-5"
          checked={user.genres.includes(genre)}
          onChange={() => handleGenreChange(genre)}
        />
        <span className="ml-2 text-gray-200">{genre}</span>
      </label>
    ))}
  </div>
</div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save Changes
          </button>
          <Link
            to="/main"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditInfoPage;
