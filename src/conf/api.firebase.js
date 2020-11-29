import axios from "axios";

const apiFirebase = axios.create({
  baseURL: "https://movie-react-e72e9.firebaseio.com/",
});

export default apiFirebase;
