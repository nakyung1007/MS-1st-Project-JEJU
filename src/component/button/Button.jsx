/* eslint-disable react/prop-types */

const Button = ({button, onClick}) => {
    return (
        <button
            className={
                "text-black rounded-full border-4 border-jeju-green hover:bg-jeju-green " +
                `${button.isClicked ? 'bg-jeju-green' : 'bg-white'} ` +
                "2xl:w-3/12 2xl:px-7 2xl:py-7 2xl:text-3xl " +
                "xl:w-2/12 xl:px-6 xl:py-4 xl:text-2xl " +
                "lg:w-2/12 lg:px-5 lg:py-3 lg:text-2xl " +
                "md:w-2/12 md:px-4 md:py-2 md:text-xl " +
                "sm:w-2/12 sm:px-4 sm:py-1 sm:text-base " +
                "w-3/12 px-2 py-2 text-xxs"
            }
            onClick={() => onClick(button)}
        >
            {button.text}
        </button>
    );
};

export default Button;