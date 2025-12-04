import { useState } from "react";

import React from 'react';
import emailjs from 'emailjs-com';

function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");


    function handleChange(e) {
        const { name, value } = e.target;
        e.preventDefault();
        if (name === "name") {
            setName(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "message") {
            setMessage(value);
        }
    }
        const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
    'service_9rpl40b',      // 👈 Replace this
      'template_1qh5tgq',     // 👈 Replace this
      e.target,
      '6H3mpiREFfmOu2NQm'       // 👈 Replace this
    ).then(
      (result) => {
        alert("✅ Message sent successfully!");
      },
      (error) => {
        alert("❌ Failed to send message.");
        console.error(error.text);
      }
    );

    e.target.reset();
  };
    

    return (
    <div className=" lg:m-8 pl-10 m-5 mx-3 mr-2  md:m-6 rounded-3xl  p-5 lg:p-9 md:p-7 w-min-screen  border-cyan-600 lg:ml-38 lg:mr-38 md:ml-35 md:mr-35  lg:border-4 md:border-3 border-2"  >
      <form onSubmit={sendEmail} className="flex flex-col  gap-2 p-1" >
       <div className="mb-4 ">
            <label className="block text-terminal-blue p-2 text-3xl "> name:</label>
            <input  
            type="text" name="name" required className="w-full  bg-terminal-black focus:bg-gray-900 transition duration-200 focus:shadow-cyan-900 focus:border-cyan-900  focus:outline-none border-cyan-700 border-2 p-2 rounded text-terminal-white" onChange={handleChange} placeholder="Enter your name" />
          </div>
          <div className="mb-4 ">
            <label className="block text-terminal-blue p-2 text-3xl "> email:</label>
            <input name="email" type="email" required className="w-full  bg-terminal-black focus:bg-gray-900 transition duration-200 focus:border-cyan-900  focus:outline-none border-cyan-700 border-2 p-2 rounded text-terminal-white" onChange={handleChange} placeholder="Enter your email" />
          </div>
          <div className="mb-4">
            <label className="block text-terminal-blue p-2 text-3xl "> message:</label>
            <textarea name="message" required className="w-full  h-20 bg-terminal-black focus:bg-gray-900 transition duration-200 focus:border-cyan-900  focus:outline-none  border-cyan-700 border-2 p-2 rounded text-terminal-white" onChange={handleChange} placeholder="Type your message"></textarea>
          </div> <button className="nav-item lg:ml-9 ">Contact Me</button>
</form>
</div>
)
}
export default Contact;
