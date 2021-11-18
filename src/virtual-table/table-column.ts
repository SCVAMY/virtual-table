import { ColumnPropTypes } from '../types/all'

export const generateColumns = (columns: any = []): ColumnPropTypes.Columns => {
  const columnProps = columns.reduce((result: ColumnPropTypes.Columns, i: any) => {
    const { props, children } = i
    const render = children && children.default

    result.push({ ...props, render })

    return result
  }, [])

  return columnProps
}
