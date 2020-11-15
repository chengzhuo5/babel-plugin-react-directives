const a = <div>
  <p v-if={testA}>A</p>
  <p v-else-if={testB}>B</p>
  <p v-else-if={testC}>C</p>
  Tail
</div>;

const b = <div>
  <p v-if={testA}>A</p>
  <p v-else-if={testB}>B</p>
  <p v-else-if={testC}>C</p>
  <p v-else>D</p>
</div>;
