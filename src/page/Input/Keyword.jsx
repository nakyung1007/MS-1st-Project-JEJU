/* eslint-disable react-hooks/exhaustive-deps */

import {useNavigate} from "react-router-dom";
import {useData} from "../../context/DataContext.jsx";
import {useEffect, useState} from "react";
import {initKeywordList} from "./data/keyword.js";
import PrevButton from "../../component/button/PrevButton.jsx";
import NextButton from "../../component/button/NextButton.jsx";

const Keyword = () => {
    const nav = useNavigate();
    const {userData, setUserData} = useData();
    const [isKeywordOpen, setIsKeywordOpen] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);

    const toggleKeyword = () => setIsKeywordOpen(!isKeywordOpen);

    const onClickKeyword = (value) => {
        let keywordList = userData.keyword ? userData.keyword : [];

        const index = keywordList.indexOf(value);
        if (index !== -1) {
            keywordList.splice(index, 1);
        } else {
            keywordList = [...keywordList, value];
        }

        setUserData({
            ...userData,
            keyword: keywordList
        });

        if (keywordList.length > 0) {
            setIsAnswered(true);
        } else {
            setIsAnswered(false);
        }
    };

    useEffect(() => {
        if (!userData.userNo) {
            nav('/');
        }

        if (userData.keyword) {
            setIsAnswered(true);
        }
    }, []);

    return (
        <div className={`h-screen w-full justify-center items-center text-center`}>
            <div className={`pt-48 mb-20`}>
                <div className={`relative inline-block`}>
                    <img
                        src={`/public/images/item/gul.jpg`}
                        alt={`map`}
                        className={`-z-50 absolute -top-8/12 -left-16 w-32 h-auto`}
                    />
                    <h1 className={`relative text-7xl z-40 mb-10 animate-text-focus-in`}>
                        제주, 이번 여행의 키워드를 선택해주세요.
                    </h1>
                </div>
                <div className={`relative inline-block items-center justify-center text-center w-full bottom-0`}>
                    <button
                        className={`border-4 bg-white border-jeju-green hover:bg-jeju-green rounded-full p-6 text-3xl w-5/12 mt-8`}
                        onClick={toggleKeyword}
                    >
                        {
                            userData.keyword && userData.keyword.length > 0 ? userData.keyword.join(", ") : '눌러주세요 !'
                        }
                    </button>
                    {
                        isKeywordOpen && (
                            <div className={"fixed inset-0 z-40 flex justify-center top-5/12"}>
                                <div
                                    className="relative bg-black bg-opacity-50 rounded-3xl border-4 border-jeju-green w-11/12 md:w-1/2 lg:w-1/3 p-6 h-[50vh]">
                                    <ul className="overflow-y-scroll h-[44vh] pt-4">
                                        {
                                            initKeywordList.map((item, index) => (
                                                <li
                                                    key={index}
                                                    className={`px-4 py-2 text-2xl text-white cursor-pointer hover:bg-jeju-green hover:text-black ${userData.keyword && userData.keyword.includes(item.value) ? 'bg-jeju-green text-black' : ''}`}
                                                    onClick={() => onClickKeyword(item.value)}
                                                >
                                                    {item.text}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <img
                src={`/public/images/item/tree.jpeg`}
                alt={`tree`}
                className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-0 -z-50 w-4/12 h-auto`}
            />
            <PrevButton url={"/season"}/>
            <NextButton url={"/ing"} isAnswered={isAnswered}/>
        </div>
    );
};

export default Keyword;