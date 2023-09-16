import { Feedback } from "../../../type/types";

type Props = {
  feedbackList: Feedback[];
};

function FeedbackList({ feedbackList }: Props) {
  return (
    <div className="max-w-xl mx-auto my-8 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Feedback List</h2>
      {feedbackList.length === 0 ? (
        <p className="text-gray-600">No feedback available.</p>
      ) : (
        <ul>
          {feedbackList.map((feedback) => (
            <li key={feedback.id} className="mb-4">
              <div className="bg-blue-100 p-4 rounded-md">
                <p className="text-gray-800">{feedback.feedback}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FeedbackList;
