import { useState } from 'react';
import EvaluationModal from './EvaluationModal';

const GameCard = ({ game }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [imageClickState, setImageClickState] = useState(0);

  const handleClick = () => {
    setImageClickState((imageClickState + 1) % 4);
  };

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

  const renderClickText = () => {
    switch (imageClickState) {
      case 1:
        return "Jogado!";
      case 2:
        return "Quero jogar!";
      case 3:
        return "Não gostei!";
      default:
        return "";
    }
  };

  const renderImageStyle = () => {
    switch (imageClickState) {
      case 1:
        return { filter: "grayscale(100%)", opacity: 0.7 };
      case 2:
        return { filter: "sepia(100%)", opacity: 0.7 };
      case 3:
        return { filter: "blur(3px)", opacity: 0.7, overflow: 'hidden' };
      default:
        return { overflow: 'hidden' };
    }
  };

  const renderOverlayStyle = () => {
    if (imageClickState !== 0) {
      return { 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        color: 'white', 
        fontSize: '24px',
        userSelect: 'none'
      };
    }
    return { display: 'none' };
  };

  return (
    <div className="relative bg-gray-700 text-white rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-all">
      <div className="image-container" onClick={handleClick} style={{ position: 'relative', backgroundColor: 'inherit' }}>
          <img
            src={game.thumbnail}
            alt={game.title}
            className="w-full"
            onClick={handleClick}
            style={renderImageStyle()}
          />
        <div className="image-overlay" style={renderOverlayStyle()}>
          <p>{renderClickText()}</p>
        </div>
      </div>
      <div className="p-4 flex flex-col">
        <h3 className="text-xl font-semibold">{game.title}</h3>
        <p className="text-gray-400">{game.genre}</p>
        <p className="text-gray-300">{game.description}</p>
        <a
          href={game.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 text-center mx-1 my-1 hover:text-blue-200"
        >
          Visitar Site
        </a>
        <button className="bg-gray-200 rounded-md text-gray-800 hover:bg-gray-300" onClick={handleOpenModal}>
          Avaliar jogo
        </button>
      </div>
      {isModalOpen && <EvaluationModal game={game} onClose={handleCloseModal} onSubmit={handleEvaluationSubmit} />}
      {evaluation && (
        <div className="evaluation">
          <p className="m-2">Comentário: {evaluation.description}</p>
          <p className="m-2">Avaliação: {evaluation.rating} ★</p>
        </div>
      )}
    </div>
  );
};

export default GameCard;
