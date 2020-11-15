# @minar-kotonoha/babel-plugin-react-directives

原 git 项目：https://github.com/peakchen90/babel-plugin-react-directives/

本项目是基于原项目的二次开发，配合[@minar-kotonoha/vue-native-core](https://github.com/chengzhuo5/vue-native-core)支持了 v-model 指令。原项目针对 class 组件的 v-model 指令重命名为 v-model-class。

如果不使用@minar-kotonoha/vue-native-core，此项目也能正常运行。

## 使用说明

```javascript
// babel.config.js
{
  plugins: [
    [
      "@minar-kotonoha/babel-plugin-react-directives",
      {
        prefix: "v",
        pragmaType: "React"
      }
    ]
  ];
}
```

```javascript
// Vue组件
import React from "react";
import { constructor } from "@minar-kotonoha/vue-native-core";

export default constructor({
  data() {
    return {
      input: "hhh"
    };
  },
  render() {
    return (
      <div>
        <div>{this.input}</div>
        <input v-model={this.input} />
      </div>
    );
  }
});
```

```javascript
// React-class组件
import React, { Component } from "react";
class Test extends Component {
  state = { data: "" };
  render() {
    return (
      <div>
        <div>{this.state.data}</div>
        <input v-model-class={this.state.data} />
      </div>
    );
  }
}
```
