import {Link} from 'react-router'
import SignUpForm from '../../components/auth/signup/SignUpForm';
const Signup = () => {
	return <div className=" w-full h-screen flex justify-center items-center">
            <div className="container max-w-[430px]  justify-center items-center flex  flex-col px-5">
                <div className="top flex flex-col w-full justify-center items-center mt-10">
                    <h1 className=' text-primary text-center text-4xl font-bold'>Create a new account</h1>
                    <p className=' text-muted-foreground text-center mt-2 text-base sm:text-lg mb-10'>To use messenger, Please enter your details</p>
                </div>
                <div className="form flex flex-col w-full">
                    <SignUpForm/>
                </div>
                <div className="bottom m-5 flex  justify-start w-full text-sm md:text-base">
                    <p>Already have an account? <Link to={'/login'} className=' text-primary'>Login  </Link></p>
                </div>
            </div>
    </div>;
};

export default Signup;
