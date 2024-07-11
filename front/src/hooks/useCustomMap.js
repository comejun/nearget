import {useEffect, useState} from 'react'
import {getRestaurantsLocation} from "../api/mapAPI";


const {kakao} = window;

const UseCustomMap = () => {

    // 현위치 정보 저장할 state
    const [myLocation, setMyLocation] = useState({
        lat: 37.57163048751097,
        lng: 126.97591715920376,
        get: false,
        isLoaded: false,
    });


    // 내 위치 가져오기
    /*
        useEffect(() => {
            const interval = setInterval(() => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        setMyLocation({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                            get: true,
                            isLoaded: true,
                        });
                    });
                    // console.log("Geolocation is supported by this browser.");
                } else {
                    console.log("Geolocation is not supported by this browser.");
                    setMyLocation({
                        lat: 37.55498771600092,
                        lng: 126.93601217931102,
                        get: false,
                        isLoaded: true,
                    });
                }
                //TODO : 1초마다 위치 업데이트
            }, 1000);
            return () => clearInterval(interval);
        }, []);
    */

    // TODO 시연용 내위치 가져 오기 코드
    useEffect(() => {
        const interval = setInterval(() => {
            setMyLocation({
                lat: 37.55498771600092,
                lng: 126.93601217931102,
                // TODO 시연 할 경우 위도 경도 받아온것 처럼 처리 위한 코드
                get: true,
                isLoaded: true,
            });

            //TODO : 1초마다 위치 업데이트
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // 내 위치 마커 생성
    const myLocationMarker = () => {
        const markerPosition = new kakao.maps.LatLng(
            myLocation.lat,
            myLocation.lng,
        );
        const markerImage = new kakao.maps.MarkerImage(
            "assets/imgs/icon/ic_mypin.svg",
            new kakao.maps.Size(24, 24),
            {offset: new kakao.maps.Point(12, 12)},
        );
        const marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage,
        });

        return marker;
    };

    const clustererMarkers = async (mapData) => {
        console.log("clustererMarkers");
        console.log(mapData);

        if (mapData.level>4) {
            return await getRestaurantsLocation(mapData).then((res) => {
                console.log(res);
                const markers = res.filter(location => location.count > 0).sort((a, b) => a.count - b.count).map((location) => {


                    console.log(res.indexOf(location))
                    // res 배열 길이 가져오기
                    console.log(res.length)
                    const imgSize = 60+ (20 / res.length * (res.indexOf(location) + 1));

                    const content = '<div>' +
                        '<img' +
                        '    style="' +
                        '        width: ' + imgSize + 'px;' +
                        '        height: ' + imgSize + 'px;' +
                        '    "' +
                        '    src="assets/imgs/icon/ic_cluster.png" alt="cluster" />' +
                        '<p' +
                        '    style="' +
                        '        color: white;' +
                        '        font-size: 20px;' +
                        '        position: absolute;' +
                        '        top: 50%;' +
                        '        left: 50%;' +
                        '        transform: translate(-50%, -50%);' +
                        '    ">' +
                        location.count +
                        '</p>' +
                        '</div>';

                    const position = new kakao.maps.LatLng(location.lat, location.lng);

                    const customOverlay = new kakao.maps.CustomOverlay({
                        position: position,
                        content: content,
                        xAnchor: 0.5,
                        yAnchor: 1,
                    });
                    return customOverlay;

                });
                console.log(markers);
                return markers;

            });
        }

            return null

    };


    return {
        myLocation,
        myLocationMarker,
        clustererMarkers
    };
}
export default UseCustomMap
