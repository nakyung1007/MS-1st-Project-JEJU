/* eslint-disable react-hooks/exhaustive-deps */
// noinspection DuplicatedCode,JSCheckFunctionSignatures,JSUnresolvedReference

import PageTitle from "../../component/text/PageTitle.jsx";
import ButtonContainer from "../../component/button/ButtonContainer.jsx";
import Button from "../../component/button/Button.jsx";
import PrevButton from "../../component/button/PrevButton.jsx";
import NextButton from "../../component/button/NextButton.jsx";
import {useData} from "../../context/DataContext.jsx";
import {useEffect, useState} from "react";

const initButtons = [
    {
        text: "봄",
        isClicked: false
    },
    {
        text: "여름",
        isClicked: false
    },
    {
        text: "가을",
        isClicked: false
    },
    {
        text: "겨울",
        isClicked: false
    }
];

const Season = () => {
    const {userData, setUserData} = useData();
    const [buttons, setButtons] = useState(initButtons);

    const onClickSeason = (button) => {
        let changeButtons = buttons;
        changeButtons = changeButtons.map(item => item.text === button.text ? {
            ...item,
            isClicked: !item.isClicked
        } : {...item, isClicked: false});
        setButtons(changeButtons);
    };

    useEffect(() => {
        if (userData.season) {
            const newButtons = buttons.map(item => item.text === userData.season ? {
                ...item,
                isClicked: true
            } : {...item, isClicked: false});
            setButtons(newButtons);
        }
    }, []);

    useEffect(() => {
        let season = null;
        buttons.map(item => item.isClicked === true ? season = item.text : item);

        if (season !== null) {
            setUserData({
                ...userData,
                season: season
            });
        }
    }, [buttons]);

    return (
        <div
            className={"h-screen w-full bg-cover bg-center relative"}
            style={{backgroundImage: "url('/public/images/season.jpg')"}}
        >
            <PageTitle text={"제주, 어느 계절에 떠나고 싶으신가요?"}/>

            <div className={"absolute w-full flex justify-center bottom-2/12"}>
                <ButtonContainer>
                    {
                        buttons.map((button, index) => (
                            <Button key={index} index={index} button={button} onClick={onClickSeason}/>
                        ))
                    }
                </ButtonContainer>
            </div>

            <PrevButton url={"/period"}/>
            <NextButton url={"/sleep"}/>
        </div>
    );
};

export default Season;