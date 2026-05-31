/* ========================================
   Wynklo - Preloader Module (Royal Enfield–style)
   ======================================== */

export function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // The CSS animations handle the sequential letter reveal automatically.
  // We just need to time the exit properly after the full reveal plays.
  //
  // Timeline:
  //   0.1s–1.0s   → Letters fade in one by one
  //   1.1s         → Accent line draws
  //   1.3s         → Tagline fades in
  //   1.5s         → Loading dots appear
  //   ~2.5s        → Hold for visual impact
  //   ~2.8s        → Exit animation begins

  let hasExited = false;

  const exitPreloader = () => {
    if (hasExited) return;
    hasExited = true;

    preloader.classList.add('exit');

    // Wait for the exit animation to complete (800ms) then clean up
    setTimeout(() => {
      document.body.classList.remove('loading');
      preloader.remove();
    }, 800);
  };

  // Primary trigger: wait for fonts + resources, then add a reveal hold
  const triggerExit = () => {
    // Total animation sequence is ~2s. 
    // We wait at least 2.5s after page start before exiting
    // so the full reveal plays, then hold briefly for impact.
    const minDelay = 2500;
    const elapsed = performance.now();
    const remaining = Math.max(0, minDelay - elapsed);

    setTimeout(exitPreloader, remaining + 300);
  };

  // Use Font Loading API if available
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(triggerExit);
  } else {
    // Fallback
    window.addEventListener('load', triggerExit);
  }

  // Safety net: always exit after 4s max
  setTimeout(exitPreloader, 4000);
}
