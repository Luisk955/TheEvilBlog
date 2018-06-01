class PostUI {
    constructor(post) {
        this.post = post;

        this.container = document.createElement('div');
        this.titleTxt = document.createElement('h2');
        this.bodyTxt = document.createElement('p');
        this.timeStampTxt = document.createElement('p');

        this.container.appendChild(this.titleTxt);
        this.container.appendChild(this.bodyTxt);
        this.container.appendChild(this.timeStampTxt);

        if (this.post !== null) {
            this.titleTxt.innerText = this.post.title;
            this.bodyTxt.innerText = this.post.body;
            this.timeStampTxt.innerText = this.post.owner + " " + this.post.timeStamp;
        }
        this.container.post = this.post;

    }
}