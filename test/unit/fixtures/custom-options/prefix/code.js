const a = <div>
  <p x-if={testA}>Aa</p>
  <p x-else-if={testAb}>Ab</p>
  <p x-else>Ac</p>
</div>;

const b = <div x-show={testB}>B</div>;

const c = <div x-for={item in list}>{item}</div>;

class D {
  render() {
    return <input x-model-class={this.state.testD}/>
  }
}
