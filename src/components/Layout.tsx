
import Header from "./Header"
import { useLocation, Outlet } from "react-router-dom"   //Används för att rendera barnkomponenter, samt för att hantera header beroende på vy
import '../../src/App.css'
import '../../src/index.css'

export default function AppLayout()
{
const location = useLocation();
const hideHeaderOn = ["/login"];

const shouldHideHeader = hideHeaderOn.includes(location.pathname);  //Döljer headern för /login



    return (
        <>
        <div>
            {!shouldHideHeader &&  <Header />}
            </div>
            
            <main>
                 <Outlet />                 {/*Renderar barnkomponenter*/}
            </main>

            <footer>DT210G Moment3 Gustav Brodin</footer>
        </>
    )
}

