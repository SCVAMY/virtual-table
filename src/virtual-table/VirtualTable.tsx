import { defineComponent, reactive } from "vue";
import tableProps from "./props";
import Header from "./row/HeaderRow";
import "../style/main.scss";
import Body from "./body/Body.tsx";
import { isNumber } from "../utils";

export default defineComponent({
  name: "VirtualTable",
  props: tableProps,

  setup({ columns, data, height, border, ...props }) {
    const reactiveData = reactive({ columns, data, height, border });
    const tableHeight = height ? (isNumber(height) ? `height: ${height}px` : `height: ${height}`) : "";

    return () => (
      <div class={["virtual-table", border && "virtual-table--border"]} style={tableHeight}>
        <Header columns={reactiveData.columns} />
        <Body {...{ columns, data, ...props }} />
      </div>
    );
  }
});
