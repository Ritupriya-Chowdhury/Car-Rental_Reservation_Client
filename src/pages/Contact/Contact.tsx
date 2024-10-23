import { useRef } from "react";
import { useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";

const Contact = () => {
  const contactSectionRef = useRef<HTMLDivElement | null>(null);
  const theme = useAppSelector((state: RootState) => state.theme.theme);
  return (
  
     <div ref={contactSectionRef} className={`bg-gray-100 pt-28 pb-8  ${
      theme === "dark" ? "bg-gray-300" : "bg-gray-100"
    }`}>
     <section  className="py-12 md:px-20 px-8">
      <h2 className="text-3xl font-semibold">Contact Us</h2>
      <p className="mt-4 text-gray-700 text-xl font-semibold">
        If you have any questions or need assistance, feel free to reach out to us:
      </p>
      <ul className="mt-2 text-gray-700 text-xl font-semibold">
        <li>Phone: (123) 456-7890</li>
        <li>Email: rpcarres2gmail.com</li>
        <li>Address: Boalkhali, Chattogram</li>
      </ul>
      <div>
        <p className="text-3xl font-semibold mt-4">Our Location</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d70198.17174078141!2d91.87042707846486!3d22.378652066840548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad25d1b4ee63ed%3A0x57feb012672900bd!2sBoalkhali!5e0!3m2!1sen!2sbd!4v1727488235053!5m2!1sen!2sbd"
          loading="lazy"
          className="w-full h-72 mt-2"
          title="Location Map"
          aria-label="Location map"
          style={{ border: 0 }}
          allowFullScreen
        ></iframe>
      </div>
    </section>
     </div>
  )
}

export default Contact
