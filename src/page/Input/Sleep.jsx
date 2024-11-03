/* eslint-disable react-hooks/exhaustive-deps */
// noinspection DuplicatedCode,JSCheckFunctionSignatures,JSUnresolvedReference

import {useData} from "../../context/DataContext.jsx";
import {useEffect, useState} from "react";
import PageTitle from "../../component/text/PageTitle.jsx";
import ButtonContainer from "../../component/button/ButtonContainer.jsx";
import Button from "../../component/button/Button.jsx";
import PrevButton from "../../component/button/PrevButton.jsx";
import NextButton from "../../component/button/NextButton.jsx";

const initButtons = [
    {
        text: "호텔",
        isClicked: false
    },
    {
        text: "펜션",
        isClicked: false
    },
    {
        text: "게스트하우스",
        isClicked: false
    }
];

const Sleep = () => {
    const {userData, setUserData} = useData();
    const [buttons, setButtons] = useState(initButtons);

    const onClickSleep = (button) => {
        let changeButtons = buttons;
        changeButtons = changeButtons.map(item => item.text === button.text ? {
            ...item,
            isClicked: !item.isClicked
        } : {...item, isClicked: false});
        setButtons(changeButtons);
    };

    useEffect(() => {
        if (userData.sleep) {
            const newButtons = buttons.map(item => item.text === userData.sleep ? {
                ...item,
                isClicked: true
            } : {...item, isClicked: false});
            setButtons(newButtons);
        }
    }, []);

    useEffect(() => {
        let sleep = null;
        buttons.map(item => item.isClicked === true ? sleep = item.text : item);

        if (sleep !== null) {
            setUserData({
                ...userData,
                sleep: sleep
            });
        }
    }, [buttons]);

    return (
        <div
            className={"h-screen w-full bg-cover bg-center relative"}
            style={{backgroundImage: "url('/public/images/sleep.jpg')"}}
        >
            <PageTitle text={"제주, 어디서 지내고 싶으신가요?"}/>

            <div className={"absolute w-full flex justify-center bottom-2/12"}>
                <ButtonContainer>
                    {
                        buttons.map((button, index) => (
                            <Button key={index} index={index} button={button} onClick={onClickSleep}/>
                        ))
                    }
                </ButtonContainer>
            </div>

            <PrevButton url={"/season"}/>
            <NextButton url={"/transportation"}/>
        </div>
    );
};

export default Sleep;