import { toRefs, defineComponent, PropType } from "vue";
import { ColumnPropTypes } from "../../types/all";
import { isNumber } from "../../utils/type";

export const ColumnsProps = {
  columns: {
    type: Array as PropType<ColumnPropTypes.Columns>,
    default() {
      return [];
    }
  }
};

const getWidth = (width: number | string | undefined) => {
  return isNumber(width) || isNumber(+(width || "")) ? width + "px" : width;
};

export default defineComponent({
  props: ColumnsProps,

  setup(props) {
    const { columns } = toRefs(props);

    return () => (
      <colgroup>
        {columns.value.map((item, index) => {
          const { width, minWidth } = item;
          const key = `col_${index}`;

          return <col key={key} id={key} style={{ width: getWidth(width), minWidth: getWidth(minWidth) }}></col>;
        })}
      </colgroup>
    );
  }
});
