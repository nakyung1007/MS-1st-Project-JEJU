import React, { useEffect, useState } from "react";

const Map = () => {
  const [showDetails, setShowDetails] = useState(true);
  const [activeTab, setActiveTab] = useState("추천해요!");
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null); // 현재 선택된 마커 ID

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=b2d5d7d31b57fe640757eeda30c825bd&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 10,
        };
        const kakaoMap = new window.kakao.maps.Map(container, options);
        setMap(kakaoMap);
      });
    };

    document.head.appendChild(script);
  }, []);

  const recommendedPlaces = [
    {
      id: 1,
      title: "서귀포 매일 올레시장",
      category: "전통시장",
      address: "제주특별자치도 서귀포시 중앙로62번길 18",
      latitude: 33.2501501,
      longitude: 126.5632316,
      imageurl: "/images/photo/서귀포매일올레시장.jpg",
    },
    {
      id: 2,
      title: "성산일출봉",
      category: "자연",
      address: "제주특별자치도 서귀포시 성산읍 일출로 284-12",
      latitude: 33.45913497,
      longitude: 126.9405375,
      imageurl: "/images/photo/성산일출봉.jpg",
    },
    {
      id: 3,
      title: "함덕해수욕장",
      category: "자연",
      address: "제주특별자치도 제주시 조천읍 조함해안로 525",
      latitude: 33.5430616,
      longitude: 126.6692389,
      imageurl: "/images/photo/함덕해수욕장.jpg",
    },
    {
      id: 4,
      title: "협재해수욕장",
      category: "자연",
      address: "제주특별자치도 제주시 한림읍 한림로 329-10",
      latitude: 33.39385854,
      longitude: 126.2391575,
      imageurl: "/images/photo/협재해수욕장.jpg",
    },
    {
      id: 5,
      title: "제주동문재래시장",
      category: "전통시장",
      address: "제주특별자치도 제주시 관덕로14길 20",
      latitude: 33.5115887,
      longitude: 126.5260174,
      imageurl: "/images/photo/제주동문시장.jpg",
    },
    {
      id: 6,
      title: "오설록 티 뮤지엄",
      category: "테마파크",
      address: "제주특별자치도 서귀포시 안덕면 신화역사로 15",
      latitude: 33.3059133,
      longitude: 126.2894893,
      imageurl: "/images/photo/오설록 티 뮤지엄.jpg",
    },
    {
      id: 7,
      title: "비자림",
      category: "자연",
      address: "제주특별자치도 제주시 구좌읍 비자숲길 55",
      latitude: 33.4904084,
      longitude: 126.8099875,
      imageurl: "/images/photo/비자림.jpg",
    },
    {
      id: 8,
      title: "아르떼 뮤지엄 제주",
      category: "테마파크",
      address: "제주특별자치도 제주시 애월읍 어림비로 478",
      latitude: 33.3967005,
      longitude: 126.3450106,
      imageurl: "/images/photo/아르떼뮤지엄.jpg",
    },
    {
      id: 9,
      title: "스누피 가든",
      category: "테마파크",
      address: "제주특별자치도 제주시 구좌읍 금백조로 916",
      latitude: 33.4433592,
      longitude: 126.7796675,
      imageurl: "/images/스누피 가든.jpg",
    },
    {
      id: 10,
      title: "카멜리아 힐",
      category: "테마파크",
      address: "제주특별자치도 서귀포시 안덕면 병악로 166",
      latitude: 33.3059133,
      longitude: 126.3700095,
      imageurl: "/images/photo/카멜리아힐.jpg",
    },
  ];

  useEffect(() => {
    if (map) {
      markers.forEach(({ marker, infoWindow }) => {
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

        return { id: place.id, marker, infoWindow };
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
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
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
            src="dolphin_favicon.ico"
            alt="Jeju Icon"
            style={{ width: "30px", height: "30px", marginRight: "10px" }}
          />
          <span style={{ fontSize: "16px", color: "#333" }}>눌러보세요</span>
        </span>
        도르멍 탐라 제주도 맞춤 추천 코스
        <img
          src="/favicon.ico"
          alt="Jeju Icon"
          style={{ width: "30px", height: "30px", marginLeft: "10px" }}
        />
      </header>

      <div style={{ display: "flex", flexGrow: 1 }}>
        {showDetails && (
          <div
            style={{
              width: "30%",
              display: "flex",
              flexDirection: "column",
              borderRight: "1px solid #ddd",
              backgroundColor: "#f9f9f9",
              overflowY: "auto",
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

            <div style={{ padding: "20px", overflowY: "auto" }}>
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
                        src={place.imageUrl}
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
                        <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                          {place.title}
                        </div>
                        <div style={{ color: "#555" }}>{place.category}</div>
                        <div style={{ color: "#888" }}>{place.address}</div>
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

        <div style={{ flexGrow: 1 }}>
          <div id="map" style={{ width: "100%", height: "100%" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Map;
