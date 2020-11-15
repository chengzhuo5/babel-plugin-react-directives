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

          require("@minar-kotonoha/babel-plugin-react-directives/runtime/invoke-onchange.js").call(
            this,
            _args,
            [
              {
                onChange: this.onChange
              }
            ]
          );
        }}/>
    );
  }
}

class B extends React.Component {
  render() {
    return (
      <input
        {...extraProps}
        value={this.state.data}
        onChange={(..._args2) => {
          let _value2 = require("@minar-kotonoha/babel-plugin-react-directives/runtime/resolve-value.js")(
            _args2
          );

          this.setState(_prevState2 => {
            return {
              data: _value2
            };
          });

          require("@minar-kotonoha/babel-plugin-react-directives/runtime/invoke-onchange.js").call(
            this,
            _args2,
            [
              {
                onChange: this.onChange
              },
              extraProps
            ]
          );
        }}/>
    );
  }
}
