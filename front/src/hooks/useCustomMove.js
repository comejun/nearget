import {useNavigate} from "react-router-dom";

const UseCustomMove = () => {
   const navigate = useNavigate();
    const moveToMain = () => {
        navigate("/");
    }

    return {moveToMain}
}
export default UseCustomMove
