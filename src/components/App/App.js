import '../../vendor/normalize.css';
import '../../vendor/fonts/fonts.css';
import './App.css';
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function App() {
  return (
      <div className='page'>
          {/*<Main />*/}
          <Movies />
          <Footer />
      </div>
  );
}

export default App;
