class A extends React.Component {
  render() {
    return (
      <input
        onChange={this.onChange}
        v-model-class={this.state.data}
      />
    )
  }
}

class B extends React.Component {
  render() {
    return (
      <input
        onChange={this.onChange}
        value={this.state.data2}
        v-model-class={this.state.data}
        {...extraProps}
      />
    )
  }
}
