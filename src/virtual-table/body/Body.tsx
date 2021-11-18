import { defineComponent, toRefs, ref, watchEffect } from 'vue'
import Colgroup from '../colgroup/Colgroup.tsx'
import tableProps from '../props'
import Row from '../row/Row'
import { handleScroll, getScollPool } from '../scroll'

export default defineComponent({
  name: 'TableBody',

  props: tableProps,

  setup(props) {
    const { data, columnHeight } = toRefs(props)

    const paddingTop = ref(0)
    const pool = ref<any[]>([])
    const root = ref<HTMLElement | undefined>(undefined)
    const scrollHeight = ref(0)

    watchEffect(() => {
      scrollHeight.value = (data.value || []).length * columnHeight.value
    })

    const onScroll = () => {
      handleScroll({ root: root.value, columnHeight: columnHeight.value, data: data.value }, (result: any) => {
        pool.value = (result || {}).pool || []
        paddingTop.value = (result || {}).paddingTop || 0
      })
    }

    watchEffect(() => {
      pool.value = getScollPool({ root: root.value, columnHeight: columnHeight.value, data: data.value }) || []
    })

    return { paddingTop, scrollHeight, pool, root, onScroll }
  },

  render() {
    return (
      <div class="virtual-table__body" onScroll={this.onScroll} ref="root">
        <div class="virtual-table__scroll" style={`will-change: transform; transform: translateY(${this.paddingTop}px);`}>
          <table style="table-layout: fixed;">
            <Colgroup columns={this.columns} />
            <tbody>
              {this.pool.map((item, index) => {
                const rowId = this.dataKey ? item[this.dataKey] : index
                return <Row data={item} columns={this.columns} key={rowId} style={`height: ${this.columnHeight}px`} {...{ rowId }} />
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
})
