const a = (
  <div
    style={{
      ...require("babel-plugin-react-directives/lib/runtime").mergeProps.call(
        this,
        "style",
        [
          {
            style: {
              color: "red"
            }
          }
        ]
      ),
      display: testA ? undefined : "none"
    }}>
    A
  </div>
);
const b = (
  <div
    style={{
      ...require("babel-plugin-react-directives/lib/runtime").mergeProps.call(
        this,
        "style",
        [
          {
            style: styleA
          }
        ]
      ),
      display: testB ? undefined : "none"
    }}>
    B
  </div>
);
