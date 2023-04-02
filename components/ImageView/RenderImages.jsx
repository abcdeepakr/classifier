import axios from 'axios'
import React, { useState } from 'react'
import { useContext, useEffect } from 'react'
import { AppContext } from '../../pages/_app'
import { useRouter } from 'next/router'
import imagesJson from '../../public/content/schema.json'
import Image from 'next/image'
import styles from '../../styles/global.module.css'
function RenderImages() {
    const applicationContext = useContext(AppContext)
    const router = useRouter()
    const [filteredIndexes, setFilteredIndexs] = useState([])
    const [imageLoading, setImageLoading] = useState({});
    
    useEffect(() => {
        //todo render this from localstorage
        let updatedFilteredIndexes = [];
        let selectedFilterLabels = [...applicationContext.filters.selectedFilters]
        let animalData = localStorage.getItem("animalData") // animal data object
        if(animalData != null){
            animalData = JSON.parse(animalData)
            animalData.map(imageObject => {
                imageObject.img_labels.map(label => {
                    if (selectedFilterLabels.indexOf(label) != -1 && updatedFilteredIndexes.indexOf(imageObject.id) == -1) {
                        updatedFilteredIndexes.push(imageObject.id)
                    }
                })

                let imageLoadingState = {...imageLoading}
                imageLoading[imageObject.id] = false
                setImageLoading(imageLoadingState)
            })

            if(selectedFilterLabels.length == 0){
                setFilteredIndexs(animalData.map(object => object.id))
            } else{
                setFilteredIndexs(updatedFilteredIndexes)
            }
        }
        
        
    }, [applicationContext.filters.selectedFilters.length])
    
    return (
        <>
            {imagesJson.images.map(imageObject => {
                if (filteredIndexes.indexOf(imageObject.id) != -1) {
                    return (
                        <div className={styles.imageContainer} key={imageObject.id}>
                            <Image 
                                    priority={true}
                            src={imageObject.img_url} alt="something"
                                width={200}
                                height={300}
                                className={styles.image}
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