# vue-katex

### Foreword

相比 MathJax，Katex 的解析速度更快，为了解决解析混合文本、实时刷新数据还有更好的和 vue 结合使用等问题，开发了 vue-katex 这个工具。

### Installation

```
npm install vue-katex
```

### Usage

```
import vueKatex from 'vue-katex'
import 'vue-katex/dist/katex.css'

Vue.use(vueKatex)

```

-   在您的 html 代码中使用（不要忘记转义所有反斜杠）

```
<div v-katex="'其中$$b=\\frac{1}{3}$$．'"></div>
```

-   如果您需要其他分隔符，比如\$、&&，您可以全局配置
    或者全局配置

```
Vue.use(vueKatex,{
  flag:{left:'$',right:'$'}
})
或Vue.use(vueKatex,{
  flag:[{left:'$$',right:'$$'},{left:'$',right:'$'}]
})
```

-   如果您需要单独配置某一个指令的分隔符，您可以

```
<div v-katex="{content:latex,left:'$',right:'$'}"></div>
```

-   兼容模式，目前 katex 有一些语法不兼容，可以替换成兼容的语法
    如果您不需要兼容模式你可以将添加配置 compatible:false（compatible 默认 true）
    默认兼容配置为 katex[支持表](https://katex.org/docs/support_table.html)中带有 Not supported 并且已给出解决方案的的字段
    如果您有自定义的兼容配置可以导入自己的配置，传入 compatibleConfig

```
Vue.use(vueKatex,{
  flag:{left:'$',right:'$'},
  compatible:true,
  compatibleConfig:{
    "{align}":"{aligned}"
  }
})
```

-   如果您需要修改 katex 的选项配置

```
Vue.use(vueKatex,{
  flag:{left:'$',right:'$'},
  options:{
    displayMode:true,
    throwOnError:true,
    errorColor:'#FF0000'
  }
})
```

-   具体参数请参考[katex](https://katex.org/)官方文档
