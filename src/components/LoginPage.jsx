import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ setUser: setUserProp, determineAdminStatus }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userState, setUserState] = useState(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/main');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
  
    try {
      const response = await axios.get('https://65d00206bdb50d5e5f5bfd9a.mockapi.io/users');
      const users = response.data;
  
      const user = users.find(user => user.email === email && user.password === password);
  
      if (user) {
        setUserState(user);
        setUserProp(user);
        determineAdminStatus(user);
        navigate('/main');
      } else {
        setErrorMessage('E-mail ou senha incorretos.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Erro ao fazer login. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h2 className="text-3xl font-semibold mb-4">Entrar</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
  <div className="mb-4">
    <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="username">
      E-mail
    </label>
    <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        name="email"
        type="email"
        placeholder="E-mail"
        required
      />
  </div>
  <div className="mb-6">
    <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="password">
      Senha
    </label>
    <div className="relative">
            <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Senha"
          required
        />
            <button
              className="absolute right-0 top-0 mt-2 mr-3 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500 hover:text-gray-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  ...
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500 hover:text-gray-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  ...
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Entrar
          </button>
          <Link
            to="/signup"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Cadastrar
          </Link>
        </div>
        <div className="text-center mt-4">
          <Link
            to="/forgot-password"
            className="inline-block align-baseline font-bold text-sm text-gray-500 hover:text-gray-200"
          >
            Esqueceu a senha?
          </Link>
        </div>
      </form>
      {userState && (
        <button onClick={handleLogout} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Logout
        </button>
      )}
    </div>
  );
};

export default LoginPage;
