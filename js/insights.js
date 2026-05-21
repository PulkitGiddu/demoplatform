export function initInsightsToast() {
  const insightsLinks = document.querySelectorAll('a');
  insightsLinks.forEach(link => {
    const text = link.textContent.trim().toLowerCase();
    const isInsightsText = text === 'insights';
    const isInsightsViewAll = text === 'view all' && link.classList.contains('insights-view-all');
    
    if (isInsightsText || isInsightsViewAll) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        let toast = document.getElementById('global-insights-toast');
        if (!toast) {
          toast = document.createElement('div');
          toast.id = 'global-insights-toast';
          toast.className = 'insights-toast';
          toast.innerHTML = '<p>Coming Soon</p>';
          document.body.appendChild(toast);
        }
        
        toast.classList.remove('show');
        void toast.offsetWidth; // Force reflow
        toast.classList.add('show');
        
        if (toast.hideTimeout) clearTimeout(toast.hideTimeout);
        toast.hideTimeout = setTimeout(() => {
          toast.classList.remove('show');
        }, 3000);
      });
    }
  });
}
