import React,{useState,useEffect} from 'react';
import { collection, onSnapshot, query } from "firebase/firestore";
import {db} from "../firebase";
import {useDispatch,useSelector} from 'react-redux';
import { setPodcasts } from "../slices/podcasts";
import Header from "../components/Header/Header";
import PodcastCard from "../components/PodCastCard/PodcastCard"
import InputComponent from '../common/Input/Input'; 
const PodCasts = () => {

      const dispatch = useDispatch();
      const podcasts = useSelector((state) => state.podcasts.podcasts);
      const[search,setSearch] = useState("");
      //  console.log(podcasts);
       
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

      var filteredPodcasts = podcasts.filter((item) =>
      item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
    );
    
  return (
    <div>
    <Header />
    <div className="input-wrapper" style={{ marginTop: "2rem" }}>
      <h1>Discover Podcasts</h1>
      <InputComponent
        state={search}
        setState={setSearch}
        placeholder="Search By Title"
        type="text"
      />

      {filteredPodcasts.length > 0 ? (
        <div className="podcasts-flex" style={{ marginTop: "1.5rem" }}>
          {filteredPodcasts.map((item) => {
            return (
              <PodcastCard
                key={item.id}
                id={item.id}
                title={item.title}
                displayImage={item.displayImage}
                createdBy= {item.createdBy}
              />
            );
          })}
        </div>
      ) : (
        <p>{search ? "Podcast Not Found" : "No Podcasts On The Platform"}</p>
      )}
    </div>
  </div>
  )
}

export default PodCasts