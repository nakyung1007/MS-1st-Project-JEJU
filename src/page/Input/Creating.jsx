/* eslint-disable react-hooks/exhaustive-deps */
// noinspection JSIgnoredPromiseFromCall,JSCheckFunctionSignatures

import SubTitle from "../../component/text/SubTitle.jsx";
import {useNavigate} from "react-router-dom";
import {useData} from "../../context/DataContext.jsx";
import {useEffect} from "react";
import useAxios from "../../hook/useAxios.js";
import {recommendedPlaces} from "../Main/data/places.js";
import useModelAxios from "../../hook/useModelAxios.js";

const Creating = () => {
    const {error, fetchData} = useAxios();
    const {errorM, fetchDataM} = useModelAxios();
    const nav = useNavigate();
    const {userData, setUserData, travelData, setTravelData} = useData();

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    useEffect(() => {
        const saveInfo = async () => {
            try {
                const resultData = await fetchData({
                    config: {method: 'POST', url: '/api/info'},
                    body: userData
                });
                if (resultData) {
                    if (resultData.status === 'OK') {
                        const data = resultData.data;
                        setUserData({
                            ...userData,
                            infoNo: data.infoNo,
                        });
                        await sleep(3000);
                        nav('/result', {state: {isNew: true}});
                    }
                } else if (error) {
                    console.error("Error: ", error);
                    alert('에러가 발생했습니다. 이전 페이지로 돌아갑니다.');
                    nav('/keyword');
                }
            } catch (err) {
                console.error("Error: ", err);
                alert('에러가 발생했습니다. 이전 페이지로 돌아갑니다.');
                nav('/keyword');
            }
        };

        const getAIdata = async () => {
            const requestData = {
                gender: userData.gender,
                age: Number(userData.age),
                companion_relationship: userData.companionRelationship,
                direction: userData.area,
                keyword: userData.keyword.join(' ')
            };

            try {
                const resultData = await fetchDataM({
                    config: {method: 'POST', url: '/api/recommend'},
                    body: requestData
                });
                console.log('resultData: ', resultData);
                if (resultData && resultData.length > 0) {
                    resultData.forEach(item => {
                        item.type = 'ai';
                    });
                    setTravelData([
                        ...travelData,
                        ...resultData,
                        ...recommendedPlaces,
                    ]);
                    await saveInfo();
                } else if (errorM) {
                    console.error("Error: ", errorM);
                    alert('에러가 발생했습니다. 이전 페이지로 돌아갑니다.');
                    nav('/keyword');
                }
            } catch (err) {
                console.error("Error: ", err);
                alert('에러가 발생했습니다. 이전 페이지로 돌아갑니다.');
                nav('/keyword');
            }
        };

        if (!userData.userNo) {
            nav('/');
        } else {
            getAIdata();
        }
    }, []);

    return (
        <div className={"h-screen w-full bg-cover bg-center relative"}>
            <div className={"flex items-center justify-center h-screen"}>
                <div className={"text-center"}>
                    <div className={`flex gap-40 pb-40`}>
                        <img
                            src={`/public/images/gul-1.jpg`}
                            alt={`gul-1`}
                            className={`w-40 h-44 animate-slide-top delay-0`}
                        />
                        <img
                            src={`/public/images/gul-2.jpg`}
                            alt={`gul-2`}
                            className={`w-40 h-44 animate-slide-top delay-500`}
                        />
                        <img
                            src={`/public/images/gul-3.jpg`}
                            alt={`gul-3`}
                            className={`w-40 h-44 animate-slide-top delay-1000`}
                        />
                    </div>
                    <SubTitle
                        text={"입력해주신 내용으로 추천해드릴 곳을 찾고 있어요."}
                        aniamtion={"animate-text-focus-in"}
                        last={false}
                    />
                    <SubTitle
                        text={"잠시만 기다려주세요!"}
                        aniamtion={"animate-text-focus-in"}
                        last={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default Creating;