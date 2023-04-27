import '../../vendor/normalize.css';
import '../../vendor/fonts/fonts.css';
import './App.css';
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function App() {
  return (
      <div className='page'>
          <Header />
          <Main />
          <Footer />
      </div>
  );
}

export default App;
