import styles from './deviceWarningState.module.css'
import { Device } from './TeamDevicesConstants'

const calculateFullDaysPassed = (inputValue: string | number | Date): number => {
    const inputDate = new Date(inputValue);
    const currentDate = new Date();

    currentDate.setHours(0,0,0,0);

    const timeDifference = currentDate.getTime() - inputDate.getTime();

    const fullDaysPassed = Math.floor(timeDifference / (1000*60*60*24));

    return fullDaysPassed;
}

const deviceWarningState = (device: Device) => {

    let version = device.AndroidVer;

    /* Todo: Implement days since last used tracking */
    calculateFullDaysPassed(device.LastUserTimestamp)

    const END_OF_LIFE_WARNINGS = ['9'];
    const END_OF_LIFE_VERSIONS = ['8', '7', '6', '5', '4', '3', '2', '1'];

    if(END_OF_LIFE_VERSIONS.includes(version)) 
        return styles.expiredState;

    if(END_OF_LIFE_WARNINGS.includes(version))
        return styles.warningState;

    //if(lastLogin > 90)
    //    return styles.inactiveState;

    return styles.normalState;

}

export default deviceWarningState;

// ##TODO Add colors and pictures to harass people