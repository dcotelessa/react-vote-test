/* eslint-disable no-undef */

// Components
const ProductListSorted =  React.createClass({
  getInitialState: function () {
    return {
      sortFunc: null
    };
  },
  componentDidMount: function () {
    //default
    this.updateState(this.productSortAsc);
  },
  updateState: function(func) {
    this.setState({sortFunc: func});
  },
  handleSortFunc: function (func) {
    this.updateState(func);
  },
  voteSortAsc: function (a, b) {
    return b.votes - a.votes;
  },
  voteSortDesc: function (a, b) {
    return a.votes - b.votes;
  },
  render: function () {
    return (
      <div>
        <div className="ui right floated content list sort">
          <p>Sort
            <a onClick={this.handleSortFunc.bind(this, this.voteSortAsc)}>
              <i className='large caret up icon'></i>
            </a>
            <a onClick={this.handleSortFunc.bind(this, this.voteSortDesc)}>
              <i className='large caret down icon'></i>
            </a>
          </p>
        </div>
        <ProductList
          sortFunc={this.state.sortFunc}
        />
      </div>
    );
  },
});

const ProductList = React.createClass({
  getInitialState: function () {
    return {
      products: []
    };
  },
  componentDidMount: function () {
    this.updateState();
  },
  updateState: function () {
    //state of sortFunc may not be set immediately or at all, so import any function temporarily
    const sortFunc = this.props.sortFunc;
    const products_sorted = sortFunc ? Data.sort((a, b) => {
      return sortFunc(a, b);
    }) : Data;
    this.setState({ products: products_sorted});
  },
  handleProductVote: function (productId, inc) {
    this.state.products.forEach((el) => {
      if (el.id === productId) {
        el.votes = el.votes + inc;
          return;
        }
      });
      this.updateState();
  },
  render: function () {
    const products = this.state.products.map((product) => {
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
  <ProductListSorted />,
  document.getElementById('content')
);
