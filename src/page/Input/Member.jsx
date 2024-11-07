/* eslint-disable react-hooks/exhaustive-deps */
// noinspection JSCheckFunctionSignatures,JSUnresolvedReference

import PrevButton from "../../component/button/PrevButton.jsx";
import NextButton from "../../component/button/NextButton.jsx";
import {useData} from "../../context/DataContext.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import TwinTitle from "../../component/text/TwinTitle.jsx";

const initCompanionRelationshipList = [
    {
        text: "혼자",
        value: "기타"
    },
    {
        text: "친구",
        value: "친구"
    },
    {
        text: "부모님",
        value: "부모"
    },
    {
        text: "배우자",
        value: "배우자"
    },
    {
        text: "연인",
        value: "연인"
    },
    {
        text: "아이",
        value: "자녀"
    },
    {
        text: "친척",
        value: "친인척"
    },
    {
        text: "형제/자매",
        value: "형제/자매"
    },
    {
        text: "조부모님",
        value: "조부모"
    },
    {
        text: "동료",
        value: "동료"
    },
    {
        text: "모임/단체",
        value: "모임/단체"
    },
];

const initCompanionStatusList = [
    {
        text: "나홀로 여행",
        value: "나홀로 여행"
    },
    {
        text: "둘이서 가족 여행",
        value: "2인 가족 여행"
    },
    {
        text: "여러명의 가족과 여행",
        value: "3인 이상 가족 여행(친척 포함)"
    },
    {
        text: "부모 동반 여행",
        value: "부모 동반 여행"
    },
    {
        text: "자녀 동반 여행",
        value: "자녀 동반 여행"
    },
    {
        text: "가족이 아닌 사람과 둘이서 여행",
        value: "2인 여행(가족 외)"
    },
    {
        text: "가족이 아닌 여러명과 여행",
        value: "3인 이상 여행(가족 외)"
    },
    {
        text: "3대 동반 여행",
        value: "3대 동반 여행(친척 포함)"
    },
];

const Member = () => {
    const nav = useNavigate();
    const {userData, setUserData} = useData();
    const [isRelationShipOpen, setIsRelationShipOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);

    const toggleRelationShip = () => setIsRelationShipOpen(!isRelationShipOpen);
    const toggleStatus = () => setIsStatusOpen(!isStatusOpen);

    const onClickRelationShip = (value) => {
        setUserData({
            ...userData,
            companionRelationship: value,
        });

        if (userData.companionStatus) {
            setIsAnswered(true);
        }

        toggleRelationShip();
    };

    const onClickStatus = (value) => {
        setUserData({
            ...userData,
            companionStatus: value,
        });

        if (userData.companionRelationship) {
            setIsAnswered(true);
        }

        toggleStatus();
    }

    useEffect(() => {
        if (!userData.userNo) {
            nav('/');
        }

        if (userData.companionRelationship && userData.companionStatus) {
            setIsAnswered(true);
        }
    }, []);

    return (
        <div className={`h-screen w-full justify-center items-center text-center`}>
            <div className={`pt-48 mb-20`}>
                <TwinTitle text={`제주, 누구와 함께 떠나시나요?`}/>
                <div className={`relative inline-block items-center justify-center text-center w-full`}>
                    <button
                        className={`border-4 border-jeju-green hover:bg-jeju-green rounded-full p-6 text-3xl w-5/12 mt-8`}
                        onClick={toggleRelationShip}
                    >
                        {
                            userData.companionRelationship ? initCompanionRelationshipList.find(item => item.value === userData.companionRelationship).text : '선택해주세요 !'
                        }
                    </button>
                    {
                        isRelationShipOpen && (
                            <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}>
                                <ul className="className={`relative bg-white rounded-3xl border-4 border-jeju-green w-2/12 p-11 pt-16`}">
                                    {
                                        initCompanionRelationshipList.map((item, index) => (
                                            <li
                                                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-2xl`}
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
                </div>
            </div>
            <div className={`pt-24`}>
                <TwinTitle text={`제주, 더 자세하게 알려주세요!`}/>
                <div className={`flex flex-col items-center justify-center text-center w-full`}>
                    <button
                        className={`border-4 border-jeju-green hover:bg-jeju-green rounded-full p-6 text-3xl w-5/12 mt-8`}
                        onClick={toggleStatus}
                    >
                        {
                            userData.companionStatus ? initCompanionStatusList.find(item => item.value === userData.companionStatus).text : '선택해주세요 !'
                        }
                    </button>
                    {
                        isStatusOpen && (
                            <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}>
                                <ul className="className={`relative bg-white rounded-3xl border-4 border-jeju-green w-3/12 p-11 pt-16`}">
                                    {
                                        initCompanionStatusList.map((item, index) => (
                                            <li
                                                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-2xl`}
                                                key={index}
                                                onClick={() => onClickStatus(item.value)}
                                            >
                                                {item.text}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        )
                    }
                </div>
            </div>

            <PrevButton url={"/age"}/>
            <NextButton url={"/people"} isAnswered={isAnswered}/>
        </div>
    );
};

export default Member;