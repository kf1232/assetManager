import { ChangeEvent } from "react";

const RenderTableHeader = (RenderColumns: any[],
    ColumnOverride: { [x: string]: any; },
    filters: { [x: string]: any; },
    handleFilterChange: (arg0: ChangeEvent<HTMLInputElement>, arg1: any) => void,
    handleSort: any) => {
    return (
        <thead>
            <tr>
                {RenderColumns.map((key) => {
                    const columnName = ColumnOverride[key] ? ColumnOverride[key] : key;

                    if (key === 'Actions') {
                        return (
                            <th key={key}>
                                {columnName}
                            </th>
                        );
                    } else {
                        return (
                            <th key={key} onClick={() => handleSort(key)}>
                                {columnName}
                                <br />
                                <input
                                    type='text'
                                    placeholder={`Filter ${columnName}`}
                                    value={filters[key] || ''}
                                    onChange={(e) => handleFilterChange(e, key)}
                                />
                            </th>
                        );
                    }
                })}
                <th key={'Actions'}> Actions </th>
            </tr>
        </thead>
    )
}

export default RenderTableHeader;