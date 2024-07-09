import React from "react";
import { Link } from "react-router-dom";

export default function MainPriceby() {
  return (
    <div className="PricebyPlaceWrap">
      <div className="PricebyPlaceContainer">
        <ul>
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
                <p>명란 파스타</p>
                <span>
                  8,000<span>원</span>
                </span>
              </div>
              <div className="scrollTextLi">
                <p>올리브오일 파스타</p>
                <span>
                  9,000<span>원</span>
                </span>
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
                <p>명란 파스타</p>
                <span>
                  8,000<span>원</span>
                </span>
              </div>
              <div className="scrollTextLi">
                <p>올리브오일 파스타</p>
                <span>
                  9,000<span>원</span>
                </span>
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
                <p>명란 파스타</p>
                <span>
                  8,000<span>원</span>
                </span>
              </div>
              <div className="scrollTextLi">
                <p>올리브오일 파스타</p>
                <span>
                  9,000<span>원</span>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
