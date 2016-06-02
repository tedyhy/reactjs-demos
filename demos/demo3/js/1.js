// 构造 CommentBox 组件
var CommentBox = React.createClass({
	loadCommentsFromServer: function(){
		$.getJSON(this.props.url, function(res){
			this.setState({data: res})
		}.bind(this), function(err){
			console.error(err.toString());
		}.bind(this));
	},
	handleCommentSubmit: function(comment){
		$.ajax({
			url: this.props.url,
			type: "POST",
			dataType: "json",
			data: comment,
			success: function(res){
				this.setState({data: res});
			}.bind(this),
			error: function(xhr, status, err){
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function(){
		return {data: []};
	},
	componentDidMount: function(){
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	},
	render: function(){
		return (
			<div className="commentBox">
				<h1>CommentBox</h1>
				<CommentList data={this.state.data}/>
				<CommentForm onCommentSubmit={this.handleCommentSubmit} />
			</div>
		)
	}
});

var CommentList = React.createClass({
	render: function(){
		var commentNodes = this.props.data.map(function(comment){
			return (
				<Comment author={comment.author} key={comment.id}>
					{comment.text}
				</Comment>
			)
		});
		return (
			<div className="commentList">
				<h2>CommentList</h2>
				{commentNodes}
			</div>
		);
	}
})

var CommentForm = React.createClass({
	handleAuthorChange: function(e){
		this.setState({author: e.target.value});
	},
	handleTextChange: function(e){
		this.setState({text: e.target.value});
	},
	handleSubmit: function(e){
		e.preventDefault();
		var author = this.state.author.trim(),
			text = this.state.text.trim();
		if (!author || !text) {
			return;
		}
		this.props.onCommentSubmit({author: author, text: text});
		this.setState({author: "", text: ""});
	},
	getInitialState: function(){
		return {author: "", text: ""};
	},
	render: function(){
		return (
			<form name="" action="" className="commentForm" onSubmit={this.handleSubmit}>
				<input
					type="text"
					value={this.state.author}
					placeholder="Your name"
					onChange={this.handleAuthorChange}
				/>
				<input
					type="text"
					value={this.state.text}
					placeholder="Say something..."
					onChange={this.handleTextChange}
				/>
				<input type="submit" value="POST" />
			</form>
		)
	}
})

var Comment = React.createClass({
	rawMarkup: function() {
		var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
		return { __html: rawMarkup };
	},
	render: function(){
		return (
			<div className="comment">
				<h3 className="commentAuthor">
					{this.props.author}
				</h3>
				<span dangerouslySetInnerHTML={this.rawMarkup()}></span>
			</div>
		)
	}
})

ReactDOM.render(
	<CommentBox url="/apis/comments" pollInterval={5e3} />,
	document.getElementById('content')
);








