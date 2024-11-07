/* eslint-disable react/prop-types */

const TwinTitle = ({text}) => {
    return (
        <div className={`relative inline-block`}>
            <img
                src={`/public/images/item/center.jpg`}
                alt={`map`}
                className={`-z-50 absolute -top-12/12 -left-32 w-96 h-auto`}
            />
            <img
                src={`/public/images/mung.jpg`}
                alt={`map`}
                className={`-z-50 absolute -bottom-1/12 -right-8 w-20 h-auto`}
            />
            <h1 className={`relative text-7xl z-40 mb-10`}>
                {text}
            </h1>
        </div>
    );
};

export default TwinTitle;