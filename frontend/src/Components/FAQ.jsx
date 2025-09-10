import React, { useState } from 'react';

const faqData = [
    {
        question: "What is email verification?",
        answer: "Email verification is the process of confirming that an email address is valid, active, and can receive messages. This helps reduce bounce rates and improve the effectiveness of your email campaigns."
    },
    {
        question: "How accurate is your verification process?",
        answer: "Our platform uses a multi-layered process including syntax checks, MX record verification, and real-time SMTP handshakes to provide accuracy rates of over 98%. We ensure you get the most reliable results."
    },
    {
        question: "Can I verify a list of emails at once?",
        answer: "Yes! Our Starter and Pro plans allow you to upload a CSV or TXT file containing a list of emails for bulk verification. Our system will process the list and provide you with a downloadable report of the results."
    },
    {
        question: "Do my verification credits roll over?",
        answer: "Credits are allocated on a monthly or annual basis depending on your subscription. Unused credits do not roll over to the next billing period, so we recommend choosing a plan that best fits your regular usage."
    },
    {
        question: "Is there an API available?",
        answer: "Absolutely. We offer a robust developer API on our Starter and Pro plans that allows you to integrate our email verification service directly into your applications, websites, or forms for real-time validation."
    }
];

const FAQItem = ({ faq, index, openIndex, setOpenIndex }) => {
    const isOpen = index === openIndex;

    return (
        <div className="border-b border-gray-200 py-6">
            <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-800 hover:text-violet-600"
            >
                <span>{faq.question}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}
            >
                <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                </p>
            </div>
        </div>
    );
};


export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="bg-gray-50 py-20 sm:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
                    </p>
                </div>
                <div className="mt-16 max-w-4xl mx-auto">
                    {faqData.map((faq, index) => (
                        <FAQItem
                            key={index}
                            faq={faq}
                            index={index}
                            openIndex={openIndex}
                            setOpenIndex={setOpenIndex}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
