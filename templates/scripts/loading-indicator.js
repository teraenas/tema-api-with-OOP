const loadingIndicator = () => {
  const container = document.createElement('div');
  container.classList.add('loading-indicator');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttributeNS(null, 'viewBox', '0 0 40 40');
  svg.setAttributeNS(null, 'class', 'loading-indicator-svg');
  const circle = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  );
  circle.setAttributeNS(null, 'cx', '20');
  circle.setAttributeNS(null, 'cy', '20');
  circle.setAttributeNS(null, 'r', '18');
  circle.setAttributeNS(null, 'fill', 'none');
  svg.appendChild(circle);
  container.appendChild(svg);
  return container;
};
