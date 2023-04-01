import axios from 'axios'
import React, { useState } from 'react'
import { useContext, useEffect } from 'react'
import { AppContext } from '../../pages/_app'
import { useRouter } from 'next/router'
import imagesJson from '../../public/content/schema.json'
import Image from 'next/image'

function RenderImages() {
    const applicationContext = useContext(AppContext)
    const router = useRouter()
    const [filteredIndexes, setFilteredIndexs] = useState([])

    useEffect(() => {
        console.log("effecting")
        //todo render this from localstorage
        let updatedFilteredIndexes = [];
        let selectedFilterLabels = [...applicationContext.filters.selectedFilters]
        // console.log(selectedFilterLabels)
        let animalData = localStorage.getItem("animalData") // animal data object
        if(animalData != null){
            animalData = JSON.parse(animalData)
            animalData.map(imageObject => {
                imageObject.img_labels.map(label => {
                    if (selectedFilterLabels.indexOf(label) != -1 && updatedFilteredIndexes.indexOf(imageObject.id) == -1) {
                        updatedFilteredIndexes.push(imageObject.id)
                    }
                })
            })

            if(selectedFilterLabels.length == 0){
                setFilteredIndexs(animalData.map(object => object.id))
            } else{
                setFilteredIndexs(updatedFilteredIndexes)
            }
        }
        
        
    }, [applicationContext.filters.selectedFilters.length])
    const styles = {
        imageContainer: {
            width: "25%",
            height: "250px",
            margin: "1%",
            padding: "1%",
            display: "flex",
            justifyContent: "center"
        },
        image: {
            maxWidth: "100%",
            maxHeight: "100%",
            display: "block",
            objectFit: "cover"
        }

    }
    return (
        <>
            {imagesJson.images.map(imageObject => {
                if (filteredIndexes.indexOf(imageObject.id) != -1) {
                    return (
                        <div style={styles.imageContainer} key={imageObject.id}>
                            <Image src={imageObject.img_url} alt="something"
                                width={200}
                                height={300}
                                style={styles.image}
                                sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
                            // style={{ height: '10%', width: '10%' }}  // 16:10 aspect ratio
                            />
                        </div>
                    )
                }
            })}
        </>
        
    )
}

export default RenderImages