const a = (
  <div>
    {testA ? <p>A</p> : testB ? <p>B</p> : testC ? <p>C</p> : null}
    Tail
  </div>
);

const b = (
  <div>{testA ? <p>A</p> : testB ? <p>B</p> : testC ? <p>C</p> : <p>D</p>}</div>
);
