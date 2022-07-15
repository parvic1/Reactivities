import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";
import { history } from '../..';

export default class UserStore {
    //private _user: User | null = null;
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }


    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);

            store.commonStore.setToken(user.token);

             runInAction(() => this.user = user);

            store.modalStore.closeModal();

            history.push(`/activities`);
           
        } catch (error) {
            throw error;
        }
    }


    logout = () => {
        window.localStorage.removeItem('jwt');
        store.commonStore.setToken(null);
        this.user = null;

        history.push('/');
    };

    getUser = async () => {
        const user = await agent.Account.current();
        runInAction(() => this.user = user);
    };

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);

            runInAction(() => this.user = user);

            history.push('/activities');
            store.modalStore.closeModal();

            //history.push(`/account/registerSuccess?email=${creds.email}`);
            //window.location.href = `${window.location.origin}/account/registerSuccess?email=${creds.email}`;

            //store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

}