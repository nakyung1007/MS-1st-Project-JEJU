/* eslint-disable react/prop-types */

const LongTextButton = ({button, onClick}) => {
    return (
        <button
            className={
                "bg-jeju-green text-black rounded-full w-auto " +
                "hover:bg-jeju-orange " +
                `${button.isClicked ? 'bg-jeju-orange' : 'bg-jeju-green'} ` +
                "2xl:px-7 2xl:py-7 2xl:text-4xl " +
                "xl:px-6 xl:py-6 xl:text-3xl " +
                "lg:px-5 lg:py-5 lg:text-2xl " +
                "md:px-4 md:py-4 md:text-xl " +
                "sm:px-4 sm:py-3 sm:text-base " +
                "px-2 py-2 text-xxs"
            }
            onClick={() => onClick(button)}
        >
            {button.text}
        </button>
    );
};

export default LongTextButton;