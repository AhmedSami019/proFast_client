import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const {signInUser} = useAuth()

  const handleLogin = (data) => {
    console.log(data);
    signInUser(data.email, data.password)
    .then(result => {
        console.log(result.user);
    }).catch(error =>{
        console.log(error.code);
    })
  };

  return (
    <div>
      <h2 className="text-center text-4xl font-extrabold">Welcome, Login now</h2>
      <p className="text-center text-base-200">login with profast</p>

      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto mt-10">
        <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              {...register("email", {required: true})}
            />
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              {...register("password", {required: true})}
            />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
