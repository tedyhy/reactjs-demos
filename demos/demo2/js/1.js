var data = [{
	id: 1,
	author: "Pete Hunt",
	text: "This is one comment"
}, {
	id: 2,
	author: "Jordan Walke",
	text: "This is *another* comment"
}];


// 构造 CommentBox 组件
var CommentBox = React.createClass({
	render: function(){
		return (
			<div className="commentBox">
				<h1>CommentBox</h1>
				<CommentList data={this.props.data}/>
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
	<CommentBox data={data} />,
	document.getElementById('content')
);








