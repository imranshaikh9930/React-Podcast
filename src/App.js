import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import SignUp from "./pages/SignedUp";
import Podcast from "./pages/podcast";
import StartPodcast from "./pages/startPodcast";
import Profile from "./pages/profile";
import { ToastContainer } from "react-toastify";
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

function App() {
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
  return (
    <div className="app">
      <ToastContainer />
      <Router>
        {/* <Header/> */}
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/podcast" element={<Podcast />} />
            <Route path="/start-a-podcast" element={<StartPodcast />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/podcast/:id" element={<PodcastDetails/>}/>
            <Route path="/podcast/:id/create-episode" element={<CreateAnEpisode/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
