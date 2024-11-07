/* eslint-disable react/prop-types,react-refresh/only-export-components */

import {createContext, useContext, useState} from "react";

const DataContext = createContext(undefined);

export const DataProvider = ({children}) => {
    // 유저 입력 관련 데이터 관리
    const [userData, setUserData] = useState({});
    // 여행지 관련 데이터 관리
    const [travelData, setTravelData] = useState([]);

    return (
        <DataContext.Provider
            value={{
                userData,
                setUserData,
                travelData,
                setTravelData
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    return useContext(DataContext);
};