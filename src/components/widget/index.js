/**
 * Created by leicj on 2018/12/24.
 */
import CancerSearch from '@/components/widget/CancerSearch'
import CancerWidget from '@/components/widget/CancerWidget'
import CancerUserWidget from '@/components/widget/CancerUserWidget'
const components = [
  CancerSearch,
  CancerWidget,
  CancerUserWidget
]

export default {
  install (Vue) {
    components.map(component => {
      Vue.component(component.name, component)
    })
  }
}