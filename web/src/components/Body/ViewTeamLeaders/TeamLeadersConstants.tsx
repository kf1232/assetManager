export const ColumnOverride: { [key: string]: string } = {
    ghrNumber: 'Valid',
    full_name: 'Full Name',
    mysingle_id: '',
    nt_id: '',
    appRole: '',
    teamName: '',
    dept_name_short: '',
    dept_name: 'Department',
}

export const RenderColumns: Array<string> = [
    //'ghrNumber',
    'full_name',
    //'mysingle_id',
    //'nt_id',
    //'appRole',
    //'teamName',
    //'dept_name_short',
    'dept_name',
    'Actions'
]

export interface TeamLeader {
    ghrNumber: string;
    full_name: string;
    mysingle_id: string;
    nt_id: string;
    appRole: string;
    teamName: string;
    dept_name_short: string;
    dept_name: string;
}
