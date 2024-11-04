import { Route, Routes } from "react-router-dom";
import Main from "../page/Main/Main.jsx";
import ID from "../page/Input/ID.jsx";
import Gender from "../page/Input/Gender.jsx";
import Age from "../page/Input/Age.jsx";
import Period from "../page/Input/Period.jsx";
import Season from "../page/Input/Season.jsx";
import Member from "../page/Input/Member.jsx";
import Sleep from "../page/Input/Sleep.jsx";
import Transportation from "../page/Input/Transportation.jsx";
import NotFound from "../page/error/NotFound.jsx";
import Info from "../page/Main/Info.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Page */}
      <Route path={"/"} element={<Main />} />
      <Route path={"/info"} element={<Info />} />

      {/* Input Page */}
      <Route path={"/ID"} element={<ID />} />
      <Route path={"/gender"} element={<Gender />} />
      <Route path={"/age"} element={<Age />} />
      <Route path={"/period"} element={<Period />} />
      <Route path={"/season"} element={<Season />} />
      <Route path={"/member"} element={<Member />} />
      <Route path={"/sleep"} element={<Sleep />} />
      <Route path={"/transportation"} element={<Transportation />} />

      {/* Error Page */}
      <Route path={"*"} element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
