import { Post } from "../../type/types";

type Props = {
  reply: Partial<Post>;
};

function Reply({ reply }: Props) {
  return (
    <div className="w-[466px] ml-12 my-4">
      <li>
        <div className="flex flex-row p-2">
          <div className="flex-shrink-0 w-7 h-7 bg-gray-300 rounded-full mr-4"></div>
          <p className="text-gray-600">
            {reply.author} • {reply.timestamp} hour ago
          </p>
        </div>
        <p className="p-2">{reply.content}</p>
      </li>
    </div>
  );
}

export default Reply;
