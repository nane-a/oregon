import { BrowserRouter } from "react-router-dom"
import { UseRoutes } from "./routes"

export const Router: React.FC = (): JSX.Element => {
    return (<div>
        <BrowserRouter>
            <UseRoutes />
        </BrowserRouter>
    </div>)
}
