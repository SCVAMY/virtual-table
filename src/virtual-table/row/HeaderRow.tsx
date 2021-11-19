import { defineComponent, PropType } from 'vue'
import Colgroup, { ColumnsProps } from '../colgroup/Colgroup'
import Cell from '../cell/Cell'
import { ColumnProps, ColumnPropTypes } from '../../types/all'
import { generateColumns } from '../utils/column'

export const HeaderProps = {
  ...ColumnsProps,
  headerColumns: Array as PropType<ColumnPropTypes.Columns>,
  headerSlot: Function as PropType<() => any>
}

export const header = (columns: ColumnProps[]) => {
  return (
    <thead>
      <tr>
        {columns.map((i) => {
          const { align, render } = i
          const cellRender = (render && render()) || i.title
          return (
            <th class="virtual-table__header__coloumn">
              <Cell {...{ align }}>{cellRender}</Cell>
            </th>
          )
        })}
      </tr>
    </thead>
  )
}

export default defineComponent({
  name: 'TableHeader',

  props: HeaderProps,

  render() {
    const columns = this.getHeaderColumns()

    const Header = header(columns)
    return (
      <table class="virtual-table__header" style="table-layout: fixed;">
        <Colgroup columns={columns} />
        {Header}
      </table>
    )
  },

  methods: {
    getHeaderColumns() {
      if (this.headerColumns) {
        return this.headerColumns
      }

      if (this.headerSlot) {
        return generateColumns(this.headerSlot())
      }

      return this.columns
    }
  }
})
