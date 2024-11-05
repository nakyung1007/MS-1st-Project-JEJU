/* eslint-disable react-hooks/exhaustive-deps */
// noinspection JSCheckFunctionSignatures,DuplicatedCode

import PageTitle from "../../component/text/PageTitle.jsx";
import NextButton from "../../component/button/NextButton.jsx";
import {useEffect, useState} from "react";
import {useData} from "../../context/DataContext.jsx";
import PrevButton from "../../component/button/PrevButton.jsx";
import {useNavigate} from "react-router-dom";

const ID = () => {
    const {userData, setUserData} = useData();
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (userData.name) {
            setName(userData.name);
        }
    }, []);

    const handleInputChange = (e) => {
        setName(e.target.value);
    };

    const handleNext = () => {
        if (name) {
            setUserData({
                ...userData,
                name: name,
            });
            navigate("/gender"); // /gender 페이지로 이동
        } else {
            alert("이름을 입력해주세요."); // 이름이 입력되지 않았을 때 알림
        }
    };

    return (
        <div
            className={"h-screen w-full bg-cover bg-center relative"}
            style={{backgroundImage: "url('/public/images/main.jpg')"}}
        >
            <PageTitle text={"당신의 이름을 입력해주세요."}/>

            <div className={"absolute w-full flex justify-center bottom-2/12"}>
                <input
                    type="text"
                    value={name}
                    onChange={handleInputChange}
                    placeholder="이름을 입력하세요"
                    className="p-4 text-center border-2 border-gray-300 rounded-lg"
                    style={{fontSize: "1.5em"}}
                />
                <button
                    onClick={handleNext} //handleNext 사용
                    className="bg-jeju-green text-white px-6 py-2 rounded-lg text-xl hover:bg-green-600 transition-colors"
                >
                    제출
                </button>
            </div>

            <PrevButton url={"/info"}/>
            <NextButton url={"/gender"} onClick={handleNext}/>
        </div>
    );
};

export default ID;
