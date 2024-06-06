import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, TextInput, Spinner } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { setCredentials, logout } from "../slices/authSlice";
import {
  useUpdateUserProfileMutation,
  useLogoutMutation,
} from "../slices/userApiSlice";
import { toast } from "react-toastify";

const DashProfile = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [isFormChanged, setIsFormChanged] = useState(false);
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const [updateUserProfile, { isLoading: loadingUpdate }] =
    useUpdateUserProfileMutation();
  const [logoutApiCall, { isLoading: loadingSingout }] = useLogoutMutation();

  useEffect(() => {
    setFormData({
      username: userInfo.username,
      email: userInfo.email,
      password: "",
      profilePicture: userInfo.profilePicture,
    });
  }, [userInfo]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData((prevData) => {
            const updatedData = {
              ...prevData,
              profilePicture: downloadURL,
            };
            const isChanged =
              JSON.stringify(updatedData) !==
              JSON.stringify({
                profilePicture: userInfo.profilePicture,
              });
            setIsFormChanged(isChanged);
            return updatedData;
          });
        });
      }
    );
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => {
      const updateData = { ...prevData, [id]: value };
      const isChanged =
        JSON.stringify(updateData) !==
        JSON.stringify({
          username: userInfo.username,
          email: userInfo.email,
          password: "",
          profilePicture: userInfo.profilePicture,
        });
      setIsFormChanged(isChanged);
      return updateData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUserProfile({
        userId: userInfo._id,
        ...formData,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("User updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleSignout = async () => {
    try {
      const res = await logoutApiCall().unwrap();
      dispatch(logout());
      toast.success(res);
      navigate("/sign-in");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || userInfo.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>

        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}

        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={userInfo.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={userInfo.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          Outline
          disabled={!isFormChanged}
        >
          {loadingUpdate ? (
            <>
              <Spinner size="sm" />
              <span className="pl-3">User profile updating...</span>
            </>
          ) : (
            "Update"
          )}
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer" onClick={handleSignout}>
          Sign Out
        </span>
      </div>
    </div>
  );
};

export default DashProfile;
