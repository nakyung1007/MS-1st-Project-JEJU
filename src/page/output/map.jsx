import React, { useEffect } from "react";

const Map = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=b2d5d7d31b57fe640757eeda30c825bd&autoload=false`;
    script.async = true;

    script.onload = () => {
      // Kakao Maps SDK가 로드되면 실행
      window.kakao.maps.load(() => {
        const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 10, // 지도의 확대 레벨
        };

        const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
      });
    };

    document.head.appendChild(script);
  }, []);

  return (
    <div>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
          fontSize: "24px",
          fontWeight: "bold",
          backgroundColor: "#f5f5f5",
        }}
      >
        <img
          src="/favicon.ico" // 아이콘의 경로 설정
          alt="Jeju Icon"
          style={{ width: "30px", height: "30px", marginRight: "10px" }} // 아이콘 크기와 간격 설정
        />
        도르멍 탐라 제주도 맞춤 추천 코스
      </header>
      <div
        id="map"
        style={{
          width: "100%",
          height: "90vh",
        }}
      ></div>
    </div>
  );
};

export default Map;
