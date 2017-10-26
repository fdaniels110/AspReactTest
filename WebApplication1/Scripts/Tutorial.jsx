var CommentBox = React.createClass({
    handleCommentSubmit: function (comment) {
        var comments = this.state.data;
        comment.id = Date.now();
        var newcomments = comments.concat([comment]);
        this.setState({ data: newcomments });
        var data = new FormData();
        data.append("Author", comment.Author);
        data.append("Text", comment.Text);

        var request = new XMLHttpRequest();
        request.open("post", this.props.submitUrl, true);
        request.onload = function () {
            this.loadCommentsFromServer();
        }.bind(this);
        request.send(data);
    },
    loadCommentsFromServer: function () {
        var request = new XMLHttpRequest();
        request.open("get", this.props.url, true);
        request.onload = function () {
            var data = JSON.parse(request.responseText);
            this.setState({ data: data });
        }.bind(this);
        request.send();
    },
    getInitialState: function () {
        return { data: this.props.initialData };
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
        window.setInterval(this.loadCommentsFromServer, this.props.pollInterval)
    },
    render: function () {        
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment author={comment.Author} key={comment.Id}>
                    {comment.Text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    getInitialState: function () {
        return { author: '', text: '' };
    },
    handleAuthorChange: function (e) {
        this.setState({
            author: e.target.value
        });
    },
    handleTextChange: function (e) {
        this.setState({
            text: e.target.value
        });
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({ Author: author, Text: text });
        this.setState({ author: '', text: '' });
    },
    render: function () {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit} >
                <input
                    type="text"
                    placeholder="Your name"
                    value={this.state.author}
                    onChange={this.handleAuthorChange}
                />
                <input
                    type="text"
                    placeholder="Text"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <input type="submit" value="Post" />
            </form>
        );
    }
});

var Comment = React.createClass({
    rawMarkup: function () {
        var md = new (global.Remarkable || window.Remarkable)();
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },
    render: function () {
        return (
            <div className="comment" >
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
});

var data = [
    { Id: 1, Author: "Daniel Lo Nigro", Text: "Hello ReactJS.NET World!" },
    { Id: 2, Author: "Pete Hunt", Text: "This is one comment" },
    { Id: 3, Author: "Jordan Walke", Text: "This is *another* comment" }
];

//ReactDOM.render(
//    <CommentBox url="http://localhost:57354/Home/Comments" submitUrl="http://localhost:57354/Home/AddComment" pollInterval={2000} />,
//    document.getElementById('content')
//);