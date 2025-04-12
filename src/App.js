import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Search from './search';
import axios from 'axios';
import Detail from './Detail'; 
import Result from './Result';

function App() {
  const [state, setState] = useState({
    search: '',
    results: [],
    selected: {}
  });

  const handleInput = (event) => {
    const search = event.target.value;
    setState((prevState) => ({ ...prevState, search }));
  };

  const openDetail = (id) => {
    axios.get(`https://www.omdbapi.com/?i=${id}&apikey=2ba8f3f4`)
      .then(({ data }) => {
        setState((prevState) => ({ ...prevState, selected: data }));
      })
      .catch((err) => console.log(err));
  };

  const SearchResult = (event) => {
    if (event.key === 'Enter') {
      axios
        .get(`https://www.omdbapi.com/?apikey=2ba8f3f4&s=${state.search}`)
        .then((res) => {
          setState((prevState) => ({
            ...prevState,
            results: res.data.Search || []
          }));
        })
        .catch((err) => console.log(err));
    }
  };

  const close = () => {
    setState((prevState) => ({ ...prevState, selected: {} }));
  };

  return (
    <div className='w-100 main-wrapper d-flex flex-column align-items-center min-vh-100'>
      {typeof state.selected.Title !== "undefined" ? (
        <Detail selected={state.selected} close={close} />
      ) : (
        <header className='w-100 text-center text-white mt-5'>
          <h2>Movie Search</h2>
          <Search handleInput={handleInput} SearchResult={SearchResult} />
          <div className='container mt-4'>
            <div className='row'>
              {state.results.map((result, i) => (
                <div key={result.imdbID || i} className='col-12 col-sm-6 col-md-3 col-lg-3 my-2'>
                  <Result result={result} openDetail={openDetail} />
                </div>
              ))}
            </div>
          </div>
        </header>
      )}
    </div>
  );
}

export default App;

