import React, { useState } from 'react';
const Quiz = () => {

  const wordsData = [
    { word: "Peace", translation: "Paz", meaning: "A state of tranquility or quiet, free from disturbance or conflict" },
    { word: "Love", translation: "Amor", meaning: "An intense feeling of deep affection or care for someone or something" },
    { word: "Hope", translation: "Esperanza", meaning: "The expectation of a positive outcome or belief in a better future" },
    { word: "Strength", translation: "Fuerza", meaning: "The quality of being strong, both physically and mentally; power" },
    { word: "Joy", translation: "Paz", meaning: "A feeling of great happiness or delight" },
    { word: "Knowledge", translation: "Conocimiento", meaning: "Facts, information, and skills acquired through experience or education." },
    { word: "Courage", translation: "Valentía", meaning: "The ability to face fear, danger, or challenges with bravery" },
    { word: "Friendship", translation: "Amistad", meaning: "A close and supportive relationship between people based on mutual trust and affection." },
    { word: "Freedom", translation: "Libertad", meaning: "The power or right to act, speak, or think as one wants without hindrance." },
    { word: "Wisdom", translation: "Sabiduría", meaning: "The ability to make sound decisions and judgments based on experience and knowledge." },
    { word: "Dream", translation: "Sueño", meaning: "A series of thoughts, images, or emotions that occur during sleep, or a strongly desired goal or aspiration." },
    { word: "Respect", translation: "Respeto", meaning: "A feeling of deep admiration for someone or something, usually due to their qualities, achievements, or importance." },
    { word: "Honesty", translation: "Honestidad", meaning: "The quality of being truthful and free from deceit or fraud" },
    { word: "Patience", translation: "Paciencia", meaning: "The ability to wait calmly for something without getting frustrated or upset." },
    { word: "Creativity", translation: "Creatividad", meaning: "The ability to use imagination or original ideas to create something" },
  ];

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const generateQuestions = () => {
    return wordsData.map((word) => {
      const correctAnswer = word.translation;
      const incorrectAnswers = wordsData
        .filter((item) => item.translation !== correctAnswer)
        .map((item) => item.translation);

      const randomIncorrectAnswers = [
        incorrectAnswers[Math.floor(Math.random() * incorrectAnswers.length)],
        incorrectAnswers[Math.floor(Math.random() * incorrectAnswers.length)],
        incorrectAnswers[Math.floor(Math.random() * incorrectAnswers.length)],
      ];

      const options = shuffleArray([correctAnswer, ...randomIncorrectAnswers]);

      return {
        word: word.word,
        correctAnswer: correctAnswer,
        options: options,
      };
    });
  };

  const [questions, setQuestions] = useState(generateQuestions());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null); // Reset selected answer
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center py-8 ">
      {!quizFinished ? (
        <div id ="quiz" className="w-[90%]  max-w-4xl p-6 rounded-lg mt-[-110px] ">
          <h2 className="text-xl font-semibold text-green-700 mb-4">
            Question {currentQuestionIndex + 1}:
          </h2>
          <p className="text-lg  mb-4">
            What is the translation of "{questions[currentQuestionIndex].word}"?
          </p>

          <div className="mb-4">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                className={`w-full p-3 text-lg text-left rounded-md mt-5 ${
                  selectedAnswer === option ? 'bg-blue-500 text-white' : 'border border-green-700 hover:bg-green-300'
                }`}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4"
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
          >
            Next Question
          </button>
        </div>
      ) : (
        <div id='result' className="md:w-full w-[90%] top-[30%] md:top-[20%] absolute max-w-4xl p-6 rounded-lg shadow-md ">
          <h2 className="text-2xl font-semibold text-green-700  mb-4">Quiz Completed!</h2>
          <p className="text-lg  mb-4">Your score: {score} / {questions.length}</p>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md" onClick={() => window.location.reload()}>Try Again</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
