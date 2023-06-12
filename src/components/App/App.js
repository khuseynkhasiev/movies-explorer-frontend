import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import '../../vendor/normalize.css';
import '../../vendor/fonts/fonts.css';
import './App.css';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import {useEffect, useState} from "react";
import * as moviesApi from "../../utils/MoviesApi";
import * as mainApi from "../../utils/MainApi";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import HeaderResult from "../HeaderResult/HeaderResult";

function App() {
    const navigate = useNavigate();
    const [menuIsActive, setMenuIsActive] = useState(false);
    const [preloaderActive, setPreloaderActive] = useState(false);
    const [updateMovies, setUpdateMovies] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [patchUserIsError, setPatchUserIsError] = useState(false);
    const [infoToolTip, setInfoToolTip] = useState(false);
    const [getMoviesIsError, setGetMoviesIsError] = useState(false);
    const [savedUserCards, setSavedUserCards] = useState([]);
    const [savedUserCardsFilter, setSavedUserCardsFilter] = useState([]);

    const {pathname} = useLocation();

    useEffect(() => {
        checkToken();
        if(loggedIn){
            Promise.all([mainApi.getProfileInfo(), mainApi.getSavedCards()])
                .then(([user, savedMovies]) => {
                    localStorage.setItem('userInfo', JSON.stringify(user));
                    setSavedUserCards(savedMovies || []);
                })
                .catch((err) => console.log(err))
        }
        getIsShortFilm();
    }, [loggedIn])
    useEffect(() => {
        setSavedUserCardsFilter(savedUserCards);
    }, [savedUserCards])

    // Получаем при начальной отрисовке значение isShortFilm
    function getIsShortFilm(){
        if(!localStorage.getItem('isShortFilmSaved')){
            localStorage.setItem('isShortFilmSaved', false);
        }
        if(!localStorage.getItem('isShortFilm')){
            localStorage.setItem('isShortFilm', false);
        }
    }
    // запрос со страницы 'movie' при переключение бегунка
    function handleIsShortFilms(){
        if(localStorage.getItem('requestNameMovie')){
            handleGetMovies(localStorage.getItem('requestNameMovie'));
        }
    }
    // проверяем авторизован ли пользователь
    function checkToken(){
        const token = localStorage.getItem('userId')
        if(token){
            setLoggedIn(true);
            if(pathname === '/'){
                navigate("/movies", {replace: true})
            }
            if(pathname === '/saved-movies'){
                navigate("/saved-movies", {replace: true})
            }
            if(pathname === '/profile'){
                navigate("/profile", {replace: true})
            }
        }
    }
    // получаем отфильтрованный список фильмов
    function handleGetMovies(name){
        setPreloaderActive(true);
        moviesApi.getMovies(name)
            .then((data) => {
                setUpdateMovies(!updateMovies);
                setGetMoviesIsError(false);
                localStorage.setItem('movies', JSON.stringify(getMoviesFilter(name, data)));
                localStorage.setItem('requestNameMovie', name);
            }).catch((err) => {
                setGetMoviesIsError(true);
                console.log(err)
            }).finally(() => {
                setPreloaderActive(false);
        })
    }
    // возвращает отфильтрованный список фильмов
    function getMoviesFilter(name, data){
        return data.filter((movie) => {
            if(localStorage.getItem('isShortFilm') === 'true') {
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

    // получаем, фильтруем и записываем список сохраненных фильмов
    function handleFilterSavedUserCards(name){
        if(name) {
            if(localStorage.getItem('isShortFilmSaved') === 'true') {
                setSavedUserCardsFilter(savedUserCards.filter((movie) => {
                    return movie.nameRU.toLowerCase().indexOf(name.toLowerCase()) !== -1 && movie.duration <= 40
                        ||
                        movie.nameEN.toLowerCase().indexOf(name.toLowerCase()) !== -1 && movie.duration <= 40
                }) || [])
            } else if (localStorage.getItem('isShortFilmSaved') === 'false'){
                setSavedUserCardsFilter(savedUserCards.filter((movie) => {
                    return movie.nameRU.toLowerCase().indexOf(name.toLowerCase()) !== -1
                        ||
                        movie.nameEN.toLowerCase().indexOf(name.toLowerCase()) !== -1
                }) || [])
            }
        } else {
            if(localStorage.getItem('isShortFilmSaved') === 'true') {
                setSavedUserCardsFilter(savedUserCards.filter((movie) => {
                    return movie.duration <= 40 ? movie : null;
                }) || [])
            } else if (localStorage.getItem('isShortFilmSaved') === 'false'){
                setSavedUserCardsFilter(savedUserCards || []);
            }
        }
    }
    // получаем, фильтруем и записываем список сохраненных фильмов
    /*function handleFilterSavedUserCards(name){
        if(name) {
            localStorage.setItem('requestNameSaveMovie', name);
            mainApi.getSavedCards()
                .then((data) =>{
                    if(localStorage.getItem('isShortFilmSaved') === 'true') {
                        setSavedUserCards(data.filter((movie) => {
                            return movie.nameRU.toLowerCase().indexOf(name.toLowerCase()) !== -1 && movie.duration <= 40
                                ||
                                movie.nameEN.toLowerCase().indexOf(name.toLowerCase()) !== -1 && movie.duration <= 40
                        }) || [])
                    } else if (localStorage.getItem('isShortFilmSaved') === 'false'){
                        setSavedUserCards(data.filter((movie) => {
                            return movie.nameRU.toLowerCase().indexOf(name.toLowerCase()) !== -1
                                ||
                                movie.nameEN.toLowerCase().indexOf(name.toLowerCase()) !== -1
                        }) || [])
                    }
                }).catch((err) => console.log(err))
        } else {
            localStorage.setItem('requestNameSaveMovie', '');
            mainApi.getSavedCards()
                .then((data) => {
                    if(localStorage.getItem('isShortFilmSaved') === 'true') {
                        setSavedUserCards(data.filter((movie) => {
                            return movie.duration <= 40 ? movie : null;
                        }) || [])
                    } else if (localStorage.getItem('isShortFilmSaved') === 'false'){
                        setSavedUserCards(data || []);
                    }
                }).catch((err) => console.log(err));
        }
    }*/
    // регистрация*/
    function handleRegister({name, email, password}){
        return mainApi.register(name, email, password)
            .then((data) => {
                handleLogin({email, password});
            })
            .catch((err) => console.log(err));
    }
    // авторизация
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
    // выход пользователя
    function handleUserExit(){
        localStorage.clear();
        setLoggedIn(false);
        return mainApi.signout();
    }
    // обновление данных пользователя
    function handlePatchUser({email, name}) {
        return mainApi.patchUser(email, name)
            .then((user) => {
                setPatchUserIsError(false);
                setInfoToolTip(true);
                localStorage.setItem('userInfo', JSON.stringify(user))
            }).catch((err) => {
                setInfoToolTip(true);
                setPatchUserIsError(true);
            })
    }
    // сохранение карточки в избранное
    function handlePostSavedCard(card){
        mainApi.postSavedCard(card)
            .then((card) => {
                setSavedUserCards([...savedUserCards, card])
            })
            .catch((err) => console.log(err))
    }
    // удаление карточки из избранных
    function handleDeleteSavedCard(card){
        setUpdateMovies(!updateMovies);
        mainApi.deleteSavedCard(card.id)
            .then(setSavedUserCards(state => state.filter(item => item.id === card.id ? null : card)))
            .catch((err) => console.log(err))
    }
    // навигация к странице авторизации
    function handleButtonSignIn() {
        navigate("/signin");
    }
    // навигация к странице регистрации
    function handleButtonRegister() {
        navigate("/signup");
    }
    // навигация к главной странице
    function handleButtonLogo(){
        navigate("/");
    }
    // открытие и закрытие доп меню при меньшем разрешении экрана
    function handleMenuIsActive(){
        if(menuIsActive) {
            setMenuIsActive(false);
        } else {
            setMenuIsActive(true);
        }
    }
    // закрытие информационного попапа регистрации
    function closeInfoTooltip(){
        setInfoToolTip(false);
    }
  return (
      <CurrentUserContext.Provider value={{savedUserCards, setSavedUserCards, savedUserCardsFilter}}>
          <div className='page'>
              <Routes>
                  <Route exact path='/' element={
                      <>
                          {loggedIn ?
                              <HeaderResult
                                  handleMenuIsActive={handleMenuIsActive}
                                  menuIsActive={menuIsActive}
                                  handleFilterSavedUserCards={handleFilterSavedUserCards}
                              />
                              :
                              <Header
                                  handleButtonLogo={handleButtonLogo}
                                  handleButtonSignIn={handleButtonSignIn}
                                  handleButtonRegister={handleButtonRegister}
                              />
                          }
                          <Main />
                          <Footer />
                      </>
                  }/>
                  {
                      !loggedIn &&
                      <Route path='/signin' element={
                          <Login
                              handleLogin={handleLogin}
                              handleButtonRegister={handleButtonRegister}
                              handleButtonLogo={handleButtonLogo}
                          />
                      }/>
                  }
                  {
                      !loggedIn &&
                      <Route path='/signup' element={
                          <Register
                              handleRegister={handleRegister}
                              handleButtonSignIn={handleButtonSignIn}
                              handleButtonLogo={handleButtonLogo}
                          />
                      }/>
                  }
                  <Route path='/movies' element={
                      <ProtectedRoute
                          component={Movies}
                          loggedIn={loggedIn}
                          preloaderActive={preloaderActive}
                          updateMovies={updateMovies}
                          getMoviesIsError={getMoviesIsError}
                          handlePostSavedCard={handlePostSavedCard}
                          handleMenuIsActive={handleMenuIsActive}
                          menuIsActive={menuIsActive}
                          handleGetMovies={handleGetMovies}
                          handleDeleteSavedCard={handleDeleteSavedCard}
                          handleIsShortFilms={handleIsShortFilms}
                          handleFilterSavedUserCards={handleFilterSavedUserCards}
                      />
                  }/>
                  <Route path='/saved-movies' element={
                      <ProtectedRoute
                          loggedIn={loggedIn}
                          component={SavedMovies}
                          handleMenuIsActive={handleMenuIsActive}
                          menuIsActive={menuIsActive}
                          handleDeleteSavedCard={handleDeleteSavedCard}
                          updateMovies={updateMovies}
                          handleIsShortFilms={handleIsShortFilms}
                          handleGetMovies={handleGetMovies}
                          handleFilterSavedUserCards={handleFilterSavedUserCards}
                      />
                  }/>
                  <Route path='/profile' element={
                      <ProtectedRoute
                          component={Profile}
                          loggedIn={loggedIn}
                          onClose={closeInfoTooltip}
                          infoToolTip={infoToolTip}
                          patchUserIsError={patchUserIsError}
                          handlePatchUser={handlePatchUser}
                          handleUserExit={handleUserExit}
                          handleMenuIsActive={handleMenuIsActive}
                          menuIsActive={menuIsActive}
                          handleFilterSavedUserCards={handleFilterSavedUserCards}
                      />
                  }/>
                  <Route path='*' element={
                      <NotFound handleUserExit={handleUserExit}/>
                  }/>
              </Routes>
          </div>
      </CurrentUserContext.Provider>
  );
}
export default App;
