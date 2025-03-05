export function getPaginaionButtons(currentPage: number, totalPages: number) {
    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = startPage + maxButtons - 1;

    // 1,2 페이지에서는 1,2,3,4,5 표시
    if (currentPage <= Math.ceil(maxButtons / 2)) {
        startPage = 1;
        endPage = Math.min(totalPages, maxButtons);
    }

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxButtons + 1);
    }

    // 필요한 페이지 버튼의 숫자 배열을 리턴
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
}
