import { useNavigate } from "react-router-dom";

const UseCustomMove = () => {
  const navigate = useNavigate();
  const moveToMain = () => {
    navigate("/");
  };
  const moveToMap = () => {
    navigate("/map");
  };
  //Place
  const moveToPlace = () => {
    navigate("/place");
  };
  const moveToAdd = () => {
    navigate("/place/add");
  };
  //Profile
  const moveToProfile = () => {
    navigate("/member/profile");
  };
  const moveToProfileEdit = () => {
    navigate("/member/Edit");
  };
  const moveToMylike = () => {
    navigate("/member/mylike");
  };
  const moveToMyget = () => {
    navigate("/member/myget");
  };

  return {
    moveToMain,
    moveToMap,
    moveToPlace,
    moveToAdd,
    moveToProfile,
    moveToProfileEdit,
    moveToMylike,
    moveToMyget,
  };
};
export default UseCustomMove;
