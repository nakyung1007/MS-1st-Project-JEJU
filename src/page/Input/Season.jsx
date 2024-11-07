/* eslint-disable react-hooks/exhaustive-deps */
// noinspection DuplicatedCode,JSCheckFunctionSignatures,JSUnresolvedReference

import PageTitle from "../../component/text/PageTitle.jsx";
import PrevButton from "../../component/button/PrevButton.jsx";
import NextButton from "../../component/button/NextButton.jsx";
import {useData} from "../../context/DataContext.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Input from "../../component/input/Input.jsx";

const Season = () => {
    const nav = useNavigate();
    const {userData, setUserData} = useData();
    const [isAnswered, setIsAnswered] = useState(false);

    const onChangeMonth = (e) => {
        const flag = (Number(e.target.value) > 0 && Number(e.target.value) < 13);

        if (!flag && e.target.value.length > 0) {
            alert('1 ~ 12 사이의 숫자만 입력해주세요.');
        }

        setUserData({
            ...userData,
            month: e.target.value
        });

        if (e.target.value.length > 0 && flag) {
            setIsAnswered(true);
        } else {
            setIsAnswered(false);
        }
    };

    useEffect(() => {
        if (!userData.userNo) {
            nav('/');
        }

        if (userData.month && userData.month.length > 0) {
            setIsAnswered(true);
        }
    }, []);

    return (
        <div
            className={"h-screen w-full bg-cover bg-center relative"}
            style={{backgroundImage: "url('/public/images/season.jpg')"}}
        >
            <PageTitle text={"제주, 언제 떠나고 싶으신가요?"}/>

            <Input
                type={"number"}
                name={"month"}
                text={"숫자로 떠나시는 월을 입력해주세요.(1~12)"}
                value={userData.month ? userData.month : ""}
                onChange={onChangeMonth}
            />

            <PrevButton url={"/period"}/>
            <NextButton url={"/keyword"} isAnswered={isAnswered}/>
        </div>
    );
};

export default Season;