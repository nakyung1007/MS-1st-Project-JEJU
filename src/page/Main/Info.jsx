import PrevButton from "../../component/button/PrevButton.jsx";
import SubTitle from "../../component/text/SubTitle.jsx";
import {useState} from "react";
import LoginModal from "../../component/modal/LoginModal.jsx";
import UsedModal from "../../component/modal/UsedModal.jsx";
import ListModal from "../../component/modal/ListModal.jsx";

const Info = () => {
    const [isUsedModalOpen, setIsUsedModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isListModalOpen, setIsListModalOpen] = useState(false);
    const [isNew, setIsNew] = useState(false);

    const openUsedModal = () => {
        setIsUsedModalOpen(true);
    };

    const closeUsedModal = () => {
        setIsUsedModalOpen(false);
    };

    const openLoginModal = (isNew) => {
        setIsNew(isNew);
        setIsLoginModalOpen(true);
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const openListModal = () => {
        setIsListModalOpen(true);
    }

    const closeListModal = () => {
        setIsListModalOpen(false);
    }

    return (
        <div
            className={"h-screen w-full bg-cover bg-center relative"}
            style={{backgroundImage: "url('/public/images/information.jpg')"}}
        >
            <div
                className={"fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-10"}
            >
                <div className={"text-center pl-24"}>
                    <SubTitle
                        text={"제주도 여행 가실 때, 계획 짜기 막막하지 않으셨나요 ?"}
                        aniamtion={"animate-focus-in-expand-fwd"}
                        last={false}
                    />
                    <SubTitle
                        text={"원하시는 걸 알려주시면 저희가 만들어드릴게요 !"}
                        aniamtion={"animate-focus-in-expand-fwd"}
                        last={true}
                    />
                </div>
            </div>

            <PrevButton url={"/"}/>
            <div className={"fixed right-4 bottom-3"}>
                <button
                    className={
                        "bg-contain bg-center bg-no-repeat focus:outline-none " +
                        "2xl:w-24 2xl:h-24 " +
                        "xl:w-24 xl:h-24 " +
                        "lg:w-20 lg:h-20 " +
                        "md:w-16 md:h-16 " +
                        "sm:w-12 sm:h-12 " +
                        "w-8 h-8"
                    }
                    style={{
                        backgroundImage: "url('/public/images/next_gul.jpg')"
                    }}
                    onClick={() => openUsedModal()}
                />
            </div>

            <UsedModal isOpen={isUsedModalOpen} onClose={closeUsedModal} callback={openLoginModal}/>
            <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} isNew={isNew} callback={openListModal}/>
            <ListModal isOpen={isListModalOpen} onClose={closeListModal}/>
        </div>
    );
};

export default Info;
