import Promo from "../Promo/Promo";
import Navtab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
export default function Main() {
    return (
        <main className='main'>
            <Promo />
            <Navtab />
            <AboutProject />
            <Techs />
            <AboutMe />
        </main>
    )
}