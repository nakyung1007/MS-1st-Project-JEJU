/* eslint-disable react-hooks/exhaustive-deps */
// noinspection JSUnresolvedReference,JSCheckFunctionSignatures

import {useEffect, useState} from "react";
import {recommendedPlaces} from "../Main/data/places.js";
import {useNavigate} from "react-router-dom";
import {useData} from "../../context/DataContext.jsx";

const Map = () => {
    const nav = useNavigate();
    const {userData, travelData, setTravelData} = useData();
    const [showDetails, setShowDetails] = useState(true);
    const [activeTab, setActiveTab] = useState("추천해요!");
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [selectedMarkerId, setSelectedMarkerId] = useState(null); // 현재 선택된 마커 ID

    useEffect(() => {
        // if (!userData.userNo) {
        //     nav('/');
        // }

        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=b2d5d7d31b57fe640757eeda30c825bd&autoload=false`;
        script.async = true;

        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById("map");
                const options = {
                    center: new window.kakao.maps.LatLng(33.350701, 126.570667),
                    level: 9,
                };
                const kakaoMap = new window.kakao.maps.Map(container, options);
                setMap(kakaoMap);
            });
        };

        document.head.appendChild(script);
    }, []);

    useEffect(() => {
        if (map) {
            markers.forEach(({marker, infoWindow}) => {
                marker.setMap(null);
                infoWindow.close();
            });

            const newMarkers = recommendedPlaces.map((place) => {
                const position = new window.kakao.maps.LatLng(
                    place.latitude,
                    place.longitude
                );

                const markerImage = new window.kakao.maps.MarkerImage(
                    selectedMarkerId === place.id
                        ? "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"
                        : "images/item/pngegg.png",
                    new window.kakao.maps.Size(24, 35)
                );

                const marker = new window.kakao.maps.Marker({
                    position,
                    image: markerImage,
                    map,
                });

                const infoWindow = new window.kakao.maps.InfoWindow({
                    content: `<div style="padding:5px; font-size:14px;">${place.title}</div>`,
                });

                window.kakao.maps.event.addListener(marker, "click", () => {
                    handlePlaceClick(place.id, marker, infoWindow);
                });

                if (selectedMarkerId === place.id) infoWindow.open(map, marker);
                else infoWindow.close();

                return {id: place.id, marker, infoWindow};
            });

            setMarkers(newMarkers);
        }
    }, [map, selectedMarkerId]);

    const handlePlaceClick = (id, marker = null, infoWindow = null) => {
        if (selectedMarkerId === id) {
            setSelectedMarkerId(null);
            if (infoWindow) infoWindow.close();
        } else {
            setSelectedMarkerId(id);
            if (infoWindow) infoWindow.open(map, marker);
        }
    };

    const toggleSidebar = () => setShowDetails(!showDetails);

    return (
        <div style={{display: "flex", flexDirection: "column", height: "100vh"}}>
            <header
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px",
                    fontSize: "24px",
                    fontWeight: "bold",
                    backgroundColor: "#f5f5f5",
                    borderBottom: "1px solid #ddd",
                    position: "relative",
                    zIndex: 1,
                }}
            >
        <span
            onClick={toggleSidebar}
            style={{
                position: "absolute",
                left: "10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
            }}
        >
          <img
              src="public/dolphin_favicon.ico"
              alt="Jeju Icon"
              style={{width: "30px", height: "30px", marginRight: "10px"}}
          />
          <span style={{fontSize: "16px", color: "#333"}}>눌러보세요</span>
        </span>
                도르멍 탐라 제주도 맞춤 추천 코스
                <img
                    src="/favicon.ico"
                    alt="Jeju Icon"
                    style={{width: "30px", height: "30px", marginLeft: "10px"}}
                />
            </header>

            <div style={{display: "flex", flexGrow: 1}}>
                {showDetails && (
                    <div
                        style={{
                            width: "30%",
                            display: "flex",
                            flexDirection: "column",
                            borderRight: "1px solid #ddd",
                            backgroundColor: "#f9f9f9",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-around",
                                padding: "10px 0",
                                fontWeight: "bold",
                                backgroundColor: "#eeeeee",
                                borderBottom: "1px solid #ddd",
                                position: "sticky",
                                top: 0, // 상단에 고정
                                zIndex: 1,
                            }}
                        >
                            <div
                                style={{
                                    padding: "10px",
                                    cursor: "pointer",
                                    backgroundColor:
                                        activeTab === "추천해요!" ? "#cccccc" : "transparent",
                                    borderRight: "1px solid #ddd",
                                    flex: 1,
                                    textAlign: "center",
                                }}
                                onClick={() => setActiveTab("추천해요!")}
                            >
                                추천해요!
                            </div>
                            <div
                                style={{
                                    padding: "10px",
                                    cursor: "pointer",
                                    backgroundColor:
                                        activeTab === "골라봐요!" ? "#cccccc" : "transparent",
                                    flex: 1,
                                    textAlign: "center",
                                }}
                                onClick={() => setActiveTab("골라봐요!")}
                            >
                                골라봐요!
                            </div>
                        </div>

                        <div style={{padding: "20px"}}>
                            {activeTab === "추천해요!" && (
                                <div>
                                    <h2>많이 즐겨 찾는 장소</h2>
                                    {recommendedPlaces.map((place) => (
                                        <div
                                            key={place.id}
                                            onClick={() => handlePlaceClick(place.id)}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                padding: "10px 0",
                                                borderBottom: "1px solid #ddd",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <img
                                                src={place.imageurl}
                                                alt={place.title}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "/images/photo/서귀포매일올레시장.png"; // 대체 이미지 경로 설정
                                                }}
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    marginRight: "10px",
                                                    objectFit: "contain",
                                                }}
                                            />
                                            <div>
                                                <div style={{fontSize: "16px", fontWeight: "bold"}}>
                                                    {place.title}
                                                </div>
                                                <div style={{color: "#555"}}>{place.category}</div>
                                                <div style={{color: "#888"}}>{place.address}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {activeTab !== "추천해요!" && (
                                <div>
                                    <h2>{activeTab} 탭 내용</h2>
                                    <p>이 탭에 대한 내용은 아직 구현되지 않았습니다.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div style={{flexGrow: 1}}>
                    <div id="map" style={{width: "100%", height: "100%"}}></div>
                </div>
            </div>
        </div>
    );
};

export default Map;
