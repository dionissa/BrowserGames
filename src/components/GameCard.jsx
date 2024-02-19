import { useState } from 'react';
import EvaluationModal from './EvaluationModal';

const GameCard = ({ game }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEvaluationSubmit = (data) => {
    setEvaluation(data);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-700 text-white rounded-lg overflow-hidden shadow-lg">
      <img src={game.thumbnail} alt={game.title} className="w-full" />
      <div className="p-4 flex flex-col">
        <h3 className="text-xl font-semibold">{game.title}</h3>
        <p className="text-gray-400">{game.genre}</p>
        <p className="text-gray-300">{game.description}</p>
        <a href={game.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-center mx-1 my-1 hover:text-blue-200">Visit Website</a>
        <button className='bg-gray-200 rounded-md text-gray-800 hover:bg-gray-300' onClick={handleOpenModal}>Avaliar jogo</button>
      </div>
      {isModalOpen && (
        <EvaluationModal game={game} onClose={handleCloseModal} onSubmit={handleEvaluationSubmit} />
      )}
      {evaluation && (
        <div className="evaluation">
          <p className='m-2'>Comentário: {evaluation.description}</p>
          <p className='m-2'>Avaliação: {evaluation.rating} ★</p>
        </div>
      )}
    </div>
  );
};

export default GameCard;
