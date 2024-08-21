import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { selectRole } from '../../../store/userSlice';
import { ROLE } from '../../../constants/keywords';
import { upsertTeamMembers } from '../../../store/teamSlice';

const RegisterUser = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userRole = useSelector(selectRole)
    
    if ([ROLE.USER, ROLE.UNKNOWN].includes(userRole)) return <div></div>;
    
    const teamName = useSelector((state: RootState) => state.user.team)
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [formData, setFormData] = useState({
        ghrNumber: '',
        teamName: '',
        appRole: 'User'
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (formData.ghrNumber === '') { return null }

        try {
            dispatch(upsertTeamMembers(formData))
        } catch (error) {
            console.error(error)
        }

        setFormData({
            ghrNumber: '',
            teamName: teamName,
            appRole: 'User'
        })
        setShowRegisterForm(false);
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    return showRegisterForm ? (
        <form onSubmit={handleSubmit}>
            <input className='Input-Field'
                type="text"
                name="ghrNumber"
                value={formData.ghrNumber}
                onChange={handleChange}
                placeholder="GHR Number"
            />
            <input className='Input-Field'
                type="text"
                name="teamName"
                value={teamName}
                onChange={handleChange}
                placeholder="Team Name"
            />
            <button className={'Action-Button'} type="submit">Submit</button>
        </form>
    ) : (
        <button className={'Action-Button'} onClick={() => setShowRegisterForm(true)}> Register a new user </button>
    )

}

export default RegisterUser;