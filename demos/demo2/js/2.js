// 构造 CommentBox 组件
var CommentBox = React.createClass({
	loadCommentsFromServer: function(){
		$.getJSON(this.props.url, function(res){
			this.setState({data: res})
		}.bind(this), function(err){
			console.error(err.toString());
		}.bind(this));
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
				<CommentForm />
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
	render: function(){
		return (
			<div className="commentForm">
				Hello, world! I am a CommentForm.
			</div>
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
	<CommentBox url="/api/comments" pollInterval={3e3} />,
	document.getElementById('content')
);








