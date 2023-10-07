import axios from 'axios';

const tqamAPI = async () => {
  try {
    const response = await axios.get('http://localhost:5000/hello')

    return response.data

  } catch (error) {
    console.log(error)
  }
}

const postData = async (question: string) => {
  const data = {
    data: { "Name": { "0": "George", "1": "Brad", "2": "Tim" }, "Movies": { "0": 78, "1": 34, "2": 64 } },
    question: question
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