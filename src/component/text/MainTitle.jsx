/* eslint-disable react/prop-types */

const MainTitle = ({text}) => {
    return (
        <h1
            className={
                "font-bold animate-text-focus-in " +
                "2xl:text-13xl 2xl:mb-32 " +
                "xl:text-12xl xl:mb-28 " +
                "lg:text-11xl lg:mb-24 " +
                "md:text-10xl md:mb-20 " +
                "sm:text-9xl sm:mb-14 " +
                "text-6xl mb-8"
            }
        >
            {text}
        </h1>
    );
};

export default MainTitle;