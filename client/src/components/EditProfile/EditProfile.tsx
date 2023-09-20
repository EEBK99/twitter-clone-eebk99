import React, { Dispatch, FC, SetStateAction, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

interface EditProfileProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const EditProfile: FC<EditProfileProps> = ({ setOpen }): JSX.Element => {
  const [img, setImg] = useState<any>();
  const [imgUploadProgress, setImgUploadProgress] = useState(0);

  const uploadImg = (file) => {};

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

        <input
          type="file"
          className="bg-transparent border border-slate-500 rounded p-2"
          accept="image/*"
          onChange={(e) => setImg(e?.target?.files?.[0])}
        />
        <p>Delete Account</p>
        <button className="bg-red-500 text-white py-2 rounded-full">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
