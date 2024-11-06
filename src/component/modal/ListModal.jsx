/* eslint-disable react-hooks/exhaustive-deps,react/prop-types */
// noinspection JSIgnoredPromiseFromCall,JSCheckFunctionSignatures,JSUnresolvedReference

import ModalTitle from "../text/ModalTitle.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useData} from "../../context/DataContext.jsx";
import useAxios from "../../hook/useAxios.js";

const ListModal = ({isOpen, onClose}) => {
    const {error, fetchData} = useAxios();
    const {userData} = useData();
    const nav = useNavigate();
    const [infoList, setInfoList] = useState([]);

    useEffect(() => {
        if (isOpen) {
            const fetchInfoList = async () => {
                try {
                    const resultData = await fetchData({
                        config: {method: 'GET', url: '/api/info/list'},
                        params: {
                            userNo: userData.userNo,
                        }
                    });
                    if (resultData) {
                        if (resultData.status === 'OK') {
                            const data = resultData.data;
                            console.log(data);
                            setInfoList([...data]);
                        }
                    } else if (error) {
                        console.error("Error: ", error);
                    }
                } catch (err) {
                    console.error("Error: ", err);
                }
            };
            fetchInfoList();
        }
    }, [isOpen]);

    if (!isOpen) {
        return;
    }

    const onClickNew = () => {
        onClose();
        nav('/gender');
    };

    const onClickExisting = (info) => {
        console.log('info: ', info);
    };

    return (
        <div className={`fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50`}>
            <div
                className={`relative bg-white rounded-3xl border-4 border-jeju-green w-5/12 max-h-10/12 md:w-4/12 lg:w-5/12 p-11 pt-16`}
            >
                <button
                    className={`absolute top-2 right-5 text-3xl text-jeju-gray hover:text-black`}
                    onClick={onClose}
                >
                    &times;
                </button>
                <div className={`flex flex-col items-center justify-center text-center w-full`}>
                    <ModalTitle text={`제주, 여행 기록을 불러올까요?`}/>
                    <button
                        className={`w-10/12 bg-jeju-green text-black rounded-full hover:bg-jeju-orange py-4 text-4xl mb-10`}
                        onClick={onClickNew}
                    >
                        새로운 여행 기록 만들기
                    </button>
                    <div className={`flex flex-col items-center text-center w-full max-h-96 overflow-y-scroll`}>
                        {
                            infoList.length > 0 && infoList.map((item, index) => (
                                <button
                                    key={index}
                                    className={`w-10/12 bg-white text-black border-jeju-green border-4 rounded-full hover:bg-jeju-orange py-4 text-4xl mb-4`}
                                    onClick={() => onClickExisting(item)}
                                >
                                    <div className={`flex justify-between w-full items-center pl-10 pr-10`}>
                                        {item.title}
                                        <span className={`text-jeju-gray text-sm`}>{item.created}</span>
                                    </div>
                                </button>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListModal;