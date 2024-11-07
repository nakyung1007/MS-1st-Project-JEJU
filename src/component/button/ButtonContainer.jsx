/* eslint-disable react/prop-types */

const ButtonContainer = ({children}) => {
    return (
        <div
            className={
                "flex w-6/12 justify-center items-center " +
                "2xl:space-x-24 " +
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