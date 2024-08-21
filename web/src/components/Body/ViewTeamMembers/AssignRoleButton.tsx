import styles from './styles.module.css'

import RegisteredUsers from '../../../model/mobileadmin_registeredusers';

import { useDispatch, useSelector } from 'react-redux';
import { selectRole } from '../../../store/userSlice';
import { ROLE } from '../../../constants/keywords';
import { AppDispatch } from '../../../store/store';
import { upsertTeamMembers } from '../../../store/teamSlice';

interface AssignRoleProps {
    data: RegisteredUsers;
}

const AssignRoleButton: React.FC<AssignRoleProps> = ({ data }) => {
    const dispatch = useDispatch<AppDispatch>();
    const userRole = useSelector(selectRole)

    const handleClick = (action: string): React.MouseEventHandler<HTMLButtonElement> => {
        return (event) => {
            event.preventDefault();

            dispatch(upsertTeamMembers({
                ghrNumber: data.ghrNumber,
                teamName: data.teamName,
                appRole: action
            }))
        }
    }

    const renderButton = (buttonRole: string) => {
        const isActive = data.appRole !== buttonRole;
        const buttonClass = isActive ? styles.assignActive : styles.assignInactive;

        return (
            <button
                className={buttonClass}
                onClick={isActive ? handleClick(buttonRole) : undefined}
                disabled={!isActive}
            > {buttonRole} </button>
        )
    }

    const roleButtons = (): JSX.Element[] => {
        const aRoles = ["User", "Manager", "Admin"];
        const mRoles = ["User", "Manager"];

        if (userRole === 'Manager') {
            return mRoles.map((role) => renderButton(role));
        } else {
            return aRoles.map((role) => renderButton(role));
        }
    }

    if (userRole === ROLE.USER)
        return <h3> {data.appRole} </h3>

    else if (userRole === ROLE.MANAGER) {
        if (data.appRole === 'Admin')
            return <> {data.appRole} </>
    } else {
        return <>{roleButtons()}</>;
    }
}

export default AssignRoleButton