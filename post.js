class Post {
    constructor(pFbkey, pTitle, pBody, pOwner, pTimeStamp) {
        this.fbKey = pFbkey;
        this.title = pTitle;
        this.body = pBody;
        this.owner = pOwner;
        this.editable = true;

        if (pTimeStamp === null) {
            this.timeStamp = new Date();
        } else {
            this.timeStamp = new Date(pTimeStamp);
        }
    }
}