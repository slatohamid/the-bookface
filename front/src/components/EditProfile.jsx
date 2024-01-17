import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "./TextInput";
import Loading from "./Loading";
import CustomButton from "./CustomButton";
import { UpdateProfile, UserLogin } from "../redux/userSlice";
import { apiRequest, handleFileUpload } from "../utils";

const EditProfile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [picture, setPicture] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { ...user },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrMsg("");

    try {
      const uri = picture && (await handleFileUpload(picture));

      const { firstName, lastName, location, profession } = data;

      const res = await apiRequest({
        url: "/users/update-user",
        data: {
          firstName,
          lastName,
          location,
          profession,
          profileUrl: uri ? uri : user?.profileUrl,
        },
        method: "POST",
        token: user?.token,
      });

      if (res.status === "failed") {
        setErrMsg(res);
      } else {
        setErrMsg(res);
        const newUser = { tokent: res?.token, ...res?.user };
        dispatch(UserLogin(newUser));

        setTimeout(() => {
          dispatch(UpdateProfile(false));
        }, 3000);
      }

      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    dispatch(UpdateProfile(false));
  };
  const handleSelect = (e) => {
    setPicture(e.target.files[0]);
  };

  return (
    <>
      <div className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-[#000] opacity-70"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
          &#8203;
          <div
            className="inline-block align-bottom bg-primary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="flex justify-between px-6 pt-5 pb-2">
              <label
                htmlFor="name"
                className="block font-medium text-xl text-ascent-1 text-left"
              >
                Edit Profile
              </label>

              <button className="text-ascent-1" onClick={handleClose}>
                <MdClose size={22} />
              </button>
            </div>
            <form
              className="px-4 sm:px-6 flex flex-col gap-3 2xl:gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextInput
                name="firstName"
                label="First Name"
                placeholder="First Name"
                type="text"
                styles="w-full"
                register={register("firstName", {
                  required: "First Name is required!",
                })}
                error={errors.firstName ? errors.firstName?.message : ""}
              />

              <TextInput
                label="Last Name"
                placeholder="Last Name"
                type="lastName"
                styles="w-full"
                register={register("lastName", {
                  required: "Last Name do no match",
                })}
                error={errors.lastName ? errors.lastName?.message : ""}
              />

              <TextInput
                name="profession"
                label="Profession"
                placeholder="Profession"
                type="text"
                styles="w-full"
                register={register("profession", {
                  required: "Profession is required!",
                })}
                error={errors.profession ? errors.profession?.message : ""}
              />

              <TextInput
                label="Location"
                placeholder="Location"
                type="text"
                styles="w-full"
                register={register("location", {
                  required: "Location do no match",
                })}
                error={errors.location ? errors.location?.message : ""}
              />

              <label
                className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4"
                htmlFor="imgUpload"
              >
                <input
                  type="file"
                  className=""
                  id="imgUpload"
                  onChange={(e) => handleSelect(e)}
                  accept=".jpg, .png, .jpeg"
                />
              </label>

              {errMsg?.message && (
                <span
                  role="alert"
                  className={`text-sm ${
                    errMsg?.status === "failed"
                      ? "text-[#f64949fe]"
                      : "text-[#2ba150fe]"
                  } mt-0.5`}
                >
                  {errMsg?.message}
                </span>
              )}

              <div className="py-5 sm:flex sm:flex-row-reverse border-t border-[#66666645]">
                {isSubmitting ? (
                  <Loading />
                ) : (
                  <CustomButton
                    type="submit"
                    containerStyles={`inline-flex justify-center rounded-md bg-@tailwind base;
                    @tailwind components;
                    @tailwind utilities;
                    
                    
                    ::-webkit-scrollbar {
                      display: none;
                       -ms-overflow-style: none;  /* IE and Edge */
                      scrollbar-width: none;
                    }
                    
                    .topbar{
                    position: sticky;
                    top: 0px;
                    z-index: 49;
                    }
                    
                    
                    .dots-container {
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      height: 100%;
                      width: 100%;
                      margin-bottom: 5px;
                    }
                    
                    .dot {
                      height: 12px;
                      width: 12px;
                      margin-right: 10px;
                      border-radius: 10px;
                      background-color: #fff;
                      animation: pulse 1.5s infinite ease-in-out;
                    }
                    
                    .dot:last-child {
                      margin-right: 0;
                    }
                    
                    .dot:nth-child(1) {
                      animation-delay: -0.3s;
                    }
                    
                    .dot:nth-child(2) {
                      animation-delay: -0.1s;
                    }
                    
                    .dot:nth-child(3) {
                      animation-delay: 0.1s;
                    }
                    
                    @keyframes pulse {
                      0% {
                        transform: scale(0.8);
                        background-color: #b3d4fc;
                        box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
                      }
                    
                      50% {
                        transform: scale(1.2);
                        background-color: #4b79e4;
                        box-shadow: 0 0 0 10px rgba(178, 212, 252, 0);
                      }
                    
                      100% {
                        transform: scale(0.8);
                        background-color: #2584f8;
                        box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
                      }
                    }
                    
                    @layer base {
                      :root {
                        --color-bg: 227 227 227;
                        --color-primary: 255 255 255;
                        --color-secondary:255 255 255;
                        --color-ascent1: 0 0 0;
                        --color-ascent2: 89 91 100;
                        --color-orange: 255 165 0; 
                        --color-white: 255 255 255;
                    
                      }
                      /* //15 23 42  21 30 49*/
                      [data-theme="dark"] {
                         --color-bg: 12 12 12;
                         --color-primary: 31 31 31;
                        --color-secondary: 47 45 48;
                        --color-ascent1: 255 255 255;
                        --color-ascent2: 164 161 162;
                        --color-orange: 255 165 0; 
                        /* //16 176 255; */
                        --color-white: 255 255 255;
                      }
                    } px-8 py-3 text-sm font-medium text-white outline-none`}
                    title="Submit"
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
