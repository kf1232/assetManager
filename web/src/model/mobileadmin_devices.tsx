export default interface devices {
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
};

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
    FROM [MIM_Prod].[MobileAdmin].[Devices]
*/