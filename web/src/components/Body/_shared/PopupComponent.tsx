import React, { useState } from 'react';
import styles from './Popup.module.css'

interface PopupComponentProps {
    data: any;
    type: string;
}

// <PopupComponent data={device} type={'DeviceRegister'}/>
const PopupComponent: React.FC<PopupComponentProps> = ({ data, type }) => {
    const [isOpen, setIsOpen] = useState(false)

    const popupSelector = (type: string) => {
        switch (type) {
            case 'AssignDevices': {
                /*
                    <Unused>
                        ICCId : null
                        IMEI : null
                        checkTimestamp : null
                        checkUser : null
                        PhoneNum : null
                        VPNId : null
                        mysingle_id : "k.mills"
                        nt_id : "kmills6916"
                        LastAPTimestamp : "2024-07-24T13:35:00.000Z"
                        LastAp : "T1O:2:Smock"
                        LastUserDeptName : "AT Operations"
                        LastUserGhrId : "23516916"
                        dept_name_short : "AT"
                        deviceNotes : "Tablet Clip - 07"
                        full_name : "Kenneth Scott Mills"
                        registerDate : "2024-05-08"

                    <h2>Device Information</h2>
                        AndroidVer : "13"
                        ModelId : "SM-X800"
                        ModelName : "Tab S8+"
                        serialNumber : "R52W8096ZND"
                        MacAddress : "48BCE1E4B3FC"
                        gsWave : null

                    <h2>Account Information</h2>
                        EMMGroup : "SAS WiFi"
                        EMMId : "TabS8Plus_6ZND"
                        McuvicId : "TabS8Plus_B3FC"

                    <h2>Owner Information</h2>
                        ownerTeam : "Metal"
                        assignedUser : "David Terrall Phillips II"
                        ashift : "Kyle Patrick Finkernagel"
                        bshift : "Ricardo Ramos"
                        cshift : "Patrick Joseph Dockery"
                        dshift : "Brent Crouch"

                    <h2>Latest Information</h2>
                        full_name : "Kenneth Scott Mills"
                        LastUserTimestamp : "2024-05-17T21:05:56.657Z"
                */
                return (
                    <>
                        <button className={styles.actionButton} onClick={togglePopup}> Details </button>
                        {isOpen && (
                            <div className={styles.overlay} onClick={togglePopup}>
                                <div className={styles.content}>
                                    <button className={styles.close} onClick={togglePopup}> X </button>
                                    <div className={styles.section}>
                                        <h2>Device Information</h2>
                                        <p> <strong>Serial Number:</strong> {data.serialNumber} </p>
                                        <p> <strong>Model/Version:</strong> {data.ModelName} - {data.AndroidVer} </p>
                                        <p> <strong>MAC Address:</strong> {data.MacAddress} </p>
                                        <p> <strong>gsWave:</strong> {data.gsWave} </p>
                                    </div> <br />
                                    <div className={styles.section}>
                                        <h2>Account Information</h2>
                                        <p> <strong>EMM Account/Group:</strong> {data.EMMId} - {data.EMMGroup} </p>
                                        <p> <strong>mCUVIC Account:</strong> {data.McuvicId}</p>
                                        <p> <strong>MAC Address:</strong> {data.MacAddress} </p>
                                    </div> <br />
                                    <div className={styles.section}>
                                        <h2>Owner Information</h2>
                                        <p> <strong>Team:</strong> {data.ownerTeam} </p>
                                        <p> <strong>Assignment:</strong> {data.assignedUser}</p>
                                        <p> <strong>A Shift:</strong> {data.ashift}</p>
                                        <p> <strong>B Shift:</strong> {data.bshift}</p>
                                        <p> <strong>C Shift:</strong> {data.cshift}</p>
                                        <p> <strong>D Shift:</strong> {data.dshift}</p>
                                    </div> <br />
                                    <div className={styles.section}>
                                        <h2>Latest Information <p> ! Last user is tracked on Fab&Infra login !</p> </h2>

                                        <p> <strong>Last User:</strong> {data.full_name}</p>
                                        <p> <strong>Login Time:</strong> {data.LastUserTimestamp.replace('T', " ").replace('Z', "").substring(0, 16)}</p>
                                        <p> <strong>Last AP:</strong> {data.LastAp} </p>
                                        <p> <strong>Last AP Timestamp:</strong> {data.LastAPTimestamp.replace('T', " ").replace('Z', "").substring(0, 16)}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )
            }
            case 'DeviceRegister': {
                /*
                    AndroidVer: "11"
                    EMMGroup: "SAS WiFi"
                    EMMId: "xCoverPro_4QAE"
                    ICCId: null
                    IMEI: "352744112441438"
                    LastAPTimestamp: "2024-07-03T06:15:00.000Z"
                    LastAp: "T1I:2E:MOMRM"
                    LastUserDeptName: "PCS"
                    LastUserGhrId: "18505675"
                    LastUserTimestamp: "2024-04-17T13:57:47.900Z"
                    MacAddress: "C8BD6912C691"
                    McuvicId: "xCoverPro_C691"
                    ModelId: "SM-G715U1"
                    ModelName: "XCover Pro"
                    PhoneNum: null
                    VPNId: null
                    ashift: null
                    assignedUser: null
                    bshift: null
                    checkTimestamp: null
                    checkUser: null
                    cshift: null
                    dept_name_short: "PCS"
                    deviceNotes: null
                    dshift: null
                    full_name: "Richard Holtrop"
                    gsWave: "55500"
                    mysingle_id: "r.holtrop"
                    nt_id: "rholtrop5675"
                    ownerTeam: "Photo"
                    registerDate: "2024-06-09"
                    serialNumber: "R58R76P4QAE"
                */
                return (
                    <>
                        <button className={styles.actionButton} onClick={togglePopup}> Details </button>
                        {isOpen && (
                            <div className={styles.overlay} onClick={togglePopup}>
                                <div className={styles.content}>
                                    <button className={styles.close} onClick={togglePopup}> X </button>
                                    <div className={styles.section}>
                                        <h2>Device Information</h2>
                                        <p> <strong>Serial Number:</strong> {data.serialNumber} </p>
                                        <p> <strong>Model/Version:</strong> {data.ModelName} - {data.AndroidVer} </p>
                                        <p> <strong>MAC Address:</strong> {data.MacAddress} </p>
                                        <p> <strong>gsWave:</strong> {data.gsWave} </p>
                                    </div> <br />
                                    <div className={styles.section}>
                                        <h2>Account Information</h2>
                                        <p> <strong>EMM Account/Group:</strong> {data.EMMId} - {data.EMMGroup} </p>
                                        <p> <strong>mCUVIC Account:</strong> {data.McuvicId}</p>
                                        <p> <strong>MAC Address:</strong> {data.MacAddress} </p>
                                    </div> <br />
                                    <div className={styles.section}>
                                        <h2>Owner Information</h2>
                                        <p> <strong>Team:</strong> {data.ownerTeam} </p>
                                        <p> <strong>Assignment:</strong> {data.assignedUser}</p>
                                        <p> <strong>A Shift:</strong> {data.ashift}</p>
                                        <p> <strong>B Shift:</strong> {data.bshift}</p>
                                        <p> <strong>C Shift:</strong> {data.cshift}</p>
                                        <p> <strong>D Shift:</strong> {data.dshift}</p>
                                    </div> <br />
                                    <div className={styles.section}>
                                        <h2>Latest Information <p> ! Last user is tracked on Fab&Infra login !</p> </h2>

                                        <p> <strong>Last User:</strong> {data.full_name}</p>
                                        <p> <strong>Login Time:</strong> {data.LastUserTimestamp.replace('T', " ").replace('Z', "").substring(0, 16)}</p>
                                        <p> <strong>Last AP:</strong> {data.LastAp} </p>
                                        <p> <strong>Last AP Timestamp:</strong> {data.LastAPTimestamp.replace('T', " ").replace('Z', "").substring(0, 16)}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )
            }
            case 'DeviceUnregister': {
                /* 
                    SerialNum: "R52M60EEYSY"
                    AndroidVer: "9"
                    ModelName: "Tab S4"
                    MacAddress: "B06FE041852A"
                    McuvicId: "TabS4_852A"
                    EMMId: "TabS4_EYSY"
                    EMMGroup: "SAS WiFi"
                    ModelId: "SM-T830"
                    ICCId: null
                    IMEI: null          
                    EMMStatus: "Active"      
                    PhoneNum: null                    
                    VPNId: null                   
                    LastAPTimestamp: "2024-07-02T23:20:00.000Z"
                    LastAp: "A2O:2W:AP21"
                    LastUserDeptName: "Photo SA Spinner"
                    LastUserGhrId: "22520656"
                    LastUserTimestamp: "2024-05-24T09:59:31.503Z"
                    dept_name_short: "Photo"
                    full_name: "Vince Nguyen"
                    mysingle_id: "vince.nguyen"
                    nt_id: "vnguyen0656" 
                */
                return (
                    <>
                        <button className={styles.actionButton} onClick={togglePopup}> Details </button>
                        {isOpen && (
                            <div className={styles.overlay} onClick={togglePopup}>
                                <div className={styles.content}>
                                    <button className={styles.close} onClick={togglePopup}> X </button>
                                    <div className={styles.section}>
                                        <h2>Device Information</h2>
                                        <p> <strong>Serial Number:</strong> {data.SerialNum} </p>
                                        <p> <strong>Model/Version:</strong> {data.ModelName} - {data.AndroidVer} </p>
                                        <p> <strong>MAC Address:</strong> {data.MacAddress} </p>
                                    </div> <br />
                                    <div className={styles.section}>
                                        <h2>Account Information</h2>
                                        <p> <strong>EMM Account/Group:</strong> {data.EMMId} - {data.EMMGroup} </p>
                                        <p> <strong>mCUVIC Account:</strong> {data.McuvicId}</p>
                                    </div> <br />
                                    <div className={styles.section}>
                                        <h2>Latest Information <p> ! Last user is tracked on Fab&Infra login !</p> </h2>

                                        <p> <strong>Last User:</strong> {data.full_name} - {data.dept_name_short} </p>
                                        <p> <strong>Login Time:</strong> {data.LastUserTimestamp.replace('T', " ").replace('Z', "").substring(0, 16)}</p>
                                        <p> <strong>Last AP:</strong> {data.LastAp} </p>
                                        <p> <strong>Last AP Timestamp:</strong> {data.LastAPTimestamp.replace('T', " ").replace('Z', "").substring(0, 16)}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )
            }
            case 'UserRegister': {
                /*
                    appRole: "User"
                    dept_name: "Photo Ops Productivity Planning & PM"
                    dept_name_short: "Photo"
                    full_name: "Jud duPerier"
                    ghrNumber: "06759520"
                    mysingle_id: "j.duperier"
                    nt_id: "rduperier"
                    teamName: "Photo"
                */

                return (
                    <>
                        <button className={styles.actionButton} onClick={togglePopup}> Details </button>
                        {isOpen && (
                            <div className={styles.overlay} onClick={togglePopup}>
                                <div className={styles.content}>
                                    <button className={styles.close} onClick={togglePopup}> X </button>
                                    <div className={styles.section}>
                                        <h2>User Information</h2>
                                        <p> <strong>Name:</strong> {data.full_name} </p>
                                        <p> <strong> Assigned Team: </strong> {data.teamName} </p>
                                        <p> <strong> Team Full: </strong> {data.dept_name} </p>
                                        <p> <strong> Team Short: </strong> {data.dept_name_short} </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )
            }
            case 'UserUnregister': {
                /*
                    GHR_ID: "11540049"
                    dept_name: "Photo Ops"
                    dept_name_short: "Photo"
                    full_name: "John Zubek"
                    mysingle_id: ""
                    nt_id: ""
                    title: "Indirect-Etc."
                */
                return (
                    <>
                        <button className={styles.actionButton} onClick={togglePopup}> Details </button>
                        {isOpen && (
                            <div className={styles.overlay} onClick={togglePopup}>
                                <div className={styles.content}>
                                    <button className={styles.close} onClick={togglePopup}> X </button>
                                    <div className={styles.section}>
                                        <h2>User Information</h2>
                                        <p> <strong>Name:</strong> {data.full_name} </p>
                                        <p> <strong> Team Full: </strong> {data.dept_name} </p>
                                        <p> <strong> Team Short: </strong> {data.dept_name_short} </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )
            }
            default: {
                return (
                    <div>
                        <button onClick={togglePopup}> Click Me </button>
                        {isOpen && (
                            <div className='popup-overlay' onClick={togglePopup}>
                                <div className='popup-content'>
                                    <button className='close-button' onClick={togglePopup}> X </button>
                                    <p> Unknown Usage </p>
                                </div>
                            </div>
                        )}
                    </div>
                )
            }

        }
    }

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    return popupSelector(type)
}

export default PopupComponent