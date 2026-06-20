import {computed, reactive} from 'vue'
import {merge} from 'lodash'
import settingsApp from 'APP_CFG/settings.js'
import settingsShr from 'SHR_CFG/settings.js'
import {useHttp} from 'SHR_PLG/http/index.js'
import {useI18n} from 'SHR_PLG/i18n/index.js'
import {useSettingsStore} from 'SHR_STR/core/useSettingsStore.js'

export const useSettings = function() {
    const http = useHttp()
    const i18n = useI18n().global
    const settings = useSettingsStore()

    async function load() {
        const res = await http.request({url: 'properties'})
        settings.setData(merge(res.data.data, settingsShr, settingsApp))
    }

    return {
        load,
        state: reactive({
            defaults: computed(() => settings.state.data.defaults),
            isAutoLogin: computed(() => !!settings.state.data.meta.auto_login),
            isBillingEnabled: computed(() => settings.state.data.meta.billing !== 'disabled'),
            isBillingRequired: computed(() => settings.state.data.meta.billing == 'required'),
            isLoaded: computed(() => settings.state.isLoaded),
            isLoginAvailable: computed(() => {
                 return !!(
                    !settings.state.data.meta.user_verification.enabled ||
                    settings.state.data.meta.user_verification.grace_period
                )
            }),
            isSubscriptionsEnabled: computed(() => settings.state.data.meta.subscriptions !== 'disabled'),
            isSubscriptionsRequired: computed(() => settings.state.data.meta.subscriptions === 'required'),
            isTrialEnabled: computed(() => !!settings.state.data.meta.trial.enabled),
            isVerificationEnabled: computed(() =>  !!settings.state.data.meta.user_verification.enabled),
            trialDays: computed(() => settings.state.data.meta.trial.days),
            options: {
                userRoles: computed(() => settings.state.data.filters.user.role.map((role) => { return {label: i18n.t('site.filter.user.role.' + role), value: role}} ))
            }
        })
    }
}