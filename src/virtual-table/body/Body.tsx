import { defineComponent, toRefs, ref, watchEffect, readonly, watch } from 'vue'
import Colgroup from '../colgroup/Colgroup.tsx'
import tableProps from '../props'
import Row from '../row/Row'
import { handleScroll, getScollPool } from '../scroll'
import { insertArray, sliceArray } from '@/utils'
import { flattenData } from '../expand'

export default defineComponent({
  name: 'TableBody',

  props: tableProps,

  setup(props) {
    const { data, columnHeight } = toRefs(props)

    const paddingTop = ref(0)
    const pool = ref<any[]>([])
    const root = ref<HTMLElement | undefined>(undefined)
    const scrollHeight = ref(0)
    const tableData = ref<any>(flattenData(data.value))

    watch(data, (newVal) => {
      tableData.value = flattenData(newVal)
    })

    watchEffect(() => {
      scrollHeight.value = (tableData.value || []).length * columnHeight.value
    })

    const onScroll = () => {
      handleScroll({ root: root.value, columnHeight: columnHeight.value, data: tableData.value }, (result: any) => {
        pool.value = (result || {}).pool || []
        paddingTop.value = (result || {}).paddingTop || 0
      })
    }

    watchEffect(() => {
      pool.value = getScollPool({ root: root.value, columnHeight: columnHeight.value, data: tableData.value }) || []
    })

    const handleTreeNodeClick = ({ row, index, expand }: any) => {
      if (expand) {
        tableData.value = insertArray(tableData.value, index, row.children)
      } else {
        tableData.value = sliceArray(tableData.value, index, row.children.length)
      }
      tableData.value[index].expand = expand
    }

    return { paddingTop, scrollHeight, pool, root, onScroll, handleTreeNodeClick }
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
                return (
                  <Row
                    data={item}
                    columns={this.columns}
                    key={rowId}
                    style={`height: ${this.columnHeight}px`}
                    {...{ rowId }}
                    onTreeNodeClick={(params) => this.handleTreeNodeClick({ ...params, index })}
                  />
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
})
