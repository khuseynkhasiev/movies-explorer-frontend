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
    const [isShortFilm, setIsShortFilm] = useState(false);
    const [preloaderActive, setPreloaderActive] = useState(false);
    const [updateMovies, setUpdateMovies] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [patchUserIsError, setPatchUserIsError] = useState(false);
    const [infoToolTip, setInfoToolTip] = useState(false);
    const [getMoviesIsError, setGetMoviesIsError] = useState(false);
    const [savedUserCards, setSavedUserCards] = useState([]);
    const [isOnId, setIsOnId] = useState();

    useEffect(() => {
        checkToken();
        handlerGetSavedCards();
        if(loggedIn){
            mainApi.getProfileInfo()
                .then((data) => {
                    setCurrentUser(data);
                })
                .catch((err) => console.log(err))
        }
    }, [loggedIn, isOnId])
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
                handlerSaveLocalStorage(name, data);
                setPreloaderActive(false);
                setGetMoviesIsError(false);
            }).catch((err) => {
                setPreloaderActive(false);
                setGetMoviesIsError(true);
                console.log(err)
            })
    }
/*    function handlerIsLikeCard(data){
        return data.filter((card) => card.name === savedUserCards.name){
            return {card..., isLike: true,};
        }
    }*/
    function handlerSaveLocalStorage(name, data){
        localStorage.setItem('requestName', name);
        localStorage.setItem('isShortFilm', JSON.stringify(isShortFilm));
        localStorage.setItem('movies', JSON.stringify(getMoviesFilter(name, data)));
    }
    function getMoviesFilter(name, data){
        return data.filter((movie) => {
            return movie.nameRU.toLowerCase().indexOf(name.toLowerCase()) !== -1 || movie.nameEN.toLowerCase().indexOf(name.toLowerCase()) !== -1;
        })
    }
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
    function handlerUserExit(){
        setLoggedIn(false);
        localStorage.removeItem('userId');
        navigate("/");
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
    function handlerGetSavedCards(){
        mainApi.getSavedCards()
            .then((cards) => {
                setSavedUserCards(cards);
                console.log(cards);
            })
            .catch((err) => console.log(err))
    }
    function handlerPostSavedCard(card){
        const isLiked = savedUserCards.some(i => i.id === card.id);
        console.log(isLiked);
        setIsOnId(isLiked);
        if(!isLiked){
            mainApi.postSavedCard(card)
                .then((data) => {
                })
                .catch((err) => console.log(err))
        }
    }
    function handleButtonSignIn() {
        navigate("/signin");
    }
    function handleButtonRegister() {
        navigate("/signup");
    }
    function handlerButtonLogo() {
        navigate("/");
    }
    function handlerButtonSavedMovies() {
        navigate("/saved-movies");
    }
    function handlerButtonMovies() {
        navigate("/movies");
    }
    function handlerButtonProfile() {
        navigate("/profile");
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
      <CurrentUserContext.Provider value={currentUser}>
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
                          handlerButtonLogo={handlerButtonLogo}
                          handlerButtonSavedMovies={handlerButtonSavedMovies}
                          handlerButtonMovies={handlerButtonMovies}
                          handlerButtonProfile={handlerButtonProfile}
                          handleGetMovies={handleGetMovies}
                          setIsShortFilm={setIsShortFilm}
                          savedUserCards={savedUserCards}
                      />
                  }/>
                  <Route path='/saved-movies' element={
                      <ProtectedRoute
                          loggedIn={loggedIn}
                          component={SavedMovies}
                          handlerMenuIsActive={handlerMenuIsActive}
                          handlerButtonLogo={handlerButtonLogo}
                          handlerButtonSavedMovies={handlerButtonSavedMovies}
                          handlerButtonMovies={handlerButtonMovies}
                          handlerButtonProfile={handlerButtonProfile}
                          savedUserCards={savedUserCards}
                      />
                  }/>
                  <Route path='/profile' element={
                      <ProtectedRoute
                          component={Profile}
                          loggedIn={loggedIn}
                          menuIsActive={menuIsActive}
                          onClose={closeInfoTooltip}
                          infoToolTip={infoToolTip}
                          patchUserIsError={patchUserIsError}
                          handlerPatchUser={handlerPatchUser}
                          handlerUserExit={handlerUserExit}
                          handlerMenuIsActive={handlerMenuIsActive}
                          handlerButtonLogo={handlerButtonLogo}
                          handlerButtonSavedMovies={handlerButtonSavedMovies}
                          handlerButtonMovies={handlerButtonMovies}
                          handlerButtonProfile={handlerButtonProfile}
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
              {/*<Footer />*/}
              {/*<NotFound />*/}
          </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
