import { defineComponent, toRefs } from "vue";
import Colgroup, { ColumnsProps } from "../colgroup/Colgroup";
import Cell from "../cell/Cell";
import { ColumnProps } from "../../types/all";

export const HeaderProps = {
  ...ColumnsProps
};

export const header = (columns: ColumnProps[]) => {
  return (
    <thead>
      <tr>
        {columns.map(i => {
          return (
            <th class='virtual-table__header__coloumn'>
              <Cell>{i.title}</Cell>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default defineComponent({
  props: HeaderProps,

  setup(props) {
    const { columns } = toRefs(props);
    const Header = header(columns.value);

    return () => (
      <table class='virtual-table__header'>
        <Colgroup columns={columns.value} />
        {Header}
      </table>
    );
  }
});
