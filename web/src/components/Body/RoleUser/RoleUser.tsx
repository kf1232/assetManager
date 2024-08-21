import { useSelector } from "react-redux"
import ViewAssignedDevices from "../ViewAssignedDevices/ViewAssignedDevices"
import ViewMobilePhonebook from "../ViewMobilePhonebook/ViewMobilePhonebook"
import ViewTeamDevices from "../ViewTeamDevices/ViewTeamDevices"
import ViewTeamMembers from "../ViewTeamMembers/ViewTeamMembers"
import { RootState } from "../../../store/store"
import { ACTIONS } from "../../../constants/keywords"

function RoleUser() {
    const view = useSelector((state: RootState) => state.app.view)

    const setBodyView = (view: string) => {
        switch (view) {
            case ACTIONS.ASSIGNED_DEVICES:
                return <ViewAssignedDevices />
            case ACTIONS.TEAM_DEVICES:
                return <ViewTeamDevices />
            case ACTIONS.TEAM_MEMBERS:
                return <ViewTeamMembers />
            case ACTIONS.MOBILE_PHONEBOOK:
                return <ViewMobilePhonebook />
            default:
                return null;
        }
    }
    return (
        <div className='Body-User'>
            {setBodyView(view)}
        </div>
    )
}

export default RoleUser
