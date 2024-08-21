export default interface UserLookup {
    ghrNumber: string; 
    full_name: string;  
    mysingle_id: string;  
    nt_id: string; 
}

/*
    SELECT 
        ghrNumber, 
        full_name, 
        mysingle_id, 
        nt_id 
    FROM [MIM_PROD].[MobileAdmin].[RegisteredUsers]
*/