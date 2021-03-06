import 'font-awesome/css/font-awesome.css'
import * as Bluebird from 'bluebird'
import 'whatwg-fetch'
import config from './config/app.config'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'

Bluebird.config({ warnings: false })

LogManager.setLevel(window.location.hostname.match(`localhost`)
  ? LogManager.logLevel.debug
  : LogManager.logLevel.error)

export async function configure(aurelia) {
  // Config
  aurelia.use
    .standardConfiguration()
    // See documentation on organizing global resources and app features
    // http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/app-configuration-and-startup/6
    .feature(`app/components/containers`)
    .feature(`app/components/core`)
    .feature(`app/components/resources`)
    .feature(`app/converters`)
    // Aurelia-API Endpoint configuration
    // https://aurelia-api.spoonx.org/
    .plugin(`aurelia-api`, config.api)

  await aurelia.start()
  aurelia.setRoot(`app`)

  OfflinePluginRuntime.install()
}
