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

function App() {
  return (
      <div className='page'>
          {/*<Main />*/}
          <Movies />
          {/*<SavedMovies />*/}
          {/*<Register />*/}
          {/*<Login />*/}
          {/*<Profile />*/}
          <Footer />
          {/*<NotFound />*/}
      </div>
  );
}

export default App;
