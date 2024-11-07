import {Route, Routes} from "react-router-dom";
import Main from "../page/Main/Main.jsx";
import Gender from "../page/Input/Gender.jsx";
import Age from "../page/Input/Age.jsx";
import Period from "../page/Input/Period.jsx";
import Member from "../page/Input/Member.jsx";
import NotFound from "../page/error/NotFound.jsx";
import Info from "../page/Main/Info.jsx";
import Map from "../page/output/map";
import Season from "../page/Input/Season.jsx";
import Keyword from "../page/Input/Keyword.jsx";
import Creating from "../page/Input/Creating.jsx";
import Result from "../page/output/Result.jsx";
import Area from "../page/Input/Area.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Main Page */}
            <Route path={"/"} element={<Main/>}/>
            <Route path={"/info"} element={<Info/>}/>

            {/* Input Page */}
            <Route path={"/gender"} element={<Gender/>}/>
            <Route path={"/age"} element={<Age/>}/>
            <Route path={"/member"} element={<Member/>}/>
            <Route path={"/period"} element={<Period/>}/>
            <Route path={"/season"} element={<Season/>}/>
            <Route path={"/keyword"} element={<Keyword/>}/>
            <Route path={"/area"} element={<Area/>}/>
            <Route path={"/ing"} element={<Creating/>}/>
            {/*<Route path={"/id"} element={<ID />} />*/}
            {/*<Route path={"/people"} element={<People/>}/>*/}
            {/*<Route path={"/sleep"} element={<Sleep/>}/>*/}
            {/*<Route path={"/transportation"} element={<Transportation/>}/>*/}

            {/* Output Page */}
            <Route path={"/map"} element={<Map/>}/>
            <Route path={"/result"} element={<Result/>}/>

            {/* Error Page */}
            <Route path={"*"} element={<NotFound/>}/>
        </Routes>
    );
};

export default AppRoutes;
