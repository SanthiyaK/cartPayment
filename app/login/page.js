"use client"

import { useRouter } from 'next/navigation';
import { UserLogin } from '../action/loginAction';
 
export default function LoginForm() {
   const router = useRouter();
   const handleSubmit = async (formData) => {
      const result = await UserLogin(formData); 
      if (result.success) {
         console.log(result.token); 
         localStorage.setItem('token', result.token); 
         localStorage.setItem('userId', result.user);
        router.push("/products")
      }  
   }
   return (
      <>
       <form 
  action={handleSubmit} 
  className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg space-y-6"
>
  <h1 className="text-2xl font-semibold text-center text-gray-800">Login Form</h1>
  
  <div>
    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
    <input 
      className="w-full p-3 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
      type="email"
      id="email" 
      name="email" 
      required 
      placeholder="Enter your email"
    />
  </div>
  
  <div>
    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
    <input 
      className="w-full p-3 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
      type="password" 
      id="password"
      name="password" 
      required 
      placeholder="Enter your password"
    />
  </div>

  <button 
    type="submit" 
    className="w-full py-3 bg-violet-500 text-white rounded-lg hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-200"
  >
    Submit
  </button>
</form>
      </>
   );
}