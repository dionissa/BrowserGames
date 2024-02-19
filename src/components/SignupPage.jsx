import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleGenreChange = (e) => {
    const genre = e.target.value;
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem');
      return;
    }

    if (!email || !dateOfBirth || !state || !country) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const newUser = {
        password,
        email,
        dateOfBirth,
        state,
        country,
        genres: selectedGenres
      };
      await axios.post('https://65d00206bdb50d5e5f5bfd9a.mockapi.io/users', newUser);
      setSuccessMessage('Conta criada com sucesso!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      setErrorMessage('Erro ao criar conta. Tente novamente mais tarde.');
    }
  };

  const gameGenres = [
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

  return (
    <div className="flex flex-col items-center justify-center bg-gray-800 text-white">
      <h2 className="text-3xl font-semibold mt-4 mb-4">Cadastrar</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="username">
            Usuário
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Usuário"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="favorite-genres">
            Gêneros Favoritos
          </label>
          <div className='grid grid-cols-2'>
            {gameGenres.map((genre) => (
              <label key={genre} className="flex items-center text-gray-200">
                <input
                  type="checkbox"
                  name="genre"
                  value={genre}
                  checked={selectedGenres.includes(genre)}
                  onChange={handleGenreChange}
                  className="form-checkbox text-indigo-600 h-4 w-4"
                />
                <span className="ml-2">{genre}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="password">
            Senha
          </label>
          <div className="relative">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button
              type="button"
              className="absolute right-0 top-0 mt-2 mr-3 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM9 12a3 3 0 116 0 3 3 0 01-6 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 15v2a2 2 0 002 2h2a2 2 0 002-2v-2m-1-10l-4 4m4 0l-4-4"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM9 12a3 3 0 116 0 3 3 0 01-6 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 15v2a2 2 0 002 2h2a2 2 0 002-2v-2m-1-10l-4 4m4 0l-4-4"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="confirm-password">
            Confirmar Senha
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirm-password"
            type="password"
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="display-name">
            Nome de exibição
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="display-name"
            name="displayName"
            type="text"
            placeholder="Nome de exibição"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="email">
            E-mail
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="date-of-birth">
            Data de Nascimento
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date-of-birth"
            type="date"
            placeholder="Data de Nascimento"
            value={dateOfBirth}
            onChange={handleDateOfBirthChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="state">
            Estado
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="state"
            type="text"
            placeholder="Estado"
            value={state}
            onChange={handleStateChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="country">
            País
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="country"
            type="text"
            placeholder="País"
            value={country}
            onChange={handleCountryChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Cadastrar
          </button>
          <Link
            to="/login"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Já tem uma conta? Faça Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
