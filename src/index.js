const NAMESPACE = 'loadingStore'
const ROOT_NAMESPACE = 'rootStore'

function analysisAction({ type }, rootNamespace) {
  const index = type.lastIndexOf('/')

  if (index === -1) {
    return {
      actionType: `${rootNamespace}/${type}`,
      namespace: rootNamespace,
    }
  }

  return {
    actionType: type,
    namespace: type.slice(0, index),
  }
}

function createVuexLoadingPlugin({ namespace = NAMESPACE, rootNamespace = ROOT_NAMESPACE } = {}) {
  return store => {
    store.registerModule(namespace, {
      namespaced: true,
      state: {
        global: false,
        modules: {},
        actions: {},
      },
      mutations: {
        show(state, { namespace, actionType }) {
          Object.assign(state, {
            global: true,
            modules: { ...state.modules, [namespace]: true },
            actions: { ...state.actions, [actionType]: true },
          })
        },
        hide(state, { namespace, actionType }) {
          const actions = {
            ...state.actions,
            [actionType]: false,
          }

          const modules = {
            ...state.modules,
            [namespace]: Object.entries(actions).some(([actionType, value]) => {
              const index = actionType.lastIndexOf('/')

              if (namespace !== actionType.slice(0, index)) {
                return false
              }

              return value
            }),
          }

          const global = Object.values(modules).some(value => value)

          Object.assign(state, {
            global,
            modules,
            actions,
          })
        },
      },
    })

    store.subscribeAction({
      before(action) {
        store.commit(`${namespace}/show`, analysisAction(action, rootNamespace))
      },
      after(action) {
        store.commit(`${namespace}/hide`, analysisAction(action, rootNamespace))
      },
    })
  }
}

export default createVuexLoadingPlugin
