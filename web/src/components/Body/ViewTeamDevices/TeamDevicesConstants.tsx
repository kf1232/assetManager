import RegisteredDevices from "../../../model/mobileadmin_registereddevices";
import UnregisteredDevices from "../../../model/mobileadmin_unregistereddevices";

export const ColumnOverride: { [key: string]: string } = {
    serialNumber: 'Serial Number',
    ownerTeam: '',
    registerDate: '',
    gsWave: '',
    assignedUser: 'Assigned User',
    checkUser: '',
    checkTimestamp: '',
    ashift: '',
    bshift: '',
    cshift: '',
    dshift: '',
    deviceNotes: 'Device Notes',
    ModelId: '',
    ModelName: '',
    AndroidVer: '',
    MacAddress: '',
    IMEI: '',
    ICCId: '',
    PhoneNum: '',
    McuvicId: '',
    EMMId: '',
    EMMGroup: '',
    VPNId: '',
    LastUserGhrId: '',
    mysingle_id: '',
    nt_id: '',
    full_name: 'Last User Name',
    dept_name_short: '',
    LastUserDeptName: '',
    LastUserTimestamp: 'Last Activity',
    LastAPTimestamp: '',
    LastAp: '',
}

export const RenderColumns: Array<keyof RegisteredDevices> = [
    'serialNumber',
    //'ownerTeam',
    //'registerDate',
    'gsWave',
    'deviceNotes',
    'assignedUser',
    //'checkUser',
    //'checkTimestamp',
    //'ashift',
    //'bshift',
    //'cshift',
    //'dshift',
    //'ModelId',
    //'ModelName',
    //'AndroidVer',
    //'MacAddress',
    //'IMEI',
    //'ICCId',
    //'PhoneNum',
    //'McuvicId',
    //'EMMId',
    //'EMMGroup',
    //'VPNId',
    //'LastUserGhrId',
    //'mysingle_id',
    //'nt_id',
    'full_name',
    //'dept_name_short',
    //'LastUserDeptName',
    'LastUserTimestamp',
    //'LastAPTimestamp',
    'LastAp'
]

export const ColumnOverrideU: { [key: string]: string } = {
    SerialNum: 'Serial Number',
    ModelId: '',
    ModelName: 'Model Info',
    AndroidVer: '',
    MacAddress: 'MAC Address',
    IMEI: '',
    ICCId: '',
    PhoneNum: '',
    McuvicId: '',
    EMMId: '',
    EMMGroup: '',
    EMMStatus: '',
    VPNId: '',
    LastUserGhrId: '',
    mysingle_id: '',
    nt_id: '',
    full_name: 'Last User Info',
    dept_name_short: '',
    LastUserDeptName: '',
    LastUserTimestamp: 'Last Activity',
    LastAPTimestamp: '',
    LastAp: 'Last AP',
}
export const RenderColumnsU: Array<keyof UnregisteredDevices> = [
    'ModelName',
    'SerialNum',
    //'ModelId',
    //'AndroidVer',
    'MacAddress',
    //'IMEI',
    //'ICCId',
    //'PhoneNum',
    //'McuvicId',
    //'EMMId',
    //'EMMGroup',
    //'EMMStatus',
    //'VPNId',
    //'LastUserGhrId',
    //'mysingle_id',
    //'nt_id',
    'full_name',
    //'dept_name_short',
    //'LastUserDeptName',
    'LastUserTimestamp',
    //'LastAPTimestamp',
    'LastAp'
]


export interface Device {
    serialNumber: string;
    ownerTeam: string;
    registerDate: string;
    gsWave: string;
    assignedUser: string;
    checkUser: string;
    checkTimestamp: string;
    ashift: string;
    bshift: string;
    cshift: string;
    dshift: string;
    deviceNotes: string;
    ModelId: string;
    ModelName: string;
    AndroidVer: string;
    MacAddress: string;
    IMEI: string;
    ICCId: string;
    PhoneNum: string;
    McuvicId: string;
    EMMId: string;
    EMMGroup: string;
    VPNId: string;
    LastUserGhrId: string;
    mysingle_id: string;
    nt_id: string;
    full_name: string;
    dept_name_short: string;
    LastUserDeptName: string;
    LastUserTimestamp: string;
    LastAPTimestamp: string;
    LastAp: string;
}

export interface DeviceU {
    SerialNum: string;
    ModelId: string;
    ModelName: string;
    AndroidVer: string;
    MacAddress: string;
    IMEI: string;
    ICCId: string;
    PhoneNum: string;
    McuvicId: string;
    EMMId: string;
    EMMGroup: string;
    EMMStatus: string;
    VPNId: string;
    LastUserGhrId: string;
    mysingle_id: string;
    nt_id: string;
    full_name: string;
    dept_name_short: string;
    LastUserDeptName: string;
    LastUserTimestamp: string;
    LastAPTimestamp: string;
    LastAp: string;
}