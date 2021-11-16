import { defineComponent, PropType, reactive } from "vue";
import { ColumnPropTypes } from "../types/all";

export const columnProps = {
  field: String as PropType<ColumnPropTypes.Field>,
  title: String as PropType<ColumnPropTypes.Title>,
  width: [Number, String] as PropType<ColumnPropTypes.Width>,
  minWidth: [Number, String] as PropType<ColumnPropTypes.MinWidth>
};

export default defineComponent({
  props: columnProps,

  setup(props) {}
});
