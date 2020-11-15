const options1 = {
  render() {
    const state = this;
    return <input v-model={state.data}/>
  }
}

const options2 = {
  render() {
    const a = this;
    const data = a.data;
    return <input v-model={data}/>
  }
}
