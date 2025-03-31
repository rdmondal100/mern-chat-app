import {Link} from 'react-router'
import LoginForm from '../../components/auth/login/LoginForm';
import { SiMessenger } from "react-icons/si";

const Login = () => {
	return <div className=" w-full h-screen flex justify-center items-center">
            <div className="container max-w-[430px]  justify-center items-center flex  flex-col px-5">
                <div className="top flex flex-col w-full justify-center items-center mt-10">
				<div className="brand flex justify-center items-center gap-2 text-4xl font-bold text-destructive mb-16">{<SiMessenger/>}Messenger</div>

                    <h1 className=' text-primary text-center text-4xl font-bold'>Log in to your account</h1>
                    <p className=' text-muted-foreground text-center mt-2 text-base sm:text-lg mb-10'>Welcome back! Please enter your details.</p>
                </div>
                <div className="form flex flex-col w-full">
                    <LoginForm/>
                </div>
                <div className="bottom m-5 flex  justify-start w-full text-sm md:text-base">
                    <p>Don't have an account? <Link to={'/signup'} className=' text-primary'>Singn Up </Link></p>
                </div>
            </div>
    </div>;
};

export default Login;
