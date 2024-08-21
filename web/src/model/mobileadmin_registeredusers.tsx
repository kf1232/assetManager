export default interface RegisteredUsers {
    ghrNumber: string;
    full_name: string;
    mysingle_id: string;
    nt_id: string;
    appRole: string;
    teamName: string;
    dept_name_short: string;
    dept_name: string;
}

/*
    SELECT TOP (1000) 
        [ghrNumber]
        ,[full_name]
        ,[mysingle_id]
        ,[nt_id]
        ,[appRole]
        ,[teamName]
        ,[dept_name_short]
        ,[dept_name]
    FROM [MIM_Prod].[MobileAdmin].[RegisteredUsers]
*/