import React from 'react'
import RenderFilters from './RenderFilters'
import RenderImages from './RenderImages'
import styles from '../../styles/global.module.css'
function RenderDashboard() {
    
    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.filtersContainer}>
                <RenderFilters />
            </div>

            <div className={styles.ImagesContainer}>
                <RenderImages />
            </div>

        </div>
    )
}

export default RenderDashboard