import ViewAdminPannel from "../ViewAdminPannel/ViewAdminPannel"
import ViewAssignedDevices from "../ViewAssignedDevices/ViewAssignedDevices"
import ViewMobilePhonebook from "../ViewMobilePhonebook/ViewMobilePhonebook"
import ViewTeamDevices from "../ViewTeamDevices/ViewTeamDevices"
import ViewTeamLeaders from "../ViewTeamLeaders/ViewTeamLeaders"
import ViewTeamMembers from "../ViewTeamMembers/ViewTeamMembers"

import { ACTIONS } from "../../../constants/keywords"
import { selectView } from "../../../store/appSlice"
import { useSelector } from "react-redux"

const viewActions: { [key: string]: React.FC } = {
    [ACTIONS.ASSIGNED_DEVICES]: ViewAssignedDevices,
    [ACTIONS.TEAM_DEVICES]: ViewTeamDevices,
    [ACTIONS.TEAM_MEMBERS]: ViewTeamMembers,
    [ACTIONS.TEAM_MANAGERS]: ViewTeamLeaders,
    [ACTIONS.MOBILE_PHONEBOOK]: ViewMobilePhonebook,
    [ACTIONS.ADMIN_PANNEL]: ViewAdminPannel,
}

function RoleAdmin() {
    const view = useSelector(selectView)
    const SelectedView = viewActions[view] || null;

    return <SelectedView />
}

export default RoleAdmin
