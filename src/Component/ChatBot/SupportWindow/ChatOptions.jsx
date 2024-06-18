import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const OptionCategory = [
    {
        type: "Find booking questions",
        questions: [{
            id: "q7",
            content: "What should I do if I have concerns about a specific property or host?"
        }
            , {
            id: "q8",
            content: "Does Shrbo offer accommodations for users with specific requirements?"
        }
            , {
            id: "q9",
            content: "How can I provide feedback to improve Shrbo's services?"
        }
            , {
            id: "q10",
            content: "What guidelines should I follow for a smooth experience on Shrbo?"
        }
            , {
            id: "q11",
            content: "How can I search for accommodations on Shrbo?"
        }
            , {
            id: "q12",
            content: "What factors should I consider when choosing a property for booking?"
        }
            , {
            id: "q13",
            content: "How can I modify or cancel my booking on Shrbo"
        }
            , {
            id: "q14",
            content: "What payment options are available on Shrbo?"
        }
            , {
            id: "q15",
            content: "How can I verify the legitimacy of a property on Shrbo?"
        }
            , {
            id: "q16",
            content: "What should I do in case of issues during my stay at a property?"
        }
            , {
            id: "q17",
            content: "Are there specific guidelines for guests on Shrbo?"
        }
            , {
            id: "q18",
            content: "Where can I view reviews and ratings of properties on Shrbo?"
        }
            , {
            id: "q19",
            content: "How can I find pet-friendly accommodations on Shrbo?"
        }
            , {
            id: "q20",
            content: "Can I make last-minute changes to my booking on Shrbo?"
        }
        ]
    },
    {
        type: "Shrbo Support", questions: [{
            id: "q1",
            content: "How can I contact Shrbo's support team?"
        }
            , {
            id: "q2",
            content: "What should I do if I encounter technical issues on Shrbo?"
        }
            , {
            id: "q3",
            content: "Is there a knowledge base available for common queries?"
        }
            , {
            id: "q4",
            content: "How can I report inappropriate behavior or content?"
        }
            , {
            id: "q5",
            content: "How does Shrbo ensure the security of user data?"
        }
            , {
            id: "q6",
            content: "How can I change my account settings and preferences?"
        }
        ]
    },

    {
        type: "Find hosting questions", questions: [{
            id: "q21",
            content: "How can I list my property on the Shrbo platform?"
        }
            , {
                id: "q22",
            content: "What are the criteria for becoming a Shrbo host?"
        }
            , {
                id: "q23",
            content: "How can I manage and update my property listing on Shrbo?"
        }
            , {
                id: "q24",
            content: "What steps should I take to ensure guest safety and comfort?"
        }
            , {
                id: "q25",
            content: "How can I handle guest inquiries and communication effectively?"
        }
            , {
                id: "q26",
            content: "What are the best practices for setting competitive pricing for my property?"
        }
            , {
                id: "q27",
            content: "How can I ensure my property meets the required hosting standards?"
        }
            , {
                id: "q28",
            content: "What should I do if I encounter issues with a guest during their stay?"
        }
            , {
                id: "q29",
            content: "How can I enhance the appeal of my property listing to attract more guests?"
        }
            , {
                id: "q30",
            content: "What steps can I take to handle guest reviews and feedback effectively?"
        }
            , {
                id: "q31",
            content: "Cancellation Options"
        }]
    },
]


const ChatOptions = ({ selectedOption }) => {

    const navigate = useNavigate();

    const navigateToFAQ = (id) => {
      navigate(`/FAQAccordion?id=${id}`);
    };

    const goTo = useRef(null);
    return (
        <>

            {/* {selectedOption === "Find booking questions" && ( */}
            <div className="self-start flex flex-row flex-wrap gap-3 text-sm max-w-[300px] " >
                {OptionCategory.map((cat) =>
                    cat.questions.map((question, index) => (
                        <button
                            key={index}
                            type="button"
                            className={` ${cat.type === selectedOption ? "block" : "hidden"} transition-3 text-slate-800 hover:bg-gray-300 bg-gray-200  hover:bg-blend-darken  p-2 rounded-lg`}
                            onClick={(e) => { e.preventDefault(); navigateToFAQ(question.id) }}

                        >
                            {question.content}
                        </button>
                    ))
                )}
            </div>
            {/* )} */}
        </>

    )

}

export default ChatOptions;