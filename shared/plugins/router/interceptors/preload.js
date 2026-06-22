import {useAuth} from 'SHR_CMP/core/useAuth.js'
import {useSettings} from 'SHR_CMP/core/useSettings.js'

/**
 * The preloads here affect other router intercepts so they
 * must be loaded first. The setup here is to avoid loading
 * them asynchronously to get them all in as fast as possible.
 */
export function beforeEach(to, from, next) {
    const auth = useAuth()
    const settings = useSettings()

    if (
        auth.state.isReady &&
        settings.state.isLoaded
    ) {
        next()
    }
    else {
        let interval = null

        if (!auth.state.isReady) {
            auth.checkReady()
        }

        if (!settings.state.isLoaded) {
            settings.load()
        }

        interval = setInterval(() => {
            if (
                auth.state.isReady &&
                settings.state.isLoaded
            ) {
                clearInterval(interval)
                next()
            }
        }, 50)
    }
}