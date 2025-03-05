import { Link, useSearchParams } from 'react-router-dom';

type Props = {
    totalPages: number;
    PaginationButtonArr: number[];
};

export default function PaginationButtons({ totalPages, PaginationButtonArr }: Props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);

    const getPageUrl = (pageNum: number) => {
        return keyword ? `?keyword=${keyword}&page=${pageNum}` : `?page=${pageNum}`;
    };

    return (
        <div className="flex justify-center items-center space-x-2 mt-4">
            {page > 1 && (
                <Link to={getPageUrl(page - 1)}>
                    <button className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors duration-200">
                        이전
                    </button>
                </Link>
            )}

            {PaginationButtonArr.map((pageNum) => (
                <Link to={getPageUrl(pageNum)} key={pageNum}>
                    <button
                        className={`
                            px-3 py-1 rounded transition-colors duration-200
                            ${
                                page === pageNum
                                    ? 'font-bold hover:bg-gray-500 hover:text-white'
                                    : ' text-gray-700 hover:bg-gray-500 hover:text-white'
                            }`}
                    >
                        {pageNum}
                    </button>
                </Link>
            ))}

            {page < totalPages && (
                <Link to={getPageUrl(page + 1)}>
                    <button className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors duration-200">
                        다음
                    </button>
                </Link>
            )}
        </div>
    );
}
