const a = <div>
  <div v-if={testA}>
    <p>other1</p>
    <div v-if={testAa}>
      <img v-if={testAa1} alt="image1"/>
      <img v-else-if={testAa2} alt="image2"/>
      <img v-else alt="image3"/>
    </div>
    <div v-else>
      <div>
        <p>
          <span v-if={testAb1}>testAb1</span>
          <span v-else-if={testAb2}>
            <img v-if={testAb21} alt="image3"/>
          </span>
          <span v-else>testAb3</span>
        </p>
      </div>
    </div>
    <p>other2</p>
  </div>
  <div v-else>
    <p>other3</p>
    <span v-if={testBa}>Ba</span>
    <span v-else-if={testBb}>Bb</span>
    <span v-else>Bc</span>
    <p>other4</p>
  </div>
  <p v-if={testC}>C</p>
</div>;
