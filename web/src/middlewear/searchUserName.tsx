import UserLookup from "../model/interface_userlookup";

const searchUserName = (value: string, UserNames: UserLookup[]) => {
    
    if( value === null || value === '') return '';
    else {
        const result = UserNames.find(user =>
            user.nt_id === value ||
            user.ghrNumber == value ||
            user.full_name === value ||
            user.mysingle_id === value
        )

        if (result) {
            return result.full_name
        } else {
            return value
        }
    }
}

export default searchUserName