# vuex-plugin-loading

通过 vuex action 自动设置 loading state. 免去每次请求时都需要手动修改 loading state 的麻烦. 灵感来源于 dva-loading.

[**English Document**](./README_EN.md)

---

## 安装

```bash
$ npm install vuex-plugin-loading or yarn add vuex-plugin-loading
```

## 使用

```js
import createVuexLoadingPlugin from "vuex-plugin-loading";

new Vuex.Store({
  ...
  plugins: [createVuexLoadingPlugin()]
});
```

随后你就可以通过 store 使用对应的 loading state

## 配置参数

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

## 示例 1（根据每一个 action 显示对应的 loading）

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
    const res = await get('对应的请求路径')

    commit('setState', { leftData: res.data })

    return res
  },
  async getRightData({ commit }) {
    const res = await get('对应的请求路径')

    commit('setState', { rightData: res.data })

    return res
  },
}

export const testStore = {
  namespaced: true, // 一定记得开启命名空间
  state,
  actions,
  mutations,
  getters,
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
    testStore, // 这里的命名将作为对应 loading 的命名空间前缀
  },
})
```

## 示例 2（显示对应整个模块的 loading）

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
    const res = await get('对应的请求路径')

    commit('setState', { leftData: res.data })

    return res
  },
  async getRightData({ commit }) {
    const res = await get('对应的请求路径')

    commit('setState', { rightData: res.data })

    return res
  },
}

export const testStore = {
  namespaced: true, // 一定记得开启命名空间
  state,
  actions,
  mutations,
  getters,
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
    testStore, // 这里的命名将作为对应 loading 的命名空间前缀
  },
})
```

## 示例 3（根据整个 store 的 action 显示 loading）

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
    const res = await get('对应的请求路径')

    commit('setState', { leftData: res.data })

    return res
  },
  async getRightData({ commit }) {
    const res = await get('对应的请求路径')

    commit('setState', { rightData: res.data })

    return res
  },
}

export const testStore = {
  namespaced: true, // 一定记得开启命名空间
  state,
  actions,
  mutations,
  getters,
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
    testStore, // 这里的命名将作为对应 loading 的命名空间前缀
  },
})
```

## License

[MIT](https://tldrlegal.com/license/mit-license)
