import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Register = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { registerUser, updateUserProfile } = useAuth();

  const handleRegistration = (data) => {

    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then(() => {

        // 1. store the img into form data
        const formData = new FormData();
        formData.append("image", profileImg);

        // send the photo to the store and get url
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_PHOTO_HOST_API}`;
        axios.post(image_API_URL, formData).then((result) => {
          const imageUrl = result.data.data.display_url;

          const userInfo = {
            email : data.email,
            displayName : data.name,
            photoURL : imageUrl,
          }

          axiosSecure.post('/users', userInfo)
          .then(res => {
            if(res.data.insertedId){
              console.log('user created successfully in database');
            }
          })

          const updatedProfileData = {
            displayName: data.name,
            photoURL: imageUrl,
          };
          updateUserProfile(updatedProfileData)
            .then(() => {
              navigate(location?.state || '/')
            })
            .catch((error) => {
              console.log(error.code);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2 className="text-center text-4xl font-extrabold">Create an Account</h2>
      <p className="text-center text-base-300">Register with profast</p>

      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto mt-10">
        <form onSubmit={handleSubmit(handleRegistration)} className="card-body">
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              className="input"
              placeholder="your name"
              {...register("name", { required: true })}
            />
            <label className="label">Photo</label>
            <input
              type="file"
              className="file-input"
              placeholder="Upload your photo"
              {...register("photo", { required: true })}
            />
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <p className="text-warning">email is required</p>
            )}
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).+$/,
              })}
            />
            {errors.password?.type === "required" && (
              <p className="text-warning">password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-warning">
                password length should be at least 6
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-warning">
                Password must contain at least one uppercase letter, one
                lowercase letter, one number, and one special character.
              </p>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Register</button>
          </fieldset>
          <p>
            Already have an account?{" "}
            <Link className="text-blue-500" to={"/Login"} >
              Login
            </Link>
          </p>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
