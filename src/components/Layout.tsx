
import Header from "./Header"
import { Outlet } from "react-router-dom"   //Används för att rendera barnkomponenter

const Layout = () => {
    return (
        <>
        <div>
            <Header />
            </div>
            
            <main>
                 <Outlet />                 {/*Renderar barnkomponenter*/}
            </main>

            <footer>Sidfoten</footer>
        </>
    )
}

export default Layout