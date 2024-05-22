import './assets/css/main.scss'

import InfoAlert from '@/components/UI/Alerts/InfoAlert.vue'
import WarningAlert from '@/components/UI/Alerts/WarningAlert.vue'
import DangerAlert from '@/components/UI/Alerts/DangerAlert.vue'
import SuccessAlert from '@/components/UI/Alerts/SuccessAlert.vue'
import Loader from '@/components/UI/Loader/Loader.vue'
import _calendar from '@/components/UI/icons/_calendar.vue'
import _userAdd from '@/components/UI/icons/_userAdd.vue'
import _report from '@/components/UI/icons/_report.vue'
import _setting from '@/components/UI/icons/_setting.vue'
import _onOff from '@/components/UI/icons/_onOff.vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('InfoAlert', InfoAlert)
app.component('WarningAlert', WarningAlert)
app.component('DangerAlert', DangerAlert)
app.component('SuccessAlert', SuccessAlert)
app.component('Loader', Loader)
app.component('ico_calendar', _calendar)
app.component('ico_user_add', _userAdd)
app.component('ico_report', _report)
app.component('ico_setting', _setting)
app.component('ico_on_off', _onOff)
app.mount('#app')
