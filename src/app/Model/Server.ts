export class Server {
    serverName: string;
    IP: string;
    onlineModeEnabled = true;
    description: string;
    uid: string;
    ownerUid: string;
    logoURL = 'https://firebasestorage.googleapis.com/v0/b/serverlist-362d5.appspot.com/o/banner.jpg?alt=media&token=d28fd154-4749-40e9-8f39-beab6fd77db6';
    port: number;
    maxPlayers = 0;
    currentPlayers = 0;
    testValue: string;
    token: string;
    lastPingTime: number;
    tags: string[] = [];
    title = '';
    RC: '';
    playerVerification: string;
    website: string;
    gameVersion = '1.12'
    likes = 0;
    private createdDate: string;
    private lastLikeDate: string;

    public setCreateDate(date: Date) {
        this.createdDate = date.toJSON();
    }
    public getCreatedDate() {
        return this.createdDate;
    }
    public setLastLikeDate(date: Date) {
        this.lastLikeDate = date.toJSON();
    }
    public getLastLikeDate() {
        return this.lastLikeDate;
    }
}
