import Promo from "../Promo/Promo";
import Navtab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject";
export default function Main() {
    return (
        <main className='main'>
            <Promo />
            <Navtab />
            <AboutProject />
        </main>
    )
}