import './Main.css';
import Promo from "../Promo/Promo";
import Navtab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Header from "../Header/Header";
export default function Main() {
    return (
        <main className='main'>
            <Header />
            <Promo />
            <Navtab />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
        </main>
    )
}