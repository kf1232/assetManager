import React, { useCallback } from 'react';
import styles from './styles.module.css'

const supportURL: Record<string, string> = {
    GUIDE: 'https://confluence.companyaustin.com/display/WSOL/Mobile+Service+-+Mobile+Admin+Portal',
    SERV: 'https://jira.companyaustin.com/plugins/servlet/desk/portal/13/create/628',
    POLICY: 'https://confluence.companyaustin.com/display/WSOL/Wireless+Services',
    TICKET: 'https://jira.companyaustin.com/plugins/servlet/desk/portal/18/create/400',
}

type ButtonData = {
    key: keyof typeof supportURL;
    label: string;
}

const buttonData: ButtonData[] = [
    { key: 'GUIDE', label: 'User Guide' },
    { key: 'SERV', label: 'SERV Link' },
    { key: 'POLICY', label: 'Mobile Policy' },
    { key: 'TICKET', label: 'Ticket Support' }
];

const Footer: React.FC = () => {

    const openURL = useCallback((key: keyof typeof supportURL) => {
        const url = supportURL[key];
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            console.error('Invalid URL key:', key);
        }
    }, []);

    return (
        <div className={styles.FooterMain}>
            {buttonData.map(({ key, label }) => (
                <button
                    key={key}
                    onClick={() => openURL(key)}
                    className={styles.FooterButton}
                    aria-label={`Open ${label}`}
                > {label} </button>
            ))}
        </div>
    );
};

export default Footer;
