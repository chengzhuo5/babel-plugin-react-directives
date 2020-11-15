class B extends React.Component {
  render() {
    const { a: [{ data }] } = this.state
    return <input v-model-class={data}/>
  }
}
