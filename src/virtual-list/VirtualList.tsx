import { ref, toRefs, defineComponent, useSlots, watch, onMounted } from "vue";
import "@/style/virtual-list.scss";

export default defineComponent({
  name: "VirtualList",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    dataKey: {
      type: String,
      default: () => "id"
    },
    itemSize: {
      type: Number,
      default: () => 40
    },
    poolBuffer: {
      type: Number,
      default: () => 50
    }
  },
  setup(props) {
    const { data, poolBuffer, itemSize, dataKey } = toRefs(props);

    const scrollHeight = ref(data.value.length * itemSize.value);
    const paddingTop = ref(0);
    const pool = ref<any[]>([]);
    const root = ref<HTMLElement | null>(null);

    watch(data, newVal => {
      scrollHeight.value = newVal.length * itemSize.value;
    });

    watch(itemSize, newVal => {
      scrollHeight.value = data.value.length * newVal;
    });

    let containerSize = 0;
    let isScrollBusy = false;

    const handleScroll = () => {
      if (!root.value) return;
      if (isScrollBusy) return;
      isScrollBusy = true;

      requestAnimationFrame(() => {
        isScrollBusy = false;

        if (!root.value) return;

        const range: number[] = [];
        range[0] = Math.floor(root.value.scrollTop / itemSize.value) - Math.floor(poolBuffer.value / 2);
        range[0] = Math.max(range[0], 0);
        range[1] = range[0] + Math.floor(root.value.clientHeight / itemSize.value) + poolBuffer.value;
        range[1] = Math.min(range[1], data.value.length);

        pool.value = data.value.slice(range[0], range[1]).map((v: any, i) => ({ ...v, _index: range[0] + i }));

        paddingTop.value = range[0] * itemSize.value;
      });
    };

    onMounted(() => {
      if (!root.value) return;

      containerSize = root.value.clientHeight;
      const contentLines = Math.ceil(containerSize / itemSize.value);
      const totalLines = contentLines + poolBuffer.value;
      const range = [0, totalLines];

      pool.value = data.value.slice(range[0], range[0] + range[1]).map((v: any, i) => ({ ...v, _index: range[0] + i }));
    });

    debugger;
    return { dataKey, pool, scrollHeight, handleScroll, paddingTop, root };
  },

  render() {
    const slots = useSlots();

    return (
      <div class='virtual-list' ref='root' onScroll={this.handleScroll}>
        <div class='virtual-list__scroll' style={`height: ${this.scrollHeight}px;padding-top: ${this.paddingTop}px`}>
          {this.pool.map((item, index) => (
            <div class='virtual-list__item' key={item[this.dataKey]} style={`height: ${this.itemSize}px`}>
              {slots.default && slots.default({ item, index })}
            </div>
          ))}
        </div>
      </div>
    );
  }
});
