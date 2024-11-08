// noinspection SpellCheckingInspection,JSIgnoredPromiseFromCall,DuplicatedCode

import axios from "axios";
import {useState} from "react";

// 기본 axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', // API의 기본 URL로 설정
    timeout: 60 * 1000, // 60초
    headers: {'Content-Type': 'application/json'},
    withCredentials: true // 쿠키를 포함하여 요청하기 위해 설정
});

// Axios Hook
const useModelAxios = () => {
    const [responseM, setResponseM] = useState(null);
    const [errorM, setErrorM] = useState(null);
    const [loadingM, setLoadingM] = useState(false);

    // 요청 인터셉터 설정
    axiosInstance.interceptors.request.use(
        async (config) => {
            return config;
        },
        (error) => Promise.reject(error)
    );

    // 응답 인터셉터 설정
    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    return axiosInstance(originalRequest);
                } catch (err) {
                    setErrorM(err);
                }
            }

            return Promise.reject(error);
        }
    );

    const fetchDataM = async ({config, body = null, params = null}) => {
        setLoadingM(true);
        try {
            const result = await axiosInstance({
                ...config,
                data: body,
                params: params,
            });
            const resultData = result.data;
            setResponseM(resultData);
            return resultData;
        } catch (err) {
            setErrorM(err);
        } finally {
            setLoadingM(false);
        }
    };

    return {responseM, errorM, loadingM, fetchDataM};
};

export default useModelAxios;