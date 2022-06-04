import NProgress from 'nprogress'

export default defineNuxtPlugin(async () => {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    if (!registrations.length) {
      console.log('No serviceWorker registrations found.')
      return
    }
    for (const registration of registrations) {
      registration.unregister().then((boolean) => {
        console.log(
          (boolean ? 'Successfully unregistered' : 'Failed to unregister'), `ServiceWorkerRegistration\n${
          registration.installing ? `  .installing.scriptURL = ${registration.installing.scriptURL}\n` : ''
          }${registration.waiting ? `  .waiting.scriptURL = ${registration.waiting.scriptURL}\n` : ''
          }${registration.active ? `  .active.scriptURL = ${registration.active.scriptURL}\n` : ''
          }  .scope: ${registration.scope}\n`,
        )
      })
    }
  })

  NProgress.configure({
    showSpinner: false,
    easing: 'ease',
    speed: 500,
  })
  const router = useRouter()
  router.beforeEach((to, from, next) => {
    if (!to.hash && to.fullPath !== from.fullPath)
      NProgress.start()

    next()
  })
  return {
    provide: {
      NProgress,
    },
  }
})
