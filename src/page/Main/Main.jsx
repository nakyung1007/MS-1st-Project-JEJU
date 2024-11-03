import MainTitle from "../../component/text/MainTitle.jsx";
import SubTitle from "../../component/text/SubTitle.jsx";
import StartButton from "../../component/button/StartButton.jsx";
import Star from "../../component/object/Star.jsx";

const Main = () => {
    return (
        <div className={"h-screen w-full bg-cover bg-center relative"}>
            <div className={"flex items-center justify-center h-screen"}>
                <div className={"text-center"}>
                    <MainTitle text={"도르멍 탐라"}/>

                    <SubTitle
                        text={"돌아다니며 놀다라는 뜻의 \"도르멍\"과 제주도의 옛 이름 \"탐라\"의 합성어로"}
                        aniamtion={"animate-text-focus-in"}
                        last={false}
                    />
                    <SubTitle
                        text={"제주도의 곳곳을 탐방하며 구경하고 즐기는 경험을 하자라는 의미를 담고 있습니다."}
                        aniamtion={"animate-text-focus-in"}
                        last={true}
                    />

                    <StartButton url={"/info"}/>

                    <Star
                        size={
                            "2xl:w-28 2xl:h-28 " +
                            "xl:w-24 xl:h-24 " +
                            "lg:w-20 lg:h-20 " +
                            "md:w-16 md:h-16 " +
                            "sm:w-12 sm:h-12 " +
                            "w-8 h-8"
                        }
                        position={
                            "2xl:top-2/12 2xl:left-2/12 " +
                            "xl:top-2/12 xl:left-1/12 " +
                            "lg:top-2/12 lg:left-1/12 " +
                            "md:top-1/12 md:left-1/12 " +
                            "sm:top-1/12 sm:left-1/12 " +
                            "top-1/12 left-1/12"
                        }
                        delay={"delay-0"}
                    />
                    <Star
                        size={
                            "2xl:w-20 2xl:h-20 " +
                            "xl:w-16 xl:h-16 " +
                            "lg:w-12 lg:h-12 " +
                            "md:w-12 md:h-12 " +
                            "sm:w-9 sm:h-9 " +
                            "w-8 h-8"
                        }
                        position={
                            "2xl:top-5/12 2xl:right-1/12 " +
                            "xl:top-5/12 xl:right-1/12 " +
                            "lg:top-5/12 lg:right-1/12 " +
                            "md:top-5/12 md:right-1/12 " +
                            "sm:top-5/12 sm:right-1/12 " +
                            "top-4/12 right-1/12"
                        }
                        delay={"delay-500"}
                    />
                    <Star
                        size={
                            "2xl:w-12 2xl:h-12 " +
                            "xl:w-12 xl:h-12 " +
                            "lg:w-8 lg:h-8 " +
                            "md:w-8 md:h-8 " +
                            "sm:w-6 sm:h-6 " +
                            "w-5 h-5"
                        }
                        position={
                            "2xl:bottom-4/12 2xl:left-4/12 " +
                            "xl:bottom-4/12 xl:left-4/12 " +
                            "lg:bottom-4/12 lg:left-4/12 " +
                            "md:bottom-4/12 md:left-4/12 " +
                            "sm:bottom-4/12 sm:left-3/12 " +
                            "bottom-4/12 left-3/12"
                        }
                        delay={"delay-1000"}
                    />
                </div>
            </div>
        </div>
    );
};

export default Main;