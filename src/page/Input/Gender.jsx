/* eslint-disable react-hooks/exhaustive-deps */
// noinspection JSCheckFunctionSignatures,DuplicatedCode

import PageTitle from "../../component/text/PageTitle.jsx";
import Button from "../../component/button/Button.jsx";
import ButtonContainer from "../../component/button/ButtonContainer.jsx";
import NextButton from "../../component/button/NextButton.jsx";
import {useEffect, useState} from "react";
import {useData} from "../../context/DataContext.jsx";
import PrevButton from "../../component/button/PrevButton.jsx";
import {useNavigate} from "react-router-dom";

const initButtons = [
    {
        text: "남성",
        isClicked: false,
    },
    {
        text: "여성",
        isClicked: false,
    },
];

const Gender = () => {
    const nav = useNavigate();
    const {userData, setUserData} = useData();
    const [buttons, setButtons] = useState(initButtons);
    const [isAnswered, setIsAnswered] = useState(false);

    const onClickGender = (button) => {
        let changeButtons = buttons;
        changeButtons = changeButtons.map((item) =>
            item.text === button.text
                ? {
                    ...item,
                    isClicked: !item.isClicked,
                }
                : {...item, isClicked: false}
        );
        setButtons(changeButtons);
        setIsAnswered(true);
    };

    useEffect(() => {
        if (!userData.userNo) {
            nav('/');
        }

        if (userData.gender) {
            const newButtons = buttons.map((item) =>
                item.text === userData.gender
                    ? {
                        ...item,
                        isClicked: true,
                    }
                    : {...item, isClicked: false}
            );
            setButtons(newButtons);
            setIsAnswered(true);
        }
    }, []);

    useEffect(() => {
        let gender = null;
        buttons.map((item) =>
            item.isClicked === true ? (gender = item.text) : item
        );

        if (gender !== null) {
            setUserData({
                ...userData,
                gender: gender,
            });
        }
    }, [buttons]);

    return (
        <div
            className={"h-screen w-full bg-cover bg-center relative"}
            style={{backgroundImage: "url('/public/images/main.jpg')"}}
        >
            <PageTitle text={"제주, 여행자분의 성별을 알려주시겠어요?"}/>

            <div className={"absolute w-full flex justify-center bottom-2/12"}>
                <ButtonContainer>
                    <Button
                        button={buttons[0]}
                        onClick={onClickGender}
                    />
                    <img
                        src={`/public/images/item/boy_girl.jpg`}
                        alt={`boy_girl`}
                        className={`w-auto h-36`}
                    />
                    <Button
                        button={buttons[1]}
                        onClick={onClickGender}
                    />
                </ButtonContainer>
            </div>

            <PrevButton url={"/info"} isInitial={true}/>
            <NextButton url={"/age"} isAnswered={isAnswered}/>
        </div>
    );
};

export default Gender;
