export default interface DepartmentShort {
    dept_name_short: string;
    dept_name: string;
}

/*
    SELECT TOP (1000) 
         [dept_name_short]
        ,[dept_name]
    FROM [MIM_Prod].[MobileAdmin].[DepartmentShort]
*/