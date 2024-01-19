const tabLinks: NodeListOf<Element> = document.querySelectorAll('.tt_tab-link');
const tabBg: HTMLElement | null = document.querySelector('.tt_menu-highlight');
const tabMenu: HTMLElement | null = document.querySelector('.tt_menu');

function setTabBgProperties(target: Element): void {
  const rect: DOMRect = target.getBoundingClientRect();
  const tabMenuRect: DOMRect = (tabMenu as HTMLElement).getBoundingClientRect();
  const top: number = rect.top - tabMenuRect.top;
  const left: number = rect.left - tabMenuRect.left;

  Object.assign((tabBg as HTMLElement).style, {
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    top: `${top}px`,
    left: `${left}px`,
  });
}

tabLinks.forEach((link: Element) => {
  link.addEventListener('click', (e: Event) => {
    setTabBgProperties(e.target as Element);
  });
});

window.addEventListener('resize', () => {
  tabLinks.forEach((link: Element) => {
    if (link.classList.contains('w--current')) {
      setTabBgProperties(link);
    }
  });
});
