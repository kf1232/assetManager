import styles from './styles.module.css'

import { useEffect, useState } from "react";
import { ColumnOverride, Phonebook, RenderColumns } from "./PhonebookConstants";
import RenderPageSelect from "../_shared/RenderPageSelect";
import RenderTableHeader from "../_shared/RenderTableHeader";
import RenderBlankRows from "../_shared/RenderBlankRows";
import { SORT } from "../../../constants/keywords";
import RenderTableTitle from "../_shared/RenderTableTitle";
import MobilePhonebook from '../../../model/mobileadmin_phonebook';

const SHIFT_1_2: string = 'Shift (1st,2nd)';
const SHIFT_A_B_C_D: string = 'Shift (A,B,C,D)';

function PhonebookTable(phonebook: MobilePhonebook[], recordsPerPage: number) {
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState<{ [key: string]: string }>({});

    const [sortConfig, setSortConfig] = useState<{ key: keyof Phonebook, direction: string } | null>(null);

    const sortedDevices = () => {
        if (!sortConfig) return phonebook;

        const sorted = [...phonebook].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === SORT.ASCENDING ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === SORT.ASCENDING ? 1 : -1;
            }
            return 0;
        });

        return sorted;
    };

    const handleSort = (key: keyof Phonebook) => {
        let direction = SORT.ASCENDING;
        if (sortConfig && sortConfig.key === key && sortConfig.direction === SORT.ASCENDING) {
            direction = SORT.DESCENDING;
        }
        setSortConfig({ key, direction });
    };

    useEffect(() => {
        setCurrentPage(1)
    }, [recordsPerPage])

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, column: string) => {
        setFilters({
            ...filters,
            [column]: e.target.value,
        });
        setCurrentPage(1);
    };

    const getFilteredMembers = () => {
        return sortedDevices().filter((member: any) =>
            Object.keys(filters).every(key =>
                member[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
            )
        );
    };

    const filteredMembers = getFilteredMembers();

    const totalPages = Math.ceil(filteredMembers.length / recordsPerPage);
    const paginatedMembers = filteredMembers.slice(
        (currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage
    );

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div>
            {RenderTableTitle(
                'Mobile Phonebook',
                'Phonebook Extensions with assigned and last user information.'
            )}
            <div className={styles.tableHeader}>
                <div />
                {RenderPageSelect(handlePreviousPage, handleNextPage, currentPage, totalPages)}
            </div>
            <table>
                {RenderTableHeader(RenderColumns, ColumnOverride, filters, handleFilterChange, handleSort)}
                <tbody>
                    {paginatedMembers.map((member: any) => (
                        <tr key={member.gsWave}>
                            {RenderColumns.map(key => {
                                switch (key) {
                                    case 'gsWave': {
                                        return <td key={key}>{member[key]}</td>
                                    }
                                    case 'ownerTeam': { // Assigned User Information with Owner Team
                                        if (member.assignedUser === SHIFT_1_2) {
                                            return (
                                                <td key={key}>
                                                    1st: {member.ashift} <br/>
                                                    2nd: {member.bshift} <br />
                                                    {member.ownerTeam}
                                                </td>
                                            )
                                        }
                                        else if (member.assignedUser === SHIFT_A_B_C_D) {
                                            return (
                                                <td key={key}>
                                                    A: {member.ashift} <br />
                                                    B: {member.bshift} <br />
                                                    C: {member.cshift} <br />
                                                    D: {member.dshift} <br />
                                                    {member.ownerTeam}
                                                </td>
                                            )
                                        }
                                        else {
                                            return (
                                                <td key={key}>
                                                    {member.assignedUser ? member.assignedUser : 'No Assigned User'}<br />
                                                    {member.ownerTeam}
                                                </td>
                                            )
                                        }

                                    }
                                    case 'LastUserDeptName': {
                                        return (
                                            <td key={key}>
                                                {member.full_name ? member.full_name : 'No Last User'}<br />
                                                {member.LastUserDeptName} : {member.LastUserTimestamp.toString().replace('T', ' ').substring(0, 16)}
                                            </td>
                                        )
                                    }
                                    default: {
                                        return null;
                                    }
                                }
                            })}
                        </tr>
                    ))}
                    {RenderBlankRows(recordsPerPage, paginatedMembers.length, RenderColumns)}
                </tbody>
            </table>
        </div>
    )
}

export default PhonebookTable