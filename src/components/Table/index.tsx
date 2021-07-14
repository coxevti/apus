import React from 'react'

import { Wrapper } from 'components/Table/styles'

function objectValues<T extends {}>(obj: T) {
    return Object.keys(obj).map((objKey) => obj[objKey as keyof T])
}

type PrimitiveType = string | symbol | number | boolean

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isPrimitive(value: any): value is PrimitiveType {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'symbol'
    )
}

function objectKeys<T extends {}>(obj: T) {
    return Object.keys(obj).map((objKey) => objKey as keyof T)
}

interface MinTableItem {
    id: PrimitiveType
}

type TableHeaders = {
    id: string
}

type CustomRenderers<T extends MinTableItem> = Partial<
    Record<keyof T, (it: T) => React.ReactNode>
>

interface TableProps<T extends MinTableItem> {
    items: T[]
    headers: TableHeaders
    headersHide?: string[]
    customRenderers?: CustomRenderers<T>
}

export default function Table<T extends MinTableItem>({
    items,
    headers,
    headersHide = ['id'],
    customRenderers
}: TableProps<T>): JSX.Element {
    function renderRow(item: T): JSX.Element {
        return (
            <tr key={Math.random()}>
                {objectKeys(item).map((itemProperty, index) => {
                    const tess = itemProperty as string
                    if (headersHide?.includes(tess)) return
                    const customRenderer = customRenderers?.[itemProperty]
                    if (customRenderer) {
                        return <td key={index}>{customRenderer(item)}</td>
                    }

                    return (
                        <td key={index}>
                            {isPrimitive(item[itemProperty])
                                ? item[itemProperty]
                                : ''}
                        </td>
                    )
                })}
            </tr>
        )
    }
    return (
        <Wrapper>
            <thead>
                <tr>
                    {objectValues(headers).map((headerValue) => {
                        if (headersHide?.includes(headerValue.toLowerCase()))
                            return null
                        return <th key={headerValue}>{headerValue}</th>
                    })}
                </tr>
            </thead>
            <tbody>{items.map(renderRow)}</tbody>
        </Wrapper>
    )
}
