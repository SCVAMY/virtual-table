import { defineComponent, PropType } from "vue";
import { ColumnPropTypes } from "../../types/all";
import { TextAlign } from "../../enums";

export const CellProps = {
  align: {
    type: String as PropType<ColumnPropTypes.Align>,
    default() {
      return TextAlign.Left;
    }
  }
};

export default defineComponent({
  name: "TableCell",

  props: CellProps,

  setup({ align }, { slots }) {
    return () => (
      <div class='virtual-table__cell' style={`text-align: ${align}`}>
        <span>{slots.default && slots.default()}</span>
      </div>
    );
  }
});
