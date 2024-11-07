/* eslint-disable no-undef,react-hooks/exhaustive-deps */
// noinspection JSValidateTypes,JSUnresolvedReference

import {useEffect, useState} from "react";
import {CustomOverlayMap, Map, MapMarker} from "react-kakao-maps-sdk";
import {useLocation, useNavigate} from "react-router-dom";
import {useData} from "../../context/DataContext.jsx";
import useAxios from "../../hook/useAxios.js";

const Result = () => {
    const {error, fetchData} = useAxios();
    const location = useLocation();
    const {isNew} = location.state || {};
    const nav = useNavigate();
    const {userData, setUserData, travelData} = useData();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('recommend');
    const [makerList, setMakerList] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const getMakerImage = (type) => {
        if (type === 'ai') {
            return {
                src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                size: {
                    width: 24,
                    height: 35
                }
            }
        } else {
            return {
                src: 'https://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png',
                size: {
                    width: 24,
                    height: 33.33
                }
            }
        }
    };

    const onClickPlace = (name) => {
        makerList.map((maker) => {
            if (maker.title === name) {
                setSelectedMarker(name);
            }
        });
    };

    const onChangeTitle = (e) => {
        setUserData({
            ...userData,
            title: e.target.value
        });
    };

    const onClickSave = async () => {
        if (confirm('저장 후 초기 화면으로 돌아갑니다.\n저장하시겠습니까?')) {
            try {
                const resultData = await fetchData({
                    config: {method: 'POST', url: '/api/travel'},
                    body: {
                        ...userData,
                        travelList: travelData
                    }
                });
                if (resultData) {
                    if (resultData.status === 'OK') {
                        nav('/');
                    }
                } else if (error) {
                    console.error("Error: ", error);
                    alert('에러가 발생했습니다.');
                }
            } catch (err) {
                console.error("Error: ", err);
                alert('에러가 발생했습니다.');
            }
        }
    };

    useEffect(() => {
        if (!userData.userNo && !travelData.infoNo) {
            nav('/');
        }

        let initMakerList = [];
        travelData.map(item => {
            initMakerList.push({
                title: item.name,
                latlng: {lat: item.latitude, lng: item.longitude},
                type: item.type
            });
        });
        setMakerList(initMakerList);
    }, []);

    return (
        <div className={`w-full h-screen flex flex-col overflow-hidden z-10`}>
            {/* 헤더 영역 */}
            <header
                className={`w-full h-16 bg-white text-black flex items-center justify-between p-4 border-b border-gray-600`}>
                <div
                    className={`flex text-center items-center cursor-pointer`}
                    onClick={toggleSidebar}
                >
                    <img
                        src={`public/dolphin_favicon.ico`}
                        alt={`dolphin_favicon`}
                        className={`mr-2`}
                    />
                    눌러보세요
                </div>
                <div className={`flex items-center justify-center flex-grow`}>
                    <h1 className={`text-2xl mr-2`}>도르멍 탐라 제주도 맞춤 추천 여행지</h1>
                    <img
                        src={`/public/favicon.ico`}
                        alt={`favicon`}
                    />
                </div>
                <div
                    className={`flex text-center items-center cursor-pointer`}
                    onClick={() => nav('/')}
                >
                    메인으로
                    <img
                        src={`public/images/home.png`}
                        alt={`dolphin_favicon`}
                        className={`ml-2 w-8 h-auto`}
                    />
                </div>
            </header>

            <div className={`flex flex-1 h-[calc(100vh-4rem)]`}>
                {/* 사이드바 영역 */}
                {
                    isSidebarOpen && (
                        <aside className={`w-3/12 bg-gray-50 text-black flex flex-col max-h-full h-full`}>
                            <div className={`flex space-x-4 p-4 border-b border-gray-600 h-20 items-center`}>
                                <span className={`w-3/12 text-xl`}>여행 제목 : </span>
                                <input
                                    type={`text`}
                                    value={userData.title && userData.title.length > 0 ? userData.title : ''}
                                    placeholder={`제목을 입력하세요.`}
                                    className={`w-full outline-none text-xl bg-gray-50`}
                                    onChange={(e) => onChangeTitle(e)}
                                    disabled={!isNew}
                                />
                            </div>

                            {/* 탭 메뉴 */}
                            <div className={`flex space-x-4 p-4 border-b border-gray-600 h-20`}>
                                <button
                                    onClick={() => setActiveTab('recommend')}
                                    className={`flex-1 text-center p-2 shadow-md ${activeTab === 'recommend' ? 'bg-gray-200' : 'bg-gray-100'}`}
                                >
                                    TOP 10 !
                                </button>
                                <button
                                    onClick={() => setActiveTab('ai')}
                                    className={`flex-1 text-center p-2 shadow-md ${activeTab === 'ai' ? 'bg-gray-200' : 'bg-gray-100'}`}
                                >
                                    AI 추천 !
                                </button>
                            </div>

                            {/* 탭 콘텐츠 영역 */}
                            <div className={`flex-1 overflow-y-auto p-4 max-h-full h-full bg-gray-100`}>
                                {
                                    activeTab === 'recommend' && (
                                        <>
                                            <h2 className={`text-xl mb-4`}>많이 즐겨 찾는 장소</h2>
                                            <div className={`space-y-4 p-2`}>
                                                {
                                                    travelData.map((travel, index) => (
                                                        <>
                                                            {
                                                                travel.type === 'recommend' && (
                                                                    <div
                                                                        key={'recommended' + index}
                                                                        className={`flex items-center space-x-4 p-2 bg-white shadow-md rounded-md cursor-pointer hover:bg-jeju-gray`}
                                                                        onClick={() => onClickPlace(travel.name)}
                                                                    >
                                                                        {
                                                                            travel.imageurl && (
                                                                                <img
                                                                                    src={travel.imageurl}
                                                                                    alt={travel.name}
                                                                                    className={`w-16 h-16 rounded-md object-cover`}
                                                                                />
                                                                            )
                                                                        }
                                                                        <div>
                                                                            <h4 className={`font-bold text-lg`}>{travel.name}</h4>
                                                                            <p className={`text-sm`}>{travel.address}</p>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        </>
                                                    ))
                                                }
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    activeTab === 'ai' && (
                                        <>
                                            <h2 className={`text-xl mb-4`}>AI가 추천하는 장소</h2>
                                            <div className={`space-y-4 p-2`}>
                                                {
                                                    travelData.map((travel, index) => (
                                                        <>
                                                            {
                                                                travel.type === 'ai' && (
                                                                    <div
                                                                        key={'ai' + index}
                                                                        className={`flex items-center space-x-4 p-2 bg-white shadow-md rounded-md cursor-pointer hover:bg-jeju-gray`}
                                                                        onClick={() => onClickPlace(travel)}
                                                                    >
                                                                        {
                                                                            travel.imageUrl && (
                                                                                <img
                                                                                    src={travel.imageurl}
                                                                                    alt={travel.name}
                                                                                    className={`w-16 h-16 rounded-md object-cover`}
                                                                                />
                                                                            )
                                                                        }
                                                                        <div>
                                                                            <h4 className={`font-bold text-lg`}>{travel.name}</h4>
                                                                            <p className={`text-sm`}>{travel.address}</p>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        </>
                                                    ))
                                                }
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </aside>
                    )
                }

                {/* 콘텐츠 영역 */}
                <main className={`flex-1 h-full z-40`}>
                    <Map
                        center={{lat: '33.350701', lng: '126.570667'}}
                        level={'9'}
                        className={`w-full h-full mb-16`}
                        isPanto={true}
                        onCreate={(map) => {
                            map.relayout();
                            map.setCenter(new kakao.maps.LatLng(33.350701, 126.570667));
                        }}
                    >
                        {
                            makerList.map((maker, index) => (
                                <>
                                    <MapMarker
                                        key={'maker' + index}
                                        position={maker.latlng}
                                        title={maker.title}
                                        onClick={() => {
                                            setSelectedMarker(maker.title);
                                        }}
                                        image={getMakerImage(maker.type)}
                                    />
                                    {
                                        selectedMarker === maker.title && (
                                            <CustomOverlayMap position={maker.latlng} yAnchor={1}>
                                                <div
                                                    key={'overlay' + index}
                                                    className={`w-fit h-fit border-2 border-jeju-green bg-white rounded-3xl p-2 mb-4`}
                                                >
                                                    <h1 className={`text-lg`}>{maker.title}</h1>
                                                </div>
                                            </CustomOverlayMap>
                                        )
                                    }
                                </>
                            ))
                        }
                    </Map>
                </main>
            </div>
            {
                isNew === true && (
                    <div className={"fixed right-4 bottom-3 z-50"}>
                        <button
                            className={"bg-contain bg-center bg-no-repeat focus:outline-none w-24 h-24"}
                            style={{backgroundImage: "url('/public/images/gul_save.png')"}}
                            onClick={onClickSave}
                        />
                    </div>
                )
            }
        </div>
    );
};

export default Result;