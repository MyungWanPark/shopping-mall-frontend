type ListItemSelector = 'shopItem' | 'managementItem';
type ArrowSelector = 'arrowShop' | 'arrowManagement';

export function handleTitleClick(liSelector: ListItemSelector, arrowSelector: ArrowSelector) {
    const listItems = document.querySelectorAll<HTMLLIElement>(`.${liSelector}`);
    const arrowBtn = document.querySelector<HTMLElement>(`.${arrowSelector}`)!;

    arrowBtn.classList.toggle('rotate-90');
    listItems.forEach((item) => {
        if (item.classList.contains('h-0')) {
            item.classList.replace('h-0', 'h-6');
            item.classList.add('overflow-visible');
            item.classList.toggle('opacity');
            item.style.transition = 'height 0.5s ease';
        } else {
            item.classList.replace('h-6', 'h-0');
            item.classList.remove('overflow-visible');
            item.style.transition = 'height 0.5s ease';
            item.classList.replace('border-brand', 'border-transparent');
        }
    });

    closeUl(liSelector, arrowSelector);
}

export const handleListItemClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    liSelector: ListItemSelector,
    arrowSelector: ArrowSelector
) => {
    const listItems = document.querySelectorAll<HTMLLIElement>(`.${liSelector}`);
    const item = e.target as HTMLLIElement;

    listItems.forEach((item) => item.classList.replace('border-brand', 'border-transparent'));
    item.classList.replace('border-transparent', 'border-brand');

    closeUl(liSelector, arrowSelector);
};

function closeUl(liSelector: ListItemSelector, arrowSelector: ArrowSelector) {
    let arrowBtn;
    let listItems;

    if (liSelector === 'shopItem') {
        arrowBtn = document.querySelector<HTMLElement>('.arrowManagement')!;
        listItems = document.querySelectorAll<HTMLLIElement>('.managementItem');
    } else {
        arrowBtn = document.querySelector<HTMLElement>('.arrowShop')!;
        listItems = document.querySelectorAll<HTMLLIElement>('.shopItem');
    }

    arrowBtn.classList.remove('rotate-90');
    listItems.forEach((item) => {
        item.classList.replace('h-6', 'h-0');
        item.classList.remove('overflow-visible');
        item.style.transition = 'height 0.5s ease';
        item.classList.replace('border-brand', 'border-transparent');
    });
}
