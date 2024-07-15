import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoAPI";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";
import LoadingPage from "../../components/common/LoadingPage";
import UseCustomMove from "../../hooks/useCustomMove";

const KakaoRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const authCode = searchParams.get("code");

  const dispatch = useDispatch();
  const { moveToPath } = useCustomLogin();
  const { moveToProfileEdit } = UseCustomMove();

  useEffect(() => {
    // 꺼낸 인가코드를 주면서 AccessToken 달라고 카카오에 다시 요청
    getAccessToken(authCode).then((accessToken) => {
      console.log("getAccessToken - accessToken : ", accessToken);
      // API 서버 요청 추가
      getMemberWithAccessToken(accessToken).then((memberInfo) => {
        console.log("getMemberWithAccessToken - memberInfo : ");
        console.log(memberInfo);
        // 로그인 처리
        dispatch(login(memberInfo));

        // 처음 접속 시에만 moveToProfileEdit() 실행
        if (memberInfo.new) {
          moveToProfileEdit();
        } else {
          moveToPath("/");
        }
      });
    });
  }, [authCode]);

  return (
    <div>
      <LoadingPage />
    </div>
  );
};

export default KakaoRedirectPage;
