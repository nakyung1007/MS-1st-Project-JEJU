/* eslint-disable react/prop-types */

const PageTitle = ({text}) => {
    return (
        <div
            className={"absolute inset-0 flex items-center justify-center -top-1/4"}
        >
            <p
                className={
                    "text-black " +
                    "2xl:text-8xl " +
                    "xl:text-7xl " +
                    "lg:text-6xl " +
                    "md:text-5xl " +
                    "sm:text-4xl " +
                    "text-1xl"
                }
            >
                {text}
            </p>
        </div>
    )
};

export default PageTitle;