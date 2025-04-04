"use client";

import axios from "axios";
import { getSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Questions() {
  // Navigation
  const router = useRouter();
  const { id } = useParams();

  // State
  const [correctAnswer, setCorrectAnswer] = useState<string>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setCurrentIndex] = useState<number>(0);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  // Functions
  const getQuestions = async () => {
    // Get token from session
    const session = await getSession();

    const response = await axios.get(
      `https://exam.elevateegy.com/api/v1/questions?exam=${id}`,
      {
        headers: {
          token: session?.token,
        },
      }
    );
    // Check if the response is valid or not
    if (response.data.message === "success") {
      console.log(response);

      setQuestions(response?.data?.questions);
      setCorrectAnswer(response?.data?.questions?.correct);
    }
  };

  const nextQuestionHandler = () => {
    if (index < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      router.push("/dashboard/result");
    }
  };

  const backQuestionHandler = () => {
    if (index > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const question = questions[index];

  //handle answer
  const handleAnswer = () => {};

  // Effects
  useEffect(() => {
    getQuestions();
  });

  return (
    <>
      {!showPopup ? (
        <div className="popupOverlay">
          <div className="popupContent">
            <div className="container rounded-md text-start p-3 w-full mx-auto">
              {/* Questions length */}
              <h3 className="my-4 font-normal text-[13px] text-[#4461F2]">
                {index} of {questions.length}
              </h3>
              <h2 className="my-4 font-semibold">{question?.question}</h2>
              {question?.answers?.map((answer: Question) => (
                <div
                  className="options bg-[#EDEFF3] rounded-md p-2 my-4"
                  key={answer.key}
                >
                  {/* Field question */}
                  <input
                    id={`${answer.key}`}
                    type="radio"
                    name={`question-${index}`}
                  />

                  {/* Label of answer */}
                  <label htmlFor={`${answer.key}`} className="ml-2">
                    {answer.answers}.
                  </label>
                </div>
              ))}

              <div className="flex justify-between  my-3 px-5">
                {/* Button back question */}
                <button
                  className="border w-[250px] mr-4 text-[#4461F2] border-[#4461F2] px-[30px] py-[7px] rounded-[28px] "
                  onClick={() => backQuestionHandler()}
                >
                  Back
                </button>

                {/* Button next or submit */}
                <button
                  className=" rounded-[28px] w-[250px] bg-[#4461F2] px-[30px] py-[7px] text-white "
                  onClick={() => nextQuestionHandler()}
                >
                  {index === questions.length - 1 ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
