window.addEventListener('load', init, false);

function init(params) {


    var urlBase = 'https://theevilmouseblog.firebaseio.com/posts.json';
    var btnPost = document.getElementById('btnPost');
    var btnUpdate = document.getElementById('btnUpdate');
    var btnDelete = document.getElementById('btnDelete');
    var owner = "Luisk";
    // var btnCancel = document.getElementById('btnCancel');



    var posts = [];
    initFb();
    requestAllPosts();


    btnPost.hidden = false;
    btnUpdate.hidden = true;
    btnDelete.hidden = true;
    // btnCancel.hidden = true;


    btnPost.onclick = createPost;

    function createPost() {
        var txtTitle = document.getElementById('txtTitle').value;
        var txtBody = document.getElementById('txtBody').value;
        var post = new Post(0, txtTitle, txtBody, owner, new Date());
        // pId, pTitle, pBody, pOwner, pTimeStamp

        posts.push(post);

        var request = new XMLHttpRequest();
        request.open('POST', urlBase, true);
        request.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        request.onreadystatechange = sendPostCallBack;
        request.send(JSON.stringify(post));
        showPosts();
        cleanUI();
    }

    function sendPostCallBack(event) {
        var request = event.target;
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                requestAllPosts();
            } else {
                console.log('Error on request: ', request.status);
            }
        }
    }

    function cleanUI() {
        txtTitle.value = '';
        txtBody.value = '';
    }


    function showPosts() {
        var postsContainer = document.getElementById('posts');
        postsContainer.innerHTML = "";
        posts.forEach(post => {
            var post = new PostUI(post);
            postsContainer.appendChild(post.container);
            console.log(post);
        });

    }

    function requestAllPosts() {
        var request = new XMLHttpRequest();
        request.open('GET', urlBase, true);
        request.onreadystatechange = requestAllPostsCallBack;
        request.send();
    }

    function requestAllPostsCallBack(event) {
        var request = event.target;
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status == 200) {
                posts = [];
                var postsData = JSON.parse(request.responseText);
                for (const key in postsData) {
                    var postData = postsData[key];
                    // var editable = false;
                    // if (postData.owner === owner) {
                    //     editable = true;
                    // }

                    var post = new Post(key, postData.title, postData.body, postData.owner, new Date(postData.timestamp) /*, postData.editable*/ );
                    posts.push(post);
                }
                showPosts();
            } else {
                console.log('Error on request: ', request.status);
            }
        }
    }

    function initFb() {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyC_QTx6ZaFn1QEWQZdzDv3NqCm5MPJzJu8",
            authDomain: "theevilmouseblog.firebaseapp.com",
            databaseURL: "https://theevilmouseblog.firebaseio.com",
            projectId: "theevilmouseblog",
            storageBucket: "theevilmouseblog.appspot.com",
            messagingSenderId: "341107600456"
        };
        firebase.initializeApp(config);
    }


}