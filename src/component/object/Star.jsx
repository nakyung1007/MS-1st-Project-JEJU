/* eslint-disable react/prop-types */

const Star = ({size, position, delay}) => {
        return (
            <img
                className={
                    "fixed animate-twinkle -z-10 " +
                    `${size} ${position} ${delay}`
                }
                src={"/public/images/star.jpg"}
                alt={"Star"}
            />
        );
    }
;

export default Star;