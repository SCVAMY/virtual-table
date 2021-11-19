import { defineComponent, toRefs, PropType } from 'vue'
import { ColumnsProps } from '../colgroup/Colgroup'
import Cell from '../cell/Cell'
import { ColumnPropTypes } from '@/types/all'
import NodeIcon from '@/components/NodeIcon.tsx'

export const RowProps = {
  ...ColumnsProps,
  data: Object as PropType<any>
}

const getCloumns = (data: any, columns?: ColumnPropTypes.Columns, emit?: any) => {
  return (columns || []).map((column, index) => {
    const { align, render } = column

    const cellRender = (render && render({ row: data, column })) || (column.field ? data[column.field] : '')

    const { children, expand, _depth } = data

    const paddingLeft = `${+_depth * 20}px`
    const showChildren = children && children.length > 0

    return (
      <td>
        <Cell {...{ align }}>
          {index === 0 ? (
            <div class="virtual-table__tree-node" style={`padding-left: ${paddingLeft}`}>
              {showChildren && (
                <NodeIcon
                  class={expand ? 'rotate90' : ''}
                  onClick={() => {
                    emit('treeNodeClick', { row: data, expand: !expand })
                  }}
                />
              )}
              {cellRender}
            </div>
          ) : (
            cellRender
          )}
        </Cell>
      </td>
    )
  })
}

export default defineComponent({
  name: 'TableRow',

  props: RowProps,

  emits: ['treeNodeClick', 'rowClick'],

  setup(props, { emit }) {
    const { columns, data } = toRefs(props)

    const handleRowClick = () => {
      emit('rowClick', { row: data, columns })
    }

    return () => (
      <tr class="virtual-table__row" onClick={handleRowClick}>
        {getCloumns(data.value, columns.value, emit)}
      </tr>
    )
  }
})
