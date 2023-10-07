import axios from 'axios';

const tqamAPI = async () => {
  try {
    const response = await axios.get('http://localhost:5000/hello')
    
    return response
    
  } catch (error) {
    console.log(error)
  }
}

const postData = async () => {
  const data = {
    data: {
      Actors: ["Brad Pitt", "Leonardo Di Caprio", "George Clooney"],
      "Number of movies": ["87", "53", "69"],
    },
    question: "how many movies does Leonardo Di Caprio have?",
  };

  try {
    const response = await axios.post("http://localhost:5000/answer_question", data);
    return response.data.answer
  } catch (error) {
    console.error(error);
  }
};

export {
  tqamAPI,
  postData
}