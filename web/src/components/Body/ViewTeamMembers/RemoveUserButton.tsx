import styles from './styles.module.css'

import RegisteredUsers from "../../../model/mobileadmin_registeredusers";

import { useDispatch, useSelector } from "react-redux"
import { upsertTeamMembers } from "../../../store/teamSlice";
import { useCallback } from 'react';
import { selectRole } from '../../../store/userSlice';
import { ROLE } from '../../../constants/keywords';
import { AppDispatch } from '../../../store/store';


interface RemoveButtonProps {
    data: RegisteredUsers
}

const RemoveUserButton: React.FC<RemoveButtonProps> = ({ data }) => {
    const dispatch = useDispatch<AppDispatch>();
    const userRole = useSelector(selectRole)

    if(userRole === ROLE.USER) return <div></div>

    const handleSubmit = useCallback(() => {
        dispatch(upsertTeamMembers({
            ghrNumber: data.ghrNumber,
            teamName: '',
            appRole: ''
        }))
    }, [dispatch, data.ghrNumber])
    
    return <button className={styles.RemoveUserButton} onClick={handleSubmit}> Release User </button>
}

export default RemoveUserButton;