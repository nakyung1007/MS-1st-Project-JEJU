/* eslint-disable react/prop-types */

const ModalTitle = ({text}) => {
    return (
        <div
            className={`relative inline-block`}
        >
            <img
                src={`/public/images/item/gul.jpg`}
                alt={`orange`}
                className={`z-40 absolute -top-5 -left-9 w-20 h-20`}
            />
            <h1
                className={`relative text-5xl z-50 mb-10`}
            >
                {text}
            </h1>
        </div>
    );
};

export default ModalTitle;