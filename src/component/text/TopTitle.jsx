/* eslint-disable react/prop-types */

const TopTitle = ({text}) => {
    return (
        <div
            className={"absolute inset-0 flex items-center justify-center bottom-7/12 z-50"}
        >
            <p
                className={
                    "text-black " +
                    "2xl:text-7xl " +
                    "xl:text-6xl " +
                    "lg:text-5xl " +
                    "md:text-4xl " +
                    "sm:text-3xl " +
                    "text-1xl"
                }
            >
                {text}
            </p>
        </div>
    )
};

export default TopTitle;