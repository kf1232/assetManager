import styles from './RenderTableTitle.module.css'

function RenderTableTitle(titleText: string, titleDescription: string) {
    return (
        <div className={styles.titleContainer}>
            <h1 className={styles.title}> {titleText} </h1>
            <p className={styles.description}> {titleDescription} <br /><br /></p>
        </div>
    )
}

export default RenderTableTitle