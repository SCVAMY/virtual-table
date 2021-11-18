import { PropType } from 'vue'
import { ColumnPropTypes } from '../types/all'

export default {
  columns: Array as PropType<ColumnPropTypes.Columns>,
  data: {
    type: Array as PropType<any[]>,
    default() {
      return []
    }
  },
  columnHeight: { type: Number as PropType<number>, default: 40 },
  dataKey: String as PropType<string>,
  height: { type: String as PropType<string>, default: '' },
  border: { type: Boolean as PropType<boolean>, default: false }
}
