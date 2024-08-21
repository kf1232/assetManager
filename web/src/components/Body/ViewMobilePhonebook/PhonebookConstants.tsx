export const ColumnOverride: { [key: string]: string } = {
    gsWave: '',
    ownerTeam: 'Team Assignment',
    assignedUser: '',
    ashift: '',
    bshift: '',
    cshift: '',
    dshift: '',
    full_name: '',
    LastUserTimestmap: '',
    LastUserDeptName: 'Last User Login Information',
    LastAPTimestamp: '',
}

export const RenderColumns: Array<string> = [
    'gsWave',
    'ownerTeam',
    //'assignedUser',
    //'ashift',
    //'bshift',
    //'cshift',
    //'dshift',
    //'full_name',
    //'LastUserTimestmap',
    'LastUserDeptName',
    //'Actions'
]

export interface Phonebook {
    gsWave: string;
    ownerTeam: string;
    assignedUser: string;
    ashift: string;
    bshift: string;
    cshift: string;
    dshift: string;
    full_name: string;
    LastUserTimestmap: string;
    LastUserDeptName: string;
    LastAPTimestamp: Date;
}