const Pagination = ({
    changePage, 
    page, 
    total, 
    limit
  }: {
    changePage: (dir: string) => void;
    page: number;
    total: number;
    limit: number
  }) => {

    return (
        <div className="flex gap-4 items-center mb-4">
            <div
                onClick={() => changePage("prev")}  
                className={`${page - 1 < 1 ? "opacity-50 cursor-default" : "opacity-100 cursor-pointer"} py-1 px-2.5 bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded-lg select-none`}
            >
                Prev
            </div>
                {page}
            <div
                onClick={() => changePage("next")}  
                className={`${(Math.floor(total / limit) < page) ? "opacity-50 cursor-default" : "opacity-100 cursor-pointer"} py-1 px-2.5 bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded-lg select-none`}
            >
                Next
            </div>
        </div>
    );
};

export default Pagination;