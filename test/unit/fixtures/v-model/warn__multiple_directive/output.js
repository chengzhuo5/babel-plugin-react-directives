const options = {
  render() {
    return (
      <input
        value={this.dataB}
        onChange={(..._args) => {
          let _value = require("@minar-kotonoha/babel-plugin-react-directives/runtime/resolve-value.js")( _args );
          this.dataB = _value;
        }}/>
    );
  }
};
