var ProductCategoryRow = React.createClass({
	render: function(){
		return (
			<tr><th colspan="2">{this.props.category}</th></tr>
		)
	}
})

var ProductRow = React.createClass({
	render: function(){
		var name = this.props.product.stocked ?
			this.props.product.name :
			<span style={{color: "red"}}>
				this.props.product.name
			</span>
		return (
			<tr>
				<td>{name}</td><td>{this.props.product.price}</td>
			</tr>
		)
	}
})

var ProductTable = React.createClass({
	render: function(){
		var rows = [];
		var lastCategory = null;
		this.props.products.forEach(function(product){
			if (product.category !== lastCategory) {
				rows.push(<ProductCategoryRow category={product.category} />)
			}
			rows.push(<ProductRow product={product} />)
			lastCategory = product.category
		})

		return (
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		)
	}
})

var SearchBar = React.createClass({
	render: function(){
		return (
			<form>
				<input type="text" placeholder="Search..." />
				<p>
					<input type="checkbox" /> Only show products in stock
				</p>
			</form>
		)
	}
})

var FilterableProductTable = React.createClass({
	render: function(){
		return (
			<SearchBar />
			<ProductTable products={} />
		)
	}
})

ReactDOM.render(
	<FilterableProductTable products={} />
	document.getElementById('content')
)









