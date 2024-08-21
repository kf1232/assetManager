const RenderBlankRows = (recordsPerPage: number, currentLength: number, RenderColumns: Array<string>) => {
    return (
        <>
            {Array.from({ length: recordsPerPage - currentLength }).map((_, index) => (
                <tr key={`placeholder-${index}`}>
                    {RenderColumns.map(key => (
                        <td key={`placeholder-${key}-${index}`}></td>
                    ))}
                </tr>
            ))}
        </>
    )
}

export default RenderBlankRows;