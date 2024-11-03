/* eslint-disable react-hooks/exhaustive-deps */
// noinspection JSCheckFunctionSignatures

import PrevButton from "../../component/button/PrevButton.jsx";
import NextButton from "../../component/button/NextButton.jsx";
import TopTitle from "../../component/text/TopTitle.jsx";
import {useData} from "../../context/DataContext.jsx";
import {useEffect, useState} from "react";
import ButtonContainer from "../../component/button/ButtonContainer.jsx";
import FootStamp from "../../component/object/FootStamp.jsx";
import LongTextButton from "../../component/button/LongTextButton.jsx";

const initButtons = [
    [
        {
            text: "나 혼자 씩씩하게",
            isClicked: false
        },
        {
            text: "친구와 사이좋게",
            isClicked: false
        }
    ],
    [
        {
            text: "부모님과 즐겁게",
            isClicked: false
        },
        {
            text: "아이와 손을 잡고",
            isClicked: false
        }
    ],
    [
        {
            text: "연인과 다정하게",
            isClicked: false
        },
        {
            text: "반려동물과 함께",
            isClicked: false
        }
    ]
];

const Member = () => {
    const {userData, setUserData} = useData();
    const [buttonList, setButtonList] = useState(initButtons);

    const onClickMember = (button) => {
        let changeButtonList = buttonList;
        changeButtonList = changeButtonList.map(items => items.map(item => item.text === button.text ? {
            ...item,
            isClicked: !item.isClicked
        } : {...item, isClicked: false}));
        setButtonList(changeButtonList);
    };

    useEffect(() => {
        if (userData.member) {
            let newButtonList = buttonList;
            newButtonList = newButtonList.map(items => items.map(item => item.text === userData.member ? {
                ...item,
                isClicked: true
            } : {...item, isClicked: false}));
            setButtonList(newButtonList);
        }
    }, []);

    useEffect(() => {
        let member = null;
        buttonList.map(items => items.map(item => item.isClicked === true ? member = item.text : item));

        if (member !== null) {
            setUserData({
                ...userData,
                member: member
            });
        }

    }, [buttonList]);

    return (
        <div
            className={"h-screen w-full bg-cover bg-center relative"}
            style={{backgroundImage: "url('/public/images/top_main.jpg')"}}
        >
            <div>
                <TopTitle text={"제주, 누구와 함께 떠나시나요 ?"}/>

                <div className={"absolute w-full flex items-center justify-center bottom-2/12"}>
                    <div
                        className={
                            "flex flex-col items-center " +
                            "2xl:space-y-24 " +
                            "xl:space-y-24 " +
                            "lg:space-y-24 " +
                            "md:space-y-16 " +
                            "sm:space-y-16 " +
                            "space-y-8"
                        }
                    >
                        {
                            buttonList.map((buttons, index) => (
                                <ButtonContainer key={index}>
                                    {
                                        buttons.map((button, index) => (
                                            <LongTextButton key={index} index={index} button={button}
                                                            onClick={onClickMember}/>
                                        ))
                                    }
                                </ButtonContainer>
                            ))
                        }
                    </div>
                </div>

                <FootStamp
                    size={
                        "2xl:w-28 2xl:h-24 " +
                        "xl:w-24 xl:h-20 " +
                        "lg:w-20 lg:h-16 " +
                        "md:w-16 md:h-12 " +
                        "sm:w-12 sm:h-8 " +
                        "w-8 h-4"
                    }
                    position={
                        "2xl:top-3/12 2xl:right-3/12 " +
                        "xl:top-3/12 xl:right-2/12 " +
                        "lg:top-3/12 lg:right-2/12 " +
                        "md:top-3/12 md:right-2/12 " +
                        "sm:top-3/12 sm:right-2/12 " +
                        "top-3/12 right-2/12"
                    }
                />
            </div>

            <PrevButton url={"/age"}/>
            <NextButton url={"/period"}/>
        </div>
    );
};

export default Member;