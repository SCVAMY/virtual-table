import { defineComponent, PropType } from 'vue'
import { ColumnPropTypes } from '../../types/all'
import { TextAlign } from '../../enums'

export const CellProps = {
  align: {
    type: String as PropType<ColumnPropTypes.Align>,
    default() {
      return TextAlign.Left
    }
  }
}

export default defineComponent({
  name: 'TableCell',

  props: CellProps,

  render() {
    return (
      <div class="virtual-table__cell" style={`text-align: ${this.align}`}>
        {this.$slots.default && this.$slots.default()}
      </div>
    )
  }
})
