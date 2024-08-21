export default interface RegisteredDevices {
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

/*
    SELECT TOP (1000) 
         [serialNumber]
        ,[ownerTeam]
        ,[registerDate]
        ,[gsWave]
        ,[assignedUser]
        ,[checkUser]
        ,[checkTimestamp]
        ,[ashift]
        ,[bshift]
        ,[cshift]
        ,[dshift]
        ,[deviceNotes]
        ,[ModelId]
        ,[ModelName]
        ,[AndroidVer]
        ,[MacAddress]
        ,[IMEI]
        ,[ICCId]
        ,[PhoneNum]
        ,[McuvicId]
        ,[EMMId]
        ,[EMMGroup]
        ,[VPNId]
        ,[LastUserGhrId]
        ,[mysingle_id]
        ,[nt_id]
        ,[full_name]
        ,[dept_name_short]
        ,[LastUserDeptName]
        ,[LastUserTimestamp]
        ,[LastAPTimestamp]
        ,[LastAp]
    FROM [MIM_Prod].[MobileAdmin].[RegisteredDevices]
*/