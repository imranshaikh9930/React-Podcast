import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignedIn from "./pages/SignedIn";
import Podcast from "./pages/podcast";
import Forgot from "../src/components/ForgotComponent/Forgot";
import StartPodcast from "./pages/startPodcast";
import Profile from "./pages/profile";
import Notfound from "./components/NotFound/Notfound";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { setUser } from "./slices/userSlice";
import { useDispatch } from "react-redux";
import { db, auth } from "./firebase";
import PrivateRoutes from "./common/PrivateRoutes";
import PodcastDetails from "./pages/podcastDetails";
import CreateAnEpisode from "./pages/CreateAnEpisode";
import useOnlineStatus from "../src/feature/onlineStatus";
function App() {
  const isOnline = useOnlineStatus();
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();

              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid,
                })
              );
            }
          },
          (error) => {
            console.error("Error fetching user data", error);
          }
        );

        return () => {
          unsubscribeSnapshot();
        };
      }
    });
    return () => {
      unsubscribeAuth();
    };


   
    
  }, []);

  useEffect(()=>{

    if(isOnline){
      toast.success("Online")
    }else{
      toast.error("Offline");
    }
  },[isOnline])

  
  
  
  


  return (
    <div className="app">
      <ToastContainer 
        position="bottom-right"
      />
      <Router>
        {/* <Header/> */}
        <Routes>
          <Route path="/" element={<SignedIn />} />
          
          <Route element={<PrivateRoutes />}>
            <Route path="/podcast" element={<Podcast />} />
            <Route path="/start-a-podcast" element={<StartPodcast />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/podcast/:id" element={<PodcastDetails/>}/>
            <Route path="/podcast/:id/create-episode" element={<CreateAnEpisode/>}/>
         
          </Route>
          <Route path="/forgot" element={<Forgot/>}/>
          <Route path="/*" element={<Notfound/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
