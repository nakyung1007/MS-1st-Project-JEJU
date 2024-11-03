/* eslint-disable react/prop-types */

const ButtonContainer = ({children}) => {
    return (
        <div
            className={
                "w-full flex justify-center " +
                "2xl:space-x-28 " +
                "xl:space-x-24 " +
                "lg:space-x-20 " +
                "md:space-x-12 " +
                "sm:space-x-12 " +
                "space-x-2"
            }
        >
            {children}
        </div>
    );
};

export default ButtonContainer;