export default interface log {
    LogId: string;
    Timestamp: Date;
    ApiEndpoint: string;
    UserField: string;
}

/*
    SELECT TOP (1000) 
         [LogId]
        ,[Timestamp]
        ,[ApiEndpoint]
        ,[UserField]
    FROM [MIM_Prod].[MobileAdmin].[Log]
*/