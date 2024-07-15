import { useEffect, useState } from "react";
import { getMember } from "../api/memberAPI";
import { host } from "../api/imageAPI";

import useCustomLogin from "./useCustomLogin";

const useMemberProfile = (userEmail) => {
  const initState = {
    email: "",
    nickname: "",
    profileImg: "",
    new: false,
  };
  const [member, setMember] = useState(initState);
  const [imgSrc, setImgSrc] = useState("");
  const { exceptionHandle } = useCustomLogin();

  useEffect(() => {
    getMember(userEmail)
      .then((res) => {
        if (res.profileImg && res.profileImg.startsWith("http")) {
          setImgSrc(res.profileImg);
        } else if (res.profileImg) {
          setImgSrc(`${host}/view/th_${res.profileImg}`);
        }
        console.log("res", res);
        setMember(res);
      })
      .catch((err) => exceptionHandle(err));
  }, [userEmail]);

  // 회원 정보와 출력용 이미지 주소를 반환
  return { member, imgSrc };
};

export default useMemberProfile;
