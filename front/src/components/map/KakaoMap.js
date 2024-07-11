import React, {useEffect, useState} from 'react'
import useCustomMap from "../../hooks/useCustomMap";
import {useSelector} from "react-redux";

const {kakao} = window;

const KakaoMap = () => {

    const {myLocation, myLocationMarker,clustererMarkers} = useCustomMap();
    const [nowMarker, setNowMarker] = useState(null);
    const [map, setMap] = useState(null);
    const [renderCheck, setRenderCheck] = useState(true);
    const categoryFilter = useSelector((state) => state.categorySlice);
    const [cluster, setCluster] = useState();
    const [mapBoundLevel, setMapBoundLevel] = useState(
        {
            level: 3,
            bounds: {
            }
        }
    );



    // 현재 카테고리와 지도 데이터 기반으로 클러스터 생성
    useEffect(() => {
        if(mapBoundLevel != undefined && mapBoundLevel.level != undefined && mapBoundLevel.bounds != undefined){

            const mapData = {
                level: mapBoundLevel.level,
                bounds: mapBoundLevel.bounds,
                category: categoryFilter.category,
            }
            createCluster(mapData);
        }
    }, [mapBoundLevel,categoryFilter.category]);

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

            setCluster(new kakao.maps.MarkerClusterer({
                map: map,
                averageCenter: true,
                minClusterSize: 2,
                minLevel: 2,
                disableClickZoom: false,
            }))
        }
    }, [map]);

    // 지도 이동 및 확대 수준 변경 또는 카테고리 변경시 실행될 함수
    const mapChanged = () => {
        const level = map.getLevel();
        // "((33.44843745687413, 126.56798357402302), (33.452964008206735, 126.57333898904454))"
        const bounds = map.getBounds();

        if(level >= 5 && mapBoundLevel.level===level){
            setMapBoundLevel({
                level: level
            })
        }
        else{
            setMapBoundLevel({
                level: level,
                bounds: bounds,
            });

        }

    };

    // 조건에 따른 마커 클러스터 또는 커스텀오버레이 생성 함수
    const createCluster = async (mapData) => {
        if(map){
            console.log("클러스터 생성");


            // clusterMarkers함수에 changePopup함수를 인자로 넘겨주어 마커 클릭시 팝업창을 띄울 수 있도록 함
            await clustererMarkers(mapData).then((res) => {
                if (mapData.level > 4) {
                    cluster.setMinLevel(9);
                }
                cluster.clear();
                cluster.addMarkers(res);
            });

            console.log("클러스터에 마커 추가");
            // 클러스터에 마커 추가

        }
    }

    // 현위치로 이동 버튼 클릭 여부
    useEffect(() => {
        if (map !== null) {
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