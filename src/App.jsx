import "./App.css";
import "./log.js"; // 클릭 이벤트 로깅 파일 임포트
import AppRoutes from "./route/AppRoutes.jsx";
import { BrowserRouter } from "react-router-dom";
import Reserved from "./component/text/Reserved.jsx";
import { DataProvider } from "./context/DataContext.jsx";

const App = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <AppRoutes />
        <Reserved />
      </BrowserRouter>
    </DataProvider>
  );
};

export default App;
