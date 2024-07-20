import { useNavigate } from "react-router-dom";

const UseCustomMove = () => {
  const navigate = useNavigate();

  const customNavigate = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const moveToMain = () => customNavigate("/");
  const moveToLogin = () => customNavigate("/member/login");
  const moveToMap = () => customNavigate("/map");
  const moveToPlace = (restaurantId) => customNavigate(`/place/${restaurantId}`);
  const moveToGet = (restaurantId) => customNavigate(`/place/get/${restaurantId}`);
  const moveToAdd = () => customNavigate("/place/add");
  const moveToEdit = () => customNavigate("/place/Edit");
  const moveToProfile = () => customNavigate("/member/profile");
  const moveToProfileEdit = () => customNavigate("/member/Edit");
  const moveToMylike = () => customNavigate("/member/mylike");
  const moveToMygetList = () => customNavigate("/member/myget");
  const moveTomygetGroup = (groupId) => customNavigate(`/member/myget/${groupId}`);
  const moveTomygetGroupEdit = (groupId) => customNavigate(`/member/myget/edit/${groupId}`);

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
    moveToMygetList,
    moveTomygetGroup,
    moveTomygetGroupEdit,
  };
};

export default UseCustomMove;
