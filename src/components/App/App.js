import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import '../../vendor/normalize.css';
import '../../vendor/fonts/fonts.css';
import './App.css';
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
import {useState} from "react";
import Menu from "../Menu/Menu";

function App() {
    const navigate = useNavigate();
    const [menuIsActive, setMenuIsActive] = useState(false);
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
                      handleButtonRegister={handleButtonRegister}
                      handleButtonLogo={handleButtonLogo}
                  />
              }/>
              <Route path='/signup' element={
                  <Register
                      handleButtonSignIn={handleButtonSignIn}
                      handleButtonLogo={handleButtonLogo}
                  />
              }/>
              <Route path='/movies' element={
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
                      <Movies />
                      <Footer />
                  </>
              }/>
              <Route path='/saved-movies' element={
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
                      <Profile />
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
  );
}

export default App;
