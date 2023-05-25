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

function App() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    const [menuIsActive, setMenuIsActive] = useState(false);
    const [isShortFilm, setIsShortFilm] = useState(false);
    const [moviesCards, setMoviesCards] = useState([]);
    /*const [requestName, setRequestName] = useState('');*/
    const [messageNothingFound, setMessageNothingFound] = useState('');
    const [preloaderActive, setPreloaderActive] = useState(false);
    const [updateMovies, setUpdateMovies] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [patchUserIsError, setPatchUserIsError] = useState(false);
    const [infoToolTip, setInfoToolTip] = useState(false);

    useEffect(() => {
        checkToken();
        if(loggedIn){
            mainApi.getProfileInfo()
                .then((data) => {
                    setCurrentUser(data);
                })
                .catch((err) => console.log(err))
        }
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
                /*setMoviesCards(getMoviesFilter(name, data))*/
                handleSaveLocalStorage(name, data);
                setPreloaderActive(false);
/*                if (moviesCards.length === 0) {
                    setMessageNothingFound('Ничего не найдено')
                } else {
                    setMessageNothingFound('');
                }*/
            })
            .catch((err) => {
                setPreloaderActive(false);
                setMessageNothingFound(err);
                console.log(err)
            })

    }
    function handleSaveLocalStorage(name, data){
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
    function handlerSavedCard({ country,
                                 director,
                                 duration,
                                 year,
                                 description,
                                 image,
                                 nameRU,
                                 nameEN,
                                 trailerLink,
                                 id,
                             }){
        mainApi.savedCard({
            country,
            director,
            duration,
            year,
            description,
            image,
            nameRU,
            nameEN,
            trailerLink,
            id,
        }).then((data) => {
            console.log(data);
        })
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
                          moviesCards={moviesCards}
                          preloaderActive={preloaderActive}
                          messageNothingFound={messageNothingFound}
                          updateMovies={updateMovies}
                          handlerSavedCard={handlerSavedCard}
                          handlerMenuIsActive={handlerMenuIsActive}
                          handlerButtonLogo={handlerButtonLogo}
                          handlerButtonSavedMovies={handlerButtonSavedMovies}
                          handlerButtonMovies={handlerButtonMovies}
                          handlerButtonProfile={handlerButtonProfile}
                          handleGetMovies={handleGetMovies}
                          setIsShortFilm={setIsShortFilm}
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
