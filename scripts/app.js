(function () {
  const { characters, cards, needs, routeTests } = window.STS_DATA;
  const state = {
    character: "ironclad",
    act: 1,
    ascension: 0,
    hp: 68,
    energy: 3,
    needs: new Set(["frontload", "block"]),
    offers: []
  };

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  const characterSelect = $("#characterSelect");
  const actSelect = $("#actSelect");
  const ascensionSelect = $("#ascensionSelect");
  const hpRange = $("#hpRange");
  const hpOutput = $("#hpOutput");
  const energySelect = $("#energySelect");
  const needGroup = $("#needGroup");
  const cardSearch = $("#cardSearch");
  const cardRoleFilter = $("#cardRoleFilter");

  function init() {
    characterSelect.innerHTML = characters
      .map((character) => `<option value="${character.id}">${character.name}</option>`)
      .join("");

    needGroup.innerHTML = needs
      .map(
        (need) => `
          <label class="chip">
            <input type="checkbox" value="${need.id}" ${state.needs.has(need.id) ? "checked" : ""} />
            <span>${need.label}</span>
          </label>`
      )
      .join("");

    const roles = Array.from(new Set(cards.flatMap((card) => card.roles)));
    cardRoleFilter.innerHTML += roles
      .map((role) => `<option value="${role}">${labelForNeed(role)}</option>`)
      .join("");

    bindEvents();
    updateOfferOptions();
    render();
  }

  function bindEvents() {
    characterSelect.addEventListener("change", (event) => {
      state.character = event.target.value;
      updateOfferOptions();
      render();
    });

    actSelect.addEventListener("change", (event) => {
      state.act = Number(event.target.value);
      render();
    });

    ascensionSelect.addEventListener("change", (event) => {
      state.ascension = Number(event.target.value);
      render();
    });

    hpRange.addEventListener("input", (event) => {
      state.hp = Number(event.target.value);
      hpOutput.textContent = `${state.hp}%`;
      render();
    });

    energySelect.addEventListener("change", (event) => {
      state.energy = Number(event.target.value);
      render();
    });

    needGroup.addEventListener("change", () => {
      state.needs = new Set(
        $$("#needGroup input:checked").map((input) => input.value)
      );
      render();
    });

    $$(".offerSelect").forEach((select) => {
      select.addEventListener("change", () => {
        state.offers = $$(".offerSelect")
          .map((input) => input.value)
          .filter(Boolean);
        render();
      });
    });

    ["#eliteCount", "#restCount", "#shopCount"].forEach((selector) => {
      $(selector).addEventListener("input", render);
    });

    cardSearch.addEventListener("input", renderCardGrid);
    cardRoleFilter.addEventListener("change", renderCardGrid);
  }

  function updateOfferOptions() {
    const pool = cards.filter((card) => card.character === state.character);
    const options = [`<option value="">跳过 / 未选择</option>`]
      .concat(pool.map((card) => `<option value="${card.name}">${card.zh} · ${card.name}</option>`))
      .join("");

    $$(".offerSelect").forEach((select, index) => {
      select.innerHTML = options;
      select.value = pool[index]?.name || "";
    });
    state.offers = $$(".offerSelect").map((select) => select.value).filter(Boolean);
  }

  function render() {
    hpOutput.textContent = `${state.hp}%`;
    renderCharacterSummary();
    renderRecommendations();
    renderRouteVerdict();
    renderCardGrid();
    renderRouteBook();
    renderPlaybook();
  }

  function currentCharacter() {
    return characters.find((character) => character.id === state.character);
  }

  function offeredCards() {
    const unique = new Set(state.offers);
    return Array.from(unique)
      .map((name) => cards.find((card) => card.character === state.character && card.name === name))
      .filter(Boolean);
  }

  function scoreCard(card) {
    let score = card.strength;
    const reasons = [];

    const matchedNeeds = card.roles.filter((role) => state.needs.has(role));
    if (matchedNeeds.length) {
      score += matchedNeeds.length * 13;
      reasons.push(`补上当前缺口：${matchedNeeds.map(labelForNeed).join("、")}`);
    }

    if (card.act.includes(state.act)) {
      score += 10;
      reasons.push(`适合 Act ${state.act} 的主要测试题`);
    } else if (state.act === 1 && card.roles.includes("scaling") && !card.roles.includes("frontload")) {
      score -= 12;
      reasons.push("偏慢，Act 1 需要确认已有足够即时伤害");
    }

    if (state.energy <= 3 && card.cost >= 3) {
      score -= 10;
      reasons.push("3 能量时启动成本偏高");
    }

    if (state.hp < 35 && card.roles.includes("frontload")) {
      score += 7;
      reasons.push("低血量时更需要缩短战斗");
    }

    if (state.ascension >= 17 && (card.roles.includes("block") || card.roles.includes("artifact"))) {
      score += 6;
      reasons.push("高进阶下防守和反制价值上升");
    }

    if (!reasons.length) {
      reasons.push(card.note);
    }

    return { ...card, score: Math.max(0, Math.round(score)), reasons };
  }

  function renderCharacterSummary() {
    const character = currentCharacter();
    $("#characterSummary").style.setProperty("--class-color", character.color);
    $("#characterSummary").innerHTML = `
      <div class="class-badge">${character.short}</div>
      <div class="summary-copy">
        <h3>${character.name} · ${character.relic}</h3>
        <p>${character.thesis}</p>
        <p><strong>警戒：</strong>${character.watch}</p>
      </div>
    `;
  }

  function renderRecommendations() {
    const offers = offeredCards();
    const list = $("#recommendationList");

    if (!offers.length) {
      list.innerHTML = `<article class="recommendation-card"><div class="rank">!</div><div><h3>先选择奖励卡</h3><p class="reason">左侧填入本次奖励，系统会按你的当前缺口重新排序。</p></div></article>`;
      return;
    }

    const ranked = offers.map(scoreCard).sort((a, b) => b.score - a.score);
    list.innerHTML = ranked
      .map(
        (card, index) => `
          <article class="recommendation-card" style="--class-color:${currentCharacter().color}">
            <div class="rank">${index + 1}</div>
            <div>
              <h3>${card.zh} <span class="meta-line">${card.name} · ${card.rarity} · ${card.cost}费</span></h3>
              <p class="reason">${card.reasons.join("；")}。${card.note}</p>
              <div class="tag-row">${card.roles.map((role) => `<span class="tag">${labelForNeed(role)}</span>`).join("")}</div>
            </div>
            <strong class="score">${card.score}</strong>
          </article>`
      )
      .join("");
  }

  function renderRouteVerdict() {
    const hp = state.hp;
    const eliteCount = Number($("#eliteCount").value);
    const restCount = Number($("#restCount").value);
    const shopCount = Number($("#shopCount").value);
    const needsResolved = needs.filter((need) => !state.needs.has(need.id)).length;
    let readiness = hp + needsResolved * 5 + restCount * 8 + shopCount * 3 - eliteCount * 14 - state.ascension / 2;

    if (state.act === 1 && state.needs.has("frontload")) readiness -= 18;
    if (state.act === 2 && (state.needs.has("aoe") || state.needs.has("block"))) readiness -= 14;
    if (state.act >= 3 && state.needs.has("scaling")) readiness -= 16;

    const verdict = $("#routeVerdict");
    let title = "可以主动打资源";
    let klass = "";
    let copy = "这条路线的精英压力可接受。优先选择能给遗物、升级和额外卡牌奖励的路径，但保留药水给高风险战斗。";

    if (readiness < 45) {
      title = "先保命，找补强点";
      klass = "danger";
      copy = "当前路线过于贪。优先找火堆、商店、普通战斗补关键牌，除非你已有强药水或奖励能马上解决本章测试题。";
    } else if (readiness < 66) {
      title = "可打，但需要条件";
      klass = "warning";
      copy = "可以考虑一名精英或带火堆的精英路线。先确认药水、升级位和下一层是否有逃生路线。";
    }

    verdict.className = `route-verdict ${klass}`;
    verdict.innerHTML = `<h3>${title}</h3><p>${copy}</p><p><strong>路线读数：</strong>${Math.round(readiness)} / 100</p>`;
  }

  function renderCardGrid() {
    const query = cardSearch.value.trim().toLowerCase();
    const role = cardRoleFilter.value;
    const character = currentCharacter();

    const filtered = cards
      .filter((card) => card.character === state.character)
      .filter((card) => role === "all" || card.roles.includes(role))
      .filter((card) => {
        const haystack = `${card.name} ${card.zh} ${card.rarity} ${card.note} ${card.roles.join(" ")}`.toLowerCase();
        return haystack.includes(query);
      })
      .sort((a, b) => b.strength - a.strength);

    $("#cardGrid").innerHTML = filtered
      .map(
        (card) => `
          <article class="guide-card" style="--class-color:${character.color}">
            <h3>${card.zh}</h3>
            <div class="meta-line"><span>${card.name}</span><span>${card.rarity}</span><span>${card.cost}费</span></div>
            <p>${card.note}</p>
            <div class="tag-row">${card.roles.map((item) => `<span class="tag">${labelForNeed(item)}</span>`).join("")}</div>
          </article>`
      )
      .join("");
  }

  function renderRouteBook() {
    $("#routeBook").innerHTML = routeTests
      .map(
        (item) => `
          <article class="route-card">
            <span class="kicker">${item.act}</span>
            <h3>${item.title}</h3>
            <p><strong>测试：</strong>${item.test}</p>
            <p>${item.advice}</p>
          </article>`
      )
      .join("");
  }

  function renderPlaybook() {
    $("#playbookGrid").innerHTML = characters
      .map(
        (character) => `
          <article class="guide-card" style="--class-color:${character.color}">
            <h3>${character.name}</h3>
            <p>${character.thesis}</p>
            <div class="tag-row">${character.priorities.map((item) => `<span class="tag">${labelForNeed(item)}</span>`).join("")}</div>
          </article>`
      )
      .join("");
  }

  function labelForNeed(id) {
    return needs.find((need) => need.id === id)?.label || id;
  }

  init();
})();
