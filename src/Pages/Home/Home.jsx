import React, { useState,useEffect } from 'react'
import { databases } from '../../Appwrite/Auth'
import conf from '../../conf/conf'
import HomePostCard from './HomePostCard'
import './style.css'
import { Helmet } from 'react-helmet'


function Home() {
    const[data,setData]=useState([])
    
    useEffect(() => {
        const promise = databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            );
    
            promise.then(function(res) {
                console.log(res);
                setData(res.documents)
            },function(error) {
                console.log(error);
            })
    }, [])
    console.log(data);

    const BlankPage = ()=>{
        return(
          <div className='w-full h-screen flex flex-wrap items-center justify-center'>
            <div className=''>
            <h1 className='text-2xl'>No post to show. Please Log In and Add post.</h1>
            </div>
          </div>
        )
        }
    

  return (
    <>
    <Helmet>
        {/* Optimize title tag */}
        <title>Friend fusion</title>
        {/* Add meta description */}
        <meta
          name="description"
          content="friend fusion - The ultimate social media app for sharing your reactions online and engaging with others. Join now!"
        />
      </Helmet>
    <div className='card pt-16'>
        {data && data.length!==0 && data.map((item)=>(
        <div key={item.$id} className='lala m-3 rounded-md'>
          <HomePostCard item={item} />
        </div>
      ))}
    </div>
    {data.length===0 && <BlankPage />}
    </>
  )
}

export default Home