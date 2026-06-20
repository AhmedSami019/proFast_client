import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { registerUser } = useAuth();

  const handleRegistration = (data) => {
    console.log(data);
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2 className="text-center text-4xl font-extrabold">Create an Account</h2>
      <p className="text-center text-base-200">Register with profast</p>

      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto mt-10">
        <form onSubmit={handleSubmit(handleRegistration)} className="card-body">
          <fieldset className="fieldset">
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
            <Link className="text-blue-500" to={"/Login"}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
