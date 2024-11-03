/* eslint-disable react/prop-types */

import {useNavigate} from "react-router-dom";

const NextButton = ({url}) => {
    const nav = useNavigate();

    return (
        <div className={"fixed right-4 bottom-3"}>
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
                    backgroundImage: "url('/public/images/next_gul.jpg')"
                }}
                onClick={() => nav(url)}
            />
        </div>
    );
};

export default NextButton;