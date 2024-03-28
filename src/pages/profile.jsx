import React,{useEffect} from 'react'
import Header from '../components/Header/Header';
import {useSelector,useDispatch} from "react-redux";
import Button from '../common/Button/Button';
import { signOut } from 'firebase/auth';
import { auth,db } from '../firebase';
import {toast } from 'react-toastify';
import PodcastCard from '../components/PodCastCard/PodcastCard';
import { onSnapshot,query,collection } from 'firebase/firestore';
import { setPodcasts } from '../slices/podcasts';
const Profile = () => {
  const user = useSelector((state)=>state.user.user);
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  const dispatch = useDispatch();
  console.log(podcasts);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastsData));
      },
      (error) => {
        console.error("Error fetching podcasts:", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  const handleLogout = ()=>{

    signOut((auth)).then(()=>{
      toast.success("User Logged Out !");
    }).catch((err)=>{

      console.log(err)
    })
  }

  if(!user){
    return <p>Loading....</p>
  }



  return (
    <div className='profile'>
      <Header/>
{/* 
      <h1>{user.name}</h1>
      <h1>{user.email}</h1>
      <h1>{user.uid}</h1>
    <Button text="Logout" onClick={handleLogout}/> */}


    <div className="profile-card">
        {/* <img src={displayImage} alt="displayImage" className="display-image-podcast" /> */}
        <h1 className="profile-name">{user.name}</h1>
        <h4 className="profile-emai;">{user.email}</h4>
       
      </div>
      {/* <div className="logout-btn"> */}

      <Button className="btn" onClick={handleLogout} text={"Logout"}/>
      {/* </div> */}

      <h1 className='profile-podcast-title'>Your Podcasts</h1>

    <div className='your-podcast'>
    {
      podcasts.map((item)=>{

        return (
          <PodcastCard
                key={item.id}
                id={item.id}
                title={item.title}
                displayImage={item.displayImage}
              />
        )

      })
    }
  
    </div>
   


    </div>
  )
}

export default Profile