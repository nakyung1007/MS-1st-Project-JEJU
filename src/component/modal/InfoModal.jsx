/* eslint-disable react/prop-types */

const InfoModal = ({isOpen, onClose}) => {
    if (!isOpen) {
        return;
    }

    return (
        <div className={`fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50`}>
            <div
                className={`relative bg-white rounded-3xl border-4 border-jeju-green w-5/12 md:w-5/12 lg:w-6/12 p-12 pl-16`}
            >
                <button
                    className={`absolute top-2 right-5 text-3xl text-jeju-gray hover:text-black`}
                    onClick={onClose}
                >
                    &times;
                </button>
                <div className={`flex flex-col items-center justify-center text-center w-full`}>
                    <div
                        className={`relative inline-block`}
                    >
                        <img
                            src={`/public/images/item/gul.jpg`}
                            alt={`orange`}
                            className={`z-40 absolute -top-5 -left-9 w-20 h-20`}
                        />
                        <div className={`flex flex-col`}>
                            <span className={`relative text-3xl z-50 mb-3`}>
                                "도르멍 탐라"는 AI가 학습한 데이터를 기반으로 20~30대의 젊은 층을 위한 맞춤형 제주 여행지를 추천합니다.
                            </span>
                            <span className={`relative text-3xl z-50 mb-3`}>
                                사용자 선호에 맞춰 최적의 관광지와 동반인 유형을 고려한 추천을 제공하며, 누구나 쉽게 자신만의 특별한 제주 여행을 계획할 수 있도록 돕습니다.
                            </span>
                            <span className={`relative text-3xl z-50`}>
                                AI의 추천 과정은 특정 기업이나 장소의 영향을 받지 않도록 공정하고 투명하게 설계되었습니다.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoModal;