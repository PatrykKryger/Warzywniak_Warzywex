import React from 'react';
import { ArrowLeft, Construction } from 'lucide-react';

const UnderConstruction = () => {
  const handleReturnToWarzywex = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center shadow-2xl border border-white/20">
        <div className="mb-6">
          <Construction className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Ziolex</h1>
          <h2 className="text-xl font-semibold text-gray-300 mb-4">Strona w budowie</h2>
        </div>

        <p className="text-gray-300 mb-8 leading-relaxed">
          Prace nad ciemną stroną Warzywexa trwają. Wróć wkrótce, aby odkryć nowe możliwości!
        </p>

        <button
          onClick={handleReturnToWarzywex}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5" />
          Powrót do Warzywexa
        </button>

        <div className="mt-6 text-sm text-gray-400">
          <p>🚧 Budowa w toku 🚧</p>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;