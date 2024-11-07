/* eslint-disable react/prop-types */
// noinspection JSUnresolvedReference,JSCheckFunctionSignatures

import ModalTitle from "../text/ModalTitle.jsx";
import useAxios from "../../hook/useAxios.js";
import {useState} from "react";
import {useData} from "../../context/DataContext.jsx";

const LoginModal = ({isOpen, onClose, isNew, callback}) => {
    const {userData, setUserData} = useData();
    const {error, fetchData} = useAxios();
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [duplicateSuccess, setDuplicateSuccess] = useState(false);

    if (!isOpen) {
        return;
    }

    const initClose = () => {
        setNickname("");
        setPassword("");
        setDuplicateSuccess(false);
        onClose();
    };

    const onChangeNicname = (e) => {
        setNickname(e.target.value);
    };

    const onChangePassword = (e) => {
        const regex = /^[0-9]+$/;
        if (regex.test(e.target.value) || e.target.value === '') {
            setPassword(e.target.value);
        }
    }

    const onClickDuplicateCheck = async () => {
        try {
            const resultData = await fetchData({
                config: {method: 'GET', url: '/api/user/check'},
                params: {
                    nickname: nickname,
                }
            });
            if (resultData) {
                if (resultData.status === 'OK') {
                    const data = resultData.data;
                    if (!data.duplicateCheck) {
                        if (confirm('해당 닉네임을 사용하시겠어요?')) {
                            setDuplicateSuccess(true);
                        }
                    } else {
                        alert('이미 사용 중인 닉네임입니다.');
                    }
                }
            } else if (error) {
                console.error("Error: ", error);
            }
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    const onClickLogin = async () => {
        if (isNew && !duplicateSuccess) {
            alert('닉네임 중복 확인을 먼저 해주세요.');
            return;
        }

        try {
            const resultData = await fetchData({
                config: {method: 'POST', url: '/api/user/login'},
                body: {
                    nickname: nickname,
                    password: password,
                    isNew: isNew,
                }
            });
            if (resultData) {
                if (resultData.status === 'OK') {
                    setUserData({
                        ...userData,
                        userNo: resultData.data.userNo,
                        nickname: resultData.data.nickname,
                    });
                    callback();
                    initClose();
                } else {
                    alert('닉네임 또는 핀번호가 일치하지 않습니다. 다시 확인해주세요.');
                }
            } else if (error) {
                console.error("Error: ", error);
            }
        } catch (err) {
            console.error("Error: ", err);
        }
    }

    return (
        <div className={`fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50`}>
            <div
                className={`relative bg-white rounded-3xl border-4 border-jeju-green w-5/12 md:w-5/12 lg:w-6/12 p-11 pt-16`}
            >
                <button
                    className={`absolute top-2 right-5 text-3xl text-jeju-gray hover:text-black`}
                    onClick={initClose}
                >
                    &times;
                </button>
                <div className={`flex flex-col items-center justify-center text-center w-full mb-20`}>
                    <ModalTitle text={`사용하${isNew === true ? '실' : '신'} 닉네임을 입력해주시겠어요?`}/>
                    <div className={`flex items-center justify-center text-center w-full`}>
                        <input
                            type={`text`}
                            className={`text-center w-9/12 rounded-full border-4 border-jeju-green text-2xl outline-0 pr-16 pl-16 pt-3 pb-3 mr-10 placeholder-jeju-gray`}
                            placeholder={`자신을 표현할 문자를 입력해주세요.`}
                            value={nickname}
                            onChange={(e) => onChangeNicname(e)}
                            disabled={duplicateSuccess}
                        />
                        {
                            isNew === true ? (
                                <button
                                    name={`duplicateCheckBtn`}
                                    className={`w-20 text-white rounded-full py-4 text-2xl ${duplicateSuccess ? 'bg-jeju-gray' : 'bg-jeju-green hover:bg-jeju-orange'}`}
                                    onClick={() => onClickDuplicateCheck()}
                                    disabled={duplicateSuccess}
                                >
                                    확인
                                </button>
                            ) : ''
                        }
                    </div>
                </div>
                <div className={`flex flex-col items-center justify-center text-center w-full mb-20`}>
                    <ModalTitle text={`사용하${isNew === true ? '실' : '신'} 핀번호를 입력해주시겠어요?`}/>
                    <div className={`flex items-center justify-center text-center w-full`}>
                        <input
                            type={`password`}
                            maxLength={6}
                            className={`text-center w-9/12 rounded-full border-4 border-jeju-green text-2xl outline-0 pr-16 pl-16 pt-3 pb-3 mr-10 placeholder-jeju-gray`}
                            placeholder={`여섯 자리의 숫자를 입력해주세요.`}
                            value={password}
                            onChange={(e) => onChangePassword(e)}
                        />
                    </div>
                </div>
                <button
                    name={`loginBtn`}
                    className={`absolute right-4 bottom-4 w-20 h-20 bg-contain bg-center bg-no-repeat`}
                    style={{
                        backgroundImage: "url('/public/images/login.jpg')"
                    }}
                    onClick={onClickLogin}
                />
            </div>
        </div>
    );
};
export default LoginModal;