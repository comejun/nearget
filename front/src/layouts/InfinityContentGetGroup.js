import useCustomMove from "../hooks/useCustomMove";
import {deleteGroupList} from "../api/GroupAPI";

export default function InfinityContentGetGroup({refreshPage, groupId,restaurantsList}) {

  const {moveToPlace} = useCustomMove();
  const getCategoryValue = (category) => {
    if (category === "WESTERN") {
      return "양식";
    }
    if (category === "CAFE") {
      return "카페";
    }
    if (category === "KOREAN") {
      return "한식";
    }
    if (category === "CHINESE") {
      return "중식";
    }
    if (category === "JAPANESE") {
      return "일식";
    }
    if (category === "FASTFOOD") {
      return "패스트푸드";
    }
    if (category === "PUB") {
      return "술집";
    }
    if (category === "STREET") {
      return "분식";
    }
  }

  const clikedDeleteBtn = async (groupId, restaurantId) => {
    await deleteGroupList(groupId, restaurantId);
    refreshPage();
  }

  return (
    <div className="InfinityContentWrap">
      <div className="InfinityContent">
        <ul>

          {restaurantsList.map((restaurant) => (

              <li key={restaurant.strId}>
                <img onClick={() => moveToPlace(restaurant.strId)} className="InfinityContentSum"
                     src={restaurant.image}/>
                {/*<img className="InfinityContentSum" src={process.env.PUBLIC_URL + "/assets/imgs/sample2.png"}/>*/}
                <img onClick={()=>clikedDeleteBtn(groupId, restaurant.strId)}
                    className="GetDeleteBtn" src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_del.png"}/>
                <div className="infinityItemTitle">
                  <div>
                    <h4>{getCategoryValue(restaurant.category)}</h4>
                  </div>
                </div>
                <h3>{restaurant.name}</h3>
              </li>
          ))}

        </ul>
      </div>
    </div>
  );
}
