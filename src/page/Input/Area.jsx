/* eslint-disable react-hooks/exhaustive-deps */

import PrevButton from "../../component/button/PrevButton.jsx";
import NextButton from "../../component/button/NextButton.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useData} from "../../context/DataContext.jsx";

const Area = () => {
    const nav = useNavigate();
    const {userData, setUserData} = useData();
    const [isAnswered, setIsAnswered] = useState(false);

    const onClickArea = (area) => {
        setUserData({
            ...userData,
            area: area
        });
        setIsAnswered(true);
    };

    useEffect(() => {
        if (!userData.userNo) {
            nav('/');
        }

        if (userData.area) {
            setIsAnswered(true);
        }
    }, []);

    return (
        <div className={`relative h-screen w-full justify-center items-center text-center`}>
            <div className={`pt-48 mb-20`}>
                <div className={`relative inline-block`}>
                    <img
                        src={`/public/images/item/gul.jpg`}
                        alt={`map`}
                        className={`-z-50 absolute -top-8/12 -left-16 w-32 h-auto`}
                    />
                    <h1 className={`relative text-7xl z-40 mb-10 animate-text-focus-in`}>
                        제주, 이미지에서 떠나고 싶은 지역을 선택해주세요!
                    </h1>
                </div>
            </div>
            <div
                className={`absolute w-8/12 h-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-contain bg-no-repeat bg-center mt-24`}
                style={{backgroundImage: "url('/public/images/area.jpeg')"}}
            >
                <div className={`w-full h-full grid grid-cols-2 bg-transparent`}>
                    <button
                        className={`text-5xl cursor-pointer w-full h-full bg-transparent border border-jeju-green transition-all ${userData.area && userData.area === 'northwest' ? '-translate-y-2.5 shadow-lg shadow-black' : ''}`}
                        onClick={() => onClickArea('northwest')}
                    >
                        제주시 서쪽
                    </button>
                    <button
                        className={`text-5xl cursor-pointer w-full h-full bg-transparent border border-jeju-green transition-all ${userData.area && userData.area === 'northeast' ? '-translate-y-2.5 shadow-lg shadow-black' : ''}`}
                        onClick={() => onClickArea('northeast')}
                    >
                        제주시 동쪽
                    </button>
                    <button
                        className={`text-5xl cursor-pointer w-full h-full bg-transparent border border-jeju-green transition-all ${userData.area && userData.area === 'southwest' ? '-translate-y-2.5 shadow-lg shadow-black' : ''}`}
                        onClick={() => onClickArea('southwest')}
                    >
                        서귀포 서쪽
                    </button>
                    <button
                        className={`text-5xl cursor-pointer w-full h-full bg-transparent border border-jeju-green transition-all ${userData.area && userData.area === 'southeast' ? '-translate-y-2.5 shadow-lg shadow-black' : ''}`}
                        onClick={() => onClickArea('southeast')}
                    >
                        서귀포 동쪽
                    </button>
                </div>
            </div>

            <PrevButton url={"/member"}/>
            <NextButton url={"/period"} isAnswered={isAnswered}/>
        </div>
    );
};

export default Area;