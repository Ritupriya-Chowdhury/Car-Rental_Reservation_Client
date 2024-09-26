import { useState } from 'react';
import { useAppSelector } from '../../redux/hook';
import { RootState } from '../../redux/store';
import img from '../../assets/Images/istockphoto-167495506-612x612.jpg'



const faqData = [
  {
    question: "How can I check the availability of a car?",
    answer:
      "You can check car availability by selecting your desired location, start date, and end date on the search page. Our system will display all available cars that match your criteria.",
  },
  {
    question: "Can I filter cars by type and price?",
    answer:
      "Yes, you can filter cars by type (SUV, sedan, hybrid) and price range. You can also apply additional filters for features like GPS, air conditioning, etc.",
  },
  {
    question: "How do I make a reservation?",
    answer:
      "Once you find a car, click 'View Details' and proceed with 'Reserve Now'. Fill in the required booking details and confirm your reservation. You will receive a confirmation email with the booking information.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards as well as digital payments like PayPal.",
  },
  {
    question: "What should I do if I need to modify or cancel my reservation?",
    answer:
      "You can modify or cancel your reservation by logging into your account. Navigate to your reservation and select the option to modify or cancel it.",
  },
];

const FAQSection = () => {
  const theme = useAppSelector((state: RootState) => state.theme.theme);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={`mx-auto px-4 py-16 ${theme === 'dark' ? "bg-gray-200" : "bg-gray-100"}`}>
      <h2 className={`text-4xl font-bold text-center mb-8 text-gray-800  `}>
        Frequently Asked Questions
      </h2>
     <div className='md:flex mt-12'>
     <div className="max-w-4xl mx-auto space-y-4 ">
        {faqData.map((item, index) => (
          <div
            key={index}
            className=" border-gray-300 lg:pl-20 pl-4 pb-4"
          >
            <button
              className="w-full flex text-2xl 
              font-medium text-gray-800 focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-4xl">
                {activeIndex === index ? "-" : "+"}
              </span>
              <span className='ml-2 text-left'>{item.question}</span>
            </button>
            <div
              className={`mt-2 text-gray-600 transition-all duration-300 text-xl ${
                activeIndex === index ? "max-h-screen" : "max-h-0 overflow-hidden"
              }`}
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
      <div className='hidden md:block lg:w-[1200px] w-[1800px] lg:mt-0 md:mt-8'>
        <img src={img} alt="" />
      </div>
     </div>
    </div>
  );
};


export default FAQSection;
