import React, {useEffect, useState} from 'react'
import useCustomMap from "../../hooks/useCustomMap";

const { kakao } = window;

const KakaoMap = () => {

    const {myLocation, myLocationMarker} = useCustomMap();
    const [nowMarker, setNowMarker] = useState(null);
    const [map, setMap] = useState(null);
    const [renderCheck, setRenderCheck] = useState(true);

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



    return (
        <div
            id="map"
            style={{
                width: "100%",
                height: "calc(100vh - 52px)",
                position: "relative",
            }}
        >
        </div>)
}
export default KakaoMap