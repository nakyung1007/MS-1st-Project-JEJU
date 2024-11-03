import PageTitle from "../../component/text/PageTitle.jsx";
import PrevButton from "../../component/button/PrevButton.jsx";
import NextButton from "../../component/button/NextButton.jsx";
import {useData} from "../../context/DataContext.jsx";
import Input from "../../component/input/Input.jsx";

const Period = () => {
    const {userData, setUserData} = useData();

    const onChangePeriod = (e) => {
        setUserData({
            ...userData,
            period: e.target.value
        });
    };

    return (
        <div
            className={"h-screen w-full bg-cover bg-center relative"}
            style={{backgroundImage: "url('/public/images/period.jpg')"}}
        >
            <PageTitle text={"제주, 며칠동안 떠나고 싶으신가요?"}/>

            <Input
                type={"number"}
                name={"period"}
                text={"숫자로 여행 기간을 입력해주세요."}
                value={userData.period ? userData.period : ""}
                onChange={onChangePeriod}
            />

            <PrevButton url={"/member"}/>
            <NextButton url={"/season"}/>
        </div>
    );
};

export default Period;