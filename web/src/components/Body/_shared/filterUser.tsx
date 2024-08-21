interface userListObject {
    assignedUser: string;
    ashift: string;
    bshift: string;
    cshift: string;
    dshift: string;
}


function filterUser( userListObject: userListObject, searchString: string ) {
    if(searchString === '') return userListObject;

    let tValue = searchString.trim()

    if(userListObject.assignedUser.trim() === tValue )
        userListObject.assignedUser = '';
    
    if(userListObject.ashift.trim() === tValue )
        userListObject.ashift = '';

    if(userListObject.bshift.trim() === tValue )
        userListObject.bshift = '';

    if(userListObject.cshift.trim() === tValue )
        userListObject.cshift = '';

    if(userListObject.dshift.trim() === tValue )
        userListObject.dshift = '';

    return userListObject;
}

export default filterUser;