import { useNavigate } from "react-router-dom";

const UseCustomMove = () => {
  const navigate = useNavigate();
  const moveToMain = () => {
    navigate("/");
  };
  const moveToLogin = () => {
    navigate("/member/login");
  };
  const moveToMap = () => {
    navigate("/map");
  };
  //Place
  const moveToPlace = (restaurantId) => {
    navigate("/place/"+restaurantId);
  };
  const moveToGet = () => {
    navigate("/place/get");
  };
  const moveToAdd = () => {
    navigate("/place/add");
  };
  const moveToEdit = () => {
    navigate("/place/Edit");
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
    moveToLogin,
    moveToMap,
    moveToPlace,
    moveToGet,
    moveToAdd,
    moveToEdit,
    moveToProfile,
    moveToProfileEdit,
    moveToMylike,
    moveToMyget,
  };
};
export default UseCustomMove;
