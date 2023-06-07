import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import '../../vendor/normalize.css';
import '../../vendor/fonts/fonts.css';
import './App.css';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import HeaderResult from "../HeaderResult/HeaderResult";
import {useEffect, useState} from "react";
import Menu from "../Menu/Menu";
import * as moviesApi from "../../utils/MoviesApi";
import * as mainApi from "../../utils/MainApi";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import {getSavedCards} from "../../utils/MainApi";

function App() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    const [menuIsActive, setMenuIsActive] = useState(false);
    const [preloaderActive, setPreloaderActive] = useState(false);
    const [updateMovies, setUpdateMovies] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [patchUserIsError, setPatchUserIsError] = useState(false);
    const [infoToolTip, setInfoToolTip] = useState(false);
    const [getMoviesIsError, setGetMoviesIsError] = useState(false);
    const [savedUserCards, setSavedUserCards] = useState([]);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        checkToken();
        if(loggedIn){
            Promise.all([mainApi.getProfileInfo(), mainApi.getSavedCards()])
                .then(([user, savedMovies]) => {
                    setCurrentUser(user);
                    setSavedUserCards(savedMovies || []);
                })
                .catch((err) => console.log(err))
        }
        localStorage.setItem('isShortFilm', false);
/*        if(localStorage.getItem('movies')){
            setCards(localStorage.getItem('movies'));
        }*/
    }, [loggedIn])
    function checkToken(){
        const token = localStorage.getItem('userId')
        if(token){
            setLoggedIn(true);
            navigate("/movies", {replace: true});
        }
    }
    function handleGetMovies(name){
        setPreloaderActive(true);
        moviesApi.getMovies(name)
            .then((data) => {
                setUpdateMovies(!updateMovies);
                setCards(getMoviesFilter(name, data));
                setGetMoviesIsError(false);
                localStorage.setItem('movies', JSON.stringify(getMoviesFilter(name, data)));
                localStorage.setItem('requestName', name);

            }).catch((err) => {
                setGetMoviesIsError(true);
                console.log(err)
            }).finally(() => {
                setPreloaderActive(false);
        })
    }
/*    function handleGetSavedMovies(name){
        setPreloaderActive(true);
        moviesApi.getMovies(name)
            .then((data) => {
                setUpdateMovies(!updateMovies);
                setCards(getMoviesFilter(name, data));
                setGetMoviesIsError(false);
                localStorage.setItem('movies', JSON.stringify(getMoviesFilter(name, data)));
                localStorage.setItem('requestName', name);

            }).catch((err) => {
            setGetMoviesIsError(true);
            console.log(err)
        }).finally(() => {
            setPreloaderActive(false);
        })
    }*/
    function handlerIsShortFilms(){
        if(localStorage.getItem('requestName')){
            handleGetMovies(localStorage.getItem('requestName'));
        }
    }

/*    function handlerSaveLocalStorage(name, data){
        localStorage.setItem('requestName', name);
        localStorage.setItem('isShortFilm', JSON.stringify(isShortFilm));
        localStorage.setItem('movies', JSON.stringify(getMoviesFilter(name, data)));
    }*/
    function getMoviesFilter(name, data){
        return data.filter((movie) => {
            if(localStorage.getItem('isShortFilm') === 'true') {
                console.log(localStorage.getItem('isShortFilm'));
                return movie.nameRU.toLowerCase().indexOf(name.toLowerCase()) !== -1 && movie.duration <= 40
                ||
                movie.nameEN.toLowerCase().indexOf(name.toLowerCase()) !== -1 && movie.duration <= 40
            } else if (localStorage.getItem('isShortFilm') === 'false'){
                return movie.nameRU.toLowerCase().indexOf(name.toLowerCase()) !== -1
                    ||
                    movie.nameEN.toLowerCase().indexOf(name.toLowerCase()) !== -1
            }
        })
    }

