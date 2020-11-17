const options = {
  render() {
    return (
      <input
        value={this.data}
        onChange={(..._args) => {
          let _value = require("@minar-kotonoha/babel-plugin-react-directives/runtime/resolve-value.js")( _args );
          this.data = _value;
          if (this._rawComponent && this._rawComponent.forceUpdate) { this._rawComponent.forceUpdate(); }
        }}/>
    );
  }
};
