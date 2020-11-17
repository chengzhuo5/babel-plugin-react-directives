const options = {
  render() {
    const {
      a: [{ data }]
    } = this;
    return (
      <input
        value={data}
        onChange={(..._args) => {
          let _value = require("@minar-kotonoha/babel-plugin-react-directives/runtime/resolve-value.js")( _args );
          data = _value;
          if (this._rawComponent && this._rawComponent.forceUpdate) { this._rawComponent.forceUpdate(); }
        }}/>
    );
  }
};
