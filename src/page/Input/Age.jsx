/* eslint-disable react-hooks/exhaustive-deps */

import PageTitle from "../../component/text/PageTitle.jsx";
import NextButton from "../../component/button/NextButton.jsx";
import Input from "../../component/input/Input.jsx";
import {useData} from "../../context/DataContext.jsx";
import PrevButton from "../../component/button/PrevButton.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const Age = () => {
    const nav = useNavigate();
    const {userData, setUserData} = useData();
    const [isAnswered, setIsAnswered] = useState(false);

    const onChangeAge = (e) => {
        const flag = (Number(e.target.value) > 0 && Number(e.target.value) < 151);

        if (!flag && e.target.value.length > 0) {
            alert('1 ~ 150 사이의 숫자만 입력해주세요.');
        }

        setUserData({
            ...userData,
            age: e.target.value
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

        if (userData.age && userData.age.length > 0) {
            setIsAnswered(true);
        }
    }, []);

    return (
        <div
            className={"h-screen w-full bg-cover bg-center relative"}
            style={{backgroundImage: "url('/public/images/age.jpg')"}}
        >
            <PageTitle text={"제주, 여행자분의 나이를 알려주시겠어요?"}/>

            <Input
                type={"number"}
                name={"age"}
                text={"숫자로 나이를 입력해주세요.(1~150)"}
                value={userData.age ? userData.age : ""}
                onChange={onChangeAge}
            />

            <PrevButton url={"/gender"}/>
            <NextButton url={"/member"} isAnswered={isAnswered}/>
        </div>
    );
};

export default Age;