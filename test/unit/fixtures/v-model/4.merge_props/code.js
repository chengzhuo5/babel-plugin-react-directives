const options1 = {
  render() {
    return (
      <input
        onChange={this.onChange}
        v-model={this.state.data}
      />
    )
  }
}

const options2 = {
  render() {
    return (
      <input
        onChange={this.onChange}
        value={this.state.data2}
        v-model={this.state.data}
        {...extraProps}
      />
    )
  }
}
