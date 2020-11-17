const options1 = {
  render() {
    return (
      <input
        value={this.state.data}
        onChange={(..._args) => {
          let _value = require("@minar-kotonoha/babel-plugin-react-directives/runtime/resolve-value.js")( _args );
          this.state.data = _value;
          if (this._rawComponent && this._rawComponent.forceUpdate) { this._rawComponent.forceUpdate(); }
          require("@minar-kotonoha/babel-plugin-react-directives/runtime/invoke-onchange.js").call( this, _args, [ { onChange: this.onChange } ] );
        }}/>
    );
  }
};
const options2 = {
  render() {
    return (
      <input
        {...extraProps}
        value={this.state.data}
        onChange={(..._args2) => {
          let _value2 = require("@minar-kotonoha/babel-plugin-react-directives/runtime/resolve-value.js")( _args2 );
          this.state.data = _value2;
          if (this._rawComponent && this._rawComponent.forceUpdate) { this._rawComponent.forceUpdate(); }
          require("@minar-kotonoha/babel-plugin-react-directives/runtime/invoke-onchange.js").call( this, _args2, [ { onChange: this.onChange }, extraProps ] );
        }}/>
    );
  }
};
