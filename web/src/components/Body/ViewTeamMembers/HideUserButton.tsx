import styles from './styles.module.css'

import { useDispatch, useSelector } from "react-redux"
import UnregisteredUsers from "../../../model/mobileadmin_unregisteredusers"
import { upsertTeamMembers } from "../../../store/teamSlice";
import { selectTeam } from "../../../store/userSlice";
import { useCallback } from 'react';
import { AppDispatch } from '../../../store/store';

interface HideUserProps {
    data: UnregisteredUsers
}

const HideUserButton: React.FC<HideUserProps> = ({ data }) => {
    const dispatch = useDispatch<AppDispatch>();
    const teamName = useSelector(selectTeam)

    const handleSubmit = useCallback(() => {
        dispatch(upsertTeamMembers({
            ghrNumber: data.GHR_ID,
            teamName: `hidden-${teamName}`,
            appRole: ''
        }))
    }, [dispatch, data.GHR_ID, teamName])

    return <button className={styles.HideUserButton} onClick={handleSubmit}> Hide/Remove User </button>
}

export default HideUserButton;