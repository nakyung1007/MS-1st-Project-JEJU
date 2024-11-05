import NextButton from "../../component/button/NextButton.jsx";
import PrevButton from "../../component/button/PrevButton.jsx";
import SubTitle from "../../component/text/SubTitle.jsx";

const Info = () => {
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
            <NextButton url={"/id"}/>
        </div>
    );
};

export default Info;
