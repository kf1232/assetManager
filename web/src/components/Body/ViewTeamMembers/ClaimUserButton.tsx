import styles from './styles.module.css'

import { useDispatch, useSelector } from "react-redux"
import UnregisteredUsers from "../../../model/mobileadmin_unregisteredusers"
import { upsertTeamMembers } from "../../../store/teamSlice";
import { selectTeam } from "../../../store/userSlice";
import { useCallback } from 'react';
import { AppDispatch } from '../../../store/store';

interface ClaimButtonProps {
    data: UnregisteredUsers
}

const ClaimUserButton: React.FC<ClaimButtonProps> = ({ data }) => {
    const dispatch = useDispatch<AppDispatch>();
    const teamName = useSelector(selectTeam)

    const handleSubmit = useCallback(() => {
        dispatch(upsertTeamMembers({
            ghrNumber: data.GHR_ID,
            teamName: teamName,
            appRole: 'User'
        }))
    }, [dispatch, data.GHR_ID, teamName])

    return <button className={styles.ClaimUserButton} onClick={handleSubmit}> Claim User </button>
}

export default ClaimUserButton;