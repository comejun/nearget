import React, {useEffect, useState} from 'react'
import useCustomMap from "../../hooks/useCustomMap";
import {useSelector} from "react-redux";

const { kakao } = window;

const KakaoMap = () => {

    const {myLocation, myLocationMarker} = useCustomMap();
    const [nowMarker, setNowMarker] = useState(null);
    const [map, setMap] = useState(null);
    const [renderCheck, setRenderCheck] = useState(true);

    const myLocationBtnClicked = useSelector((state) => state.mapSlice.myLocationBtnClicked);

    // 내 위치로 이동
    const moveToMyLocation = () => {
        const moveLatLon = new kakao.maps.LatLng(myLocation.lat, myLocation.lng);
        map.setCenter(moveLatLon);
    };

    // 지도 생성
    useEffect(() => {
        if (renderCheck) {
            console.log("실제 지도 렌더링");
            const container = document.getElementById("map");
            const options = {
                center: new kakao.maps.LatLng(myLocation.lat, myLocation.lng),
                level: 3,
                disableDoubleClickZoom: true,
                maxLevel: 8,
            };
            setMap(new kakao.maps.Map(container, options));
        }
    }, []);
    // 처음 현위치 받아 오면 마커 생성
    useEffect(() => {
        if (map != null && myLocation.isLoaded && myLocation.get) {
            console.log("처음 현위치 받아 오면 마커 생성");
            setNowMarker(myLocationMarker);
            map.setCenter(new kakao.maps.LatLng(myLocation.lat, myLocation.lng));
        }
    }, [map, myLocation.isLoaded]);

    // 현위치 마커가 생성 되면 지도에 마커 추가
    useEffect(() => {
        if (nowMarker != null) {
            console.log("현위치 마커가 생성 되면 지도에 마커 추가");
            nowMarker.setMap(map);
        }
    }, [nowMarker]);

    // 지도 렌더링 후 실행될 함수
    useEffect(() => {
        if (map !== null) {
            console.log("지도 렌더링 후 실행");

                // 지도 중심 좌표나 확대 수준이 변경시 발생하는 이벤트
            kakao.maps.event.addListener(map, 'idle', mapChanged);

        }
    }, [map]);

    // 지도 이동 및 확대 수준 변경시 실행될 함수
    const mapChanged = () => {
        const level = map.getLevel();
        console.log(level);
    };

    // 현위치로 이동 버튼 클릭 여부
    useEffect(() => {
        if(map!==null){
            moveToMyLocation();
        }
    }, [myLocationBtnClicked]);



    return (
        <div
            id="map"
            style={{
                width: "100%",
                height: "calc(100vh)",
                position: "relative",
            }}
        >
        </div>)
}
export default KakaoMap