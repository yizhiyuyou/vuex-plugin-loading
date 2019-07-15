# vuex-plugin-loading

Automatically set loading state via vuex action. You don't need to manually modify the loading status every time you request it. Inspired by dva-loading.

[**中文文档**](./README.md)

---

## Install

```bash
$ npm install vuex-plugin-loading or yarn add vuex-plugin-loading
```

## Usage

```javascript
import createVuexLoadingPlugin from "vuex-plugin-loading";

new Vuex.Store({
  ...
  plugins: [createVuexLoadingPlugin()]
});
```

Then you can get the corresponding loading state via vuex

### opts

- `opts.namespace`: This attribute represents the namespace of the loading module. type String. Default `loadingStore`
- `opts.rootNamespace`: This attribute represents the namespace of the root module. type String. Default `rootStore`

## State Structure

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