/*    function getMoviesFilterDuration(movies){
        return movies.map((movie) => {
            return movie.duration <= 40 ? movie : null
        })
    }*/

    function handleRegister({name, email, password}){
        return mainApi.register(name, email, password)
            .then((data) => {
                console.log(data)
                navigate('/movies', {replace: true});
            })
            .catch((err) => console.log(err));
    }
    function handleLogin({email, password}){
        return mainApi.authorize(email, password)
            .then((res) => {
                if(res) {
                    navigate("/movies", {replace: true});
                    setLoggedIn(true);
                }
            })
            .catch((err) => console.log(err))
    }

    // функция которая вызывается при клике пользователя на кнопку ВЫХОД
    function handlerUserExit(){
        localStorage.clear();
        setLoggedIn(false);
        return mainApi.signout();
    }
    function handlerPatchUser({email, name}) {
        return mainApi.patchUser(email, name)
            .then((user) => {
                setPatchUserIsError(false);
                setInfoToolTip(true);
                setCurrentUser(user);
            }).catch((err) => {
                setInfoToolTip(false);
                setPatchUserIsError(true);
            })
    }

    function handlerPostSavedCard(card){
        mainApi.postSavedCard(card)
            .then((card) => {
                setSavedUserCards([...savedUserCards, card])
            })
            .catch((err) => console.log(err))
    }
    function handlerDeleteSavedCard(card){
        mainApi.deleteSavedCard(card.id)
            .then(setSavedUserCards(state => state.filter(item => item.id === card.id ? null : card)))
            .catch((err) => console.log(err))
    }
    function handleButtonSignIn() {
        navigate("/signin");
    }
    function handleButtonRegister() {
        navigate("/signup");
    }
    function handlerButtonLogo(){
        navigate("/");
    }
    function handlerMenuIsActive(){
        if(menuIsActive) {
            setMenuIsActive(false);
        } else {
            setMenuIsActive(true);
        }
    }
    function closeInfoTooltip(){
        setInfoToolTip(false);
    }
  return (
      <CurrentUserContext.Provider value={{currentUser, savedUserCards, setSavedUserCards}}>
          <div className='page'>
              <Routes>
                  <Route path='/' element={
                      <>
                          <Header
                              handlerButtonLogo={handlerButtonLogo}
                              handleButtonSignIn={handleButtonSignIn}
                              handleButtonRegister={handleButtonRegister}/>
                          <Main />
                          <Footer />
                      </>
                  }/>
                  <Route path='/signin' element={
                      <Login
                          handleLogin={handleLogin}
                          handleButtonRegister={handleButtonRegister}
                          handlerButtonLogo={handlerButtonLogo}
                      />
                  }/>
                  <Route path='/signup' element={
                      <Register
                          handleRegister={handleRegister}
                          handleButtonSignIn={handleButtonSignIn}
                          handlerButtonLogo={handlerButtonLogo}
                      />
                  }/>

                  <Route path='/movies' element={
                      <ProtectedRoute
                          component={Movies}
                          loggedIn={loggedIn}
                          preloaderActive={preloaderActive}
                          updateMovies={updateMovies}
                          getMoviesIsError={getMoviesIsError}
                          handlerPostSavedCard={handlerPostSavedCard}
                          handlerMenuIsActive={handlerMenuIsActive}
                          menuIsActive={menuIsActive}
                          handleGetMovies={handleGetMovies}
                          cards={cards}
                          handlerDeleteSavedCard={handlerDeleteSavedCard}
                          handlerIsShortFilms={handlerIsShortFilms}
                      />
                  }/>
                  <Route path='/saved-movies' element={
                      <ProtectedRoute
                          loggedIn={loggedIn}
                          component={SavedMovies}
                          handlerMenuIsActive={handlerMenuIsActive}
                          menuIsActive={menuIsActive}
                          handlerDeleteSavedCard={handlerDeleteSavedCard}
                      />
                  }/>
                  <Route path='/profile' element={
                      <ProtectedRoute
                          component={Profile}
                          loggedIn={loggedIn}
                          onClose={closeInfoTooltip}
                          infoToolTip={infoToolTip}
                          patchUserIsError={patchUserIsError}
                          handlerPatchUser={handlerPatchUser}
                          handlerUserExit={handlerUserExit}
                          handlerMenuIsActive={handlerMenuIsActive}
                          menuIsActive={menuIsActive}
                      />
                  }/>
                  <Route path='*' element={
                      <NotFound handlerButtonLogo={handlerButtonLogo}/>
                  }/>
              </Routes>
              {/*<Main />*/}
              {/*<Movies />*/}
              {/*<SavedMovies />*/}
              {/*<Register />*/}
              {/*<Login />*/}
              {/*<Profile />*/}
          </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
