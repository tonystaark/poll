import axios from "axios";
import { IPostNewQuestionReqBody } from '../apis/model';

const axiosInstance = axios.create({
  baseURL: "https://polls.apiblueprint.org/",
});

const getQuestions = () =>  axiosInstance.get(`questions`);
const postNewQuestions = (payload:IPostNewQuestionReqBody) =>  axiosInstance.post(`questions`, payload);

const getQuestionsDetails = (questionNum: string) =>  axiosInstance.get(`questions/${questionNum}`);

const voteOnChoices = (url: string) =>  axiosInstance.post(url);


export { getQuestions, getQuestionsDetails, voteOnChoices, postNewQuestions  };
