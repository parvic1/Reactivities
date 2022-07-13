import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useContext } from 'react';
import { createContext } from 'react';
import { toast } from 'react-toastify';
import { Activity } from '../models/activity';


interface IAgentContext {
    Activities: {
        list: () => Promise<Activity[]>,
        details: (id: string) => Promise<Activity>,
        create: (activity: Activity) => void,
        update: (id: string, activity: Activity) => void,
        delete: (id: string) => void,
    }
};

const AgentContext = createContext<IAgentContext | null>(null);

type AgentProviderProps = {
    children: React.ReactNode
};

export function AgentProvider(props: AgentProviderProps): JSX.Element {



    axios.defaults.baseURL = 'http://localhost:5000/api';
    axios.interceptors.response.use(async response => {

        return response;

    }, (error: AxiosError) => {
        const { data, status } = error.response!;
        switch (status) {
            case 400:
                toast.error('bad request');
                break;
            case 401:
                toast.error('unauthorized');
                break;
            case 404:
                toast.error('not found');
                break;
            case 500:
                toast.error('server error');
                break;
        }

        return Promise.reject(error);
    });

    const responseBody = <T extends unknown>(response: AxiosResponse<T>) => response.data;

    const requests = {
        get: <T extends unknown>(url: string) => axios.get<T>(url).then(responseBody),
        post: <T extends unknown>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
        put: <T extends unknown>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
        delete: <T extends unknown>(url: string) => axios.delete<T>(url).then(responseBody),
    };

    const Activities = {
        list: () => requests.get<Activity[]>('/activities'),
        details: (id: string) => requests.get<Activity>(`/activities/${id}`),
        create: (activity: Activity) => axios.post<void>('/activities', activity),
        update: (id: string, activity: Activity) => axios.put<void>(`/activities/${id}`, activity),
        delete: (id: string) => requests.delete<void>(`/activities/${id}`),
    };

    const dc: IAgentContext = {
        Activities: Activities
    };


    return <AgentContext.Provider value={dc}>
        {props.children}
    </AgentContext.Provider>;
}

export function useAxiosAgent(): IAgentContext {

    const context = useContext(AgentContext);


    if (!context) {
        throw new Error("useAxiosAgent must be used within a AgentContext. Wrap a parent component in <AgentContext> to fix this error.");
    }

    return context;
}