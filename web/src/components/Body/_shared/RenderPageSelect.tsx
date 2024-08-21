import styles from './RenderPageSelect.module.css'

const RenderPageSelect = (onPrior: () => void, onNext: () => void, current: number, max: number) => {

    return (
        <div className={styles.PageSelectContainer}>
            <button className={styles.PageSelectBack} onClick={onPrior} disabled={current === 1}>
                Previous
            </button>
            <span className={styles.PageSelectText}>
                Page {current} of {max ? max : 1}
            </span>
            <button className={styles.PageSelectForward} onClick={onNext} disabled={current === max}>
                Next
            </button>
        </div>
    )
}

export default RenderPageSelect;