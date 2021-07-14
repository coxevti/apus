import { useMemo } from 'react'
import { useState } from 'react'

const useSortableData = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: any,
    config: { key: string; direction: string }
) => {
    const [sortConfig, setSortConfig] = useState(config)
    const sortedItems = useMemo(() => {
        const sortebleItems = [...items]
        if (sortConfig !== null) {
            sortebleItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1
                }
                return 0
            })
        }
        return sortebleItems
    }, [items, sortConfig])

    const requestSort = (key: string) => {
        let direction = 'ascending'
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending'
        }
        setSortConfig({ key, direction })
    }
    return { items: sortedItems, requestSort, sortConfig }
}

export { useSortableData }
