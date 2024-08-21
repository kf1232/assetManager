import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import ViewAssignedDevices from "../ViewAssignedDevices/ViewAssignedDevices"
import ViewMobilePhonebook from "../ViewMobilePhonebook/ViewMobilePhonebook"
import ViewTeamDevices from "../ViewTeamDevices/ViewTeamDevices"
import ViewTeamLeaders from "../ViewTeamLeaders/ViewTeamLeaders"
import ViewTeamMembers from "../ViewTeamMembers/ViewTeamMembers"
import { ACTIONS } from "../../../constants/keywords"

function RoleManager() {
    const view = useSelector((state: RootState) => state.app.view)

    const setBodyView = (view: string) => {
        switch (view) {
            case ACTIONS.ASSIGNED_DEVICES:
                return <ViewAssignedDevices />
            case ACTIONS.TEAM_DEVICES:
                return <ViewTeamDevices />
            case ACTIONS.TEAM_MEMBERS:
                return <ViewTeamMembers />
            case ACTIONS.TEAM_MANAGERS:
                return <ViewTeamLeaders />
            case ACTIONS.MOBILE_PHONEBOOK:
                return <ViewMobilePhonebook />
            default:
                return null;
        }
    }

    return (
        <div className='Body-Manager'>
            {setBodyView(view)}
        </div>
    )
}

export default RoleManager
