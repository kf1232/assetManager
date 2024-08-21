import { useSelector, useDispatch } from "react-redux"
import { setAdmin, setManager, setUser, setUnknown, setTeam } from "../../store/userSlice";

import styles from './Developer.module.css'
import { RootState } from "../../store/store";

import { ROLE } from "../../constants/keywords";
import { selectRowCount, setRowCount } from "../../store/appSlice";
import { setLoading } from '../../store/teamSlice';
import { useCallback, useMemo, useState } from "react";
import React from "react";
import { debounce } from 'lodash';

const TEAM_NAMES = [
    'Clean', 'CMP', 'CRC', 'CVD', 'Data Intelligence', 'DI', 'Diffusion', 'EHS', 'Etch',
    'Facilities Services', 'GCS', 'HVAC', 'Implant', 'Infra', 'Innovation', 'IQA',
    'IT Strategy', 'Logistics', 'Manufacturing Ops', 'Manufacturing Systems',
    'Material', 'Metal', 'Metrology', 'Photo', 'SDSA', 'Security', 'T1 Analysis',
    'T1 Fab', 'T1 Facilities', 'T1 Infra', 'T1 WTR', 'Test Technology', 'WTR'
]

const Developer: React.FC = React.memo(() => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user)
    const rowCount = useSelector(selectRowCount);

    const [selectedRole, setSelectedRole] = useState<string>("");
    const [selectedTeam, setSelectedTeam] = useState<string>("");
    const [selectedRowCount, setSelectedRowCount] = useState<number>(rowCount)

    const debouncedDispatch = useCallback(debounce(dispatch, 300), [dispatch])

    const handleRoleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const role = event.target.value;
        setSelectedRole(role);
        switch (role) {
            case ROLE.ADMIN:
                debouncedDispatch(setAdmin()); break;
            case ROLE.MANAGER:
                debouncedDispatch(setManager()); break;
            case ROLE.USER:
                debouncedDispatch(setUser()); break;
            case ROLE.UNKNOWN:
                debouncedDispatch(setUnknown()); break;
            default:
                break;
        }
    }, [debouncedDispatch]);

    const handleTeamChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const team = event.target.value;
        setSelectedTeam(team)
        debouncedDispatch(setLoading());
        debouncedDispatch(setTeam(team));
    }, [debouncedDispatch]);

    const handleRowChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const rowCount = Number(event.target.value);
        setSelectedRowCount(rowCount);
        debouncedDispatch(setRowCount(rowCount));
    }, [debouncedDispatch]);

    const teamOptions = useMemo(() =>
        TEAM_NAMES.map(team => (
            <option key={team} value={team}>
                {team}
            </option>
        )), []);

    if (!user.developer) return null;

    return (
        <div className={styles.developer}>
            <div className={styles.developerItem}>
                <label htmlFor="row-count"> Set Row Count: </label>
                <select id='row-count' onChange={handleRowChange} value={selectedRowCount}>
                    <option value={5}> 5 </option>
                    <option value={10}> 10 </option>
                    <option value={20}> 20 </option>
                </select>
            </div>
            <div className={styles.developerItem}>
                <label htmlFor="role-select"> Select Role: </label>
                <select id="role-select" onChange={handleRoleChange} value={selectedRole}>
                    <option value="" disabled> Select Role </option>
                    <option value={ROLE.ADMIN}> {ROLE.ADMIN} </option>
                    <option value={ROLE.MANAGER}> {ROLE.MANAGER} </option>
                    <option value={ROLE.USER}> {ROLE.USER} </option>
                    <option value={ROLE.UNKNOWN}> {ROLE.UNKNOWN} </option>
                </select>
            </div>
            <div className={styles.developerItem}>
                <label htmlFor="team-select"> Select Team: </label>
                <select id="team-select" onChange={handleTeamChange} value={selectedTeam}>
                    <option value="" disabled> Select Team </option>
                    {teamOptions}
                </select>
            </div>
        </div>
    )
})

export default Developer
