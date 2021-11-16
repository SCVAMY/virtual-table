import { defineComponent, toRefs, PropType } from "vue";
import { ColumnsProps } from "../colgroup/Colgroup";
import Cell from "../cell/Cell";
import { ColumnPropTypes } from "../../types/all";

export const RowProps = {
  ...ColumnsProps,
  data: Object as PropType<any>
};

const getCloumns = (data: any, columns?: ColumnPropTypes.Columns) => {
  return (columns || []).map(column => {
    return (
      <td>
        <Cell>{column.field ? data[column.field] : ""}</Cell>
      </td>
    );
  });
};

export default defineComponent({
  props: RowProps,

  setup(props) {
    const { columns, data } = toRefs(props);

    return () => <tr class='virtual-table__row'>{getCloumns(data.value, columns.value)}</tr>;
  }
});
