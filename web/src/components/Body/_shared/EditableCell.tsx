import React, { useState } from 'react';
import { KEY, ROLE } from '../../../constants/keywords';
import styles from './EditableCell.module.css'
import { useSelector } from 'react-redux';
import { selectRole } from '../../../store/userSlice';

interface EditableCellProps {
    initialValue: string;
    onSave: (newValue: string) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({ initialValue, onSave }) => {
    const userRole = useSelector(selectRole)
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);
    
    if(userRole === ROLE.USER) {
        if (value === '' || value === ' ' || value === null) {
            return (
                <td className={styles.blankCell}> ... </td>
            )
        } else {
            return (
                <td className={styles.blankCell}> {value} </td>
            )
        }
        
    }
    
    

    const handleDoubleClick = () => {
        setIsEditing(true)
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleBlur = () => {
        setIsEditing(false);
        onSave(value);
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === KEY.ENTER) {
            setIsEditing(false)
            onSave(value)
        }
    }

    if (value === '' || value === ' ' || value === null) {
        return (
            <td className={styles.blankCell} onDoubleClick={handleDoubleClick}>
                {isEditing ? (
                    <input type='text' value={value} onChange={handleChange} onBlur={handleBlur} onKeyDown={handleKeyDown} autoFocus />)
                    : (
                        '...'
                    )}
            </td>
        )

    } else {
        return (
            <td className={styles.editableCell} onDoubleClick={handleDoubleClick}>
                {isEditing ? (
                    <input type='text' value={value} onChange={handleChange} onBlur={handleBlur} onKeyDown={handleKeyDown} autoFocus />)
                    : (
                        value
                    )}
            </td>
        )
    }
}

export default EditableCell;