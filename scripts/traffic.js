(function () {
  const config = window.SPIRE_BOARD_SUPABASE || {};
  const endpoint = config.url ? `${config.url.replace(/\/$/, "")}/rest/v1/rpc/track_spire_board_visit` : "";
  const enabled = Boolean(endpoint && config.anonKey);
  const pill = document.getElementById("trafficPill");

  if (!enabled || !pill) return;

  const todayNode = document.getElementById("trafficToday");
  const totalNode = document.getElementById("trafficTotal");
  const onlineNode = document.getElementById("trafficOnline");

  function getSessionId() {
    const key = "spire_board_session_id";
    const existing = window.localStorage.getItem(key);
    if (existing) return existing;

    const value = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    window.localStorage.setItem(key, value);
    return value;
  }

  function formatNumber(value) {
    return new Intl.NumberFormat("zh-Hans-CN").format(Number(value || 0));
  }

  async function sendVisit(countView) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${config.anonKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        p_session_id: getSessionId(),
        p_path: window.location.pathname,
        p_count_view: countView
      })
    });

    if (!response.ok) return;
    const data = await response.json();
    todayNode.textContent = formatNumber(data.today_views);
    totalNode.textContent = formatNumber(data.total_views);
    onlineNode.textContent = formatNumber(data.online_users);
    pill.hidden = false;
  }

  sendVisit(true).catch(() => {});
  window.setInterval(() => sendVisit(false).catch(() => {}), 60000);
})();
