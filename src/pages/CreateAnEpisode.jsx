import React ,{useState}from 'react'
import {useNavigate,useParams} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import Header from '../components/Header/Header';
import Input from '../common/Input/Input';
import FileInput from '../common/Input/FileInput';
import Button from '../common/Button/Button';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage,auth, db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
const CreateAnEpisode = () => {
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [audioFile, setAudioFile] = useState();
  
    const [loading, setLoading] = useState(false);
  
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const audioFileHandle = (file)=>{
        setAudioFile(file);
    }

    const handleSubmit = async () => {
        setLoading(true);
        if ((title, desc, audioFile, id)) {
          try {
            const audioRef = ref(
              storage,
              `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
            );
            await uploadBytes(audioRef, audioFile);
    
            const audioURL = await getDownloadURL(audioRef);

            console.log("audioURL",audioURL);
            const episodeData = {
              title: title,
              description: desc,
              audioFile: audioURL,
            };
    
            await addDoc(collection(db, "podcasts", id, "episodes"), episodeData);
            toast.success("Episode Created Successfully");
            setLoading(false);
            navigate(`/podcast/${id}`);
            setTitle("");
            setDesc("");
            setAudioFile("");
          } catch (e) {
            toast.error(e.message);
            setLoading(false);
          }
        } else {
          toast.error("All Files Should Be There");
          setLoading(false);
        }
      };



  return (
    <div>
        <Header/>
        <div className="input-wrapper">
            <h1>Create An Episode</h1>
            <Input
          state={title}
          setState={setTitle}
          placeholder="Title"
          type="text"
          required={true}
        />
        <Input
          state={desc}
          setState={setDesc}
          placeholder="Description"
          type="text"
          required={true}
        />
        <FileInput
          accept={"audio/*"}
          id="audio-file-input"
          fileHandleFnc={audioFileHandle}
          text={"Upload Audio File"}
        />
        <Button
          text={loading ? "Loading..." : "Create Episode"}
          disabled={loading}
          onClick={handleSubmit}
        />
        </div>
    </div>
  )
}

export default CreateAnEpisode