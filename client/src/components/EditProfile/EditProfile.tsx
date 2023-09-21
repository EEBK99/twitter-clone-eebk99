import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";

import app from "../../firebase";
import { changeProfile, logout } from "../../store/slices/userSlice";

interface EditProfileProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const EditProfile: FC<EditProfileProps> = ({ setOpen }): JSX.Element => {
  const [img, setImg] = useState<any>();
  const [imgUploadProgress, setImgUploadProgress] = useState(0);

  const { currentUser } = useSelector((state: any) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uploadImg = (file: any) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgUploadProgress(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          try {
            const updateProfile = await axios.put(
              `${process.env.REACT_APP_BACKEND_API_URL}/users/${currentUser?._id}`,
              {
                profilePicture: downloadURL,
              }
            );
          } catch (error) {
            console.log("error", error);
          }

          dispatch(changeProfile(downloadURL));
        });
      }
    );
  };

  const handleDelete = async () => {
    const deleteProfile = await axios.delete(
      `${process.env.REACT_APP_BACKEND_API_URL}/users/${currentUser?._id}`
    );
    dispatch(logout());
    navigate("/signin");
  };

  useEffect(() => {
    img && uploadImg(img);
  }, [img]);

  return (
    <div className="absolute w-full h-full top-0 left-0 bg-transparent flex items-center justify-center">
      <div className="w-[600px] h-[600px] bg-slate-200 rounded-lg p-8 flex flex-col gap-4 relative">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 cursor-pointer"
        >
          X
        </button>
        <h2 className="font-bold text-xl">Edit Profile</h2>
        <p>Choose a new profile picture</p>

        {imgUploadProgress > 0 ? (
          "Uploading " + imgUploadProgress + "%"
        ) : (
          <input
            type="file"
            className="bg-transparent border border-slate-500 rounded p-2"
            accept="image/*"
            onChange={(e) => setImg(e?.target?.files?.[0])}
          />
        )}

        <p>Delete Account</p>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 rounded-full"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
