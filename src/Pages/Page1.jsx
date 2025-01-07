import React, { useEffect, useState } from "react";

const Page1 = () => {
  const [word, setword] = useState("");
  const [translation, settranslation] = useState("");
  const [meaning, setmeaning] = useState("");
  const [showInput, setshowInput] = useState(false);
  const [showOutput, setshowOutput] = useState(true)
  const [submittedWords, setsubmittedWords] = useState([])
  const [editIndex, seteditIndex] = useState("")
  const [fullScreen, setfullScreen] = useState("")



  useEffect(() => {
    const storedWords = JSON.parse(localStorage.getItem("submittedWords"));
    if (storedWords) {
      setsubmittedWords(storedWords);
    }
  }, []);

  useEffect(() => {
    if (submittedWords.length > 0) {
      localStorage.setItem("submittedWords", JSON.stringify(submittedWords));
    }
  }, [submittedWords]);


  const clickhandler = () => {
    setshowInput(true);
    setshowOutput(false);
  };

  const submitHandler = (e) => {

    e.preventDefault();

    if (!word || !translation) {
        alert("Please fill in both the Word and Translation fields.");
        return;
      }


    const inputdata = {
      word: word,
      translation: translation,
      meaning: meaning,
    };
    console.log(inputdata);

    if(editIndex !== null){
      const updatedWords = [...submittedWords];
      updatedWords[editIndex] = inputdata;
      setsubmittedWords(updatedWords);
      seteditIndex(null);
    }
    else{
        setsubmittedWords([...submittedWords, inputdata]);
    }

    setsubmittedWords([...submittedWords, inputdata]);

    setword("");
    settranslation("");
    setmeaning("");
    setshowInput(false);
    setshowOutput(true)
   

  };

  const flippedHandler = (index) => {
    const updatedwords = [...submittedWords];
    updatedwords[index].showMeaning = !updatedwords[index].showMeaning;
    setsubmittedWords(updatedwords);
  };

  const deletehandler = (index) => {
    const updatedwords = [...submittedWords];
    updatedwords.splice(index, 1);
    setsubmittedWords(updatedwords);
    localStorage.setItem("submittedWords", JSON.stringify(updatedwords));
  };

  const editHandler = (index) => {
    const wordToEdit = submittedWords[index];
    setword(wordToEdit.word);
    settranslation(wordToEdit.translation);
    setmeaning(wordToEdit.meaning|| "");
    setshowInput(true);
    setshowOutput(false);
    seteditIndex(index);
  };

  const toggleFullScreen = (index) => {
    if (fullScreen === index) {
        setfullScreen(null);
    } else {
        setfullScreen(index);
    }
  };


  return (
    <div className="h-[90%]">
      <div className="flex ">
        <button
          onClick={clickhandler}
          className="text-[18px] border-2 border-green-700 text-green-700 p-2 m-8 rounded-lg font-bold italic"
        >
          Add Word
        </button>
      </div>


      {showInput &&  (
        <form onSubmit={submitHandler}
          id="input"
          className="flex w-[370px] h-[420px]  md:w-[500px] md:h-[410px]  flex-col items-center m-auto rounded-lg"
        >
          <div className="flex flex-col items-start ">
            <label className="text-[16px] font-bold mt-5">Word *</label>
            <input
              type="text"
              className="w-[300px] h-[40px] border-b-2 border-green-700 rounded-lg bg-transparent p-2"
              onChange={(e) => setword(e.target.value)}
              value={word}
            />
          </div>
          <div className="flex flex-col items-start">
            <label className="text-[16px] font-bold mt-[50px]">
              Translation *
            </label>
            <input
              type="text"
              className="w-[300px] h-[40px] border-b-2 border-green-700 rounded-lg bg-transparent p-2"
              onChange={(e) => settranslation(e.target.value)}
              value={translation}
            />
          </div>
          <div className="flex flex-col items-start">
            <label className="text-[16px] font-bold mt-[50px]">
              Meaning (Optional)
            </label>
            <input
              type="text"
              className="w-[300px] h-[40px] border-b-2 border-green-700 rounded-lg bg-transparent p-2"
              onChange={(e) => setmeaning(e.target.value)}
              value={meaning}
            />
          </div>
          <button className="text-[15px] bg-green-700 text-white px-16 py-4 m-8 rounded-lg font-bold">{editIndex !== null ? "Save Changes" : "Add"}</button>
        </form>
      )}


     {showOutput &&
        submittedWords.map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row  gap-4" >
            <div
              className={`card-container w-[300px] h-[130px] md:w-[800px] md:h-[110px] ${item.showMeaning ? "flipped" : ""}`}
              onClick={() => flippedHandler(index)} 
            >
      
              <div className="card-front w-[300px] h-[130px] md:w-[800px] md:h-[110px] flex ">
                <div className="w-full flex flex-col ">
                {/* <h1 className=" text-[12px] border-b-2 border-green-700 text-green-700 font-bold rounded-l px-[5%]  ">Sr.No</h1> */}
                <h1 className=" text-[12px] md:text-[22px]   border-green-700  font-semibold rounded-l px-[5%] py-[6px]  "> {index + 1 || "Sr.No" }. </h1>

                </div>

                <div className="w-full flex flex-col">
                 {/* <h1 className=" text-[12px] border-b-2 border-green-700 text-green-700 font-bold  px-[5%]  ">Word</h1> */}
                 <h1 className=" text-[12px] md:text-[22px]  border-green-700  font-semibold  px-[5%]  ">{item.word || "No word available"}</h1>
                </div>

                <div className="w-full   flex-col">
                    {/* <h1 className=" text-[12px] border-b-2 border-green-700 text-green-700 font-bold rounded-r px-[5%] ">Translation</h1> */}
                    <h1 className=" text-[12px] md:text-[22px]  border-green-700  font-semibold rounded-r px-[5%] ">{item.translation || "No translation available"}</h1>
                </div>

              </div>

              <div className="card-back">
                <h1 className="mb-6 text-[16px] text-green-700 font-bold">Meaning</h1>
                <p className="text-[12px] md:text-[22px]  ">{item.meaning || "No meaning available"}</p>
              </div>
            </div>
            <div id="edit" className=" md:w-[400px] md:h-[95px] w-[300px] h-[95px] md:ml-[100px] ml-[31px] mb-10 md:mb-0 justify-center items-center gap-10   flex rounded">
                <h1 onClick={() => toggleFullScreen(index)} className="hover:cursor-pointer hover:text-blue-500">
                    Show <i className="fa-solid fa-eye"></i>
                </h1>
                <h1 onClick={() => deletehandler(index)} className="hover:cursor-pointer hover:text-red-500">
                    Delete <i className="fa-solid fa-trash "></i>
                </h1>
                <h1 onClick={() => editHandler(index)} className="hover:cursor-pointer hover:text-green-500"> 
                    Edit <i className="fa-solid fa-pen-to-square"></i>
                </h1>
            </div>
          </div>
          
        ))}
        {fullScreen !== null && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg w-4/5 md:w-2/3 lg:w-1/2">
              <h2 className="text-2xl text-black font-bold mb-4">Word: {submittedWords[fullScreen]?.word || " N.A."}</h2>
              <p className="text-lg text-black">Translation: {submittedWords[fullScreen]?.translation || " N.A."}</p>
              <p className="text-lg text-black">Meaning: {submittedWords[fullScreen]?.meaning || "No Meaning Available"}</p>
              <button
                className="mt-4 bg-green-700  py-2 px-4 rounded hover:bg-white text-white  hover:text-green-700 border-2 border-green-700"
                onClick={() => toggleFullScreen(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}      
    </div>
  );
};

export default Page1;
