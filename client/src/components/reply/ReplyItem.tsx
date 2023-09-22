import { formatDistanceToNow } from "date-fns";
import { Reply } from "../../type/types";

type Props = {
  reply: Reply;
};

function ReplyItem({ reply }: Props) {
  return (
    <div className="w-[540px] ml-12 my-4">
      <li>
        <div className="flex flex-row p-2">
          <div className="flex-shrink-0 w-7 h-7 bg-gray-300 rounded-full mr-4"></div>
          <p className="text-gray-600">
            {reply.userName} • {formatDistanceToNow(new Date(reply.createdAt))}{" "}
            ago
          </p>
        </div>
        <p className="p-2">{reply.content}</p>
      </li>
    </div>
  );
}

export default ReplyItem;
