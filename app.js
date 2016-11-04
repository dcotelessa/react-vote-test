/* eslint-disable no-undef */

// Components
const ProductSortFunctionList =  {
  productSortAsc: function (a, b) {
    return b.votes - a.votes;
  },
  productSortDesc: function (a, b) {
    return a.votes - b.votes;
  },
};

const ProductList = React.createClass({
  getInitialState: function () {
    return {
      products: [],
      compareFunc: null
    };
  },
  componentDidMount: function () {
    this.updateState("productSortAsc");
  },
  updateState: function (func) {
    //sort data by compareFunc
    const compareFunc = (func || this.state.compareFunc)
    const products = Data.sort((a, b) => {
      return ProductSortFunctionList[compareFunc](a, b);
    });
    this.setState({ products: products, compareFunc: compareFunc});
  },
  handleProductSort: function (funcStr) {
    this.updateState(funcStr);
  },
  handleProductVote: function (productId, inc) {
    Data.forEach((el) => {
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
      <div>
        <div className="ui right floated content list sort">
          <p>Sort
            <a onClick={this.handleProductSort.bind(this, "productSortAsc")}>
              <i className='large caret up icon'></i>
            </a>
            <a onClick={this.handleProductSort.bind(this, "productSortDesc")}>
              <i className='large caret down icon'></i>
            </a>
          </p>
        </div>
        <div className='ui items'>
          {products}
        </div>
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
  <ProductList />,
  document.getElementById('content')
);
