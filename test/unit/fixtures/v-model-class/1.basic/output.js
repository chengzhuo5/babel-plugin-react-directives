class A extends React.Component {
  render() {
    return (
      <input
        value={this.state.data}
        onChange={(..._args) => {
          let _value = require("@minar-kotonoha/babel-plugin-react-directives/runtime/resolve-value.js")(
            _args
          );

          this.setState(_prevState => {
            return {
              data: _value
            };
          });
        }}/>
    );
  }
}
