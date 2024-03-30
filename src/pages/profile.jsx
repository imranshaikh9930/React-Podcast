import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../firebase';
import { onSnapshot, query, collection } from 'firebase/firestore';
import { setPodcasts } from '../slices/podcasts';
import Header from '../components/Header/Header';
import PodcastCard from '../components/PodCastCard/PodcastCard';
import defaultProfileImage from '../Assets/images.jpeg'; 
import { setUser } from '../slices/userSlice';

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  const [relatedPodcasts, setRelatedPodcasts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'podcasts')),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastsData));
      },
      (error) => {
        console.error('Error fetching podcasts:', error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    const unsubscribeUsers = onSnapshot(
      query(collection(db, 'users')),
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const userDataItem = { id: doc.id, ...doc.data() };
          if (user && doc.id === user.uid) {
            setCurrentUser(userDataItem);
            dispatch(setUser(userDataItem)); // Update user in Redux store
          }
        });
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );

    return () => {
      unsubscribeUsers();
    };
  }, [dispatch, user]);

  useEffect(() => {
    if (user && podcasts.length > 0) {
      const userRelatedPodcasts = podcasts.filter((podcast) => podcast.createdBy === user.uid);
      setRelatedPodcasts(userRelatedPodcasts);
    }
  }, [podcasts, user]);

  return (
    <div className='profile'>
      <Header />

      <div className='profile-card'>
        {/* Render profile image or default profile image */}
        <img
          src={currentUser ? currentUser.profilePic || defaultProfileImage : defaultProfileImage}
          alt='displayImage'
          className='display-image-podcast'
        />
        {/* Render user's name */}
        {/* Uncomment below line if you have user's name */}
        <h2 className='profile-name'>{currentUser ? currentUser.name : ''}</h2>
      </div>

      <h3 className='profile-podcast-title'>Your Podcasts</h3>

      <div className='your-podcast'>
        {/* Render podcast cards */}
        {relatedPodcasts.length ? (
          <>
            {relatedPodcasts.map((item) => (
              <PodcastCard
                key={item.id}
                id={item.id}
                title={item.title}
                displayImage={item.displayImage}
                createdBy={item.createdBy}
              />
            ))}
          </>
        ) : (
          <p className='profile-podcast-title'>No Podcasts Found</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
