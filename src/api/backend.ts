import axios from 'axios';
import colors from '../../backend/colors.json'

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
    data: colors,
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