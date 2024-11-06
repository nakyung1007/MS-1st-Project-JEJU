/* eslint-disable react/prop-types */

import ModalTitle from "../text/ModalTitle.jsx";

const UsedModal = ({isOpen, onClose, callback}) => {
    if (!isOpen) {
        return;
    }

    const onClickUsed = (e) => {
        if (e.target.name === 'yBtn') {
            callback(false);
            onClose();
        } else if (e.target.name === 'nBtn') {
            callback(true);
            onClose();
        }
    };

    return (
        <div className={`fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50`}>
            <div
                className={`relative bg-white rounded-3xl border-4 border-jeju-green w-5/12 md:w-5/12 lg:w-6/12 p-20 pt-24`}
            >
                <button
                    className={`absolute top-2 right-5 text-3xl text-jeju-gray hover:text-black`}
                    onClick={onClose}
                >
                    &times;
                </button>
                <div className={`flex flex-col items-center justify-center text-center w-full`}>
                    <ModalTitle text={`도르멍 탐라를 이용해보신적이 있나요?`}/>
                    <div className={`flex items-center justify-center text-center w-full`}>
                        <button
                            name={`yBtn`}
                            className={`w-3/12 bg-jeju-green text-black rounded-full hover:bg-jeju-orange py-4 text-2xl mr-8`}
                            onClick={(e) => onClickUsed(e)}
                        >
                            네
                        </button>
                        <button
                            name={`nBtn`}
                            className={`w-3/12 bg-jeju-green text-black rounded-full hover:bg-jeju-orange py-4 text-2xl ml-8`}
                            onClick={(e) => onClickUsed(e)}
                        >
                            아니요
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsedModal;