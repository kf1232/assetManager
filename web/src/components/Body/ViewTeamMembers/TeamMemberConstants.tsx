import RegisteredUsers from "../../../model/mobileadmin_registeredusers"
import UnregisteredUsers from "../../../model/mobileadmin_unregisteredusers"

export const ColumnOverride: { [key: string]: string } = {
    ghrNumber: '',
    full_name: 'Full Name',
    mysingle_id: 'MySingle ID',
    nt_id: 'NTID',
    appRole: 'App Role',
    teamName: '',
    dept_name_short: '',
    dept_name: 'Role Name',
}

export const ColumnOverrideU: { [key: string]: string } = {
    //'GHR_ID':'',
    full_name: 'Full Name',
    //'mysingle_id':'',
    //'nt_id':'',
    title:'Role',
    //dept_name_short:'',
    dept_name:'Department Full',
    Actions: '',
}

export const RenderColumns: Array<keyof RegisteredUsers> = [
    //'ghrNumber',
    'full_name',
    //'dept_name',
    //'mysingle_id',
    //'nt_id',
    'appRole',
    //'teamName',
    //'dept_name_short',
]

export const RenderColumnsU: Array<keyof UnregisteredUsers> = [
    //'GHR_ID',
    'full_name',
    //'mysingle_id',
    //'nt_id',
    'title',
    //'dept_name_short',
    //'dept_name'
]