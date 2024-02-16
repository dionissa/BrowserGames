import { Link } from 'react-router-dom';

const Welcome = ({handleWelcomeWasClicked}) => {

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Bem vindo a Browser Games!</h2>
          <p className="mt-2 text-sm text-gray-600">Projeto de Estudo desenvolvido no curso de Front-End, módulo de React. Por Rodrigo Dionissa</p>
        </div>
        <div className="mt-8">
          <Link onClick={handleWelcomeWasClicked} to="/main" className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out text-center block">
            Ir para página inicial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;