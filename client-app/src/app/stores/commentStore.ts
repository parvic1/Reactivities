import { ChatComment } from "../models/comment";
import { HubConnection, HubConnectionBuilder, LogLevel, HubConnectionState } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";

export default class CommentStore {
    comments: ChatComment[] = [];

    hubConnection: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = (activityId: string) => {

        if (store.activityStore.selectedActivity) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl("http://localhost:5000/chat?activityId=" + activityId, {
                    accessTokenFactory: () =>store.userStore.user?.token!
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            this.hubConnection.start().catch(e => console.log('Error establishing connection', e));

            this.hubConnection.on('LoadComments', (comments: ChatComment[]) => {
                runInAction(() => this.comments = comments);

            });

            this.hubConnection.on('ReceivedComment', (comment: ChatComment) => {
                runInAction(() => this.comments.push(comment));

            });

        }

    };

    stopHubConnection = () => {
        if (this.hubConnection && this.hubConnection.state === HubConnectionState.Connected) {
            this.hubConnection.stop().catch(e => console.log('Error stopping connection', e));
        }
    };

    clearComments = () => {
        this.comments = [];
        this.stopHubConnection();
    };

    addComment = async (values: any) => {

        values.activityId = store.activityStore.selectedActivity?.id;

        try {

            await this.hubConnection?.invoke('SendComment', values);

        } catch (error: any) {
            console.log(error);
        }

    };

}
