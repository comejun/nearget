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
    const [mapLevel, setMapLevel] = useState(3);

    // 지도 확대 수준이 변경될 경우 bounds값을 제외한 level값만 저장
    useEffect(() => {
        if(mapLevel !== mapBoundLevel.level){
            setMapBoundLevel({
                level: mapLevel,
                bounds: mapBoundLevel.bounds,
            });
        }
    }, [mapLevel]);

    // 현재 카테고리와 지도 데이터 기반으로 클러스터 생성
    useEffect(() => {
        if(mapBoundLevel != undefined && mapBoundLevel.level != undefined && mapBoundLevel.bounds != undefined){

            console.log("현재 카테고리와 지도 데이터 기반으로 클러스터 생성")
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
                draggable: true,
                maxLevel: 8,
            };
            setMap(new kakao.maps.Map(container, options));
        }
    }, []);

    // 처음 현위치 받아 오면 마커 생성
    useEffect(() => {
        if (map != null && myLocation.isLoaded && myLocation.get) {
            setNowMarker(myLocationMarker);
            map.setCenter(new kakao.maps.LatLng(myLocation.lat, myLocation.lng));
        }
    }, [map, myLocation.isLoaded]);

    // 현위치 마커가 생성 되면 지도에 마커 추가
    useEffect(() => {
        if (nowMarker != null) {
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
                clickable: false,
                calculator: [10, 30, 50, 100],
                styles: [{
                    width : '40px', height : '40px',
                    borderRadius: '50%',
                    background: 'rgba(187, 69, 55, 0.8)',
                    color: '#fff',
                    textAlign: 'center',
                    lineHeight: '40px'
                },
                    {
                        width : '45px', height : '45px',
                        borderRadius: '50%',
                        background: 'rgba(187, 69, 55, 0.8)',
                        color: '#fff',
                        textAlign: 'center',
                        lineHeight: '45px'
                    },
                    {
                        width : '50px', height : '50px',
                        borderRadius: '50%',
                        background: 'rgba(187, 69, 55, 0.8)',
                        color: '#fff',
                        textAlign: 'center',
                        lineHeight: '50px'
                    },
                    {
                        width : '55px', height : '55px',
                        borderRadius: '50%',
                        background: 'rgba(187, 69, 55, 0.8)',
                        color: '#fff',
                        textAlign: 'center',
                        lineHeight: '55px'
                    },{
                        width : '60px', height : '60px',
                        borderRadius: '50%',
                        background: 'rgba(187, 69, 55, 0.8)',
                        color: '#fff',
                        textAlign: 'center',
                        lineHeight: '60px'
                    }
                ]
            }))
        }
    }, [map]);

    // 지도 이동 및 확대 수준 변경 또는 카테고리 변경시 실행될 함수
    const mapChanged = () => {
        const level = map.getLevel();
        const bounds = map.getBounds();

        // 지도 확대 수준이 5이상일 경우 bounds값을 제외한 level값만 저장 기존 mapBoundLevel의 level과 level값이 같을 경우 저장하지 않음
        if(level > 4){
            setMapLevel(level)
        }
        else{
            console.log("레벨과 bounds 저장")
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
                } else {
                    cluster.setMinLevel(2);
                }
                cluster.clear();
                cluster.addMarkers(res);
            });

            console.log("클러스터에 마커 추가");

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