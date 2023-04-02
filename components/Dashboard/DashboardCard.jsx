import Image from 'next/image'
import React,{useEffect} from 'react'

import {
    Button, Box
    , InputLabel
    , MenuItem
    , FormControl
    , Select
} from '@mui/material';

const styles = {
    imageCard: {
        minHeight: "300px",
        margin: "10px",
        width: "100%",
        display: "flex"
    },
    imageContainer: {
        width: "40%",
        height: "auto",
        margin: "1%",
        padding: "1%",
        display: "flex",
        justifyContent: "center",
        background: "#D4EFDF",
        // padding:"10px",
        borderRadius: "10px"
    },
    labelsContainer: {
        width: "60%",
        // border: "2px solid green",
        margin: "1%",
        background: "#D4EFDF",
        padding: "10px",
        borderRadius: "10px"
    },
    image: {
        maxWidth: "100%",
        maxHeight: "100%",
        display: "block",
        objectFit: "cover",
        borderRadius: "10px"
    },
    labels: {
        marginTop: "1%",
    }
}

function DashboardCard({ imageData }) {
    
    const [labels, setLabels] = React.useState([]);
    const [schema, setSchema] = React.useState([]);
    const handleClick = (event, type) => {
        let latestUpdatedSchema = localStorage.getItem("animalData")
        if(latestUpdatedSchema != null){
            latestUpdatedSchema = JSON.parse(latestUpdatedSchema)
            let value = event.target.id
            value = value.split(":") //id = "0:label"
            let imageId = value[0]
            let selectedLabel = value[1]
            latestUpdatedSchema.map(item => {
                if(type=="add"){
                    if(item.id == imageId && item.img_labels.indexOf(selectedLabel)==-1){
                        item.img_labels.push(selectedLabel)
                        localStorage.setItem("animalData", JSON.stringify(latestUpdatedSchema))
                        setSchema(latestUpdatedSchema)
                    }
                }
                if(type=="remove"){
                    if(item.id == imageId && item.img_labels.indexOf(selectedLabel)!=-1){
                        let updatedLabels = [...item.img_labels]
                        
                        updatedLabels.splice(updatedLabels.indexOf(selectedLabel),1)
                        item.img_labels=updatedLabels
                        localStorage.setItem("animalData", JSON.stringify(latestUpdatedSchema))
                        setSchema(latestUpdatedSchema)
                    }
                }
            })
            console.log(latestUpdatedSchema)
        }
        // setAge(event.target.value);
    };
    
    useEffect(()=>{
        const animalData = localStorage.getItem("animalData")
        const labels = localStorage.getItem("labels")
        if(labels !=null){
            setLabels(JSON.parse(labels))
        }
        if(animalData !=null){
            setSchema(JSON.parse(animalData))
        }
    },[])
    return (
        <div style={styles.imageCard}>
            <div style={styles.imageContainer}>
                <Image src={imageData.img_url} alt="something"
                    priority={true}
                    width={400}
                    height={300}
                    style={styles.image}
                    sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
                // style={{ height: '10%', width: '10%' }}  // 16:10 aspect ratio
                />
            </div>
            <div style={styles.labelsContainer}>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Assign Label</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            label="Assign label"
                            value="select"
                            onClick={(e)=>handleClick(e,"add")}
                        >
                            <MenuItem id={imageData.id+":select"} key={"select"} value={"select"}>select</MenuItem>
                            {labels.length > 0 ? labels.map(label =>{
                                return <MenuItem id={imageData.id+":"+label} key={label} value={label}>{label}</MenuItem>
                            }) : null}
                        </Select>
                    </FormControl>
                </Box>

                <div style={styles.labels}>
                    {schema.length > 0 ? schema.map(animalItem => {
                        if(animalItem.id == imageData.id){
                            return animalItem.img_labels.map(label =>{
                                return <Button onClick={(e)=>handleClick(e,"remove")} style={{ marginRight: "5px" }} key={label} id={imageData.id+":"+label} color="warning" variant="contained">{label}</Button>
                            })   
                        }
                        
                    }) : null}
                </div>
            </div>
        </div>
    )
}

export default DashboardCard