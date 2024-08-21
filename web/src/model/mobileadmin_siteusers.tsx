export default interface SiteUsers {
    GHR_ID: string;
    full_name: string;
    mysingle_id: string;
    nt_id: string;
    title: string;
    dept_name_short: string;
    dept_name: string;
}

/*
    SELECT TOP (1000) 
         [GHR_ID]
        ,[full_name]
        ,[mysingle_id]
        ,[nt_id]
        ,[title]
        ,[dept_name_short]
        ,[dept_name]
    FROM [MIM_Prod].[MobileAdmin].[SiteUsers]
*/