import { useSelector } from "react-redux"
import { selectTeamLeaders } from "../../../store/teamSlice"
import TeamLeadersTable from "./TeamLeadersTable"
import { selectRowCount } from "../../../store/appSlice"

function ViewTeamLeaders() {
    const team_leaders = useSelector(selectTeamLeaders)
    const recordsPerPage = useSelector(selectRowCount)

    return TeamLeadersTable(team_leaders, recordsPerPage)
}

export default ViewTeamLeaders
