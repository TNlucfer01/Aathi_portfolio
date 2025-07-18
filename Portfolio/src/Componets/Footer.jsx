import {
  FaInstagram,
  FaGithub,
  FaTelegram,
  FaEnvelope,
  FaPhone,
  FaChessKnight,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className=" bg-gray-900 p-4 flex flex-col items-center justify-center text-white space-y-2">
      <p>© {new Date().getFullYear()}  Aathi. All rights reserved.</p>
      <FooterIcon />
    </div>
  );
};


function FooterIcon() {
const icons = [
    { icon: <FaGithub />, href: "https://github.com/TNlucfer01", style: { backgroundColor: "#333", color: "#fff", borderRadius: "50%", padding: "6px" } },
    { icon: <FaInstagram />, href: "https://www.instagram.com/the_false_genius__01", style: { background: "radial-gradient(circle at 30% 110%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)", color: "#fff", borderRadius: "50%", padding: "6px" } },
    { icon: <FaTelegram />, href: "https://t.me/+919944711288", style: { backgroundColor: "#0088cc", color: "#fff", borderRadius: "50%", padding: "6px" } },
    { icon: <FaChessKnight />, href: "https://www.chess.com/member/kiyopon00001", style: { backgroundColor: "#3a5f0b", color: "#fff", borderRadius: "50%", padding: "6px" } }, // chess.com green
    { icon: <FaEnvelope />, href: "mailto:aathi.programmer@gmail.com", style: { backgroundColor: "#ea4335", color: "#fff", borderRadius: "50%", padding: "6px" } },
    { icon: <FaWhatsapp />, href: "https://wa.me/919944711288", style: { backgroundColor: "#34a853", color: "#fff", borderRadius: "50%", padding: "6px" } },
    { icon: <FaPhone />, href: "tel:+919944711288", style: { backgroundColor: "#34a853", color: "#fff", borderRadius: "50%", padding: "6px" } },
];
  return (
    <div id="footer" className="flex p-0.5 justify-center space-x-6">
      {icons.map((item, idx) => (
        <a
          key={idx}
          href={item.href}
          className="mx-2 text-xl hover:text-blue-500 transition-colors"
          style={item.style}
          target="_blank"
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}

export default Footer;
