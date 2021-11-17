import { defineComponent, toRefs, onMounted, ref, watch } from "vue";
import Colgroup from "../colgroup/Colgroup.tsx";
import tableProps from "../props";
import Row from "../row/Row";
import { handleScroll, getScollPool } from "../scroll";

export default defineComponent({
  props: tableProps,

  setup(props) {
    const { data, columnHeight } = toRefs(props);

    const scrollHeight = ref((data.value || []).length * columnHeight.value);
    const paddingTop = ref(0);
    const pool = ref<any[]>([]);
    const root = ref<HTMLElement | undefined>(undefined);

    watch(data, newVal => {
      scrollHeight.value = newVal.length * columnHeight.value;
    });

    watch(columnHeight, newVal => {
      scrollHeight.value = data.value.length * newVal;
    });

    const onScroll = () => {
      handleScroll({ root: root.value, columnHeight: columnHeight.value, data: data.value }, (options: any) => {
        pool.value = (options || {}).pool || [];
        paddingTop.value = (options || {}).paddingTop || 0;
      });
    };

    onMounted(() => {
      pool.value = getScollPool({ root: root.value, columnHeight: columnHeight.value, data: data.value }) || [];
    });

    return { paddingTop, scrollHeight, pool, root, onScroll, columnHeight };
  },

  render() {
    return (
      <div class='virtual-table__body' onScroll={this.onScroll} ref='root'>
        <div class='virtual-table__scroll' style={`will-change: transform; transform: translateY(${this.paddingTop}px);`}>
          <table style='table-layout: fixed;'>
            <Colgroup columns={this.columns} />
            <tbody>
              {this.pool.map((item, index) => {
                const rowId = this.dataKey ? item[this.dataKey] : index;
                return <Row data={item} columns={this.columns} key={rowId} style={`height: ${this.columnHeight}px`} {...{ rowId }} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});
