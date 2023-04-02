import React from 'react'
import RenderFilters from './RenderFilters'
import RenderImages from './RenderImages'

function RenderDashboard() {
    const styles = {
        dashboardContainer: {
            display: "flex",
            width: "100%",
        },
        filtersContainer: {
            width: "10%",
            display: "flex",
            justifyContent: "center",
            // alignItems:"center",
            padding: "10px",
            position:"sticky"
            
        },
        ImagesContainer: {
            display: "flex",
            flexWrap: "wrap",
            width: "90%",
            justifyContent: "center",
            alignItems: "center"
        }
    }
    return (
        <div style={styles.dashboardContainer}>
            <div style={styles.filtersContainer}>
                <RenderFilters />
            </div>

            <div style={styles.ImagesContainer}>
                <RenderImages />
            </div>

        </div>
    )
}

export default RenderDashboard