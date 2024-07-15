import React from "react";
import { Link } from "react-router-dom";

export default function MainTodayGet() {
  return (
    <div className="TodayGetWrap">
      <div className="TodayGetContainer">
        <ul>
          <li>
            <div className="scrollContent">
              <img className="scrollContentSum" src={process.env.PUBLIC_URL + "/assets/imgs/sample.png"} />
              <img className="scrollContentLike" src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_like_wh.png"} />
              <div className="itemTitle">
                <div>
                  <h3>라칸티나</h3>
                  <span>
                    0.14<span>Km</span>
                  </span>
                </div>
                <div>
                  <h4>양식</h4>
                  <span>
                    <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_like_sm.png"} />
                    <span>9,999</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="scrollTextContent">
              <div className="scrollTextLi">
                <p>02-777-2579</p>
                <span>연락하기</span>
              </div>
              <div className="scrollTextLi">
                <p>서울 중구 을지로 1가 50 삼성빌딩 지하 1층</p>
                <span>주소복사</span>
              </div>
            </div>
          </li>

          <li>
            <div className="scrollContent">
              <img className="scrollContentSum" src={process.env.PUBLIC_URL + "/assets/imgs/sample3.png"} />
              <img className="scrollContentLike" src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_like_wh.png"} />
              <div className="itemTitle">
                <div>
                  <h3>라칸티나</h3>
                  <span>
                    0.14<span>Km</span>
                  </span>
                </div>
                <div>
                  <h4>양식</h4>
                  <span>
                    <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_like_sm.png"} />
                    <span>9,999</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="scrollTextContent">
              <div className="scrollTextLi">
                <p>02-777-2579</p>
                <span>연락하기</span>
              </div>
              <div className="scrollTextLi">
                <p>서울 중구 을지로 1가 50 삼성빌딩 지하 1층</p>
                <span>주소복사</span>
              </div>
            </div>
          </li>
          <li>
            <div className="scrollContent">
              <img className="scrollContentSum" src={process.env.PUBLIC_URL + "/assets/imgs/sample2.png"} />
              <img className="scrollContentLike" src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_like_wh.png"} />
              <div className="itemTitle">
                <div>
                  <h3>라칸티나</h3>
                  <span>
                    0.14<span>Km</span>
                  </span>
                </div>
                <div>
                  <h4>양식</h4>
                  <span>
                    <img src={process.env.PUBLIC_URL + "/assets/imgs/icon/ic_like_sm.png"} />
                    <span>9,999</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="scrollTextContent">
              <div className="scrollTextLi">
                <p>02-777-2579</p>
                <span>연락하기</span>
              </div>
              <div className="scrollTextLi">
                <p>서울 중구 을지로 1가 50 삼성빌딩 지하 1층</p>
                <span>주소복사</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
