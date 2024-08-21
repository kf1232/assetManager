export default interface Users {
    ghrNumber: string;
    teamName: string;
    appRole: string;
}

/*
    SELECT TOP (1000) 
         [ghrNumber]
        ,[teamName]
        ,[appRole]
    FROM [MIM_Prod].[MobileAdmin].[Users]
*/