// navbar script
const path: string = window.location.pathname;
const navLinks: NodeListOf<Element> = document.querySelectorAll('.nav_link');
const navBg: HTMLElement | null = document.getElementById('nav_bg');
const navMenu: Element | null = document.querySelector('.nav_menu');
const mantle: string = '#11111b';
const initialColors: string[] = Array.from(navLinks).map(
  (link: Element) => getComputedStyle(link).color
);

function resetColors(): void {
  navLinks.forEach((link: Element, index: number) => {
    (link as HTMLElement).style.color = initialColors[index];
  });
}

function setNavBgProperties(target: Element): void {
  const rect: DOMRect = target.getBoundingClientRect();
  const navMenuRect: DOMRect = (navMenu as Element).getBoundingClientRect();
  const top: number = rect.top - navMenuRect.top;
  const left: number = rect.left - navMenuRect.left;

  Object.assign((navBg as HTMLElement).style, {
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    top: `${top}px`,
    left: `${left}px`,
  });
}

navLinks.forEach((link: Element, index: number) => {
  link.addEventListener('mouseenter', (e: Event) => {
    resetColors();
    setNavBgProperties(e.target as Element);
    (navBg as HTMLElement).style.backgroundColor = initialColors[index];
    (link as HTMLElement).style.color = mantle;
  });

  link.addEventListener('mouseleave', (e: Event) => {
    const nextElement: Element | null = (e as MouseEvent).relatedTarget as Element | null;
    if (nextElement && nextElement.parentNode === link.parentNode) {
      (link as HTMLElement).style.color = initialColors[index];
    } else {
      (navBg as HTMLElement).style.backgroundColor = '';
      (link as HTMLElement).style.color = initialColors[index];
      init();
    }
  });
});

function init(): void {
  navLinks.forEach((navLink: Element, index: number) => {
    if ((navLink as HTMLElement).getAttribute('href') === path) {
      setNavBgProperties(navLink);
      (navBg as HTMLElement).style.backgroundColor = initialColors[index];
      (navLink as HTMLElement).style.color = mantle;
    }
  });
}

init();
