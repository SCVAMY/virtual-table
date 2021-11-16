import { defineComponent, reactive } from "vue";
import tableProps from "./props";
import Header from "./row/HeaderRow";
import "../style/main.scss";
import Body from "./body/Body.tsx";

export default defineComponent({
  name: "VirtualTable",
  props: tableProps,

  setup({ columns, data, ...props }) {
    const reactiveData = reactive({ columns, data });
    return () => (
      <div class='virtual-table'>
        <Header columns={reactiveData.columns} />
        <Body {...{ columns, data, ...props }} />
      </div>
    );
  }
});
