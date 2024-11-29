import { useLocation, useNavigate } from "react-router-dom";
import KakaoMap from "../components/KakaoMap";
import { useEffect, useState } from "react";
import styles from "../Css/Review.module.css";
import MyGoogleMap from "../components/MyGoogleMap";
import MyNaverMap from "../components/MyNaverMap";
import MyKakaoMap from "../components/MyKakaoMap";
import "bootstrap/dist/css/bootstrap.min.css";
import darkLogo from "../Logo/darkLogo.png";

function Review() {
  const navigate = useNavigate();
  const { state } = useLocation();
  //문자열, 검색 지역
  const [location, setLocation] = useState();
  const [keyword, setKeyword] = useState();
  //식당 이름들
  const [places, setPlaces] = useState();
  const [map, setMap] = useState("google");
  const locationInfo = state.locationInfo;

  useEffect(() => {
    setLocation(state.location);
    setKeyword(state.selectedItem);
  }, []);

  // HTML 태그를 제거하는 함수
  function stripHtmlTags(str) {
    return str.replace(/<[^>]*>/g, "");
  }

  return (
    <section className={styles.body}>
      <nav className={styles.upBar} id={styles.hd}>
        <img
          onClick={() => {
            navigate("/");
          }}
          src={darkLogo}
        />
      </nav>
      <div className={styles.review}>
        <div className={styles.selectMap}>
          <button
            style={{ color: "blue", backgroundColor: "white" }}
            onClick={() => {
              setMap("google");
            }}
          >
            Google
          </button>
          <button
            onClick={() => {
              setMap("naver");
            }}
          >
            Naver
          </button>
          <button
            style={{ color: "blue", backgroundColor: "yellow" }}
            onClick={() => {
              setMap("kakao");
            }}
          >
            Kakao
          </button>
          {map === "google" ? (
            <button
              onClick={() => {
                navigate("/detail", {
                  state: { location: location, keyword: keyword },
                });
              }}
            >
              사용자 리뷰
            </button>
          ) : (
            ""
          )}
        </div>
        <div className={styles.review_container}>
          <div className={styles.mapdiv}>
            {map === "google" ? (
              <MyGoogleMap
                location={location}
                keyword={keyword}
                places={places}
                setPlaces={setPlaces}
                setLocation={setLocation}
              ></MyGoogleMap>
            ) : map === "naver" ? (
              <MyNaverMap
                location={location}
                keyword={keyword}
                setPlaces={setPlaces}
                setLocation={setLocation}
              ></MyNaverMap>
            ) : (
              <MyKakaoMap
                location={location}
                keyword={keyword}
                setPlaces={setPlaces}
                setLocation={setLocation}
              ></MyKakaoMap>
            )}
          </div>
          <div className={styles.reviewdiv}>
            {places ? (
              places.map((place) => {
                if (place.displayName !== "Undefined") {
                  // HTML 태그를 제거한 후 displayName을 표시
                  const displayNameWithoutTags = stripHtmlTags(
                    place.displayName
                  );
                  return (
                    <div key={displayNameWithoutTags}>
                      {displayNameWithoutTags}{" "}
                      {place.rating ? `: ${place.rating}` : ""}
                      <div className={styles.divBT}>
                        <button>상세페이지</button>
                      </div>
                    </div>
                  );
                }
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Review;
