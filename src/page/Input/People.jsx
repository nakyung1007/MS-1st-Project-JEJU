/* eslint-disable react-hooks/exhaustive-deps */
// noinspection JSUnresolvedReference

import {useNavigate} from "react-router-dom";
import {useData} from "../../context/DataContext.jsx";
import {useEffect, useState} from "react";
import TwinTitle from "../../component/text/TwinTitle.jsx";
import PrevButton from "../../component/button/PrevButton.jsx";
import NextButton from "../../component/button/NextButton.jsx";

const People = () => {
    const nav = useNavigate();
    const {userData, setUserData} = useData();
    const [isAnswered, setIsAnswered] = useState(false);

    const onChangeCompanionCount = (e) => {
        setUserData({
            ...userData,
            companionCount: e.target.value
        });

        if (e.target.value.length > 0 && userData.companionAgeGroup) {
            setIsAnswered(true);
        } else {
            setIsAnswered(false);
        }
    };

    const onChangeCompanionAgeGroup = (e) => {
        const flag = (Number(e.target.value) > 0 && Number(e.target.value) < 151);

        if (!flag && e.target.value.length > 0) {
            alert('1 ~ 150 사이의 숫자만 입력해주세요.');
        }

        setUserData({
            ...userData,
            companionAgeGroup: e.target.value
        });

        if (e.target.value.length > 0 && userData.companionCount && flag) {
            setIsAnswered(true);
        } else {
            setIsAnswered(false);
        }
    };

    useEffect(() => {
        if (!userData.userNo) {
            nav('/');
        }

        if (userData.companionCount && userData.companionAgeGroup) {
            setIsAnswered(true);
        }
    }, []);

    return (
        <div className={`h-screen w-full justify-center items-center text-center`}>
            <div className={`pt-48 mb-20`}>
                <TwinTitle text={`제주, 몇 명과 함께 가시나요?`}/>
                <div className={`relative inline-block items-center justify-center text-center w-full`}>
                    <input
                        name={`companionCount`}
                        type={`number`}
                        className={`border-4 border-jeju-green rounded-full p-6 text-3xl w-5/12 mt-8 no-arrows text-center outline-none`}
                        placeholder={`숫자로 인원수를 입력해주세요.`}
                        onChange={(e) => onChangeCompanionCount(e)}
                        value={userData.companionCount ? userData.companionCount : ""}
                    />
                </div>
            </div>
            <div className={`pt-24`}>
                <TwinTitle text={`제주, 같이 가시는 분들의 나이대를 입력해주시겠어요 ?`}/>
                <div className={`flex flex-col items-center justify-center text-center w-full`}>
                    <input
                        name={`companionAgeGroup`}
                        type={`number`}
                        className={`border-4 border-jeju-green rounded-full p-6 text-3xl w-5/12 mt-8 no-arrows text-center outline-none`}
                        placeholder={`숫자로 평균 나이를 입력해주세요.(1~150)`}
                        onChange={(e) => onChangeCompanionAgeGroup(e)}
                        value={userData.companionAgeGroup ? userData.companionAgeGroup : ""}
                    />
                </div>
            </div>

            <PrevButton url={"/member"}/>
            <NextButton url={"/period"} isAnswered={isAnswered}/>
        </div>
    );
};

export default People;