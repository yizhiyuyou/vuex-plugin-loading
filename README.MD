# vuex-plugin-loading

通过 vuex action 自动设置 loading state. 免去每次请求时都需要手动修改 loading state 的麻烦. 灵感来源于 dva-loading.

[**English Document**](./README_EN.md)

---

## 安装

```bash
$ npm install vuex-plugin-loading or yarn add vuex-plugin-loading
```

## 使用

```javascript
import createVuexLoadingPlugin from "vuex-plugin-loading";

new Vuex.Store({
  ...
  plugins: [createVuexLoadingPlugin()]
});
```

随后你就可以通过 store 使用对应的 loading state

### 配置参数

- `opts.namespace`: 该属性表示 loading 模块的命名空间. 类型为 String. 默认值为 `loadingStore`
- `opts.rootNamespace`: 该属性表示跟模块的命名空间. 类型为 String. 默认值为 `rootStore`

## 状态结构

```
loadingStore: {
  global: false,
  models: {
    users: false,
    ...
  },
  actions: {
    users/login: false,
    users/logout: false,
    ...
  }
}
```

## License

[MIT](https://tldrlegal.com/license/mit-license)
