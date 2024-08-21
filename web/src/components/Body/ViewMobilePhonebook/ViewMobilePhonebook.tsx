import { useSelector } from 'react-redux'
import PhonebookTable from './PhonebookTable'
import { selectPhonebook } from '../../../store/deviceSlice'
import { selectRowCount } from '../../../store/appSlice'

function ViewMobilePhonebook() {
    const phonebook = useSelector(selectPhonebook)
    const recordsPerPage = useSelector(selectRowCount)

    return PhonebookTable(phonebook, recordsPerPage)
}

export default ViewMobilePhonebook