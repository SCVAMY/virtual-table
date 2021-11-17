export namespace ColumnPropTypes {
  export type Field = string;
  export type Title = string;
  export type Width = number | string;
  export type MinWidth = number | string;
  export type Align = "left" | "center" | "right" | null;
  export type Render = (data: any) => any;

  export type Columns = ColumnProps[];
}

export type ColumnProps = {
  /**
   * 列字段名
   */
  field?: ColumnPropTypes.Field;
  /**
   * 列标题
   */
  title?: ColumnPropTypes.Title;
  /**
   * 列宽度
   */
  width?: ColumnPropTypes.Width;
  /**
   * 列最小宽度，把剩余宽度按比例分配
   */
  minWidth?: ColumnPropTypes.MinWidth;
  /**
   * 列对其方式
   */
  align?: ColumnPropTypes.Align;
  /**
   * 列对其方式
   */
  render?: ColumnPropTypes.Render;
};
