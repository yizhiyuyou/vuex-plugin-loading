# vuex-loading

Automatically set loading state via vuex action. You don't need to manually modify the loading status every time you request it.

---

## Install

```bash
$ npm install vuex-loading or yarn add vuex-loading
```

## Usage

```javascript
import createVuexLoadingPlugin from "vuex-loading";

new Vuex.Store({
  ...
  plugins: [createVuexLoadingPlugin()]
});
```

Then we can access loading state from store.

### opts

- `opts.namespace`: This attribute represents the namespace of the loading module. type String. Default `loadingStore`
- `opts.rootNamespace`: This attribute represents the namespace of the module. type String. Default `rootStore`

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
