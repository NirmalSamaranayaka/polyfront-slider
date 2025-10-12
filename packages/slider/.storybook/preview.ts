export const parameters = { controls: { expanded: true } };

export const decorators = [
  (Story: any) => {
    const outer = document.createElement('div');
    outer.style.padding = '24px';
    outer.style.boxSizing = 'border-box';
    const node = Story();
    outer.appendChild(node as any);
    return outer;
  }
];
