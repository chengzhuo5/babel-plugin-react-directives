const options = {
  render() {
    const { a: [{ data }] } = this
    return <input v-model={data}/>
  }
}
