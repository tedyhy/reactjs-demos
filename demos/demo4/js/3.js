var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

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
				{this.props.product.name}
			</span>
		return (
			<tr>
				<td>{name}</td>
				<td>{this.props.product.price}</td>
			</tr>
		)
	}
})

var ProductTable = React.createClass({
	render: function(){
		var rows = [];
		var lastCategory = null;
		this.props.products.forEach(function(product){
			if (product.name.indexOf(this.props.filterText) === -1 || 
				(!product.stocked && this.props.inStockOnly)) return;

			if (product.category !== lastCategory) {
				rows.push(<ProductCategoryRow category={product.category} />)
			}
			rows.push(<ProductRow product={product} />)
			lastCategory = product.category
		}.bind(this))

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
	handleChange: function(){
		this.props.handleUserInput(
			this.refs.filterTextInput.value,
			this.refs.inStockOnlyInput.checked
		)
	},
	render: function(){
		return (
			<form>
				<input
					type="text"
					placeholder="Search..."
					value={this.props.filterText}
					ref="filterTextInput"
					onChange={this.handleChange}/>
				<p>
					<input
						type="checkbox"
						checked={this.props.inStockOnly}
						ref="inStockOnlyInput"
						onChange={this.handleChange}
					/> Only show products in stock
				</p>
			</form>
		)
	}
})

var FilterableProductTable = React.createClass({
	getProductsData: function(){
		$.getJSON(this.props.url, function(res){
			this.setState({products: res});
		}.bind(this))
	},
	handleUserInput: function(filterText, inStockOnly){
		this.setState({
			filterText: filterText,
			inStockOnly: inStockOnly
		})
	},
	getInitialState: function(){
		return {products: [], filterText: "", inStockOnly: false}
	},
	componentDidMount: function(){
		this.getProductsData();
	},
	render: function(){
		return (
			<div>
				<SearchBar
					filterText={this.state.filterText}
					inStockOnly={this.state.inStockOnly}
					handleUserInput={this.handleUserInput}
				/>
				<ProductTable
					products={this.state.products}
					filterText={this.state.filterText}
					inStockOnly={this.state.inStockOnly}
					handleUserInput={this.handleUserInput}
				/>
			</div>
		)
	}
})

ReactDOM.render(
	<FilterableProductTable url="/apis/products" />,
	document.getElementById('content')
)









