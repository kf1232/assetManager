import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { AppDispatch, RootState } from '../../../store/store';
import styles from './AssignedUserSelector.module.css';
import { upsertDevice } from '../../../store/deviceSlice';
import searchUserName from '../../../middlewear/searchUserName';
import { selectUserLookup } from '../../../store/teamSlice';
import RegisteredDevices from '../../../model/mobileadmin_registereddevices';
import RegisteredUsers from '../../../model/mobileadmin_registeredusers';

/**
 * Interface for React Select options.
 * @interface
 */
interface ReactSelectOption {
    value: string;
    label: string;
}

/**
 * Props for the AssignedUserSelector component.
 * @interface
 */
interface AssignedUserSelectorProps {
    data: RegisteredDevices;
}

const SHARED_DEVICE: string = 'Shared Device';
const STORAGE_LOCKER: string = 'Storage Locker';
const SHIFT_1_2: string = 'Shift (1st,2nd)';
const SHIFT_A_B_C_D: string = 'Shift (A,B,C,D)';
const CONTRACTOR: string = 'Contractor';
const HELP_DESK: string = 'HelpDesk Device';

const customOptions: ReactSelectOption[] = [
    { value: SHARED_DEVICE, label: SHARED_DEVICE },
    { value: STORAGE_LOCKER, label: STORAGE_LOCKER },
    { value: SHIFT_1_2, label: SHIFT_1_2 },
    { value: SHIFT_A_B_C_D, label: SHIFT_A_B_C_D },
    { value: CONTRACTOR, label: CONTRACTOR },
    { value: HELP_DESK, label: HELP_DESK },
];
/**
 * The AssignedUserSelector component provides a UI for selecting or updating the assigned user of a device.
 *
 * @param {AssignedUserSelectorProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const AssignedUserSelector: React.FC<AssignedUserSelectorProps> = ({ data }) => {
    const dispatch = useDispatch<AppDispatch>();
    const userNames = useSelector(selectUserLookup);
    const teamMembers = useSelector((state: RootState) => state.team.team_members || []);
    const [selectedUser, setSelectedUser] = useState<ReactSelectOption>({ value: data.assignedUser, label: data.assignedUser });

    /**
     * Handles the change of the selected user.
     *
     * @param {ReactSelectOption} selectedOption - The selected option from the React Select component.
     */
    const handleChange = useCallback((selectedOption: ReactSelectOption) => {
        const submitData: Partial<RegisteredDevices> = {
            serialNumber: data.serialNumber,
            assignedUser: selectedOption.value,
        };
        setSelectedUser(selectedOption);
        dispatch(upsertDevice(submitData));
    }, [data.serialNumber, dispatch]);

    /**
     * Handles the change of the selected shift.
     *
     * @param {keyof RegisteredDevices} shiftKey - The key of the shift to be updated.
     * @returns {(selectedOption: ReactSelectOption) => void} The event handler for the shift change.
     */
    const handleShiftChange = useCallback((shiftKey: keyof RegisteredDevices) => (selectedOption: ReactSelectOption) => {
        const submitData: Partial<RegisteredDevices> = {
            serialNumber: data.serialNumber,
            [shiftKey]: selectedOption.value,
        };
        setSelectedUser(selectedOption);
        dispatch(upsertDevice(submitData));
    }, [data.serialNumber, dispatch]);

    /**
     * Releases the assigned user of the device.
     */
    const releaseDevice = useCallback(() => {
        setSelectedUser({ value: '', label: '' });
        dispatch(upsertDevice({ serialNumber: data.serialNumber, assignedUser: '' }));
    }, [data.serialNumber, dispatch]);

    /**
   * Releases the assigned shift of the device.
   *
   * @param {keyof RegisteredDevices} shiftKey - The key of the shift to be released.
   * @returns {() => void} The event handler for the shift release.
   */
    const releaseShift = useCallback((shiftKey: keyof RegisteredDevices) => () => {
        setSelectedUser({ value: '', label: '' });
        dispatch(upsertDevice({ serialNumber: data.serialNumber, [shiftKey]: '' }));
    }, [data.serialNumber, dispatch]);

    const memberList = teamMembers.map((user: RegisteredUsers) => ({
        value: user.nt_id,
        label: user.full_name,
    }));

    /**
     * Renders a button or select component for the shift based on its value.
     *
     * @param {keyof Device} shift - The shift key.
     * @param {string} name - The name of the shift.
     * @returns {JSX.Element} The rendered button or select component.
     */
    const renderShiftButtonOrSelect = (shift: keyof RegisteredDevices, name: string): JSX.Element => {
        const shiftValue = data[shift];
        return shiftValue ? (
            <button className={styles.AssignButton} onClick={releaseShift(shift)}>
                {name} <br />
                {`( ${shiftValue} )`}
            </button>
        ) : (
            <Select
                options={memberList}
                onChange={handleShiftChange(shift)}
                value={selectedUser}
                placeholder="Set user.."
            />
        );
    };

    if ([SHARED_DEVICE, STORAGE_LOCKER, SHIFT_1_2, SHIFT_A_B_C_D, CONTRACTOR, HELP_DESK].includes(data.assignedUser)) {
        const aName = searchUserName(data.ashift, userNames);
        const bName = searchUserName(data.bshift, userNames);

        if (data.assignedUser === SHIFT_A_B_C_D) {
            const cName = searchUserName(data.cshift, userNames);
            const dName = searchUserName(data.dshift, userNames);
            return (
                <td key={`${data.serialNumber}-assignedUser-abcd`}>
                    <button onClick={releaseDevice} />
                    {renderShiftButtonOrSelect('ashift', aName)}
                    {renderShiftButtonOrSelect('bshift', bName)}
                    {renderShiftButtonOrSelect('cshift', cName)}
                    {renderShiftButtonOrSelect('dshift', dName)}
                </td>
            );
        } else if (data.assignedUser === SHIFT_1_2) {
            return (
                <td key={`${data.serialNumber}-assignedUser-12`}>
                    <button onClick={releaseDevice} />
                    {renderShiftButtonOrSelect('ashift', aName)}
                    {renderShiftButtonOrSelect('bshift', bName)}
                </td>
            );
        } else {
            return (
                <td key={`${data.serialNumber}-assignedUser-custom`}>
                    <button className={styles.AssignButton} onClick={releaseDevice}>
                        {data.assignedUser}
                    </button>
                </td>
            );
        }
    } else {
        const name = searchUserName(data.assignedUser, userNames);
        return (
            <td key={`${data.serialNumber}-assignedUser-default`}>
                {data.assignedUser ? (
                    <button className={styles.AssignButton} onClick={releaseDevice}>
                        {name} <br />
                        {`( ${data.assignedUser} )`}
                    </button>
                ) : (
                    <>
                        {/* @ts-ignore */}
                        <Select
                            options={[...customOptions, ...memberList]}
                            onChange={handleChange}
                            value={selectedUser}
                            placeholder="Set user.."
                        />
                    </>

                )}
            </td>
        );
    }
};

export default React.memo(AssignedUserSelector);