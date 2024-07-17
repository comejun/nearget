import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import BasicLayout from "../layouts/BasicLayout";
import HeaderMain from "../layouts/HeaderMain";
import BottomNav from "../layouts/BottomNav";
import MainTodayGet from "../layouts/MainTodayGet";
import MainPriceby from "../layouts/MainPriceby";
import InfinityContent from "../layouts/InfinityContent";
import useCustomMap from "../hooks/useCustomMap";
import LoadingPage from "../components/common/LoadingPage";
import {getTodayRestaurant} from "../api/RestaurantAPI";
import {getLikeList} from "../api/memberAPI";

const MainPage = () => {


    const {myLocation} = useCustomMap();
    const [nowMyLocation, setNowMyLocation] = useState()
    const loginState = useSelector((state) => state.loginSlice);
    const [likeList, setLikeList] = useState()
    // 처음 현위치 받아오면
    useEffect(() => {
        if (myLocation.isLoaded && myLocation.get) {
            setNowMyLocation(myLocation);
        }
    }, [myLocation.isLoaded]);

    // 로그인시 좋아요 리스트 가져오기
    useEffect(() => {
        if(loginState.email){
            const fetchTLikeList = async () => {
                const likeListGet = await getLikeList(loginState.email);
                setLikeList(likeListGet);
            };
            fetchTLikeList();
        }
    }, [loginState.email]);

    return (
        <BasicLayout>


            {nowMyLocation ?
                <>
                    <HeaderMain/>
                    <div className="header_margin_main"></div>
                    <div className="MainH2Wrap">
                        <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_Todaysget.png"}/>
                    </div>
                    <MainTodayGet likeList={likeList} myLocation={nowMyLocation}/>
                    <div className="MainH2Wrap">
                        <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_PricebyPlace.png"}/>
                    </div>
                    <MainPriceby/>
                    <div id="SearchTopScroll" className="MainH2Wrap">
                        <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/h2_NearbyPlace.png"}/>
                    </div>
                    <InfinityContent/>
                    <div className="bottom_margin"></div>
                    <BottomNav/>
                </>
                :
                <LoadingPage/>
            }


        </BasicLayout>
    );
};
export default MainPage;
