// 构造 CommentBox 组件
var CommentBox = React.createClass({
	render: function(){
		return (
			<div className="commentBox">
				<h1>CommentBox</h1>
				<CommentList />
				<CommentForm />
			</div>
		)
	}
});

var CommentList = React.createClass({
	render: function(){
		return (
			<div className="commentList">
				<h2>CommentList</h2>
				<Comment author="a">I'm *a*.</Comment>
				<Comment author="b">I'm *b*.</Comment>
			</div>
		)
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
	<CommentBox />,
	document.getElementById('content')
);








