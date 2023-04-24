import '../../vendor/normalize.css';
import '../../vendor/fonts/fonts.css';
import './App.css';
import Main from "../Main/Main";
import Header from "../Header/Header";

function App() {
  return (
      <div className='page'>
          <Header />
          <Main />
      </div>
  );
}

export default App;
