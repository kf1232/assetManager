import { useSelector } from "react-redux";
import { selectRole } from "../../../store/userSlice";
import { selectTeamMembers, selectTeamMembersU } from "../../../store/teamSlice";

import ViewRegister from "./ViewRegister";
import { selectRowCount } from "../../../store/appSlice";
import ViewUnregister from "./ViewUnregister";
import { ROLE } from "../../../constants/keywords";

function ViewTeamMembers() {
    const role = useSelector(selectRole)
    const recordsPerPage = useSelector(selectRowCount)
    const team_members = useSelector(selectTeamMembers)
    const u_team_members = useSelector(selectTeamMembersU)

    if (role === ROLE.USER || role === ROLE.UNKNOWN) {
        return ViewRegister(team_members, recordsPerPage)
    } else {
        return (
            <>
                {ViewRegister(team_members, recordsPerPage)}
                <br/><br/>
                {ViewUnregister(u_team_members, recordsPerPage)}
            </>
        )
    }


}

export default ViewTeamMembers