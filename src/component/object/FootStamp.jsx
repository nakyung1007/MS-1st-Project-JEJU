/* eslint-disable react/prop-types */

const FootStamp = ({size, position}) => {
    return (
        <img
            className={
                "fixed -z-0 " +
                `${size} ${position}`
            }
            src={"/public/images/mung.jpg"}
            alt={"FootStamp"}
        />
    );
};

export default FootStamp;