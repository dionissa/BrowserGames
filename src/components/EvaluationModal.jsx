import { useState } from 'react';

const EvaluationModal = ({ onClose, onSubmit, game }) => {
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = () => {
    onSubmit({ description, rating });
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`cursor-pointer text-2xl ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
          onClick={() => handleRatingChange(i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-gray-800 bg-opacity-50">
      <div className="relative w-auto max-w-md mx-auto my-6">
        <div className="relative bg-white shadow-lg rounded-md text-gray-900">
          <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
            <h3 className="text-lg font-semibold m-2">{`Add Evaluation for ${game.title}`}</h3>
            <button
              onClick={onClose}
              className="text-gray-700 close-modal"
            >
              &#x2715;
            </button>
          </div>
          <div className="relative p-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Adicionar comentário:</label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              className="w-full border rounded-md p-2 mb-4"
              placeholder="Enter description..."
            />
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">Rating:</label>
            <div className="flex mb-4">{renderStars()}</div>
          </div>
          <div className="flex items-center justify-end p-2 border-t border-gray-300 border-solid rounded-b">
            <button
              onClick={handleSubmit}
              className="text-white bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-2 mr-2"
            >
              Avaliar
            </button>
            <button
              onClick={onClose}
              className="text-gray-100 hover:text-gray-200 bg-red-500 hover:bg-red-800 rounded-md px-4 py-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationModal;
