/* eslint-disable react/prop-types,react-refresh/only-export-components */

import {createContext, useContext, useState} from "react";

const DataContext = createContext(undefined);

export const DataProvider = ({children}) => {
    // 유저 입력 데이터 관리
    const [userData, setUserData] = useState({});

    return (
        <DataContext.Provider
            value={{
                userData,
                setUserData
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    return useContext(DataContext);
};