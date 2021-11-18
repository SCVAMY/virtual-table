import { defineComponent, toRefs, ref } from 'vue'
import Colgroup, { ColumnsProps } from '../colgroup/Colgroup'
import Cell from '../cell/Cell'
import { ColumnProps } from '../../types/all'

export const HeaderProps = {
  ...ColumnsProps
}

export const header = (columns: ColumnProps[]) => {
  return (
    <thead>
      <tr>
        {columns.map((i) => {
          const { align } = i
          return (
            <th class="virtual-table__header__coloumn">
              <Cell {...{ align }}>{i.title}</Cell>
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
    const Header = header(this.columns)
    return (
      <table class="virtual-table__header" style="table-layout: fixed;">
        <Colgroup columns={this.columns} />
        {Header}
      </table>
    )
  }
})
