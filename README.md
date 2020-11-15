# @minar-kotonoha/babel-plugin-react-directives

原 git 项目：https://github.com/peakchen90/babel-plugin-react-directives/

本项目是基于原项目的二次开发，配合[@minar-kotonoha/vue-native-core](https://github.com/chengzhuo5/vue-native-core)支持了 v-model 指令。

## 使用说明

```javascript
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

原项目针对 class 组件的 v-model 指令重命名为 v-model-class。
