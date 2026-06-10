(function () {
  const GA_ID = "G-CBFXYX3Z6S";

  function track(eventName, params = {}) {
    if (typeof window.gtag !== "function") return;

    window.gtag("event", eventName, {
      app_name: "spire_board",
      send_to: GA_ID,
      ...params
    });
  }

  function normalizeTrackName(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_]+/g, "_")
      .replace(/^_+|_+$/g, "");
  }

  function bindStaticClickTracking() {
    document.addEventListener("click", (event) => {
      const target = event.target.closest("[data-track]");
      if (!target) return;

      track("site_click", {
        click_id: normalizeTrackName(target.dataset.track),
        click_text: target.textContent.trim().slice(0, 80),
        link_url: target.href || ""
      });
    });
  }

  window.trackSTS = track;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindStaticClickTracking);
  } else {
    bindStaticClickTracking();
  }
})();
