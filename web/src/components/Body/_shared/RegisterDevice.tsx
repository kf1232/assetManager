import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { upsertDevice } from '../../../store/deviceSlice';
import BASE_URL from '../../../constants/BASE_URL';
import { selectRole } from '../../../store/userSlice';
import { ROLE } from '../../../constants/keywords';

const RegisterDevice = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userRole = useSelector(selectRole)
    
    if ([ROLE.USER, ROLE.UNKNOWN].includes(userRole)) return <div></div>;
    
    const teamName = useSelector((state: RootState) => state.user.team)
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [formData, setFormData] = useState({
        serialNumber: '',
        ownerTeam: teamName,
        gsWave: ''
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (formData.serialNumber === '') { return null }

        try {
            const result = await axios.get(`${BASE_URL}/devices/serial/${formData.serialNumber}`, { withCredentials: true })
            if (result.data === '') return null

            dispatch(upsertDevice(formData))

        } catch (error) {
            console.error(error)
        }

        setFormData({
            serialNumber: '',
            ownerTeam: teamName,
            gsWave: ''
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
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                placeholder="Serial Number"
            />
            <input className='Input-Field'
                type="text"
                name="ownerTeam"
                value={teamName}
                onChange={handleChange}
                placeholder="Owner Team"
            />
            <input className='Input-Field'
                type="text"
                name="gsWave"
                value={formData.gsWave}
                onChange={handleChange}
                placeholder="Phone Ext"
            />
            <button className={'Action-Button'} type="submit">Submit</button>
        </form>
    ) : (
        <button className={'Action-Button'} onClick={() => setShowRegisterForm(true)}> Register a Device </button>
    )

}

export default RegisterDevice;