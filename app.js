/* eslint-disable no-undef */

// Components
const ProductListDashboard =  React.createClass({
  getInitialState: function () {
    return {
      products: [],
      sortFunc: null
    };
  },
  componentDidMount: function () {
    this.updateState();
  },
  updateState: function (func) {
    //state of sortFunc may not be set immediately or at all, so import any function temporarily
    const sortFunc = func || this.state.sortFunc;
    const products_sorted = sortFunc ? Data.sort((a, b) => {
      return sortFunc(a, b);
    }) : Data;
    this.setState({ products: products_sorted});
  },
  handleProductSort: function(func) {
    this.setState({ sortFunc: func});
    this.updateState(func);
  },
  handleProducts: function() {
    this.updateState();
  },
  render: function () {
    return (
      <div>
        <ProductSortFunctionList
          handleProductSort={this.handleProductSort}
        />
        <ProductList
          products={this.state.products}
          handleProducts={this.handleProducts}
        />
      </div>
    );
  },
});

// Components
const ProductSortFunctionList =  React.createClass({
  componentDidMount: function () {
    //default
    this.handleProductSort(this.productSortAsc);
  },
  handleProductSort: function (func) {
    this.props.handleProductSort(func);
  },
  productSortAsc: function (a, b) {
    return b.votes - a.votes;
  },
  productSortDesc: function (a, b) {
    return a.votes - b.votes;
  },
  render: function () {
    return (
      <div className="ui right floated content list sort">
        <p>Sort
          <a onClick={this.handleProductSort.bind(this, this.productSortAsc)}>
            <i className='large caret up icon'></i>
          </a>
          <a onClick={this.handleProductSort.bind(this, this.productSortDesc)}>
            <i className='large caret down icon'></i>
          </a>
        </p>
      </div>
    );
  },
});

const ProductList = React.createClass({
  handleProductVote: function (productId, inc) {
    this.props.products.forEach((el) => {
      if (el.id === productId) {
        el.votes = el.votes + inc;
          return;
        }
      });
      this.props.handleProducts();
  },
  render: function () {
    const products = this.props.products.map((product) => {
      return (
        <Product
        key={'product-' + product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitter_avatar_url={product.submitter_avatar_url}
        product_image_url={product.product_image_url}
        onVote={this.handleProductVote}
        />
      );
    });
    return (
      <div className='ui items'>
        {products}
      </div>
    );
  },
});

const Product = React.createClass({
  handleVote: function (inc = 1) {
    this.props.onVote(this.props.id, inc);
  },
  render: function () {
    return (
      <div className='item'>
        <div className='image'>
          <img src={this.props.product_image_url} />
        </div>
        <div className='middle aligned content'>
          <div className='header'>
            <a onClick={this.handleVote.bind(this, 1)}>
              <i className='large caret up icon'></i>
            </a>
            <a onClick={this.handleVote.bind(this, -1)}>
              <i className='large caret down icon'></i>
            </a>
            {this.props.votes}
          </div>
          <div className='description'>
            <a href={this.props.url}>
            {this.props.title}
            </a>
          </div>
          <div className='extra'>
            <span>Submitted by:</span>
            <img
              className='ui avatar image'
              src={this.props.submitter_avatar_url}
            />
          </div>
        </div>
      </div>
    );
  },
});

// Rendering
ReactDOM.render(
  <ProductListDashboard />,
  document.getElementById('content')
);
