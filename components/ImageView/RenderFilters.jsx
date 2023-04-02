import React, { useState, useEffect, useContext } from 'react'
import imageConfig from '../../public/content/schema.json'
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import { AppContext } from '@/pages/_app';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';

function RenderFilters() {

    const applicationContext = useContext(AppContext)

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        let uniqueFilters = []
        const labels = localStorage.getItem("labels")
        if (labels != null) {
            applicationContext.filterDispatch({ type: "UNIQUE_FILTERS", payload: JSON.parse(labels) })
        }
        setLoading(false)
    }, [])
    const updateSelectedFilters = (event) => {
        let checked = event.target.checked
        let selectedFilter = event.target.id
        let currSelectedFilters = [...applicationContext.filters.selectedFilters]
        let unique = [...applicationContext.filters.uniqueFilters]
        if (checked && currSelectedFilters.indexOf(selectedFilter) == -1) {
            currSelectedFilters.push(selectedFilter)
        } else {
            currSelectedFilters.splice(currSelectedFilters.indexOf(selectedFilter), 1)
        }
        applicationContext.filterDispatch({ type: "UPDATE_SELECTED_FILTERS", payload: { selected: currSelectedFilters, unique: unique } })
    }

    return (
        <div>
            <h4>Filters</h4>
            {loading ? <Box
                sx={{
                    bgcolor: '#121212',
                    p: 8,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Skeleton
                    sx={{ bgcolor: 'grey.900' }}
                    variant="rectangular"
                    width={"100%"}
                    height={"100vh"}
                />
            </Box> : applicationContext.filters.uniqueFilters.map(label => {
                return (

                    <FormGroup key={label}>
                        <FormControlLabel control={<Checkbox sx={{
                            color: "white",
                            '&.Mui-checked': {
                                color: "white",
                            },
                        }} onClick={(e) => updateSelectedFilters(e)} id={label} color="success" />} label={label} />
                    </FormGroup>

                )

            })}
        </div>
    )
}

export default RenderFilters