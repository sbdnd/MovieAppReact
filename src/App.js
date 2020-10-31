import { Header, MovieDetails, MovieList }  from './components';

function App() {
  return (
    <div className="App d-flex flex-column">
        <Header />
        <div className="d-flex flex-row border flex-fill pt-4 p-2" >
          <MovieList />
          <MovieDetails />
        </div>
      </div>
  );
}

export default App;
