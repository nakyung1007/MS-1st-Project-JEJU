/* eslint-disable react/prop-types */

import {useNavigate} from "react-router-dom";

const StartButton = ({url}) => {
    const nav = useNavigate();

    return (
        <button
            className={
                "bg-contain bg-center bg-no-repeat focus:outline-none animate-roll-in-left " +
                "2xl:w-32 2xl:h-32 " +
                "xl:w-28 xl:h-28 " +
                "lg:w-24 lg:h-24 " +
                "md:w-20 md:h-20 " +
                "sm:w-16 sm:h-16 " +
                "w-12 h-12"
            }
            style={{
                backgroundImage: "url('/public/images/start.jpg')"
            }}
            onClick={() => nav(url)}
        />
    );
};

export default StartButton;