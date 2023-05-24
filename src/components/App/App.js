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
    function handleButtonLogo() {
        navigate("/");
    }
    function handleButtonSavedMovies() {
        navigate("/saved-movies");
    }
    function handleButtonMovies() {
        navigate("/movies");
    }
    function handleButtonProfile() {
        navigate("/profile");
    }
    function handleMenuIsActive(){
        if(menuIsActive) {
            setMenuIsActive(false);
        } else {
            setMenuIsActive(true);
        }
    }
  return (
      <CurrentUserContext.Provider value={currentUser}>
          <div className='page'>
              <Routes>
                  <Route path='/' element={
                      <>
                          <Header
                              handleButtonLogo={handleButtonLogo}
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
                          handleButtonLogo={handleButtonLogo}
                      />
                  }/>
                  <Route path='/signup' element={
                      <Register
                          handleRegister={handleRegister}
                          handleButtonSignIn={handleButtonSignIn}
                          handleButtonLogo={handleButtonLogo}
                      />
                  }/>

                  <Route path='/movies' element={
                      <>
                          <ProtectedRoute
                              loggedIn={loggedIn}
                              component={HeaderResult}
                              handleMenuIsActive={handleMenuIsActive}
                              handleButtonLogo={handleButtonLogo}
                              handleButtonSavedMovies={handleButtonSavedMovies}
                              handleButtonMovies={handleButtonMovies}
                              handleButtonProfile={handleButtonProfile}
                          />
                          <ProtectedRoute
                              loggedIn={loggedIn}
                              component={SearchForm}
                              handleGetMovies={handleGetMovies}
                              setIsShortFilm={setIsShortFilm}
                              updateMovies={updateMovies}
                          />
    {/*                      <ProtectedRoute
                              loggedIn={loggedIn}
                              component={menuIsActive && Menu}
                              handleMenuIsActive={handleMenuIsActive}
                              handleButtonLogo={handleButtonLogo}
                              handleButtonSavedMovies={handleButtonSavedMovies}
                              handleButtonMovies={handleButtonMovies}
                              handleButtonProfile={handleButtonProfile}
                          />*/}
                          <ProtectedRoute
                              loggedIn={loggedIn}
                              component={Movies}
                              moviesCards={moviesCards}
                              preloaderActive={preloaderActive}
                              messageNothingFound={messageNothingFound}
                              updateMovies={updateMovies}
                              handlerSavedCard={handlerSavedCard}
                          />
                          <ProtectedRoute
                              loggedIn={loggedIn}
                              component={Footer}
                          />
                      </>
                  }/>
    {/*              <Route path='/movies' element={
                      <>
                          <HeaderResult
                              handleMenuIsActive={handleMenuIsActive}
                              handleButtonLogo={handleButtonLogo}
                              handleButtonSavedMovies={handleButtonSavedMovies}
                              handleButtonMovies={handleButtonMovies}
                              handleButtonProfile={handleButtonProfile}
                          />
                          <SearchForm
                              handleGetMovies={handleGetMovies}
                              setIsShortFilm={setIsShortFilm}
                              updateMovies={updateMovies}
                          />
                          {menuIsActive && <Menu
                              handleMenuIsActive={handleMenuIsActive}
                              handleButtonLogo={handleButtonLogo}
                              handleButtonSavedMovies={handleButtonSavedMovies}
                              handleButtonMovies={handleButtonMovies}
                              handleButtonProfile={handleButtonProfile}
                          />}
                          <Movies
                              moviesCards={moviesCards}
                              preloaderActive={preloaderActive}
                              messageNothingFound={messageNothingFound}
                              updateMovies={updateMovies}
                              handlerSavedCard={handlerSavedCard}
                          />
                          <Footer />
                      </>
                  }/>*/}
    {/*              <Route path='/saved-movies' element={
                      <>
                          <HeaderResult
                              handleMenuIsActive={handleMenuIsActive}
                              handleButtonLogo={handleButtonLogo}
                              handleButtonSavedMovies={handleButtonSavedMovies}
                              handleButtonMovies={handleButtonMovies}
                              handleButtonProfile={handleButtonProfile}
                          />
                          <SearchForm />
                          {menuIsActive && <Menu
                              handleMenuIsActive={handleMenuIsActive}
                              handleButtonLogo={handleButtonLogo}
                              handleButtonSavedMovies={handleButtonSavedMovies}
                              handleButtonMovies={handleButtonMovies}
                              handleButtonProfile={handleButtonProfile}
                          />}
                          <SavedMovies />
                          <Footer />
                      </>
                  }/>*/}
                  <Route path='/saved-movies' element={
                      <>
                          <ProtectedRoute
                              loggedIn={loggedIn}
                              component={HeaderResult}
                              handleMenuIsActive={handleMenuIsActive}
                              handleButtonLogo={handleButtonLogo}
                              handleButtonSavedMovies={handleButtonSavedMovies}
                              handleButtonMovies={handleButtonMovies}
                              handleButtonProfile={handleButtonProfile}
                          />
                          <ProtectedRoute
                              loggedIn={loggedIn}
                              component={SearchForm}
                          />
    {/*                      <ProtectedRoute
                            component={menuIsActive && Menu}
                            handleMenuIsActive={handleMenuIsActive}
                            handleButtonLogo={handleButtonLogo}
                            handleButtonSavedMovies={handleButtonSavedMovies}
                            handleButtonMovies={handleButtonMovies}
                            handleButtonProfile={handleButtonProfile}
                          />*/}
                          <ProtectedRoute
                              loggedIn={loggedIn}
                              component={SavedMovies}
                          />
                          <ProtectedRoute
                              loggedIn={loggedIn}
                              component={Footer}
                          />
                      </>
                  }/>
                  <Route path='/profile' element={
                      <>
                          <HeaderResult
                              handleMenuIsActive={handleMenuIsActive}
                              handleButtonLogo={handleButtonLogo}
                              handleButtonSavedMovies={handleButtonSavedMovies}
                              handleButtonMovies={handleButtonMovies}
                              handleButtonProfile={handleButtonProfile}
                          />
                          {menuIsActive && <Menu
                              handleMenuIsActive={handleMenuIsActive}
                              handleButtonLogo={handleButtonLogo}
                              handleButtonSavedMovies={handleButtonSavedMovies}
                              handleButtonMovies={handleButtonMovies}
                              handleButtonProfile={handleButtonProfile}
                          />}
                          <Profile handlerUserExit={handlerUserExit}/>
                      </>
                  }/>
                  <Route path='*' element={
                      <NotFound handleButtonLogo={handleButtonLogo}/>
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
