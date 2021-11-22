export const flattenData = (data: any, depth = 0, parent = null) => {
  return data.reduce((result: any[], item: any) => {
    const hasChildren = item.children && item.children.length > 0

    if (hasChildren) {
      item.children = flattenData(item.children, depth + 1, { ...item, children: null })
    }

    result.push({ ...item, _depth: depth, _parent: parent })

    return result
  }, [])
}
