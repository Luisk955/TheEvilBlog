class Post{
    constructor(pId, pTitle, pBody, pOwner, pTimeStamp){
        this.id = pId;
        this.title = pTitle;
        this.body = pBody;
        this.owner = pOwner;

        if (pTimeStamp === null) {
            this.timeStamp = new Date();
        }
        else{
            this.timeStamp = new Date(pTimeStamp);
        }
    }
}