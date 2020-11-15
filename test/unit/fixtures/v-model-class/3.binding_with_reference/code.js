class A extends React.Component {
  render() {
    const state = this.state;
    return <input v-model-class={state.data}/>
  }
}

class B extends React.Component {
  render() {
    const a = this.state;
    const data = a.data;
    return <input v-model-class={data}/>
  }
}
