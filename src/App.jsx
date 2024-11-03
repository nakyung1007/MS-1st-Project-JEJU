import './App.css'
import AppRoutes from "./route/AppRoutes.jsx";
import {BrowserRouter} from "react-router-dom";
import Reserved from "./component/text/Reserved.jsx";
import {DataProvider} from "./context/DataContext.jsx";

const App = () => {
    return (
        <DataProvider>
            <BrowserRouter>
                <AppRoutes/>
                <Reserved/>
            </BrowserRouter>
        </DataProvider>
    );
};

export default App
