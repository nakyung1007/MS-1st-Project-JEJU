/* eslint-disable react-hooks/exhaustive-deps */
// noinspection DuplicatedCode,JSCheckFunctionSignatures,JSUnresolvedReference

import {useData} from "../../context/DataContext.jsx";
import {useEffect, useState} from "react";
import ButtonContainer from "../../component/button/ButtonContainer.jsx";
import PageTitle from "../../component/text/PageTitle.jsx";
import Button from "../../component/button/Button.jsx";
import PrevButton from "../../component/button/PrevButton.jsx";
import NextButton from "../../component/button/NextButton.jsx";

const initButtons = [
    {
        text: "자동차",
        isClicked: false
    },
    {
        text: "오토바이",
        isClicked: false
    },
    {
        text: "대중교통",
        isClicked: false
    },
    {
        text: "뚜벅이",
        isClicked: false
    }
];

const Transportation = () => {
    const {userData, setUserData} = useData();
    const [buttons, setButtons] = useState(initButtons);

    const onClickTransportation = (button) => {
        let changeButtons = buttons;
        changeButtons = changeButtons.map(item => item.text === button.text ? {
            ...item,
            isClicked: !item.isClicked
        } : {...item, isClicked: false});
        setButtons(changeButtons);
    };

    useEffect(() => {
        if (userData.transportation) {
            const newButtons = buttons.map(item => item.text === userData.transportation ? {
                ...item,
                isClicked: true
            } : {...item, isClicked: false});
            setButtons(newButtons);
        }
    }, []);

    useEffect(() => {
        let transportation = null;
        buttons.map(item => item.isClicked === true ? transportation = item.text : item);

        if (transportation !== null) {
            setUserData({
                ...userData,
                transportation: transportation
            });
        }
    }, [buttons]);

    return (
        <div
            className={"h-screen w-full bg-cover bg-center relative"}
            style={{backgroundImage: "url('/public/images/trans.jpg')"}}
        >
            <PageTitle text={"제주, 어떤 교통수단을 이용하고 싶으신가요?"}/>

            <div className={"absolute w-full flex justify-center bottom-2/12"}>
                <ButtonContainer>
                    {
                        buttons.map((button, index) => (
                            <Button key={index} index={index} button={button} onClick={onClickTransportation}/>
                        ))
                    }
                </ButtonContainer>
            </div>

            <PrevButton url={"/sleep"}/>
            <NextButton url={"/transportation"}/>
        </div>
    );
};

export default Transportation;