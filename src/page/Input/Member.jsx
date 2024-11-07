/* eslint-disable react-hooks/exhaustive-deps */
// noinspection JSCheckFunctionSignatures,JSUnresolvedReference

import PrevButton from "../../component/button/PrevButton.jsx";
import NextButton from "../../component/button/NextButton.jsx";
import {useData} from "../../context/DataContext.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import PageTitle from "../../component/text/PageTitle.jsx";
import {initKeywordList} from "./data/keyword.js";

const initCompanionRelationshipList = [
    {
        text: "혼자",
        value: "혼자"
    },
    {
        text: "친구",
        value: "친구"
    },
    {
        text: "연인",
        value: "연인/배우자"
    },
];

const Member = () => {
    const nav = useNavigate();
    const {userData, setUserData} = useData();
    const [isRelationShipOpen, setIsRelationShipOpen] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);

    const toggleRelationShip = () => setIsRelationShipOpen(!isRelationShipOpen);

    const onClickRelationShip = (value) => {
        setUserData({
            ...userData,
            companionRelationship: value,
        });
        setIsAnswered(true);
        toggleRelationShip();
    };

    useEffect(() => {
        if (!userData.userNo) {
            nav('/');
        }

        if (userData.companionRelationship) {
            setIsAnswered(true);
        }
    }, []);

    return (
        <div
            className={"h-screen w-full bg-cover bg-center relative"}
            style={{backgroundImage: "url('/public/images/main.jpg')"}}
        >
            <div
                className={"absolute inset-0 flex items-center justify-center -top-4/12 right-5/12 -z-0"}
            >
                <img
                    src={`/public/images/mung.jpg`}
                    alt={`mung`}
                    className={`w-32 h-auto`}
                />
            </div>
            <PageTitle text={"제주, 누구와 함께 떠나시나요?"} img={"/public/images/item/mung.jpg"}/>

            <button
                className={"absolute flex left-1/2 transform -translate-x-1/2 justify-center bg-white text-black border-4 border-jeju-green rounded-full text-center w-6/12 outline-none bottom-2/12 space-x-40 py-8 text-3xl"}
                onClick={toggleRelationShip}
            >
                {
                    userData.companionRelationship ? initCompanionRelationshipList.find(item => item.value === userData.companionRelationship).text : '눌러주세요 !'
                }
            </button>
            {
                isRelationShipOpen && (
                    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}>
                        <ul className="className={`relative bg-white rounded-3xl border-4 border-jeju-green w-2/12 p-11 pt-16`}">
                            {
                                initCompanionRelationshipList.map((item, index) => (
                                    <li
                                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-2xl text-center`}
                                        key={index}
                                        onClick={() => onClickRelationShip(item.value)}
                                    >
                                        {item.text}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                )
            }

            <PrevButton url={"/age"}/>
            <NextButton url={"/area"} isAnswered={isAnswered}/>
        </div>
    );
};

export default Member;