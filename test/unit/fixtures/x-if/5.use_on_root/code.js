const a = <div v-if={testRoot}>A</div>;

const b = <div v-if={testRoot}>
  <p v-if={testA}>A</p>
  <p v-else>B</p>
</div>;
