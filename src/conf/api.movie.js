import axios from "axios";

const apiMovie = axios.create({
  baseURL: "https://api.themoviedb.org/4",
});

apiMovie.interceptors.request.use((req) => {
  req.headers.Authorization =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzQ4NGUyMWUwMTJhZTY1ZDMwNDg2MjEwMWI4MjJkZSIsInN1YiI6IjVmYmU2YTlkZjk0NzViMDA0MWM2MzE5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WVessH8Fvt_KaXFi-B-9nYoA2OBEHOxDoec80MZapzM";
  return req;
});

export default apiMovie;

export const apiMovieMap = (m) => ({
  title: m.title,
  details: `sortie: ${m.release_date} | lang: ${m.original_language} | vote: ${m.vote_average}/10 `,
  img: "https://image.tmdb.org/t/p/w500" + m.poster_path,
  description: m.overview,
});
