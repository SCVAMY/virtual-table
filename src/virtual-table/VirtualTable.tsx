import { defineComponent, ref, toRefs, watchEffect } from 'vue'
import tableProps from './utils/props'
import Header from './row/HeaderRow'
import '@/style/virtual-table.scss'
import Body from './body/Body.tsx'
import { isNumber } from '@/utils'
import { generateColumns } from './utils/column'
import { ColumnPropTypes } from '@/types/all'

export default defineComponent({
  name: 'VirtualTable',
  props: tableProps,

  setup(props, { slots }) {
    const { columns, height } = toRefs(props)
    const tableHeight = ref<string>('')
    const tableColumns = ref<ColumnPropTypes.Columns>([])

    watchEffect(() => {
      tableHeight.value = height.value
        ? isNumber(height.value)
          ? `height: ${height.value}px`
          : `height: ${height.value}`
        : ''
    })

    watchEffect(() => {
      tableColumns.value = columns.value || generateColumns(slots.default && slots.default())
    })

    return { tableColumns, tableHeight }
  },

  render() {
    return (
      <div
        class={['virtual-table', this.border && 'virtual-table--border']}
        style={this.tableHeight}
      >
        <Header columns={this.tableColumns} />
        <Body {...{ ...this.$props, columns: this.tableColumns }} />
      </div>
    )
  }
})
