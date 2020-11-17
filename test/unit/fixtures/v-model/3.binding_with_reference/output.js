const options1 = {
  render() {
    const state = this;
    return (
      <input
        value={state.data}
        onChange={(..._args) => {
          let _value = require("@minar-kotonoha/babel-plugin-react-directives/runtime/resolve-value.js")( _args );
          state.data = _value;
          if (this._rawComponent && this._rawComponent.forceUpdate) { this._rawComponent.forceUpdate(); }
        }}/>
    );
  }
};
const options2 = {
  render() {
    const a = this;
    const data = a.data;
    return (
      <input
        value={data}
        onChange={(..._args2) => {
          let _value2 = require("@minar-kotonoha/babel-plugin-react-directives/runtime/resolve-value.js")( _args2 );
          data = _value2;
          if (this._rawComponent && this._rawComponent.forceUpdate) { this._rawComponent.forceUpdate(); }
        }}/>
    );
  }
};
