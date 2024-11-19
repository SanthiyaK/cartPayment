import { sendEmail } from "../action/ContactAction";


export default function LoginForm() {
 
   const handleSubmit = async (formData) => {
    "use server"
      const result = await sendEmail(formData); 
      if (result.success) {
         console.log(result.message);  
       
      }  
   }
   return (
      <>
         <form action={handleSubmit} className="m-20">
            <h1 className="m-10">Contact Form</h1>

            <label className="m-10 p-1 mb-5">Name</label> <br />
            <input className="border border-blue-500 rounded m-2"
               type="name"
               name="name"
               required />
            <br />
            
            <label className="m-10 p-1 mb-5">Email</label> <br />
            <input className="border border-blue-500 rounded m-2"
               type="email"
               name="email"
               required />
            <br />
            
            <label className="m-10 p-2">Message</label><br />
            <textarea className="border border-blue-500 rounded m-1"
               type="message"
               name="message"
               required />
            <br />
            
            <button className="m-10 bg-violet-500 p-2" type="submit">
               Submit
            </button>
         </form>

      
      </>
   );
}
