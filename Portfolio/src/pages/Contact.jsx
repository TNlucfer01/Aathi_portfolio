import { useState } from "react";

function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");


    function handleChange(e) {
        const { name, value } = e.target;
        if (name === "name") {
            setName(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "message") {
            setMessage(value);
        }
    }

    return (
    <div className="top-10 m-8 rounded-3xl   p-9 w-min-screen  border-cyan-600 ml-38 mr-38 border-4 " >
      <form className="flex flex-col  gap-2 p-1" >
       <div className="mb-4 ">
            <label className="block text-terminal-blue p-2 text-3xl "> name:</label>
            <input type="text" className="w-full  bg-terminal-black focus:bg-gray-900 transition duration-200 focus:shadow-cyan-900 focus:border-cyan-900  focus:outline-none border-cyan-700 border-2 p-2 rounded text-terminal-white" placeholder="Enter your name" />
          </div>
          <div className="mb-4 ">
            <label className="block text-terminal-blue p-2 text-3xl "> email:</label>
            <input type="email" className="w-full  bg-terminal-black focus:bg-gray-900 transition duration-200 focus:border-cyan-900  focus:outline-none border-cyan-700 border-2 p-2 rounded text-terminal-white" placeholder="Enter your email" />
          </div>
          <div className="mb-4">
            <label className="block text-terminal-blue p-2 text-3xl "> message:</label>
            <textarea className="w-full  h-20 bg-terminal-black focus:bg-gray-900 transition duration-200 focus:border-cyan-900  focus:outline-none  border-cyan-700 border-2 p-2 rounded text-terminal-white" placeholder="Type your message"></textarea>
          </div> <button className="nav-item ml-9">Contact Me</button>
</form>
</div>
)
}
export default Contact;
