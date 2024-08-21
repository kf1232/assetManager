export default interface MobilePhonebook {
    gsWave: string;
    ownerTeam: string; 
    assignedUser: string; 
    ashift: string;
    bshift: string;
    cshift: string;
    dshift: string;
    full_name: string;
    LastUserDeptName: string;
    LastUserTimestmap: string;
    LastAPTimestamp: string;
}

/*
    SELECT 
        gsWave, 
        ownerTeam, 
        assignedUser, 
        ashift, 
        bshift, 
        cshift, 
        dshift, 
        full_name, 
        LastUserDeptName, 
        LastAPTimestamp 
    FROM [MIM_Prod].[MobileAdmin].[RegisteredDevices] 
    WHERE gsWave != '' AND gsWave IS NOT NULL
*/