window.addEventListener('load', init, false);

function init(params) {


    var urlBase = 'https://theevilmouseblog.firebaseio.com/posts.json';
    var btnPost = document.getElementById('btnPost');
    var btnUpdate = document.getElementById('btnUpdate');
    var btnDelete = document.getElementById('btnDelete');
    var btnCancel = document.getElementById('btnCancel');
    var txtTitle = document.getElementById('txtTitle');
    var txtBody = document.getElementById('txtBody');
    var owner = "Luisk";
    var selectedPostUi = null;



    var posts = [];
    initFb();
    requestAllPosts();


    btnPost.hidden = false;
    btnUpdate.hidden = true;
    btnDelete.hidden = true;
    btnCancel.hidden = true;

    // element.classList.add("mystyle");

    btnPost.onclick = createPost;
    btnDelete.onclick = deletePost;

    function createPost() {
        var post = new Post(0, txtTitle.value, txtBody.value, owner, new Date());
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

    function deletePost(event) {
        if (confirm('¿Está seguro que desea eliminar el post?')) {
            var url = 'https://theevilmouseblog.firebaseio.com/posts/' + selectedPostUi.post.fbKey + '.json';
            var request = new XMLHttpRequest();
            request.open('Delete', url, true);
            request.onreadystatechange = deletePostCallback;
            request.send();
            removeSelectedPostStyle();
        }
    }

    function deletePostCallback(event) {
        var reques = event.target;
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                requestAllPosts();
            } else {
                console.log('Error on request: ', request.status);
            }
        }
    }

    function selectPost(event) {
        // removeSelectedPostStyle();
        if (event.target.post) {
            selectedPostUi = event.target;
            txtTitle.value = selectedPostUi.post.title;
            txtBody.value = selectedPostUi.post.body;
            btnDelete.hidden = false;
            btnUpdate.hidden = false;
            btnCancel.hidden = false;
            btnPost.hidden = true;

            selectedPostUi.classList.add('selectedPost');
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
            var postUI = new PostUI(post);
            postUI.container.onclick = selectPost;
            postsContainer.appendChild(postUI.container);
            console.log(post);
        });
    }

    function requestAllPosts() {
        var request = new XMLHttpRequest();
        request.open('GET', urlBase, true);
        request.onreadystatechange = requestAllPostsCallBack;
        request.send();
    }

    // function requestAllPostsCallBack(event) {
    //     var request = event.target;
    //     switch (request.readyState) {
    //         case XMLHttpRequest.DONE:
    //             console.log('DONE');
    //             switch (request.status) {
    //                 case 200:
    //                     posts = [];
    //                     var postsData = JSON.parse(request.responseText);
    //                     for (const key in postsData) {
    //                         var postData = postsData[key];
    //                         var editable = false;
    //                         if (postData.owner === owner) {
    //                             editable = true;
    //                         }

    //                         var post = new Post(key, postData.title, postData.body, postData.owner, new Date(postData.timestamp), postData.editable);
    //                         posts.push(post);
    //                     }
    //                     break;

    //                 case 400:

    //                     break;
    //                 case 401:

    //                     break;

    //                 default:
    //                     break;
    //             }
    //             break;
    //     }
    // }


    function requestAllPostsCallBack(event) {
        var request = event.target;
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status == 200) {
                posts = [];
                var postsData = JSON.parse(request.responseText);
                for (const key in postsData) {
                    var postData = postsData[key];
                    var editable = false;
                    if (postData.owner === owner) {
                        editable = true;
                    }

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