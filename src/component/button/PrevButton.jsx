/* eslint-disable react/prop-types */

import {useNavigate} from "react-router-dom";
import {useData} from "../../context/DataContext.jsx";

const PrevButton = ({url, isInitial}) => {
    const {setUserData} = useData();
    const nav = useNavigate();

    const onClickPrev = () => {
        if (isInitial) {
            if (confirm('입력한 정보들이 초기화됩니다.\n이전 화면으로 이동하시겠습니까?')) {
                setUserData({});
                nav(url);
            }
        } else {
            nav(url);
        }
    };

    return (
        <div className={"fixed left-4 bottom-3"}>
            <button
                className={
                    "bg-contain bg-center bg-no-repeat focus:outline-none " +
                    "2xl:w-24 2xl:h-24 " +
                    "xl:w-24 xl:h-24 " +
                    "lg:w-20 lg:h-20 " +
                    "md:w-16 md:h-16 " +
                    "sm:w-12 sm:h-12 " +
                    "w-8 h-8"
                }
                style={{
                    backgroundImage: "url('/public/images/before_gul.jpg')"
                }}
                onClick={onClickPrev}
            />
        </div>
    );
};

export default PrevButton;