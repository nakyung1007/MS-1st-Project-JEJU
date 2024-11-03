import PageTitle from "../../component/text/PageTitle.jsx";
import NextButton from "../../component/button/NextButton.jsx";
import Input from "../../component/input/Input.jsx";
import {useData} from "../../context/DataContext.jsx";
import PrevButton from "../../component/button/PrevButton.jsx";

const Age = () => {
    const {userData, setUserData} = useData();

    const onChangeAge = (e) => {
        setUserData({
            ...userData,
            age: e.target.value
        });
    };

    return (
        <div
            className={"h-screen w-full bg-cover bg-center relative"}
            style={{backgroundImage: "url('/public/images/age.jpg')"}}
        >
            <PageTitle text={"제주, 여행자분의 나이를 알려주시겠어요?"}/>

            <Input
                type={"number"}
                name={"age"}
                text={"숫자로 나이를 입력해주세요."}
                value={userData.age ? userData.age : ""}
                onChange={onChangeAge}
            />

            <PrevButton url={"/gender"}/>
            <NextButton url={"/member"}/>
        </div>
    );
};

export default Age;