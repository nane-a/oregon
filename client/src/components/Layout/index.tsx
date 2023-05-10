import { Footer } from "../Footer"
import { Navbar } from "../Navbar"
import { Outlet } from 'react-router-dom'

export const Layout: React.FC = (): JSX.Element => {
    return (<div>
        <Navbar />
        <Outlet />
        <Footer />
    </div>)
}