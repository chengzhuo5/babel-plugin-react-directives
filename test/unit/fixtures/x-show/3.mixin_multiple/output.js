const a = (
  <div
    {...spreadA}
    style={{
      ...require("@minar-kotonoha/babel-plugin-react-directives/runtime/merge-props.js").call(
        this,
        "style",
        [
          {
            style: styleA
          },
          spreadA
        ]
      ),
      display: testA ? undefined : "none"
    }}>
    A
  </div>
);

const b = (
  <div
    {...spreadB}
    style={{
      ...require("@minar-kotonoha/babel-plugin-react-directives/runtime/merge-props.js").call(
        this,
        "style",
        [
          {
            style: styleB
          }
        ]
      ),
      display: testB ? undefined : "none"
    }}>
    B
  </div>
);
