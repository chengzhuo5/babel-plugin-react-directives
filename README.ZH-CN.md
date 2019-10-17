# babel-plugin-react-directives
一个给react(任何JSX)提供一些类似vue指令的Babel转换插件

[![Travis (.org) branch](https://img.shields.io/travis/peakchen90/babel-plugin-react-directives/master.svg)](https://travis-ci.org/peakchen90/babel-plugin-react-directives)
[![Codecov](https://img.shields.io/codecov/c/github/peakchen90/babel-plugin-react-directives.svg)](https://codecov.io/gh/peakchen90/babel-plugin-react-directives)
![node](https://img.shields.io/node/v/babel-plugin-react-directives.svg)
[![npm](https://img.shields.io/npm/v/babel-plugin-react-directives.svg)](https://www.npmjs.com/package/babel-plugin-react-directives)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/peakchen90/babel-plugin-react-directives/blob/master/LICENSE)

> [**English document**](./README.md)

## 开始使用

需要 **node v8.6.0** 或者更高版本，**babel v6.20.0** 或者更高版本

### 安装
使用 npm:
```bash
npm install --save-dev babel-plugin-react-directives
```

使用 yarn:
```base
yarn add --dev babel-plugin-react-directives
```

### 添加配置 `.babelrc` 
```json
{
  "plugins": [
    "react-directives"
  ]
}
```

### 插件选项

默认选项:
```json5
{
  "prefix": "x",
  "pragmaType": "React"
}
```

- `prefix`: 指令的 props 前缀，默认值: "x"，用法示例: `x-if`
- `pragmaType`: 帮助内部进行正确的识别一些语法，如 hooks，默认值: "React"

## 指令

### x-if
如果 `x-if` 的值为**真值**，则将渲染此元素，否则不渲染。

**例子:**
```jsx harmony
const foo = <div x-if={true}>text</div>
```

**转换成:**
```jsx harmony
const foo = true ? <div>text</div> : null
```

### x-else-if 和 x-else
在 `x-else-if` 的同一层级元素必须有相对应的 `x-if`，如果 `x-if` 的值是**假值**，并且 `x-else-if` 的值是**真值**，则它将被渲染。

在 `x-else` 的同一层级元素必须有相对应的 `x-if` 或 `x-else-if`，当 `x-if` 或者 `x-else-if` 都是**假值**时，它将被渲染。

**例子:**
```jsx harmony
const foo = (
  <div>
    <p x-if={data === 'a'}>A</p>  
    <p x-else-if={data === 'b'}>B</p>  
    <p x-else-if={data === 'c'}>C</p>  
    <p x-else>D</p>  
  </div>
)
```

**转换成:**
```jsx harmony
const foo = (
  <div>
    {data === 'a' 
      ? <p>A</p> 
      : data === 'b' 
        ? <p>B</p> 
        : data === 'c' 
          ? <p>C</p> 
          : <p>D</p>
    }
  </div>
)
```
### x-show

`x-show` 通过 `style` prop 的 `display` 属性来控制元素的显示或隐藏，如果 `x-show` 的值是**假值**，则设置 `style.display = "none"`，否则给不设置。

**例子:**
```jsx harmony
const foo = <div x-show={true}>text</div>
```

**转换成:**
```jsx harmony
const foo = (
  <div style={{
    display: true ? undefined : "none"
  }}>text
  </div>
)
```

当然，它还将合并其他 `style`，例如：
```jsx harmony
const foo = (
  <div 
    style={{ color: 'red' }}
    x-show={true} 
    {...extraProps}>
    text
  </div>
)
```

将被转换成:
```jsx harmony
const foo = (
  <div 
    {...extraProps} 
    style={{
      ...{ color: 'red' },
      ...(extraProps && extraProps.style),
      display: true ? undefined : "none"
  }}>text
  </div>
)
```

### x-for
使用 `x-for` 遍历数组生成元素。

绑定的值应该像这样: `(item, index) in list`
- `list`: 遍历的目标数组
- `item`: 当前的值
- `index`: 当前的索引 (可选)

**提示**: 如果你在项目中使用了 [**ESLint**](https://eslint.org)，也许会提示你: `item` 和 `index` 是未定义的变量，请安装 [`eslint-plugin-react-directives`](https://github.com/peakchen90/eslint-plugin-react-directives) 来解决这个问题

**例子:**
```jsx harmony
const foo = (
  <ul>
    <li 
      x-for={item in list}
      key={item.id}>{item.name}
    </li>
  </ul>
)
```

**转换成:**
```jsx harmony
const foo = (
  <ul>
    {list.map(item => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
)
```

另外请注意，如果与 `x-if` 一起使用，则 `x-for` 拥有更高的优先级，例如：
```jsx harmony
const foo = (
  <ul>
    <li
      x-for={item in list}
      x-if={item.name === 'alice'}
      key={item.id}>{item.name}
    </li>
  </ul>
)
```

将被转换成:
```jsx harmony
const foo = (
  <ul>
    {list.map(item => (
      item.name === 'alice' 
        ? <li key={item.id}>{item.name}</li> 
        : null
    ))}
  </ul>
)
```

### x-model
`x-model` 是类似于 vue `v-model` 的语法糖，使用时绑定一个值到表单元素的 `value` prop 上，在表单元素更新时自动更新状态。

**例子:**
```jsx harmony
class Foo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: 'text' }
  }
  
  render() {
    return <input x-model={this.state.data}/>
  }
}
```

**转换成:**
```jsx harmony
class Foo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'text'
    };
  }

  render() {
    return (
      <input
        value={this.state.data}
        onChange={(..._args) => {
          let _value = _args[0] && _args[0].target && typeof _args[0].target === "object"
            ? _args[0].target.value
            : _args[0];

          this.setState(_prevState => {
            return { data: _value };
          });
        }}
      />
    );
  }
}
```

当存在其他 `onChange` prop 时，将会合并这些 prop 上绑定的方法:
```jsx harmony
class Foo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: 'text' }
  }
  
  onChange(e) {
    console.log(e.target.value);
  }
  
  render() {
    return (
      <input
        onChange={this.onChange.bind(this)}
        x-model={this.state.data}
        {...this.props}
      />
    ) 
  }
}
```

将被转换成:
```jsx harmony
class Foo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: 'text' };
  }

  onChange(e) {
    console.log(e.target.value);
  }

  render() {
    return (
      <input
        {...this.props}
        value={this.state.data}
        onChange={(..._args) => {
          let _value = _args[0] && _args[0].target && typeof _args[0].target === "object" 
            ? _args[0].target.value 
            : _args[0];

          this.setState(_prevState => {
            return { data: _value };
          });

          let _extraFn = {
            ...{ onChange: this.onChange.bind(this) },
            ...(this.props && this.props.onChange)
          }.onChange;
          typeof _extraFn === "function" && _extraFn.apply(this, _args);
        }}
      />
    );
  }
}
```

如果 `x-model` 的值是一个对象上的属性，那么当更新时将创建一个新对象，并将对象上旧的属性值合并到新对象上，比如:
```jsx harmony
class Foo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        text: 'bar'
      }
    }
  }

  render() {
    const { data } = this.state;
    return <input x-model={data.text}/>
  }
}

```
将被转换成:
```jsx harmony
class Foo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { text: 'bar' }
    };
  }

  render() {
    const { data } = this.state;
    return (
      <input 
        value={data.text} 
        onChange={(..._args) => {
          let _value = _args[0] && _args[0].target && typeof _args[0].target === "object" 
            ? _args[0].target.value 
            : _args[0];
  
          this.setState(_prevState => {
            let _val = {
              ..._prevState.data,
              text: _value
            };
            return {
              data: _val
            };
          });
      }}/>
    );
  }
}
```

当然也可以使用 `useState` hook 方式:

**提示**: 如果你在项目中使用了 [**ESLint**](https://eslint.org)，也许会提示你 `setData` 是一个从未使用的变量，请安装 [`eslint-plugin-react-directives`](https://github.com/peakchen90/eslint-plugin-react-directives) 来解决这个问题

```jsx harmony
function Foo() {
  const [data, setData] = useState(0);
  return <input x-model={data}/>
}
```

将被转换成:
```jsx harmony
function Foo() {
  const [data, setData] = useState(0);
  return (
    <input
      value={data}
      onChange={(..._args) => {
        let _value = _args[0] && _args[0].target && typeof _args[0].target === "object" 
          ? _args[0].target.value 
          : _args[0];
  
        setData(_value);
    }} />
  );
}
```


## 相关资源
- [eslint-plugin-react-directives](https://github.com/peakchen90/eslint-plugin-react-directives)

## 更新日志

查看更多信息: [CHANGELOG](./CHANGELOG.md)

## 许可证

[MIT](./LICENSE)
