function PostItemSkeleton() {
  return (
    <div className="col-span-2">
      {Array.from(Array(3)).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-slate-800 p-4 border rounded-lg shadow mb-4"
        >
          <div className="animate-pulse flex flex-row items-center justify-center">
            <div className="w-[106px] h-[115px] flex flex-col items-center p-2">
              <div className="bg-slate-200 dark:bg-slate-700 border-2 rounded-full border-gray-200">
                {/* upvote button */}
                <div className="w-[32px] h-[25px]"></div>
              </div>
              {/* vote score */}
              <p className="text-[20px] text-center text-slate-200 dark:text-slate-700">
                <div className="w-[23] h-[32px]">0</div>
              </p>
              {/* downvote button */}
              <div className="bg-slate-200 dark:bg-slate-700 border-2 rounded-full border-gray-200">
                <div className="w-[32px] h-[25px]"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="p-2">
                {/* post title */}
                <div className="w-[558px] h-[30px] text-lg bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                {/* posted date */}
                <p className="w-[200px] h-[30px] bg-slate-200 dark:bg-slate-700 rounded"></p>
              </div>
              <div className="p-2">
                {/* post content */}
                <p className="w-[693px] h-[74px] truncate-line line-clamp-3 bg-slate-200 dark:bg-slate-700 rounded"></p>
              </div>
              <div className="flex justify-between p-2 pt-4 pb-4">
                {/* comment button*/}
                <div className="w-[99px] h-[26px] bg-slate-200 dark:bg-slate-700 rounded"></div>
                {/* share button*/}
                <div className="w-[68px] h-[26px] bg-slate-200 dark:bg-slate-700 rounded ml-4"></div>
                {/* save button */}
                <div className="w-[21px] h-[26px]  ml-auto bg-slate-200 dark:bg-slate-700 rounded mr-4"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostItemSkeleton;
