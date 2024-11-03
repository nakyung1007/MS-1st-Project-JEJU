// noinspection SpellCheckingInspection,JSIgnoredPromiseFromCall

import axios from "axios";
import {useState} from "react";

// 기본 axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // API의 기본 URL로 설정
    timeout: 60 * 1000, // 60초
    headers: {'Content-Type': 'application/json'},
    withCredentials: true // 쿠키를 포함하여 요청하기 위해 설정
});

// Axios Hook
const useAxios = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

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

            // 401 오류 발생 시 Access-Token 갱신
            if (error.response && error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    return axiosInstance(originalRequest);
                } catch (err) {
                    setError(err);
                }
            }

            return Promise.reject(error);
        }
    );

    const fetchData = async ({config, body = null, params = null}) => {
        setLoading(true);
        try {
            const result = await axiosInstance({
                ...config,
                data: body,
                params: params,
            });
            const resultData = result.data;
            setResponse(resultData);
            return resultData;
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return {response, error, loading, fetchData};
};

export default useAxios;