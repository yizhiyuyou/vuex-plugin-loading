# vuex-plugin-loading

Automatically set loading state via vuex action. You don't need to manually modify the loading status every time you request it. Inspired by dva-loading.

[**中文文档**](./README.md)

---

## Install

```bash
$ npm install vuex-plugin-loading or yarn add vuex-plugin-loading
```

## Usage

```js
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

## 示例 1（According to each action, the corresponding loading is displayed.）

### src/view/Test/index.vue

```html
<template>
  <div>
    <LeftComponent :data="leftData" v-loading="loadingByLeft" />
    <RightComponent :data="rightData" v-loading="loadingByRight" />
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'

  import LeftComponent from '@/components/LeftComponent'
  import RightComponent from '@/components/RightComponent'

  const { mapState, mapActions } = createNamespacedHelpers('testStore')

  const { mapState: mapStateByLoadingStore } = createNamespacedHelpers('loadingStore')

  export default {
    name: 'TestComponent',
    components: { LeftComponent, RightComponent },
    computed: {
      ...mapState(['leftData', 'rightData']),
      ...mapStateByLoadingStore({
        loadingByLeft({ actions }) {
          return actions['testStore/getLeftData']
        },
        loadingByRight({ actions }) {
          return actions['testStore/getRightData']
        },
      }),
    },
    methods: {
      ...mapActions(['getLeftData', 'getRightData']),
    },
    mounted() {
      this.getLeftData()

      this.getRightData()
    },
  }
</script>
```

### src/view/Test/store.js

```js
const state = {
  leftData: [],
  rightData: [],
}

const mutations = {
  setState(state, payload) {
    Object.assign(state, payload)
  },
}

const actions = {
  async getLeftData({ commit }) {
    const res = await get('Corresponding request path')

    commit('setState', { leftData: res.data })

    return res
  },
  async getRightData({ commit }) {
    const res = await get('Corresponding request path')

    commit('setState', { rightData: res.data })

    return res
  },
}

export const testStore = {
  namespaced: true, // Always remember to open the namespace
  state,
  actions,
  mutations,
}
```

### src/store/index.js

```js
...
...
import { testStore } from '@/pages/Test/store'

new Vuex.Store({
  ...
  modules: {
    testStore, // The naming here will be the namespace prefix corresponding to loading
  },
})
```

## 示例 2（Display loading corresponding to the entire module）

### src/view/Test/index.vue

```html
<template>
  <div v-loading="loading">
    <LeftComponent :data="leftData" />
    <RightComponent :data="rightData" />
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'

  import LeftComponent from '@/components/LeftComponent'
  import RightComponent from '@/components/RightComponent'

  const { mapState, mapActions } = createNamespacedHelpers('testStore')

  const { mapState: mapStateByLoadingStore } = createNamespacedHelpers('loadingStore')

  export default {
    name: 'TestComponent',
    components: { LeftComponent, RightComponent },
    computed: {
      ...mapState(['leftData', 'rightData']),
      ...mapStateByLoadingStore({
        loading({ modules }) {
          return modules['testStore']
        },
      }),
    },
    methods: {
      ...mapActions(['getLeftData', 'getRightData']),
    },
    mounted() {
      this.getLeftData()

      this.getRightData()
    },
  }
</script>
```

### src/view/Test/store.js

```js
const state = {
  leftData: [],
  rightData: [],
}

const mutations = {
  setState(state, payload) {
    Object.assign(state, payload)
  },
}

const actions = {
  async getLeftData({ commit }) {
    const res = await get('Corresponding request path')

    commit('setState', { leftData: res.data })

    return res
  },
  async getRightData({ commit }) {
    const res = await get('Corresponding request path')

    commit('setState', { rightData: res.data })

    return res
  },
}

export const testStore = {
  namespaced: true, // Always remember to open the namespace
  state,
  actions,
  mutations,
}
```

### src/store/index.js

```js
...
...
import { testStore } from '@/pages/Test/store'

new Vuex.Store({
  ...
  modules: {
    testStore, // The naming here will be the namespace prefix corresponding to loading
  },
})
```

## 示例 3（Display loading according to the action of the entire store）

### src/view/Test/index.vue

```html
<template>
  <div v-loading="loading">
    <LeftComponent :data="leftData" />
    <RightComponent :data="rightData" />
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'

  import LeftComponent from '@/components/LeftComponent'
  import RightComponent from '@/components/RightComponent'

  const { mapState, mapActions } = createNamespacedHelpers('testStore')

  const { mapState: mapStateByLoadingStore } = createNamespacedHelpers('loadingStore')

  export default {
    name: 'TestComponent',
    components: { LeftComponent, RightComponent },
    computed: {
      ...mapState(['leftData', 'rightData']),
      ...mapStateByLoadingStore({
        loading({ global }) {
          return global
        },
      }),
    },
    methods: {
      ...mapActions(['getLeftData', 'getRightData']),
    },
    mounted() {
      this.getLeftData()

      this.getRightData()
    },
  }
</script>
```

### src/view/Test/store.js

```js
const state = {
  leftData: [],
  rightData: [],
}

const mutations = {
  setState(state, payload) {
    Object.assign(state, payload)
  },
}

const actions = {
  async getLeftData({ commit }) {
    const res = await get('Corresponding request path')

    commit('setState', { leftData: res.data })

    return res
  },
  async getRightData({ commit }) {
    const res = await get('Corresponding request path')

    commit('setState', { rightData: res.data })

    return res
  },
}

export const testStore = {
  namespaced: true, // Always remember to open the namespace
  state,
  actions,
  mutations,
}
```

### src/store/index.js

```js
...
...
import { testStore } from '@/pages/Test/store'

new Vuex.Store({
  ...
  modules: {
    testStore, // The naming here will be the namespace prefix corresponding to loading
  },
})
```

## License

[MIT](https://tldrlegal.com/license/mit-license)
