import React, { useState } from 'react';

const Words = () => {
  const wordsData = [
    { word: "Peace", translation: "Paz", meaning: "A state of tranquility or quiet, free from disturbance or conflict" },
    { word: "Love", translation: "Amor", meaning: "An intense feeling of deep affection or care for someone or something" },
    { word: "Hope", translation: "Esperanza", meaning: "The expectation of a positive outcome or belief in a better future" },
    { word: "Strength", translation: "Fuerza", meaning: "The quality of being strong, both physically and mentally; power" },
    { word: "Joy", translation: "Paz", meaning: "A feeling of great happiness or delight" },
    { word: "Knowledge", translation: "Conocimiento", meaning: "Facts, information, and skills acquired through experience or education." },
    { word: "Courage", translation: "valetia", meaning: "The ability to face fear, danger, or challenges with bravery" },
    { word: "Friendship", translation: "Amistad", meaning: "A close and supportive relationship between people based on mutual trust and affection." },
    { word: "Freedom", translation: "Libertad", meaning: "The power or right to act, speak, or think as one wants without hindrance." },
    { word: "Wisdom", translation: "Sabiduría", meaning: "The ability to make sound decisions and judgments based on experience and knowledge." },
    { word: "Dream", translation: "Sueño", meaning: "A series of thoughts, images, or emotions that occur during sleep, or a strongly desired goal or aspiration." },
    { word: "Respect", translation: "Respeto", meaning: "A feeling of deep admiration for someone or something, usually due to their qualities, achievements, or importance." },
    { word: "Honesty", translation: "Honestidad", meaning: "The quality of being truthful and free from deceit or fraud" },
    { word: "Patience", translation: "Paciencia", meaning: "The ability to wait calmly for something without getting frustrated or upset." },
    { word: "Creativity", translation: "Creatividad", meaning: "The ability to use imagination or original ideas to create something" },
  ];

  const [words, setWords] = useState(wordsData);

  const deleteHandler = (index) => {
    const updatedWords = [...words];
    updatedWords.splice(index, 1);
    setWords(updatedWords);
  };

  const editHandler = (index) => {
    const updatedWords = [...words];
    const wordToEdit = updatedWords[index];

    const newWord = prompt("Edit word", wordToEdit.word);
    const newTranslation = prompt("Edit translation", wordToEdit.translation);
    const newMeaning = prompt("Edit meaning", wordToEdit.meaning);

    if (newWord && newTranslation && newMeaning) {
      updatedWords[index] = {
        word: newWord,
        translation: newTranslation,
        meaning: newMeaning,
      };
      setWords(updatedWords);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start py-8">
      <div className="md:w-full w-[400px] max-w-4xl flex flex-col items-center gap-6">
        {words.length === 0 ? (
          <p className="text-lg text-gray-700">No words available</p>
        ) : (
          words.map((word, index) => (
            <div key={index} className="w-full p-6 rounded-[20px] shadow-md border border-gray-300">
              <h2 className="md:text-xl font-semibold text-green-700">
                {index + 1}. {word.word}
              </h2>
              <p className="md:text-lg ">
                <strong>Translation:</strong> {word.translation}
              </p>
              <p className="md:text-lg ">
                <strong>Meaning:</strong> {word.meaning}
              </p>
              <div className="mt-4 flex gap-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => editHandler(index)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => deleteHandler(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Words;
