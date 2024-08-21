export default interface SiteDevices {
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

/*
    SELECT TOP (1000) 
         [SerialNum]
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
        ,[EMMStatus]
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
    FROM [MIM_Prod].[MobileAdmin].[SiteDevices]
*/