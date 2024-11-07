/* eslint-disable react-hooks/exhaustive-deps */
// noinspection DuplicatedCode,JSUnresolvedReference

import PageTitle from "../../component/text/PageTitle.jsx";
import PrevButton from "../../component/button/PrevButton.jsx";
import NextButton from "../../component/button/NextButton.jsx";
import {useData} from "../../context/DataContext.jsx";
import Input from "../../component/input/Input.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Period = () => {
    const nav = useNavigate();
    const {userData, setUserData} = useData();
    const [isAnswered, setIsAnswered] = useState(false);

    const onChangePeriod = (e) => {
        setUserData({
            ...userData,
            travelPeriod: e.target.value
        });

        if (e.target.value.length > 0) {
            setIsAnswered(true);
        } else {
            setIsAnswered(false);
        }
    };

    useEffect(() => {
        if (!userData.userNo) {
            nav('/');
        }

        if (userData.travelPeriod && userData.travelPeriod.length > 0) {
            setIsAnswered(true);
        }
    }, []);

    return (
        <div
            className={"h-screen w-full bg-cover bg-center relative"}
            style={{backgroundImage: "url('/public/images/period.jpg')"}}
        >
            <PageTitle text={"제주, 며칠동안 떠나고 싶으신가요?"}/>

            <Input
                type={"number"}
                name={"period"}
                text={"숫자로 여행 기간을 입력해주세요."}
                value={userData.travelPeriod ? userData.travelPeriod : ""}
                onChange={(e) => onChangePeriod(e)}
            />

            <PrevButton url={"/area"}/>
            <NextButton url={"/season"} isAnswered={isAnswered}/>
        </div>
    );
};

export default Period;