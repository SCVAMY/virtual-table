import { toRefs, defineComponent, PropType, ref } from 'vue'
import { ColumnPropTypes } from '../../../types/all'
import { isNumber } from '../../../utils/type'

export const ColumnsProps = {
  columns: {
    type: Array as PropType<ColumnPropTypes.Columns>,
    default() {
      return []
    }
  }
}

const calcColWidth = (columns: ColumnPropTypes.Columns) => {
  const colWidth = columns.reduce((result: number, i) => {
    const { width } = i
    width && (result += +width)
    return result
  }, 0)

  const calcWidthLength = columns.length - columns.filter((i) => i.width).length

  return `calc(${100 / calcWidthLength}% - ${colWidth}px)`
}

export default defineComponent({
  name: 'TableColgroup',

  props: ColumnsProps,

  setup(props) {
    const { columns } = toRefs(props)
    const colWidth = ref<string>('')

    colWidth.value = calcColWidth(columns.value)

    const getWidth = (width: number | string | undefined) => {
      if (!width) {
        return colWidth.value
      }

      return isNumber(width) || isNumber(+(width || '')) ? width + 'px' : width
    }

    return () => (
      <colgroup>
        {columns.value.map((item, index) => {
          const { width, minWidth, field } = item
          const key = `col_${index}`

          return <col key={key} style={{ width: getWidth(width), minWidth: getWidth(minWidth) }} {...{ 'data-prop': field }}></col>
        })}
      </colgroup>
    )
  }
})
