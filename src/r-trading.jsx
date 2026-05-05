import React, { useState, useEffect, useMemo, useRef } from 'react';

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=Noto+Serif+SC:wght@400;500;600;700&display=swap');

:root {
  --phone-bg: #0a0b0d;
  --phone-surface: #131417;
  --phone-surface-2: #191a1d;
  --phone-fg: #e8e8e6;
  --phone-fg-dim: #9a9a98;
  --phone-muted: #5e5f62;
  --phone-rule: #1f2024;
  --phone-rule-2: #2a2b30;
  --up: #16A8A0;
  --up-dim: #0F7570;
  --down: #d56e6e;
  --down-dim: #8a3e3e;
  --amber: #e8a559;
  --amber-soft: rgba(232, 165, 89, 0.12);
  --blue: #6ea3d6;
  --purple: #a989d6;

  --panel-bg: #f5f3ee;
  --panel-surface: #ebe7df;
  --panel-ink: #1a1a1c;
  --panel-muted: #8a8680;
  --panel-rule: #d8d4cc;

  --bg: #0d0d0f;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

.rt-root {
  min-height: 100vh;
  background: var(--bg);
  font-family: 'IBM Plex Sans', system-ui, sans-serif;
  color: var(--panel-ink);
  padding: 28px 36px 64px;
  overflow-x: auto;
  background-image:
    radial-gradient(1200px 600px at 80% -10%, rgba(232,165,89,0.04), transparent),
    radial-gradient(800px 400px at 0% 100%, rgba(108,199,122,0.025), transparent);
}

.rt-header {
  max-width: 1340px;
  margin: 0 auto 32px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 22px;
  border-bottom: 1px solid #232327;
  gap: 32px;
  flex-wrap: wrap;
}
.rt-brand { display: flex; align-items: center; gap: 14px; }
.rt-logo {
  width: 44px;
  height: 44px;
  background: var(--panel-bg);
  color: var(--panel-ink);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 600;
  font-size: 22px;
  border-radius: 4px;
  letter-spacing: -0.04em;
  position: relative;
  flex-shrink: 0;
}
.rt-logo::after {
  content: '';
  position: absolute;
  bottom: 6px;
  right: 6px;
  width: 6px;
  height: 6px;
  background: var(--up);
  border-radius: 50%;
}
.rt-logo::after {
  content: '';
  position: absolute;
  bottom: 6px;
  right: 6px;
  width: 6px;
  height: 6px;
  background: var(--up);
  border-radius: 50%;
}
.rt-title {
  color: var(--panel-bg);
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 500;
  font-size: 22px;
  letter-spacing: -0.02em;
  line-height: 1;
}
.rt-title .accent { color: var(--amber); }
.rt-sub {
  color: #6e6c66;
  font-size: 11px;
  margin-top: 8px;
  font-family: 'IBM Plex Mono', monospace;
  letter-spacing: 0.04em;
  line-height: 1.5;
}
.rt-sub strong { color: #b0b0ae; font-weight: 500; }

.day-selector-wrap { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
.day-label {
  color: #5a5a5e;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.day-selector {
  display: flex;
  background: #18181b;
  border-radius: 4px;
  padding: 3px;
  border: 1px solid #232327;
}
.day-selector button {
  background: transparent;
  border: 0;
  color: #6e6c66;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  padding: 7px 14px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.06em;
}
.day-selector button:hover { color: var(--panel-bg); }
.day-selector button.active {
  background: var(--panel-bg);
  color: var(--panel-ink);
  font-weight: 500;
}

.rt-stage {
  max-width: 1380px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 320px 392px 1fr;
  gap: 32px;
  align-items: start;
}

/* ===== CONTROLS ===== */
.controls { position: sticky; top: 24px; }
.controls-title {
  color: #6e6c66;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 18px;
  padding-bottom: 12px;
  border-bottom: 1px solid #232327;
}
.controls-group { margin-bottom: 22px; }
.controls-group-label {
  color: #4a4a4e;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.action-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  background: transparent;
  color: #d0d0ce;
  border: 1px solid #232327;
  padding: 9px 12px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 12px;
  text-align: left;
  cursor: pointer;
  margin-bottom: 5px;
  border-radius: 3px;
  transition: all 0.15s;
}
.action-btn:hover {
  background: #18181b;
  border-color: var(--amber);
  color: var(--panel-bg);
}
.action-btn .key {
  font-family: 'IBM Plex Mono', monospace;
  color: #5a5a5e;
  font-size: 9px;
  letter-spacing: 0.05em;
  min-width: 18px;
}
.reset-btn {
  margin-top: 8px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: #6e6c66;
  background: transparent;
  border: 0;
  padding: 8px 0;
  cursor: pointer;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.reset-btn:hover { color: var(--amber); }

.live-tick {
  margin-top: 24px;
  padding: 12px;
  border: 1px solid #232327;
  border-radius: 3px;
  background: #18181b;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
}
.live-tick-label {
  color: #6e6c66;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 9px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.live-tick-label::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--up);
  animation: livedot 1.2s ease-in-out infinite;
}
@keyframes livedot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
.live-tick-row {
  display: flex;
  justify-content: space-between;
  color: #b0b0ae;
  margin-bottom: 4px;
}
.live-tick-row span:first-child { color: #6e6c66; }

/* ===== PHONE ===== */
.phone-wrap { display: flex; flex-direction: column; align-items: center; gap: 18px; position: relative; }
/* Day-selector position when shown below the phone */
.day-selector-below { display: flex; flex-direction: column; align-items: center; gap: 8px; padding-top: 6px; }
.header-tools { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
.phone {
  width: 392px;
  height: 820px;
  background: var(--phone-bg);
  border-radius: 52px;
  border: 9px solid #1c1c1f;
  box-shadow:
    0 50px 100px rgba(0,0,0,0.6),
    0 0 0 1px rgba(255,255,255,0.04),
    inset 0 0 0 1px rgba(255,255,255,0.02);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.phone::before {
  content: '';
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 118px;
  height: 34px;
  background: #000;
  border-radius: 999px;
  z-index: 10;
}
.home-bar {
  position: absolute;
  bottom: 9px;
  left: 50%;
  transform: translateX(-50%);
  width: 130px;
  height: 4px;
  background: var(--phone-fg);
  border-radius: 2px;
  opacity: 0.7;
  z-index: 10;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 28px 0;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 14px;
  color: var(--phone-fg);
  font-weight: 600;
  height: 56px;
  flex-shrink: 0;
  letter-spacing: -0.01em;
}
.status-icons { display: flex; gap: 5px; align-items: center; }

/* App content */
.app-screen {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 18px 10px;
  flex-shrink: 0;
}
.app-symbol { display: flex; align-items: center; gap: 8px; }
.back-arrow { color: var(--phone-fg-dim); font-size: 18px; cursor: pointer; line-height: 1; }
.symbol-name {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--phone-fg);
}
.symbol-tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  color: var(--phone-fg-dim);
  border: 1px solid var(--phone-rule);
  padding: 3px 7px;
  border-radius: 3px;
  letter-spacing: 0.08em;
  display: flex;
  align-items: center;
  gap: 4px;
}
.app-actions { display: flex; gap: 8px; align-items: center; }
.ai-assistant-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--amber-soft);
  border: 1px solid rgba(232,165,89,0.4);
  border-radius: 99px;
  padding: 5px 10px 5px 7px;
  cursor: pointer;
  position: relative;
}
.ai-assistant-btn:hover { border-color: var(--amber); }
.ai-orb {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, var(--amber), #c98a3f);
  position: relative;
  flex-shrink: 0;
}
.ai-orb::after {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 1px solid var(--amber);
  opacity: 0;
  animation: aipulse 2.4s ease-in-out infinite;
}
@keyframes aipulse {
  0%, 100% { opacity: 0; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.4); }
}
.ai-assistant-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  color: var(--amber);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 500;
}
.more-dot {
  color: var(--phone-fg-dim);
  font-size: 18px;
  letter-spacing: 1px;
  cursor: pointer;
  padding: 0 4px;
}

/* Tabs */
.app-tabs {
  display: flex;
  gap: 18px;
  padding: 0 18px;
  border-bottom: 1px solid var(--phone-rule);
  flex-shrink: 0;
}
.app-tab {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 14px;
  color: var(--phone-fg-dim);
  padding: 10px 0;
  cursor: pointer;
  position: relative;
  font-weight: 500;
}
.app-tab.active {
  color: var(--phone-fg);
}
.app-tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--phone-fg);
}

/* Scrollable content */
.app-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 12px 18px 12px;
  scrollbar-width: thin;
}
.app-content::-webkit-scrollbar { width: 0; }

/* Price block */
.price-block { margin-bottom: 12px; }
.price-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}
.price-main {}
.price-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  color: var(--phone-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.price-value {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 500;
  font-size: 32px;
  letter-spacing: -0.02em;
  margin-top: 2px;
  color: var(--phone-fg);
  line-height: 1;
  font-variant-numeric: tabular-nums;
  transition: color 0.3s;
}
.price-value.flash-up { color: var(--up); }
.price-value.flash-down { color: var(--down); }
.price-meta {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  margin-top: 6px;
  color: var(--phone-fg-dim);
  letter-spacing: 0.02em;
  font-variant-numeric: tabular-nums;
}
.price-meta .change { font-weight: 500; }
.up { color: var(--up); }
.down { color: var(--down); }
.price-mark {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: var(--phone-muted);
  margin-top: 4px;
  letter-spacing: 0.03em;
}

.price-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 16px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
}
.price-stats .stat {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}
.price-stats .stat-label { color: var(--phone-muted); letter-spacing: 0.02em; }
.price-stats .stat-value { color: var(--phone-fg); font-weight: 500; }

/* Timeframes */
.timeframes {
  display: flex;
  gap: 0;
  margin-bottom: 8px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  align-items: center;
  border-bottom: 1px solid var(--phone-rule);
  padding-bottom: 8px;
}
.tf {
  cursor: pointer;
  color: var(--phone-fg-dim);
  padding: 5px 9px;
  letter-spacing: 0.04em;
  border-radius: 3px;
  transition: all 0.15s;
}
.tf:hover { color: var(--phone-fg); }
.tf.active {
  color: var(--phone-fg);
  background: var(--phone-rule-2);
  font-weight: 500;
}
.tf-more {
  color: var(--phone-fg-dim);
  margin-left: auto;
  display: flex;
  gap: 10px;
  align-items: center;
}
.tf-icon { font-size: 13px; cursor: pointer; }

/* Indicator overlays legend (top of chart) */
.overlay-legend {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  line-height: 1.6;
  margin-bottom: 6px;
  font-variant-numeric: tabular-nums;
  color: var(--phone-fg-dim);
}
.overlay-legend span { margin-right: 10px; white-space: nowrap; }
.overlay-legend .ol-sar { color: #f5b050; }
.overlay-legend .ol-ma5 { color: #f5b050; }
.overlay-legend .ol-ma10 { color: #d96cae; }
.overlay-legend .ol-ma20 { color: #a989d6; }
.overlay-legend .ol-boll { color: #16A8A0; }
.overlay-legend .ol-ub { color: #d56e6e; }
.overlay-legend .ol-lb { color: #d56e6e; }
.overlay-legend .ol-ema9 { color: #6ea3d6; }
.overlay-legend .ol-ema21 { color: #d96cae; }
.overlay-legend .ol-ema200 { color: #f5d050; }

/* Main candle chart */
.chart-area {
  background: transparent;
  margin-bottom: 8px;
  position: relative;
  flex-shrink: 0;
  border: 1px solid transparent;
  transition: border-color 0.3s;
}
.chart-area.focused { border-color: rgba(232,165,89,0.2); }

/* Ticker price — sits right below the QQQ chip in the app header */
.ticker-price {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 4px 16px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}
.ticker-price-value {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-weight: 600;
  font-size: 30px;
  letter-spacing: -0.018em;
  line-height: 1;
}
.ticker-price.up   .ticker-price-value { color: #16A8A0; }
.ticker-price.down .ticker-price-value { color: #d56e6e; }
.ticker-price-value.flash-up   { animation: priceFlashUp   0.55s ease; }
.ticker-price-value.flash-down { animation: priceFlashDown 0.55s ease; }
.ticker-price-change {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-weight: 500;
  font-size: 12px;
  padding: 2px 7px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
}
.ticker-price-change.up   { color: #16A8A0; }
.ticker-price-change.down { color: #d56e6e; }

/* Big price overlaid on the chart — replaces the old price-block hero */
.chart-price-overlay {
  position: absolute;
  top: 6px;
  left: 8px;
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: 2px;
  pointer-events: none;
}
.chart-price-value {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-weight: 600;
  font-size: 32px;
  letter-spacing: -0.02em;
  line-height: 1;
  color: #e8e8e6;
  text-shadow: 0 2px 6px rgba(0,0,0,0.55);
}
.chart-price-overlay.up   .chart-price-value { color: #16A8A0; }
.chart-price-overlay.down .chart-price-value { color: #d56e6e; }
.chart-price-value.flash-up   { animation: priceFlashUp   0.55s ease; }
.chart-price-value.flash-down { animation: priceFlashDown 0.55s ease; }
@keyframes priceFlashUp   { 0% { transform: translateY(2px); } 100% { transform: translateY(0); } }
@keyframes priceFlashDown { 0% { transform: translateY(-2px);} 100% { transform: translateY(0); } }
.chart-price-change {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-weight: 500;
  font-size: 11px;
  letter-spacing: 0.04em;
  padding: 2px 6px;
  border-radius: 4px;
  align-self: flex-start;
  background: rgba(0,0,0,0.45);
}
.chart-price-change.up   { color: #16A8A0; }
.chart-price-change.down { color: #d56e6e; }

/* Compact price strip — change% + Turnover only */
.price-strip {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 2px 0 6px;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 11px;
}
.price-strip-meta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #6e6c66;
}
.price-strip-meta .change.up   { color: #16A8A0; }
.price-strip-meta .change.down { color: #d56e6e; }
.strip-divider {
  width: 1px; height: 12px;
  background: rgba(255,255,255,0.10);
  display: inline-block;
}
.strip-stat { display: inline-flex; align-items: baseline; gap: 6px; }
.strip-stat-label {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 10px;
  letter-spacing: 0.08em;
  color: #6e6c66;
}
.strip-stat-value {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-weight: 600;
  font-size: 11px;
  color: #e8e8e6;
}

.chart-svg-wrap { position: relative; }
.chart-svg { width: 100%; height: 180px; display: block; }
.chart-y-axis {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  color: var(--phone-fg-dim);
  text-align: right;
  pointer-events: none;
  font-variant-numeric: tabular-nums;
  padding: 2px 4px;
}
.chart-y-axis span {
  background: rgba(10,11,13,0.7);
  padding: 1px 3px;
}
.chart-time-axis {
  display: flex;
  justify-content: space-between;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  color: var(--phone-muted);
  padding: 4px 0 6px;
  font-variant-numeric: tabular-nums;
  border-bottom: 1px solid var(--phone-rule);
  margin-bottom: 8px;
}

.last-price-tag {
  position: absolute;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  font-weight: 500;
  color: var(--phone-bg);
  background: var(--up);
  padding: 2px 6px;
  border-radius: 2px;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
  white-space: nowrap;
  z-index: 2;
  transform: translateY(-50%);
}
.last-price-tag.down { background: var(--down); }
.last-price-tag::before {
  content: '';
  position: absolute;
  left: -5px;
  top: 50%;
  transform: translateY(-50%);
  border-style: solid;
  border-width: 4px 5px 4px 0;
  border-color: transparent var(--up) transparent transparent;
}
.last-price-tag.down::before {
  border-color: transparent var(--down) transparent transparent;
}

/* Indicator panels stacked */
.ind-panel {
  border-bottom: 1px solid var(--phone-rule);
  padding: 6px 0 8px;
  position: relative;
}
.ind-panel-header {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  line-height: 1.4;
  margin-bottom: 4px;
  font-variant-numeric: tabular-nums;
}
.ind-panel-header span { margin-right: 8px; }
.ind-panel-name { color: var(--phone-fg-dim); }
.ind-svg { width: 100%; height: 50px; display: block; }
.ind-y-axis {
  position: absolute;
  right: 0;
  top: 18px;
  bottom: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 8.5px;
  color: var(--phone-fg-dim);
  text-align: right;
  pointer-events: none;
  font-variant-numeric: tabular-nums;
}

/* Indicator chips */
.indicators {
  display: flex;
  gap: 0;
  margin: 10px 0;
  overflow-x: auto;
  padding: 0;
  border-bottom: 1px solid var(--phone-rule);
}
.indicators::-webkit-scrollbar { display: none; }
.ind-chip {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: var(--phone-fg-dim);
  padding: 8px 10px;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  flex-shrink: 0;
  background: transparent;
  border: 0;
  border-bottom: 2px solid transparent;
}
.ind-chip.active {
  color: var(--amber);
  border-bottom-color: var(--amber);
}
.ind-chip.suggested {
  color: var(--amber);
  border-bottom-color: var(--amber);
  border-bottom-style: dashed;
  animation: chipsuggest 2s ease-in-out infinite;
}
@keyframes chipsuggest {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
.ind-chip.dim { opacity: 0.35; }
.ind-chip-icon {
  margin-left: auto;
  color: var(--phone-fg-dim);
  padding: 8px 4px;
}

/* Period stats */
.period-stats {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 4px;
  margin-bottom: 12px;
  font-family: 'IBM Plex Mono', monospace;
  font-variant-numeric: tabular-nums;
}
.period {
  text-align: left;
}
.period-label { font-size: 10px; color: var(--phone-fg-dim); letter-spacing: 0.02em; }
.period-value { font-size: 11px; margin-top: 3px; font-weight: 500; }

/* Order book section */
.ob-tabs {
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--phone-rule);
}
.ob-tab {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 13px;
  color: var(--phone-fg-dim);
  padding: 6px 0;
  cursor: pointer;
  position: relative;
  font-weight: 500;
}
.ob-tab.active { color: var(--phone-fg); }
.ob-tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--phone-fg);
}

.imbalance {
  display: flex;
  height: 4px;
  border-radius: 2px;
  overflow: hidden;
  margin-top: 4px;
  background: var(--phone-rule);
}
.imbalance .b { background: var(--up); }
.imbalance .s { background: var(--down); }
.imbalance-label {
  display: flex;
  justify-content: space-between;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  margin-bottom: 4px;
  color: var(--phone-fg-dim);
  font-variant-numeric: tabular-nums;
}
.imbalance-label .b-pct { color: var(--up); font-weight: 500; }
.imbalance-label .s-pct { color: var(--down); font-weight: 500; }

.ai-surface-note {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: var(--amber);
  letter-spacing: 0.02em;
  margin-top: 8px;
  padding: 6px 8px;
  background: var(--amber-soft);
  border-left: 2px solid var(--amber);
  border-radius: 2px;
  display: flex;
  gap: 6px;
  line-height: 1.4;
}

/* CTA */
.app-cta {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
  padding: 10px 18px 14px;
  border-top: 1px solid var(--phone-rule);
  background: var(--phone-bg);
}
.tools-btn {
  width: 50px;
  height: 46px;
  border-radius: 8px;
  background: var(--phone-surface);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 8px;
  color: var(--phone-fg-dim);
  letter-spacing: 0.05em;
  border: 1px solid var(--phone-rule);
  gap: 2px;
}
.tools-btn-icon { font-size: 14px; }
.trade-btn {
  flex: 1;
  background: var(--phone-fg);
  color: var(--phone-bg);
  border: 0;
  border-radius: 8px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  letter-spacing: 0.02em;
  position: relative;
  height: 46px;
}
.trade-btn.friction {
  background: var(--phone-surface);
  color: var(--phone-fg);
  border: 1px solid var(--amber);
}
.trade-friction-strip {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  color: var(--amber);
  letter-spacing: 0.04em;
  text-align: center;
  padding: 4px 0;
  background: var(--amber-soft);
  border-top: 1px solid rgba(232,165,89,0.2);
  flex-shrink: 0;
}

/* AI Assistant overlay (when activated) */
.ai-assistant-modal {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(10, 11, 13, 0.96);
  z-index: 5;
  display: flex;
  flex-direction: column;
  padding: 60px 20px 80px;
  font-family: 'IBM Plex Sans', sans-serif;
  color: var(--phone-fg);
  animation: fadein 0.25s;
}
@keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
.ai-modal-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--phone-rule);
  margin-bottom: 16px;
}
.ai-modal-title {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--amber);
}
.ai-modal-close {
  margin-left: auto;
  color: var(--phone-fg-dim);
  font-size: 18px;
  cursor: pointer;
}
.ai-modal-body { font-family: 'IBM Plex Sans', sans-serif; font-size: 13px; line-height: 1.6; color: var(--phone-fg-dim); }
.ai-modal-body p { margin-bottom: 12px; }
.ai-modal-body strong { color: var(--phone-fg); }

/* ===== AI PANEL ===== */
.ai-panel {
  background: var(--panel-bg);
  border-radius: 6px;
  font-family: 'IBM Plex Mono', monospace;
  color: var(--panel-ink);
  position: sticky;
  top: 24px;
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  box-shadow: 0 30px 60px rgba(0,0,0,0.3);
}
.ai-panel::-webkit-scrollbar { width: 6px; }
.ai-panel::-webkit-scrollbar-thumb { background: var(--panel-rule); border-radius: 3px; }

.privacy {
  background: var(--panel-ink);
  color: var(--panel-bg);
  padding: 13px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  letter-spacing: 0.05em;
  border-radius: 6px 6px 0 0;
}
.privacy-state { display: flex; align-items: center; gap: 10px; font-size: 10.5px; letter-spacing: 0.08em; }
.privacy-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--up);
  animation: dotpulse 2.4s ease-in-out infinite;
}
@keyframes dotpulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(108,199,122,0.5); }
  50% { opacity: 0.5; box-shadow: 0 0 0 4px rgba(108,199,122,0); }
}
.privacy-meta { color: #8a8680; font-size: 10px; }
.sync-toggle {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9.5px;
  background: transparent;
  color: var(--amber);
  border: 1px solid var(--amber);
  padding: 5px 10px;
  border-radius: 99px;
  cursor: pointer;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.sync-toggle.synced {
  background: var(--amber);
  color: var(--panel-ink);
  font-weight: 500;
}

.ai-panel-section {
  padding: 16px 22px;
  border-bottom: 1px solid var(--panel-rule);
}
.ai-panel-section:last-child { border-bottom: 0; }

.ai-section-title {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--panel-muted);
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.ai-section-title::before {
  content: '';
  width: 6px;
  height: 6px;
  background: var(--panel-ink);
  border-radius: 1px;
}
.ai-section-meta {
  margin-left: auto;
  font-size: 9.5px;
  color: var(--panel-muted);
  letter-spacing: 0.04em;
  text-transform: none;
  font-weight: 400;
}

.obs-list { display: flex; flex-direction: column; gap: 4px; }
.obs {
  display: grid;
  grid-template-columns: 1fr 80px 50px;
  gap: 14px;
  align-items: center;
  font-size: 11.5px;
  padding: 5px 0;
}
.obs-label { color: var(--panel-ink); font-weight: 500; font-family: 'IBM Plex Sans', sans-serif; }
.obs.dim .obs-label { color: var(--panel-muted); }
.obs-bar {
  height: 3px;
  background: #e0dcd2;
  border-radius: 2px;
  position: relative;
  overflow: hidden;
}
.obs-bar > span {
  display: block;
  height: 100%;
  background: var(--panel-ink);
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.obs.dim .obs-bar > span { background: #b8b3a8; }
.obs-time {
  font-size: 10.5px;
  color: var(--panel-muted);
  text-align: right;
  letter-spacing: 0.02em;
  font-variant-numeric: tabular-nums;
}

.pattern {
  font-size: 11.5px;
  margin-bottom: 11px;
  display: grid;
  grid-template-columns: 18px 1fr auto;
  gap: 10px;
  align-items: baseline;
  line-height: 1.55;
}
.pattern:last-child { margin-bottom: 0; }
.pattern-bullet {
  font-family: 'IBM Plex Mono', monospace;
  color: var(--panel-muted);
  font-size: 10px;
}
.pattern-text { color: var(--panel-ink); font-family: 'IBM Plex Sans', sans-serif; font-size: 12.5px; }
.pattern-text em {
  font-family: 'IBM Plex Mono', monospace;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0;
  background: #e0dcd2;
  padding: 1px 4px;
  border-radius: 2px;
}
.pattern-conf {
  font-size: 10px;
  color: var(--panel-muted);
  letter-spacing: 0.05em;
  font-variant-numeric: tabular-nums;
}

.action-card {
  background: #ebe7df;
  padding: 12px 14px;
  margin-bottom: 8px;
  border-radius: 3px;
  border-left: 2px solid var(--amber);
  font-size: 12px;
  line-height: 1.55;
}
.action-card:last-child { margin-bottom: 0; }
.action-card .verb {
  color: var(--amber);
  font-weight: 500;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 4px;
}
.action-card .descr { color: var(--panel-ink); font-family: 'IBM Plex Sans', sans-serif; }
.action-card .when {
  color: var(--panel-muted);
  font-size: 10px;
  margin-top: 6px;
  font-family: 'IBM Plex Mono', monospace;
  letter-spacing: 0.02em;
}
.action-card.applied {
  border-left-color: var(--up-dim);
  opacity: 0.75;
}
.action-card.applied .verb { color: var(--up-dim); }
.action-card.active {
  border-left-color: var(--amber);
  background: rgba(232,165,89,0.18);
  animation: cardpulse 2s ease-in-out infinite;
}
@keyframes cardpulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(232,165,89,0); }
  50% { box-shadow: 0 0 0 4px rgba(232,165,89,0.1); }
}

.reasoning {
  font-size: 13px;
  line-height: 1.6;
  color: var(--panel-ink);
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  font-style: italic;
  padding: 4px 0;
  position: relative;
  padding-left: 16px;
  border-left: 2px solid var(--panel-ink);
}
.reasoning-meta {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: var(--panel-muted);
  margin-top: 10px;
  letter-spacing: 0.04em;
  display: flex;
  gap: 12px;
}

.empty {
  font-family: 'IBM Plex Sans', sans-serif;
  font-style: italic;
  color: var(--panel-muted);
  font-size: 12.5px;
  padding: 4px 0;
}

/* ===== BRAND UPDATE: LINGXI ===== */
.rt-logo-cn {
  font-family: 'Noto Serif SC', serif;
  font-weight: 600;
  font-size: 26px;
  letter-spacing: 0;
  line-height: 1;
}
.rt-title-en {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 500;
  font-size: 22px;
  letter-spacing: 0.04em;
  color: var(--panel-bg);
  display: flex;
  align-items: baseline;
  gap: 10px;
}
.rt-title-cn {
  font-family: 'Noto Serif SC', serif;
  color: var(--amber);
  font-size: 18px;
  letter-spacing: 0.06em;
  font-weight: 500;
}
.tour-restart {
  margin-top: 6px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: #6e6c66;
  background: transparent;
  border: 0;
  cursor: pointer;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0;
  text-align: right;
}
.tour-restart:hover { color: var(--amber); }

/* ===== WELCOME / TOUR ===== Blue Rounded Clean adaptation
   Tokens (kept inline so the tour reads independently of any panel host):
   --brc-hero #0A2D52 / --brc-hero-2 #143F6B / --brc-l1 #1F5C99 / --brc-l1-2 #2D6FB0
   --brc-cyan #6FB7DA / --brc-sage #84C6A2
   Type: Outfit (display, italic 300 for accent), Manrope (body/eyebrow/buttons)
   Cards: white paper, asymmetric corners 28/8/28/8 alternating
*/

/* Welcome — full-page deep-navy hero with floating white card.
   Background is a separately-rendered blurred ticking bar chart with
   navy tint + radial vignette layered on top. */
.tour-welcome {
  position: fixed;
  inset: 0;
  background: #050811;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  animation: tourFade 0.45s cubic-bezier(0.2, 0.7, 0.3, 1);
  padding: 40px 24px;
  overflow: hidden;
}

.welcome-backdrop {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}
/* Jumping P/L tile — left mirror of the 3D phone */
.welcome-bg-pl {
  position: absolute;
  top: 50%; left: -8%;
  transform: translateY(-50%) rotate(8deg);
  width: 280px;
  padding: 22px 26px 20px;
  background: linear-gradient(165deg, rgba(14, 27, 44, 0.92) 0%, rgba(20, 58, 92, 0.92) 100%);
  border: 1px solid rgba(111, 183, 218, 0.22);
  border-radius: 18px;
  box-shadow: 0 60px 120px rgba(0, 0, 0, 0.5);
  filter: blur(2px);
  opacity: 0.92;
}
.welcome-bg-pl-eyebrow {
  font-family: 'Manrope', sans-serif;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.62);
  margin-bottom: 8px;
}
.welcome-bg-pl-value {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 600;
  font-size: 38px;
  letter-spacing: -0.022em;
  line-height: 1;
  margin-bottom: 6px;
}
.welcome-bg-pl-value.up   { color: #16A8A0; }
.welcome-bg-pl-value.down { color: #d56e6e; }
.welcome-bg-pl-meta {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 14px;
}
.welcome-bg-pl-meta.up   { color: #16A8A0; }
.welcome-bg-pl-meta.down { color: #d56e6e; }
.welcome-bg-pl-spark {
  height: 36px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.25);
  padding: 4px 4px;
}
.welcome-bg-pl-spark svg { width: 100%; height: 100%; }

/* 3D phone mockup behind the welcome card — tilted, partially off-screen,
   with a live ticking trading interface inside. */
.welcome-bg-phone-3d {
  position: absolute;
  top: 50%; right: -22%;
  transform: translateY(-50%) rotate(-14deg) skewY(-2deg) scale(1.45);
  width: 70%;
  max-width: 680px;
  filter: blur(1px);
  opacity: 0.92;
  perspective: 1400px;
}
.welcome-bg-phone-frame {
  background: #0a0b0d;
  border-radius: 56px;
  padding: 14px;
  box-shadow:
    0 60px 120px rgba(0, 0, 0, 0.65),
    0 0 0 2px rgba(111, 183, 218, 0.10),
    inset 0 0 0 6px #050608;
  position: relative;
  transform: rotateY(-8deg);
}
.welcome-bg-phone-notch {
  width: 110px; height: 22px;
  background: #050608;
  border-radius: 0 0 16px 16px;
  margin: 0 auto;
  position: absolute;
  top: 14px; left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}
.welcome-bg-phone-screen {
  background: linear-gradient(180deg, #0a0b0d 0%, #131417 100%);
  border-radius: 44px;
  padding: 36px 22px 22px;
  color: #e8e8e6;
  font-family: 'IBM Plex Sans', sans-serif;
  position: relative;
  overflow: hidden;
}
.welcome-bg-phone-status {
  display: flex; justify-content: space-between;
  font-size: 11px;
  font-weight: 600;
  color: #e8e8e6;
  margin-bottom: 14px;
  letter-spacing: 0.04em;
}
.welcome-bg-phone-statusicons { color: rgba(232, 232, 230, 0.7); font-size: 9px; }
.welcome-bg-phone-symbol {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #e8e8e6;
  margin-bottom: 6px;
}
.welcome-bg-phone-symbol span {
  font-size: 10px;
  font-weight: 500;
  color: rgba(232, 232, 230, 0.55);
  letter-spacing: 0.06em;
  margin-left: 6px;
}
.welcome-bg-phone-price {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 600;
  font-size: 32px;
  letter-spacing: -0.018em;
  color: #16A8A0;
  margin-bottom: 8px;
}
.welcome-bg-phone-price .up {
  font-size: 12px;
  font-weight: 500;
  margin-left: 8px;
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(22, 168, 160, 0.12);
}
.welcome-bg-phone-tf {
  display: flex;
  gap: 12px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10.5px;
  color: rgba(232, 232, 230, 0.45);
  font-weight: 500;
  margin-bottom: 10px;
  letter-spacing: 0.08em;
}
.welcome-bg-phone-tf .active { color: #16A8A0; }
.welcome-bg-phone-chart {
  background: rgba(0, 0, 0, 0.18);
  border-radius: 10px;
  height: 220px;
  margin-bottom: 6px;
  overflow: hidden;
}
.welcome-bg-phone-chart svg { width: 100%; height: 100%; }
.welcome-bg-phone-vol {
  height: 38px;
  margin-bottom: 14px;
  border-top: 1px dashed rgba(111, 183, 218, 0.08);
  padding-top: 4px;
}
.welcome-bg-phone-vol svg { width: 100%; height: 100%; }
.welcome-bg-phone-trade {
  background: rgba(232, 232, 230, 0.92);
  color: #0a0b0d;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  padding: 12px 0;
  border-radius: 28px;
  letter-spacing: 0.04em;
}

.welcome-backdrop-tint {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(10, 45, 82, 0.72) 0%, rgba(20, 63, 107, 0.72) 100%);
  mix-blend-mode: multiply;
}
.welcome-backdrop-vignette {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 65% 50% at 50% 50%, transparent 0%, rgba(5, 8, 17, 0.74) 80%, rgba(5, 8, 17, 0.94) 100%);
}
.tour-welcome > .tour-welcome-card { position: relative; z-index: 2; }
@keyframes tourFade {
  from { opacity: 0; }
  to { opacity: 1; }
}
.tour-welcome::before,
.tour-welcome::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  pointer-events: none;
}
.tour-welcome::before {
  top: 12%; right: -8%; width: 380px; height: 380px;
  background: radial-gradient(circle, rgba(111, 183, 218, 0.28), transparent 70%);
}
.tour-welcome::after {
  bottom: 14%; left: -10%; width: 320px; height: 320px;
  background: radial-gradient(circle, rgba(132, 198, 162, 0.18), transparent 70%);
}
.tour-welcome-card {
  position: relative;
  max-width: 580px;
  width: 100%;
  background: linear-gradient(168deg, rgba(14, 27, 44, 0.92) 0%, rgba(20, 58, 92, 0.92) 100%);
  color: #ffffff;
  backdrop-filter: blur(14px) saturate(1.1);
  -webkit-backdrop-filter: blur(14px) saturate(1.1);
  padding: 48px 52px 36px;
  border-radius: 16px;
  border: 1px solid rgba(111, 183, 218, 0.22);
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.4),
    0 50px 120px -20px rgba(0, 0, 0, 0.7);
  animation: tourCardRise 0.6s cubic-bezier(0.2, 0.7, 0.3, 1);
}
.tour-welcome-card .tour-welcome-title { color: #ffffff; }
.tour-welcome-card .tour-welcome-title .accent { color: #6FB7DA; }
.tour-welcome-card .tour-welcome-subtitle { color: rgba(255, 255, 255, 0.55); }
.tour-welcome-card .tour-welcome-body { color: rgba(255, 255, 255, 0.78); }
.tour-welcome-card .tour-welcome-body strong { color: #ffffff; border-bottom-color: #6FB7DA; }
.tour-welcome-card .tour-welcome-body em { color: #6FB7DA; }
@keyframes tourCardRise {
  from { opacity: 0; transform: translateY(16px) scale(0.985); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* Eyebrow with pulsing cyan dot — replaces the old amber-line pulse strip */
.tour-welcome-greeting {
  font-family: 'Manrope', sans-serif;
  font-size: 11.5px;
  font-weight: 600;
  color: #6FB7DA;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  margin-bottom: 22px;
  /* Header bar: dot+Welcome on the left, label aligned right */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.tour-welcome-greeting .greeting-line {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}
.tour-welcome-greeting .greeting-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #6FB7DA;
  box-shadow: 0 0 0 5px rgba(111, 183, 218, 0.18);
  animation: brcDotPulse 2.4s ease-in-out infinite;
  flex-shrink: 0;
}
.tour-welcome-greeting .greeting-part {
  display: inline-block;
  /* Fade only — no hero scaling on these tracking-spaced labels. */
  --pop-scale: 1.0;
  --pop-y: 10px;
  transform-origin: left center;
}
.tour-welcome-greeting .greeting-part-second {
  /* Right-aligned supporting label, slightly muted */
  color: rgba(111, 183, 218, 0.72);
  text-align: right;
  transform-origin: right center;
}
@keyframes brcDotPulse {
  0%, 100% { box-shadow: 0 0 0 5px rgba(111, 183, 218, 0.18); }
  50%      { box-shadow: 0 0 0 9px rgba(111, 183, 218, 0.06); }
}

.tour-welcome-title {
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 44px;
  line-height: 1.0;
  letter-spacing: -0.035em;
  color: #0E1B2C;
  margin: 0 0 22px 0;
  max-width: 14ch;
}
.tour-welcome-title .accent {
  font-weight: 300;
  font-style: italic;
  color: #1F5C99;
}

.tour-welcome-subtitle {
  font-family: 'Manrope', sans-serif;
  font-size: 13px;
  color: #5C6B7D;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  margin: 0 0 24px 0;
}

/* Author + role credit block — dark navy panel */
.tour-welcome-credit {
  display: flex;
  align-items: stretch;
  gap: 22px;
  margin: 0 0 28px 0;
  padding: 18px 22px;
  background: rgba(0, 0, 0, 0.28);
  border: 1px solid rgba(111, 183, 218, 0.16);
  border-left: 3px solid #6FB7DA;
  border-radius: 12px;
}
.tour-welcome-credit .credit-name {
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 22px;
  letter-spacing: -0.02em;
  color: #ffffff;
  white-space: nowrap;
  align-self: center;
}
.tour-welcome-credit .credit-role {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-left: 22px;
  border-left: 1px dashed rgba(111, 183, 218, 0.22);
  flex: 1;
  justify-content: center;
}
.tour-welcome-credit .credit-label {
  font-family: 'Manrope', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
}
.tour-welcome-credit .credit-value {
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: -0.01em;
  color: #6FB7DA;
}
@media (max-width: 880px) {
  .tour-welcome-credit {
    flex-direction: column;
    gap: 10px;
    border-radius: 14px;
  }
  .tour-welcome-credit .credit-role {
    padding-left: 0;
    border-left: 0;
    border-top: 1px dashed rgba(15, 76, 129, 0.20);
    padding-top: 10px;
  }
}

.tour-welcome-body {
  font-family: 'Manrope', sans-serif;
  font-size: 17px;
  line-height: 1.55;
  color: #2A3A4D;
  margin: 0 0 32px 0;
  max-width: 56ch;
  font-weight: 400;
}
.tour-welcome-body strong {
  font-weight: 600;
  color: #0E1B2C;
  border-bottom: 1px solid #6FB7DA;
  padding-bottom: 1px;
}
.tour-welcome-body em {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-style: italic;
  color: #1F5C99;
  letter-spacing: -0.005em;
}

/* Tour spotlight — cyan ring on navy dim */
.tour-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 150;
}
.tour-spotlight {
  position: absolute;
  border-radius: 18px;
  box-shadow: 0 0 0 9999px rgba(10, 45, 82, 0.82);
  border: 2px solid rgba(111, 183, 218, 0.85);
  pointer-events: none;
  transition: all 0.5s cubic-bezier(0.2, 0.7, 0.3, 1);
  animation: spotlightPulse 2.5s ease-in-out infinite;
}
@keyframes spotlightPulse {
  0%, 100% { box-shadow: 0 0 0 9999px rgba(10, 45, 82, 0.82), 0 0 0 0 rgba(111, 183, 218, 0); }
  50%      { box-shadow: 0 0 0 9999px rgba(10, 45, 82, 0.82), 0 0 32px 4px rgba(111, 183, 218, 0.40); }
}

/* Floating tour card (highlight steps) — white paper with asymmetric corners */
.tour-card-floating {
  position: fixed;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  background: #ffffff;
  color: #0E1B2C;
  padding: 28px 32px 22px;
  border-radius: 16px;
  width: 500px;
  max-width: calc(100vw - 48px);
  box-shadow:
    0 1px 2px rgba(10, 45, 82, 0.10),
    0 30px 80px -16px rgba(10, 45, 82, 0.55);
  font-family: 'Manrope', sans-serif;
  z-index: 160;
  pointer-events: auto;
  animation: cardSlideUp 0.5s cubic-bezier(0.2, 0.7, 0.3, 1);
}
@keyframes cardSlideUp {
  from { opacity: 0; transform: translate(-50%, 20px); }
  to   { opacity: 1; transform: translate(-50%, 0); }
}

/* Eyebrow on every step card — Manrope 600 uppercase + cyan pulsing dot */
.tour-card-step {
  font-family: 'Manrope', sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: #1F5C99;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  margin-bottom: 14px;
  display: inline-flex;
  align-items: center;
  gap: 12px;
}
.tour-card-step::before {
  content: '';
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #6FB7DA;
  box-shadow: 0 0 0 5px rgba(111, 183, 218, 0.18);
  animation: brcDotPulse 2.4s ease-in-out infinite;
}

.tour-card-title {
  font-family: 'Outfit', sans-serif;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.15;
  color: #0E1B2C;
  margin: 0 0 12px 0;
  max-width: 22ch;
}
.tour-card-title .accent {
  font-weight: 300;
  font-style: italic;
  color: #1F5C99;
}

.tour-card-body {
  font-family: 'Manrope', sans-serif;
  font-size: 15px;
  line-height: 1.55;
  color: #2A3A4D;
  margin: 0 0 22px 0;
  font-weight: 400;
}
.tour-card-body strong {
  font-weight: 600;
  color: #0E1B2C;
  border-bottom: 1px solid #6FB7DA;
  padding-bottom: 1px;
}
.tour-card-body em {
  font-family: 'Outfit', sans-serif;
  font-style: italic;
  font-weight: 300;
  color: #1F5C99;
  letter-spacing: -0.005em;
}

.tour-card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px dashed rgba(15, 76, 129, 0.18);
}
.tour-progress {
  display: flex;
  gap: 6px;
  align-items: center;
}
.tour-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(15, 76, 129, 0.18);
  transition: all 0.3s ease;
}
.tour-dot.active {
  background: #1F5C99;
  width: 22px;
  border-radius: 999px;
}
.tour-buttons { display: flex; gap: 6px; align-items: center; }
.tour-btn {
  font-family: 'Manrope', sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  border: 0;
  padding: 11px 22px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.tour-btn-primary {
  background: #6FB7DA;
  color: #0A2D52;
  border: 2px solid #6FB7DA;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.tour-btn-primary:hover {
  background: #8FCFEF;
  border-color: #8FCFEF;
  transform: translateY(-2px);
}
.tour-btn-secondary {
  background: transparent;
  color: #5C6B7D;
  padding: 11px 14px;
  font-weight: 600;
}
.tour-btn-secondary:hover { color: #0A2D52; }
.tour-btn-skip {
  font-family: 'Manrope', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #8995A4;
  background: transparent;
  border: 0;
  cursor: pointer;
  padding: 4px 0;
  transition: color 0.2s ease;
}
.tour-btn-skip:hover { color: #0A2D52; }

/* Staged reveal — each piece materializes from a soft blurred BLOB,
   resolves into a sharp HERO at hero scale, holds LONG enough to be read,
   then shrinks slowly and cleanly to its settled size. Properties combined
   per element for richer micromovement:
     - blur (the "blob" beat)
     - scale (hero pop and shrink)
     - opacity (fade in)
     - Y translation (gentle drift into position during blob phase)
     - letter-spacing (eyebrow only — tracks loose during blob, settles tight)
   Once the hero arrives sharp, NOTHING re-blurs — the shrink is pure
   geometry so the text stays fully readable as it eases into final size.
*/
.tour-reveal {
  opacity: 0;
  transform-origin: left center;
  animation: tourReveal 3.4s cubic-bezier(0.4, 0, 0.4, 1) forwards;
  will-change: transform, opacity, filter;
  --pop-scale: 1.22;
  --pop-y: 18px;
  --pop-blur: 13px;
}
.tour-welcome-greeting.tour-reveal,
.tour-welcome-greeting .greeting-part.tour-reveal,
.tour-card-step.tour-reveal {
  --pop-scale: 1.85;
  --pop-y: 22px;
  --pop-blur: 18px;
  /* Eyebrow elements get a letter-spacing tracking animation on top */
  animation-name: tourRevealEyebrow;
}
.tour-welcome-title.tour-reveal,
.tour-card-title.tour-reveal {
  --pop-scale: 1.12;
  --pop-y: 18px;
  --pop-blur: 14px;
}
.tour-welcome-credit.tour-reveal {
  --pop-scale: 1.08;
  --pop-y: 14px;
  --pop-blur: 12px;
}
.tour-welcome-body.tour-reveal,
.tour-card-body.tour-reveal {
  --pop-scale: 1.04;
  --pop-y: 12px;
  --pop-blur: 10px;
}
.tour-card-actions.tour-reveal {
  --pop-scale: 1.0;
  --pop-y: 10px;
  --pop-blur: 8px;
}

@keyframes tourReveal {
  /* BLOB — invisible, fully blurred, raised at hero scale */
  0%   { opacity: 0;   transform: scale(var(--pop-scale)) translateY(var(--pop-y)); filter: blur(var(--pop-blur)); }
  /* BLOB RESOLVING — partial opacity, half blur, drifting down */
  12%  { opacity: 0.55; transform: scale(var(--pop-scale)) translateY(calc(var(--pop-y) * 0.5)); filter: blur(calc(var(--pop-blur) * 0.55)); }
  /* SHARP HERO — fully visible, in position, at hero scale */
  26%  { opacity: 1;   transform: scale(var(--pop-scale)) translateY(0); filter: blur(0); }
  /* HERO HOLD — long enough to read, short enough to keep momentum */
  58%  { opacity: 1;   transform: scale(var(--pop-scale)) translateY(0); filter: blur(0); }
  /* CLEAN SETTLE — pure scale-down, no blur, no other distractions */
  100% { opacity: 1;   transform: scale(1) translateY(0); filter: blur(0); }
}

/* Eyebrow variant — same staging, plus letter-spacing tracking animation */
@keyframes tourRevealEyebrow {
  0%   { opacity: 0;   transform: scale(var(--pop-scale)) translateY(var(--pop-y)); filter: blur(var(--pop-blur)); letter-spacing: 0.42em; }
  12%  { opacity: 0.55; transform: scale(var(--pop-scale)) translateY(calc(var(--pop-y) * 0.5)); filter: blur(calc(var(--pop-blur) * 0.55)); letter-spacing: 0.32em; }
  26%  { opacity: 1;   transform: scale(var(--pop-scale)) translateY(0); filter: blur(0); letter-spacing: 0.22em; }
  58%  { opacity: 1;   transform: scale(var(--pop-scale)) translateY(0); filter: blur(0); letter-spacing: 0.22em; }
  100% { opacity: 1;   transform: scale(1) translateY(0); filter: blur(0); letter-spacing: 0.22em; }
}

.tour-reveal-1 { animation-delay: 0ms; }
.tour-reveal-2 { animation-delay: 1100ms; }
.tour-reveal-3 { animation-delay: 2200ms; }
.tour-reveal-4 { animation-delay: 3300ms; }
.tour-reveal-5 { animation-delay: 4350ms; }
.tour-reveal-6 { animation-delay: 5300ms; }
/* Trailing fade-only pieces (body / buttons) get a shorter cycle
   so the tail of the cascade doesn't drag too long */
.tour-welcome-body.tour-reveal,
.tour-card-body.tour-reveal,
.tour-card-actions.tour-reveal {
  animation-duration: 2.0s;
}

/* Centered narrative cards (steps with no spotlight target) — inherit floating-card look but bigger and centered */
.tour-card-floating-centered {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 160;
  padding: 40px 24px;
}
.tour-card-centered {
  pointer-events: auto;
  position: relative;
  background: #ffffff;
  color: #0E1B2C;
  padding: 40px 44px 28px;
  border-radius: 16px;
  width: 540px;
  max-width: calc(100vw - 48px);
  box-shadow:
    0 1px 2px rgba(10, 45, 82, 0.10),
    0 40px 100px -20px rgba(10, 45, 82, 0.55);
  font-family: 'Manrope', sans-serif;
  animation: tourCardRise 0.6s cubic-bezier(0.2, 0.7, 0.3, 1);
}
/* Alt corner variant retired — using flat 16px radius for a more professional feel */
.tour-card-centered.alt { border-radius: 16px; }
.tour-card-centered .tour-card-title {
  font-size: 32px;
  line-height: 1.08;
  margin-bottom: 16px;
  max-width: 18ch;
}
.tour-card-centered .tour-card-body {
  font-size: 16px;
  margin-bottom: 28px;
}

/* Dim layer behind centered/highlight cards — deep navy instead of black */
.tour-overlay-dim {
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 80% at 0% 0%, rgba(45, 111, 176, 0.42), transparent 60%),
    radial-gradient(ellipse 70% 50% at 100% 100%, rgba(132, 198, 162, 0.16), transparent 55%),
    linear-gradient(170deg, rgba(10, 45, 82, 0.92) 0%, rgba(20, 63, 107, 0.92) 100%);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 150;
  animation: tourFade 0.4s cubic-bezier(0.2, 0.7, 0.3, 1);
}

@media (max-width: 880px) {
  .tour-welcome-card { padding: 36px 28px 28px; border-radius: 22px; }
  .tour-welcome-title { font-size: 36px; }
  .tour-card-floating, .tour-card-centered { border-radius: 22px !important; }
  .tour-card-centered { padding: 32px 28px 22px; }
  .tour-card-centered .tour-card-title { font-size: 26px; }
}

/* ===== USER PERSONA PANEL ===== */
.persona-panel {
  position: sticky;
  top: 24px;
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  scrollbar-width: thin;
}
.persona-panel::-webkit-scrollbar { width: 4px; }
.persona-panel::-webkit-scrollbar-thumb { background: #2a2a2e; }

.persona-title {
  color: #6e6c66;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #232327;
}

.persona-card {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 16px;
  background: #131316;
  border: 1px solid #232327;
  border-radius: 6px;
  margin-bottom: 14px;
}
.persona-avatar {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  background: #1c1c20;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1px solid #2a2a2e;
}
.persona-avatar svg { width: 38px; height: 38px; }
.persona-avatar.placeholder {
  border-style: dashed;
  border-color: #3a3a3e;
}
.persona-meta { flex: 1; min-width: 0; padding-top: 2px; }
.persona-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--amber);
  font-weight: 500;
  margin-bottom: 4px;
}
.persona-name {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: var(--panel-bg);
  margin-bottom: 4px;
  letter-spacing: -0.01em;
}
.persona-desc {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10.5px;
  color: #9a9a98;
  line-height: 1.5;
  letter-spacing: 0.01em;
}

/* Persona switcher */
.persona-switcher {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  margin-bottom: 18px;
}
.persona-tab {
  background: transparent;
  border: 1px solid #232327;
  padding: 8px 6px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9.5px;
  color: #9a9a98;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 3px;
  transition: all 0.15s;
  text-align: center;
}
.persona-tab:hover { color: var(--panel-bg); border-color: #3a3a3e; }
.persona-tab.active {
  background: var(--panel-bg);
  color: var(--panel-ink);
  border-color: var(--panel-bg);
  font-weight: 600;
}
.persona-tab.placeholder { color: #5a5a5e; border-style: dashed; }
.persona-tab.placeholder:hover { color: #6e6c66; }

/* Live activity status */
.live-activity {
  background: #131316;
  border: 1px solid #232327;
  border-radius: 6px;
  padding: 12px 14px;
  margin-bottom: 18px;
}
.activity-row {
  display: grid;
  grid-template-columns: 70px 1fr;
  gap: 10px;
  margin-bottom: 8px;
  align-items: baseline;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}
.activity-row:last-child { margin-bottom: 0; }
.activity-label {
  color: #5e5f62;
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.activity-value {
  color: var(--panel-bg);
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: -0.005em;
}
.activity-value.muted { color: #6e6c66; font-weight: 400; font-style: italic; }
.activity-pulse {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--up);
  margin-right: 6px;
  vertical-align: middle;
  animation: livedot 1.6s ease-in-out infinite;
}

/* Behavior library */
.behavior-library {
  margin-bottom: 18px;
}
.library-header {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: #6e6c66;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.library-header-count {
  color: #5e5f62;
  font-size: 9px;
}
.library-category {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  color: #5e5f62;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin: 12px 0 6px;
  padding-bottom: 4px;
  border-bottom: 1px solid #1f1f23;
  display: flex;
  align-items: center;
  gap: 8px;
}
.library-category::before {
  content: '';
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #3a3a3e;
}
.library-category:first-child { margin-top: 0; }

.behavior-card {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  padding: 10px 11px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 3px;
  transition: all 0.15s;
  width: 100%;
  text-align: left;
}
.behavior-card:hover {
  background: #18181b;
  border-color: #2a2a2e;
}
.behavior-card.recent {
  background: var(--amber-soft);
  border-color: rgba(232,165,89,0.3);
  animation: behaviorFlash 0.6s ease-out;
}
@keyframes behaviorFlash {
  0% { background: rgba(232,165,89,0.35); }
  100% { background: var(--amber-soft); }
}
.behavior-icon {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  color: var(--amber);
  width: 16px;
  flex-shrink: 0;
  letter-spacing: 0;
  margin-top: 2px;
  font-weight: 500;
}
.behavior-body { flex: 1; min-width: 0; }
.behavior-label {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 12px;
  color: #d8d4cc;
  font-weight: 500;
  line-height: 1.35;
  letter-spacing: -0.005em;
}
.behavior-card:hover .behavior-label { color: var(--panel-bg); }
.behavior-meta {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  color: #5e5f62;
  margin-top: 2px;
  letter-spacing: 0.02em;
}

.behavior-card.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.behavior-card.disabled:hover {
  background: transparent;
  border-color: transparent;
}

.persona-empty {
  font-family: 'IBM Plex Sans', sans-serif;
  font-style: italic;
  font-size: 12px;
  color: #6e6c66;
  padding: 16px 12px;
  border: 1px dashed #2a2a2e;
  border-radius: 4px;
  text-align: center;
  line-height: 1.5;
}
.persona-empty strong {
  display: block;
  color: #9a9a98;
  font-style: normal;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 6px;
}

.persona-reset {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: #6e6c66;
  background: transparent;
  border: 0;
  padding: 4px 0;
  cursor: pointer;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-top: 4px;
}
.persona-reset:hover { color: var(--amber); }

/* ===== AI INTERPRETATION CHAIN ===== */
.interpretation-card {
  background: var(--panel-ink);
  color: var(--panel-bg);
  padding: 16px 22px 18px;
  border-radius: 0;
}
.interpretation-step {
  display: grid;
  grid-template-columns: 70px 1fr;
  gap: 14px;
  align-items: baseline;
  font-size: 12px;
  margin-bottom: 8px;
  line-height: 1.5;
}
.interpretation-step:last-child { margin-bottom: 0; }
.interpretation-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--amber);
  font-weight: 500;
  position: relative;
  padding-left: 12px;
}
.interpretation-label::before {
  content: '';
  position: absolute;
  left: 0;
  top: 6px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--amber);
}
.interpretation-text {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 12.5px;
  color: #e8e8e6;
  line-height: 1.55;
}
.interpretation-text strong { color: var(--panel-bg); font-weight: 600; }
.interpretation-text.action {
  color: var(--amber);
  font-weight: 500;
}
.interpretation-empty {
  font-family: 'IBM Plex Sans', sans-serif;
  font-style: italic;
  font-size: 12px;
  color: #8a8680;
  padding: 4px 0;
}

/* ===== MODE TOGGLE ===== */
.mode-toggle {
  display: inline-flex;
  margin-top: 10px;
  background: rgba(15, 76, 129, 0.10);
  border: 1px solid rgba(15, 76, 129, 0.18);
  border-radius: 999px;
  padding: 3px;
  gap: 2px;
}
.mode-toggle-btn {
  font-family: 'Manrope', sans-serif;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 0;
  background: transparent;
  color: #8a8680;
  padding: 6px 14px;
  border-radius: 999px;
  cursor: pointer;
  transition: color 0.18s ease, background 0.2s ease;
}
.mode-toggle-btn:hover { color: #e8e8e6; }
.mode-toggle-btn.active {
  background: #0A2D52;
  color: #ffffff;
}

/* ===== BEGINNER COCKPIT (BRC) ===== */
.cockpit {
  position: sticky;
  top: 24px;
  font-family: 'Manrope', system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  padding-right: 6px;
}
.cockpit::-webkit-scrollbar { width: 4px; }
.cockpit::-webkit-scrollbar-thumb { background: rgba(15, 76, 129, 0.30); border-radius: 4px; }

/* Profile card — DARK navy panel matching the trading interface */
.cockpit-profile {
  background: linear-gradient(168deg, #0E1B2C 0%, #143A5C 100%);
  color: #ffffff;
  border: 1px solid rgba(111, 183, 218, 0.22);
  border-radius: 16px;
  padding: 22px 22px 18px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 12px 32px -14px rgba(0, 0, 0, 0.55);
  animation: cockpitProfileIn 0.85s cubic-bezier(0.4, 0, 0.4, 1) both;
}
.cockpit-profile .cockpit-name { color: #ffffff; font-size: 22px; }
.cockpit-profile .cockpit-status { color: rgba(255, 255, 255, 0.65); }
.cockpit-profile .cockpit-stats { border-top-color: rgba(111, 183, 218, 0.18); }
.cockpit-profile .cockpit-stat-row > span:first-child { color: rgba(255, 255, 255, 0.50); }
.cockpit-profile .cockpit-stat-row .val { color: #6FB7DA; }

.cockpit-avatar { padding: 0; background: transparent; box-shadow: none; }
.cockpit-avatar svg { width: 46px; height: 46px; }

/* Name reveal flicker */
.flashing-name {
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  letter-spacing: -0.02em;
  display: inline-block;
}
@keyframes cockpitProfileIn {
  0%   { opacity: 0; transform: translateY(8px) scale(1.02); filter: blur(8px); }
  100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}
.cockpit-profile-head {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}
.cockpit-avatar {
  width: 46px; height: 46px;
  flex-shrink: 0;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.cockpit-avatar svg { width: 100%; height: 100%; display: block; }

/* Neutral avatar — abstract identity mark */
.neutral-avatar {
  width: 100%; height: 100%;
  position: relative;
  display: flex; align-items: center; justify-content: center;
}
.neutral-avatar svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.neutral-avatar-monogram {
  position: relative;
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.04em;
  color: #ffffff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
}

/* ===== TRAIT MAP (live filling under the profile card) ===== */
.trait-map {
  background: linear-gradient(168deg, rgba(14, 27, 44, 0.74) 0%, rgba(20, 58, 92, 0.74) 100%);
  border: 1px solid rgba(111, 183, 218, 0.22);
  border-top: 0;
  border-radius: 0 0 14px 14px;
  margin-top: -10px;
  padding: 14px 16px 14px;
  position: relative;
}
.trait-map::before {
  /* Visual seam tying the trait map to the profile card above */
  content: '';
  position: absolute;
  top: -1px; left: 14px; right: 14px;
  border-top: 1px dashed rgba(111, 183, 218, 0.22);
}
.trait-map-eyebrow {
  font-family: 'Manrope', sans-serif;
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 10px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.trait-map-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #6FB7DA;
  box-shadow: 0 0 0 4px rgba(111, 183, 218, 0.18);
  animation: brcDotPulse 2.4s ease-in-out infinite;
}
.trait-map-rows { display: flex; flex-direction: column; gap: 7px; }
.trait-row {
  display: grid;
  grid-template-columns: 1fr 90px 26px;
  gap: 10px;
  align-items: center;
  font-family: 'Manrope', sans-serif;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.78);
}
.trait-name { font-weight: 500; }
.trait-bar {
  position: relative;
  height: 4px;
  background: rgba(111, 183, 218, 0.12);
  border-radius: 4px;
  overflow: hidden;
}
.trait-fill {
  position: absolute;
  top: 0; bottom: 0; left: 0;
  border-radius: 4px;
  transition: width 0.7s cubic-bezier(0.4, 0, 0.4, 1);
  filter: drop-shadow(0 0 3px currentColor);
}
.trait-score {
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: -0.01em;
  color: #ffffff;
  text-align: right;
  font-variant-numeric: tabular-nums;
}


/* ===== THOUGHT BUBBLE (under the profile, types out per step) ===== */
.thought-bubble {
  background: rgba(8, 8, 12, 0.65);
  border: 1px solid rgba(111, 183, 218, 0.22);
  border-radius: 14px;
  padding: 14px 16px;
  position: relative;
  margin-top: 0;
  animation: thoughtIn 0.55s cubic-bezier(0.4, 0, 0.4, 1) both;
}
.thought-bubble::before {
  /* tail pointing up at the avatar */
  content: '';
  position: absolute;
  top: -6px;
  left: 22px;
  width: 12px; height: 12px;
  background: rgba(8, 8, 12, 0.65);
  border-left: 1px solid rgba(111, 183, 218, 0.22);
  border-top: 1px solid rgba(111, 183, 218, 0.22);
  transform: rotate(45deg);
}
@keyframes thoughtIn {
  0%   { opacity: 0; transform: translateY(-4px); filter: blur(4px); }
  100% { opacity: 1; transform: translateY(0);    filter: blur(0); }
}
.thought-eyebrow {
  font-family: 'Manrope', sans-serif;
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.50);
  margin-bottom: 6px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.thought-eyebrow .thought-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #6FB7DA;
  box-shadow: 0 0 0 4px rgba(111, 183, 218, 0.18);
  animation: brcDotPulse 2.4s ease-in-out infinite;
}
.thought-text {
  font-family: 'Outfit', sans-serif;
  font-weight: 400;
  font-style: italic;
  font-size: 15px;
  line-height: 1.4;
  letter-spacing: -0.012em;
  color: #ffffff;
}
.cockpit-bio { min-width: 0; }
.cockpit-name {
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 19px;
  color: #0A2D52;
  letter-spacing: -0.018em;
  line-height: 1.1;
}
.cockpit-status {
  margin-top: 4px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #5C6B7D;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.cockpit-status-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #84C6A2;
  box-shadow: 0 0 0 4px rgba(132, 198, 162, 0.22);
  animation: brcDotPulse 2.4s ease-in-out infinite;
}
.cockpit-stats {
  display: flex;
  flex-direction: column;
  gap: 0;
  border-top: 1px dashed rgba(15, 76, 129, 0.18);
  padding-top: 12px;
}
.cockpit-stat-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 6px 0;
  font-size: 12px;
}
.cockpit-stat-row > span:first-child {
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #5C6B7D;
  font-size: 10px;
}
.cockpit-stat-row .val {
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: #1F5C99;
  font-size: 14px;
}

/* Live AI feed (replaces step cards) */
.cockpit-feed {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.cockpit-feed-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 6px 4px 4px;
}
.cockpit-feed-eyebrow {
  font-family: 'Manrope', sans-serif;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #6FB7DA;
}
.cockpit-feed-meta {
  font-family: 'Manrope', sans-serif;
  font-size: 9.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.42);
  font-weight: 500;
}

.feed-entry {
  border-left: 2px solid rgba(111, 183, 218, 0.28);
  padding: 0 0 0 14px;
  position: relative;
  animation: feedEntryIn 0.55s ease both;
  opacity: 0.55;
  transition: opacity 0.5s ease;
}
.feed-entry.current { opacity: 1; border-left-color: #6FB7DA; }
.feed-entry::before {
  content: '';
  position: absolute;
  left: -6px; top: 6px;
  width: 9px; height: 9px;
  border-radius: 50%;
  background: rgba(111, 183, 218, 0.30);
  border: 2px solid #0a0b0d;
}
.feed-entry.current::before {
  background: #6FB7DA;
  box-shadow: 0 0 0 4px rgba(111, 183, 218, 0.20);
  animation: brcDotPulse 2.4s ease-in-out infinite;
}
@keyframes feedEntryIn {
  0%   { opacity: 0; transform: translateX(-6px); }
  100% { opacity: 0.55; transform: translateX(0); }
}
.feed-eyebrow {
  font-family: 'Manrope', sans-serif;
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.50);
  margin-bottom: 6px;
}
.feed-title {
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.22;
  letter-spacing: -0.018em;
  color: #ffffff;
  margin-bottom: 8px;
}
.feed-title .accent { font-weight: 300; font-style: italic; color: #6FB7DA; }
.feed-body {
  font-family: 'Manrope', sans-serif;
  font-size: 13px;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.78);
  margin-bottom: 12px;
}
.feed-body strong { color: #ffffff; font-weight: 600; }
.feed-loop { opacity: 0.85; }
.typewriter-caret {
  display: inline-block;
  margin-left: 1px;
  color: #6FB7DA;
  animation: typewriterCaret 0.9s steps(2) infinite;
  font-weight: 400;
}
@keyframes typewriterCaret {
  0%, 50%   { opacity: 1; }
  50.01%, 100% { opacity: 0; }
}

/* Steps (legacy — kept hidden in cockpit guided mode but selectors stay valid) */
.cockpit-steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cockpit-step {
  background: #ffffff;
  border: 1px solid rgba(15, 76, 129, 0.10);
  border-radius: 16px;
  padding: 18px 20px 14px;
  box-shadow: 0 1px 2px rgba(10, 45, 82, 0.06), 0 12px 28px -14px rgba(10, 45, 82, 0.22);
  animation: cockpitStepIn 1.1s cubic-bezier(0.4, 0, 0.4, 1) both;
  transform-origin: left top;
}
.cockpit-step.alt { border-radius: 16px; }
@keyframes cockpitStepIn {
  0%   { opacity: 0; transform: scale(1.06) translateY(14px); filter: blur(10px); }
  18%  { opacity: 0.6; transform: scale(1.06) translateY(6px); filter: blur(6px); }
  35%  { opacity: 1; transform: scale(1.06) translateY(0); filter: blur(0); }
  62%  { opacity: 1; transform: scale(1.06) translateY(0); filter: blur(0); }
  100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
}

.cockpit-step-eyebrow {
  font-family: 'Manrope', sans-serif;
  font-size: 10.5px;
  font-weight: 600;
  color: #1F5C99;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  margin-bottom: 10px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.cockpit-step-eyebrow::before {
  content: '';
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #6FB7DA;
  box-shadow: 0 0 0 4px rgba(111, 183, 218, 0.18);
  animation: brcDotPulse 2.4s ease-in-out infinite;
}
.cockpit-step.done .cockpit-step-eyebrow { color: #5C6B7D; }
.cockpit-step.done .cockpit-step-eyebrow::before {
  background: rgba(15, 76, 129, 0.22);
  box-shadow: none;
  animation: none;
}

.cockpit-step-title {
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 1.18;
  letter-spacing: -0.02em;
  color: #0A2D52;
  margin-bottom: 8px;
}
.cockpit-step-title .accent {
  font-weight: 300;
  font-style: italic;
  color: #1F5C99;
}

.cockpit-step-body {
  font-size: 13px;
  line-height: 1.55;
  color: #2A3A4D;
  margin-bottom: 14px;
  font-weight: 400;
}

.cockpit-step-actions {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  align-items: center;
  padding-top: 12px;
  border-top: 1px dashed rgba(15, 76, 129, 0.18);
}
.cockpit-btn {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  border: 0;
  padding: 8px 14px;
  border-radius: 999px;
  cursor: pointer;
  background: transparent;
  color: #2A3A4D;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.cockpit-btn:hover { color: #0A2D52; background: rgba(15, 76, 129, 0.06); }
.cockpit-btn.primary {
  background: #0A2D52;
  color: #ffffff;
  border: 2px solid #0A2D52;
}
.cockpit-btn.primary:hover {
  background: transparent;
  color: #0A2D52;
  border-color: #6FB7DA;
  transform: translateY(-1px);
}
.cockpit-btn.skip {
  font-size: 10.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #8995A4;
  margin-left: auto;
}
.cockpit-btn.skip:hover { color: #0A2D52; background: transparent; }

/* Done state */
.cockpit-step.done {
  opacity: 0.74;
  background: #F2F6FA;
  border-color: rgba(15, 76, 129, 0.08);
  box-shadow: 0 1px 2px rgba(10, 45, 82, 0.04);
}
.cockpit-step.done .cockpit-step-title { color: #1F5C99; font-size: 16px; }
.cockpit-step.done .cockpit-step-body { font-size: 12px; color: #5C6B7D; }
.cockpit-step-done {
  font-family: 'Manrope', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #2c6e49;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding-top: 10px;
  margin-top: 4px;
  border-top: 1px dashed rgba(15, 76, 129, 0.10);
}
.cockpit-step-done-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px; height: 16px;
  border-radius: 50%;
  background: rgba(132, 198, 162, 0.22);
  color: #2c6e49;
  font-size: 10px;
}

.cockpit-end {
  background: linear-gradient(165deg, #0A2D52 0%, #1B4D7E 100%);
  color: #ffffff;
  border-radius: 16px;
  padding: 22px 22px 20px;
  box-shadow: 0 16px 36px -12px rgba(10, 45, 82, 0.55);
  animation: cockpitStepIn 1.0s cubic-bezier(0.4, 0, 0.4, 1) both;
}
.cockpit-end-eyebrow {
  font-family: 'Manrope', sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: #6FB7DA;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.cockpit-end-eyebrow::before {
  content: '';
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #84C6A2;
  box-shadow: 0 0 0 4px rgba(132, 198, 162, 0.22);
  animation: brcDotPulse 2.4s ease-in-out infinite;
}
.cockpit-end-text {
  margin-top: 12px;
  font-size: 13.5px;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.86);
}

.cockpit-reset {
  margin-top: 12px;
  font-family: 'Manrope', sans-serif;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #8995A4;
  background: transparent;
  border: 1px solid rgba(15, 76, 129, 0.18);
  border-radius: 999px;
  padding: 8px 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;
}
.cockpit-reset:hover { color: #0A2D52; border-color: #6FB7DA; background: #F2F6FA; }

/* ===== ACTION FLOW (User → App → AI net → UI) ===== */
.flow {
  background: #0A2D52;
  background-image: linear-gradient(160deg, #0A2D52 0%, #143F6B 100%);
  border-radius: 14px;
  padding: 14px 16px 12px;
  color: #ffffff;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(111, 183, 218, 0.18);
}
.flow-track {
  display: grid;
  grid-template-columns: 1fr 1fr 1.4fr 1fr;
  gap: 8px;
  align-items: center;
  position: relative;
  padding: 6px 0;
}
.flow-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  position: relative;
  z-index: 2;
}
.flow-icon {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: rgba(111, 183, 218, 0.10);
  border: 1px solid rgba(111, 183, 218, 0.32);
  color: #6FB7DA;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.3s, border-color 0.3s, transform 0.3s;
}
.flow-icon-net {
  width: 60px;
  border-radius: 12px;
  padding: 0 4px;
}
.flow-icon-net svg { width: 100%; height: 24px; }
.flow-label {
  font-family: 'Manrope', sans-serif;
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.62);
}

/* The connecting line — rendered behind nodes with a subtle gradient */
.flow-track::before {
  content: '';
  position: absolute;
  top: 22px;
  left: 12%; right: 12%;
  height: 1px;
  background: linear-gradient(90deg, rgba(111, 183, 218, 0.12), rgba(111, 183, 218, 0.5), rgba(132, 198, 162, 0.5), rgba(111, 183, 218, 0.12));
  z-index: 1;
}

/* Animated data packets travelling along the flow */
.flow-packet {
  position: absolute;
  top: 18px;
  left: 12%;
  width: 9px; height: 9px;
  border-radius: 50%;
  background: #6FB7DA;
  box-shadow: 0 0 14px 3px rgba(111, 183, 218, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.4) inset;
  z-index: 3;
  opacity: 0;
}
.flow-active .flow-packet-1 { animation: flowPacket 2.4s cubic-bezier(0.4, 0, 0.4, 1) 0.05s 1 both; }
.flow-active .flow-packet-2 { animation: flowPacket 2.4s cubic-bezier(0.4, 0, 0.4, 1) 0.45s 1 both; background: #84C6A2; box-shadow: 0 0 14px 3px rgba(132, 198, 162, 0.8); }
.flow-active .flow-packet-3 { animation: flowPacket 2.4s cubic-bezier(0.4, 0, 0.4, 1) 0.85s 1 both; }

@keyframes flowPacket {
  0%   { left: 12%; opacity: 0; }
  10%  { opacity: 1; }
  /* User → App */
  28%  { left: 32%; opacity: 1; }
  /* App → AI (lingers a touch as net "thinks") */
  48%  { left: 56%; opacity: 1; }
  /* AI → UI */
  78%  { left: 88%; opacity: 1; }
  100% { left: 88%; opacity: 0; }
}

/* AI-side highlight when active — node grows, neural net fires */
.flow-active .flow-node-ai .flow-icon { background: rgba(111, 183, 218, 0.20); border-color: #6FB7DA; transform: scale(1.06); }
.flow-active .flow-node-ai .net-node {
  animation: netNodeFire 1.2s ease-in-out 1 both;
}
.flow-active .flow-node-ai .net-i-0 { animation-delay: 0.5s;  }
.flow-active .flow-node-ai .net-i-1 { animation-delay: 0.6s;  }
.flow-active .flow-node-ai .net-i-2 { animation-delay: 0.55s; }
.flow-active .flow-node-ai .net-h-0 { animation-delay: 0.85s; }
.flow-active .flow-node-ai .net-h-1 { animation-delay: 0.95s; }
.flow-active .flow-node-ai .net-h-2 { animation-delay: 0.90s; }
.flow-active .flow-node-ai .net-h-3 { animation-delay: 1.00s; }
.flow-active .flow-node-ai .net-o-0 { animation-delay: 1.30s; }
.flow-active .flow-node-ai .net-o-1 { animation-delay: 1.40s; }

@keyframes netNodeFire {
  0%, 100% { fill: #6FB7DA; r: 2.2; filter: none; }
  50%      { fill: #ffffff; r: 3.0;  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.85)); }
}

/* User & App nodes briefly highlight when packet passes through */
.flow-active .flow-node-user .flow-icon { animation: nodeHit 0.6s ease 0.05s 1 both; }
.flow-active .flow-node-app .flow-icon  { animation: nodeHit 0.6s ease 0.45s 1 both; }
.flow-active .flow-node-update .flow-icon { animation: nodeHit 0.6s ease 1.6s 1 both; color: #84C6A2; border-color: #84C6A2; }

@keyframes nodeHit {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.12); background: rgba(111, 183, 218, 0.30); border-color: #6FB7DA; }
  100% { transform: scale(1); }
}

.flow-caption {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  font-family: 'Manrope', sans-serif;
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  align-items: center;
}
.flow-caption .flow-arrow { color: #6FB7DA; }


/* ===== ORDER PANEL (advanced order types) =====
   Translucent + offset to the LEFT so the underlying chart stays visible
   on the right — the AI brought up the panel, didn't replace the screen. */
.order-panel {
  position: absolute;
  top: 16px;
  left: 8px;
  width: min(360px, calc(100% - 16px));
  z-index: 12;
  background: linear-gradient(168deg, rgba(14, 27, 44, 0.74) 0%, rgba(20, 58, 92, 0.74) 100%);
  color: #ffffff;
  border: 1px solid rgba(111, 183, 218, 0.36);
  border-radius: 18px;
  padding: 18px 18px 14px;
  backdrop-filter: blur(10px) saturate(1.1);
  -webkit-backdrop-filter: blur(10px) saturate(1.1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 24px 56px -16px rgba(0, 0, 0, 0.7);
  font-family: 'Manrope', sans-serif;
  animation: orderSlideIn 0.45s cubic-bezier(0.4, 0, 0.4, 1) both;
}
.order-panel .order-panel-symbol { color: #ffffff; }
.order-panel .order-panel-eyebrow { color: #6FB7DA; }
.order-panel .order-panel-close { color: rgba(255, 255, 255, 0.55); }
.order-panel .order-panel-close:hover { color: #ffffff; }
.order-panel .order-side { background: rgba(0, 0, 0, 0.32); }
.order-panel .order-side-btn { color: rgba(255, 255, 255, 0.55); }
.order-panel .order-side-btn:hover { color: #ffffff; }
.order-panel .order-type-chip {
  background: rgba(0, 0, 0, 0.28);
  border-color: rgba(111, 183, 218, 0.20);
  color: rgba(255, 255, 255, 0.78);
}
.order-panel .order-type-chip:hover { color: #ffffff; border-color: #6FB7DA; }
.order-panel .order-type-chip.active { background: #6FB7DA; color: #0A2D52; border-color: #6FB7DA; }
.order-panel .order-type-chip.more { color: #6FB7DA; }
.order-panel .order-type-chip.more.active { background: transparent; color: #6FB7DA; }
.order-panel .order-type-hint { color: rgba(255, 255, 255, 0.62); }
.order-panel .order-fields { border-color: rgba(111, 183, 218, 0.16); }
.order-panel .order-field label { color: rgba(255, 255, 255, 0.55); }
.order-panel .order-input-wrap {
  background: rgba(0, 0, 0, 0.32);
  border-color: rgba(111, 183, 218, 0.18);
}
.order-panel .order-input-wrap:focus-within { background: rgba(0, 0, 0, 0.5); border-color: #6FB7DA; }
.order-panel .order-input-wrap input { color: #ffffff; }
.order-panel .order-input-suffix { color: rgba(255, 255, 255, 0.50); }
.order-panel .order-tif {
  background: rgba(0, 0, 0, 0.28);
  border-color: rgba(111, 183, 218, 0.18);
  color: rgba(255, 255, 255, 0.62);
}
.order-panel .order-tif:hover { color: #ffffff; border-color: #6FB7DA; }
.order-panel .order-tif.active { background: #6FB7DA; color: #0A2D52; border-color: #6FB7DA; }
.order-panel .order-summary { background: rgba(0, 0, 0, 0.28); }
.order-panel .order-summary-row > span:first-child { color: rgba(255, 255, 255, 0.55); }
.order-panel .order-summary-row .val { color: #ffffff; }
.order-panel .order-btn.ghost { color: rgba(255, 255, 255, 0.55); }
.order-panel .order-btn.ghost:hover { color: #ffffff; background: rgba(0, 0, 0, 0.28); }
.order-panel .order-foot { color: rgba(255, 255, 255, 0.45); }
@keyframes orderSlideIn {
  0%   { opacity: 0; transform: translate(-12px, -8px) scale(0.98); filter: blur(4px); }
  100% { opacity: 1; transform: translate(0, 0) scale(1); filter: blur(0); }
}
.order-panel-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}
.order-panel-title { display: flex; flex-direction: column; gap: 2px; }
.order-panel-eyebrow {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #1F5C99;
}
.order-panel-symbol {
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: -0.01em;
  color: #0A2D52;
}
.order-panel-close {
  background: transparent;
  border: 0;
  font-size: 24px;
  line-height: 1;
  color: #5C6B7D;
  cursor: pointer;
  padding: 0 4px;
}
.order-panel-close:hover { color: #0A2D52; }

.order-side {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  margin-bottom: 12px;
  background: rgba(15, 76, 129, 0.06);
  padding: 4px;
  border-radius: 999px;
}
.order-side-btn {
  border: 0;
  background: transparent;
  padding: 9px 0;
  border-radius: 999px;
  font-weight: 600;
  letter-spacing: 0.04em;
  font-size: 13px;
  color: #5C6B7D;
  cursor: pointer;
  transition: all 0.18s ease;
}
.order-side-btn:hover { color: #0A2D52; }
.order-side-btn.buy.active  { background: #2c6e49; color: #ffffff; }
.order-side-btn.sell.active { background: #c5202c; color: #ffffff; }

.order-types { margin-bottom: 12px; }
.order-types-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 6px;
}
.order-types-advanced {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
  padding-top: 8px;
  border-top: 1px dashed rgba(15, 76, 129, 0.14);
  animation: advExpand 0.32s ease both;
}
@keyframes advExpand {
  0%   { opacity: 0; transform: translateY(-4px); }
  100% { opacity: 1; transform: translateY(0); }
}
.order-type-chip {
  font-family: 'Manrope', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  border: 1px solid rgba(15, 76, 129, 0.18);
  background: #ffffff;
  color: #2A3A4D;
  padding: 7px 12px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.18s ease;
}
.order-type-chip:hover { border-color: #6FB7DA; color: #0A2D52; }
.order-type-chip.active {
  background: #0A2D52;
  border-color: #0A2D52;
  color: #ffffff;
}
.order-type-chip.more { color: #1F5C99; border-style: dashed; }
.order-type-chip.more.active { background: transparent; color: #1F5C99; border-style: solid; }

.order-type-hint {
  margin-top: 8px;
  font-size: 11.5px;
  color: #5C6B7D;
  font-weight: 500;
  font-style: italic;
}

.order-fields {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px 0;
  border-top: 1px dashed rgba(15, 76, 129, 0.14);
  border-bottom: 1px dashed rgba(15, 76, 129, 0.14);
  margin-bottom: 12px;
}
.order-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.order-field label {
  font-family: 'Manrope', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #5C6B7D;
  flex-shrink: 0;
  min-width: 92px;
}
.order-input-wrap {
  display: flex;
  align-items: center;
  background: #F2F6FA;
  border: 1px solid rgba(15, 76, 129, 0.10);
  border-radius: 8px;
  padding: 6px 10px;
  flex: 1;
  max-width: 180px;
  transition: border-color 0.2s ease;
}
.order-input-wrap:focus-within { border-color: #6FB7DA; background: #ffffff; }
.order-input-wrap input {
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: -0.01em;
  border: 0;
  background: transparent;
  width: 100%;
  outline: none;
  color: #0A2D52;
}
.order-input-suffix {
  font-family: 'Manrope', sans-serif;
  font-size: 10px;
  font-weight: 600;
  color: #8995A4;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.order-tif-row { display: flex; gap: 4px; }
.order-tif {
  font-family: 'Manrope', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.10em;
  background: #F2F6FA;
  border: 1px solid rgba(15, 76, 129, 0.10);
  color: #5C6B7D;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.18s ease;
}
.order-tif:hover { color: #0A2D52; border-color: #6FB7DA; }
.order-tif.active { background: #0A2D52; color: #ffffff; border-color: #0A2D52; }

.order-summary {
  background: #F8FAFC;
  border-radius: 10px;
  padding: 10px 14px;
  margin-bottom: 12px;
}
.order-summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 11.5px;
  padding: 3px 0;
}
.order-summary-row > span:first-child {
  color: #5C6B7D;
  font-weight: 500;
}
.order-summary-row .val {
  font-family: 'Outfit', sans-serif;
  color: #0A2D52;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.order-actions {
  display: flex;
  gap: 8px;
}
.order-btn {
  font-family: 'Manrope', sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  border: 0;
  border-radius: 999px;
  padding: 11px 18px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.order-btn.ghost {
  background: transparent;
  color: #5C6B7D;
}
.order-btn.ghost:hover { color: #0A2D52; background: #F2F6FA; }
.order-btn.primary {
  flex: 1;
  justify-content: center;
  color: #ffffff;
}
.order-btn.primary.buy  { background: #2c6e49; border: 2px solid #2c6e49; }
.order-btn.primary.sell { background: #c5202c; border: 2px solid #c5202c; }
.order-btn.primary:hover { transform: translateY(-1px); }

.order-foot {
  margin-top: 10px;
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #8995A4;
  text-align: center;
}

/* ===== NEURAL-NET PANEL (right column, AI side, ~1/3 height) ===== */
.neural-panel {
  height: clamp(220px, 30vh, 320px);
  background: linear-gradient(168deg, #0E1B2C 0%, #143A5C 100%);
  border: 1px solid rgba(111, 183, 218, 0.20);
  border-radius: 14px;
  padding: 14px 16px;
  margin: 14px 0 18px;
  color: #6FB7DA;
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
  overflow: hidden;
}
.neural-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-shrink: 0;
}
.neural-eyebrow {
  font-family: 'Manrope', sans-serif;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #6FB7DA;
}
.neural-meta {
  font-family: 'Manrope', sans-serif;
  font-size: 9.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
}
.neural-svg {
  flex: 1;
  width: 100%;
  height: 100%;
  color: #6FB7DA;
}
/* Traveling light pulses along the synapses — short bright dashes
   walk from input layer through to the output layer */
.nn-pulse {
  stroke: #8FD0F0;
  stroke-width: 1.6;
  fill: none;
  stroke-linecap: round;
  filter: drop-shadow(0 0 2.5px rgba(143, 208, 240, 0.85));
  /* Each line totals ~24px on the viewBox; a 5-unit dash with a 70-unit
     gap looks like a single bright pulse traveling along the line. */
  stroke-dasharray: 5 80;
  stroke-dashoffset: 80;
  animation: nnPulseTravel 2.6s linear infinite;
}
@keyframes nnPulseTravel {
  0%   { stroke-dashoffset: 80; opacity: 0; }
  6%   { opacity: 1; }
  60%  { opacity: 1; }
  100% { stroke-dashoffset: -5; opacity: 0; }
}

.nn-node {
  animation: nnIdle 4.5s ease-in-out infinite;
}
.nn-l0 { animation-delay: 0s; }
.nn-l1 { animation-delay: 0.4s; }
.nn-l2 { animation-delay: 0.8s; }
.nn-l3 { animation-delay: 1.2s; }
@keyframes nnIdle {
  0%, 100% { fill: #6FB7DA; r: 3.4; filter: none; }
  50%      { fill: #8FD0F0; r: 3.8; filter: drop-shadow(0 0 3px rgba(143, 208, 240, 0.5)); }
}
.neural-live .nn-node { animation-duration: 1.6s; }
.neural-live .nn-node {
  filter: drop-shadow(0 0 3px rgba(143, 208, 240, 0.8));
}
.neural-foot {
  display: flex;
  gap: 6px;
  font-family: 'Manrope', sans-serif;
  font-size: 9.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.40);
  font-weight: 600;
  flex-shrink: 0;
  padding-top: 6px;
  border-top: 1px dashed rgba(111, 183, 218, 0.18);
}
.neural-foot-mark { color: #6FB7DA; }

/* ===== RECOGNITION RATING (live confidence cycle) ===== */
.recog-rating {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 4px;
}
.recog-rating-row {
  display: grid;
  grid-template-columns: 92px 1fr 36px 14px;
  gap: 8px;
  align-items: center;
  font-family: 'Manrope', sans-serif;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.74);
  transition: color 0.25s ease;
}
.recog-rating-label { font-weight: 600; }
.recog-rating-bar {
  position: relative;
  height: 4px;
  background: rgba(111, 183, 218, 0.14);
  border-radius: 4px;
  overflow: hidden;
}
.recog-rating-fill {
  position: absolute;
  top: 0; bottom: 0; left: 0;
  background: linear-gradient(90deg, rgba(111, 183, 218, 0.6), #6FB7DA);
  transition: width 0.18s ease;
}
.recog-rating-score {
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: -0.01em;
  color: #ffffff;
  text-align: right;
  font-variant-numeric: tabular-nums;
}
.recog-rating-check {
  font-size: 12px;
  font-weight: 700;
  color: #84C6A2;
}
.phase-settled .recog-rating-row { opacity: 0.55; }
.phase-settled .recog-rating-row.winner {
  opacity: 1;
  color: #ffffff;
}
.phase-settled .recog-rating-row.winner .recog-rating-fill {
  background: linear-gradient(90deg, rgba(132, 198, 162, 0.6), #84C6A2);
}
.phase-settled .recog-rating-row.winner .recog-rating-score { color: #84C6A2; }


/* ===== ON-PHONE AI GUIDE (revealed after recognition settles) ===== */
.phone-ai-guide {
  position: absolute;
  left: 8px; right: 8px;
  bottom: 8px;
  background: linear-gradient(168deg, #0E1B2C 0%, #143A5C 100%);
  border: 1px solid rgba(111, 183, 218, 0.40);
  border-radius: 14px;
  padding: 14px 14px 12px;
  z-index: 7;
  color: #ffffff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.4), 0 18px 40px -10px rgba(0,0,0,0.65);
  animation: phoneAiGuideIn 0.55s cubic-bezier(0.4, 0, 0.4, 1) both;
}
@keyframes phoneAiGuideIn {
  0%   { opacity: 0; transform: translateY(12px) scale(0.96); filter: blur(4px); }
  100% { opacity: 1; transform: translateY(0)    scale(1);    filter: blur(0); }
}
.phone-ai-guide-eyebrow {
  font-family: 'Manrope', sans-serif;
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #6FB7DA;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}
.phone-ai-guide-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #84C6A2;
  box-shadow: 0 0 0 4px rgba(132, 198, 162, 0.22);
  animation: brcDotPulse 2.4s ease-in-out infinite;
}
.phone-ai-guide-title {
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 15px;
  line-height: 1.2;
  letter-spacing: -0.018em;
  margin-bottom: 6px;
}
.phone-ai-guide-title .accent {
  font-weight: 300;
  font-style: italic;
  color: #6FB7DA;
}
.phone-ai-guide-body {
  font-size: 11.5px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.78);
  margin-bottom: 10px;
}
.phone-ai-guide-actions {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.ag-btn {
  font-family: 'Manrope', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
  border: 1px solid rgba(111, 183, 218, 0.32);
  background: transparent;
  color: rgba(255, 255, 255, 0.78);
  padding: 6px 11px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.18s ease;
}
.ag-btn:hover { border-color: #6FB7DA; color: #ffffff; }
.ag-btn.primary {
  background: #6FB7DA;
  border-color: #6FB7DA;
  color: #0A2D52;
}
.ag-btn.primary:hover { background: #84CFEF; }


/* ===== POST-COCKPIT GUIDED TOUR =====
   The rest of the interface dims down; only the spotlight target and
   the caption stay lit. Caption is fixed bottom-centre so it never
   jumps. Manual advance via Next button. */
.post-tour-dim {
  position: fixed;
  inset: 0;
  background: rgba(2, 4, 10, 0.32);
  z-index: 40;
  pointer-events: none;
  animation: postTourDimIn 0.55s ease both;
}
@keyframes postTourDimIn {
  0%   { opacity: 0; }
  100% { opacity: 1; }
}
.post-tour-spotlight {
  position: fixed;
  z-index: 41;
  pointer-events: none;
  border-radius: 16px;
  box-shadow:
    /* light inset to keep the dim layer non-overlapping with spotlight */
    0 0 0 9999px rgba(2, 4, 10, 0.32),
    0 0 0 2px rgba(111, 183, 218, 0.95),
    0 0 36px 8px rgba(111, 183, 218, 0.65),
    0 0 96px 18px rgba(111, 183, 218, 0.28);
  transition: top 0.45s cubic-bezier(0.4, 0, 0.4, 1),
              left 0.45s cubic-bezier(0.4, 0, 0.4, 1),
              width 0.45s cubic-bezier(0.4, 0, 0.4, 1),
              height 0.45s cubic-bezier(0.4, 0, 0.4, 1);
}
.post-tour-caption {
  position: fixed;
  /* Bottom-left — clear of the day-selector that sits centred under
     the phone, so the maturity buttons stay readable. */
  bottom: 32px;
  left: 32px;
  width: 360px;
  z-index: 42;
  background: linear-gradient(168deg, rgba(14, 27, 44, 0.62) 0%, rgba(20, 58, 92, 0.62) 100%);
  border: 1px solid rgba(111, 183, 218, 0.36);
  border-radius: 14px;
  padding: 14px 16px 12px;
  backdrop-filter: blur(8px) saturate(1.1);
  -webkit-backdrop-filter: blur(8px) saturate(1.1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.35), 0 18px 38px -10px rgba(0, 0, 0, 0.55);
  animation: postTourCaptionIn 0.5s cubic-bezier(0.4, 0, 0.4, 1) both;
  pointer-events: auto;
}
@keyframes postTourCaptionIn {
  0%   { opacity: 0; transform: translateY(6px); filter: blur(4px); }
  100% { opacity: 1; transform: translateY(0);   filter: blur(0); }
}
.post-tour-eyebrow {
  font-family: 'Manrope', sans-serif;
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #6FB7DA;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.post-tour-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #6FB7DA;
  box-shadow: 0 0 0 4px rgba(111, 183, 218, 0.18);
  animation: brcDotPulse 2.4s ease-in-out infinite;
}
.post-tour-text {
  font-family: 'Outfit', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.45;
  color: #ffffff;
  letter-spacing: -0.012em;
  margin-bottom: 12px;
}
.post-tour-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}
.post-tour-skip,
.post-tour-next {
  font-family: 'Manrope', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  border: 0;
  padding: 7px 14px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.18s ease;
}
.post-tour-skip {
  background: transparent;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 10px;
  padding: 7px 0;
}
.post-tour-skip:hover { color: #ffffff; }
.post-tour-next {
  background: #6FB7DA;
  color: #0A2D52;
  border: 2px solid #6FB7DA;
}
.post-tour-next:hover {
  background: #8FCFEF;
  border-color: #8FCFEF;
  transform: translateY(-1px);
}


/* ===== CROSS-PANEL SONAR WAVE — subtle, slow, sequential ===== */
.rt-wave {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 30;
}
.sonar {
  position: absolute;
  top: 46%;
  width: 120px; height: 120px;
  transform: translate(-50%, -50%);
  display: block;
  pointer-events: none;
  opacity: 0;
  animation: sonarFade 4.2s linear 1 both;
}
.sonar svg {
  width: 100%; height: 100%;
  display: block;
}
.sonar .sonar-arc {
  stroke: #6FB7DA;
  stroke-width: 1.4;
  fill: none;
  opacity: 0;
  transform-origin: 0 0;
  filter: drop-shadow(0 0 4px rgba(111, 183, 218, 0.45));
}
.sonar.tone-sage .sonar-arc {
  stroke: #84C6A2;
  filter: drop-shadow(0 0 4px rgba(132, 198, 162, 0.45));
}
.sonar .sonar-arc-1 { animation: sonarArc 4.0s ease-out 1 both; }
.sonar .sonar-arc-2 { animation: sonarArc 4.0s ease-out 0.6s 1 both; }
.sonar .sonar-arc-3 { animation: sonarArc 4.0s ease-out 1.2s 1 both; }

@keyframes sonarFade {
  0%   { opacity: 0; }
  10%  { opacity: 0.9; }
  100% { opacity: 0; }
}
@keyframes sonarArc {
  0%   { opacity: 0; transform: scale(0.45); stroke-width: 2; }
  20%  { opacity: 0.55; }
  100% { opacity: 0; transform: scale(2.6); stroke-width: 0.4; }
}


/* ===== AI RECOGNITION (under the neural net in AI panel) ===== */
.ai-recognition {
  background: linear-gradient(168deg, #0E1B2C 0%, #143A5C 100%);
  border: 1px solid rgba(111, 183, 218, 0.20);
  border-radius: 14px;
  padding: 14px 16px 14px;
  margin: 0 0 18px;
  color: #ffffff;
}
.ai-recognition-eyebrow {
  font-family: 'Manrope', sans-serif;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #6FB7DA;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.ai-recognition-eyebrow .recog-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: rgba(111, 183, 218, 0.35);
}
.ai-recognition.live .recog-dot {
  background: #84C6A2;
  box-shadow: 0 0 0 4px rgba(132, 198, 162, 0.22);
  animation: brcDotPulse 2.4s ease-in-out infinite;
}
.ai-recognition-event {
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: -0.018em;
  color: #ffffff;
  margin-bottom: 8px;
}
.ai-recognition-event strong { color: #6FB7DA; }
.ai-recognition-context {
  font-size: 12.5px;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.74);
  margin-bottom: 10px;
}
.ai-recognition-context strong { color: #ffffff; }
.ai-recognition-decision {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 10px;
  border-top: 1px dashed rgba(111, 183, 218, 0.18);
  margin-bottom: 10px;
}
.ai-recognition-decision .decision-label {
  font-family: 'Manrope', sans-serif;
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.50);
}
.ai-recognition-decision .decision-text {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.86);
  line-height: 1.5;
}
.ai-recognition-decision .decision-text em {
  color: #84C6A2;
  font-style: italic;
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
}
.ai-recognition-actions {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.ai-recog-pill {
  font-family: 'Manrope', sans-serif;
  font-size: 11px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 999px;
  background: #6FB7DA;
  color: #0A2D52;
  letter-spacing: 0.04em;
}
.ai-recog-pill.ghost {
  background: transparent;
  color: rgba(255, 255, 255, 0.62);
  border: 1px solid rgba(111, 183, 218, 0.32);
}
.ai-recognition-empty {
  font-size: 12.5px;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.50);
  font-style: italic;
}

/* ===== DAY 30 PROGRESS STRIP ON PHONE ===== */
.day30-strip {
  margin: 0 0 14px;
  padding: 12px 14px;
  background: linear-gradient(140deg, rgba(132, 198, 162, 0.20) 0%, rgba(111, 183, 218, 0.16) 100%);
  border: 1px solid rgba(132, 198, 162, 0.28);
  border-radius: 12px;
  animation: day30In 0.6s cubic-bezier(0.4, 0, 0.4, 1) both;
}
@keyframes day30In {
  0%   { opacity: 0; transform: translateY(-4px); }
  100% { opacity: 1; transform: translateY(0); }
}
.day30-eyebrow {
  font-family: 'Manrope', sans-serif;
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #84C6A2;
  margin-bottom: 8px;
}
.day30-metrics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.day30-metric { display: flex; flex-direction: column; gap: 2px; }
.day30-metric .lbl {
  font-family: 'Manrope', sans-serif;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
}
.day30-metric .val {
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: -0.01em;
  color: #ffffff;
}
.day30-metric .val.up   { color: #84C6A2; }
.day30-metric .val.down { color: #d56e6e; }

/* ===== PHONE TAP OVERLAY (finger + popup over the chart) ===== */
.phone-tap-overlay {
  position: absolute;
  pointer-events: none;
  z-index: 6;
  animation: phoneTapIn 0.6s cubic-bezier(0.4, 0, 0.4, 1) both;
}
@keyframes phoneTapIn {
  0%   { opacity: 0; transform: translate(-6px, -4px) scale(0.92); }
  100% { opacity: 1; transform: translate(0, 0) scale(1); }
}
.phone-finger {
  width: 36px; height: 44px;
  display: block;
  margin-top: 6px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.55));
  animation: fingerTap 1.6s ease-in-out infinite;
}
@keyframes fingerTap {
  0%, 60%, 100% { transform: translate(0, 0); }
  30%           { transform: translate(0, -5px); }
  45%           { transform: translate(0, 0); }
}
.phone-tap-popup {
  background: linear-gradient(168deg, rgba(14, 27, 44, 0.94) 0%, rgba(20, 58, 92, 0.94) 100%);
  color: #ffffff;
  font-family: 'Manrope', sans-serif;
  font-size: 11px;
  font-weight: 600;
  border: 1px solid rgba(111, 183, 218, 0.32);
  border-radius: 10px;
  padding: 7px 12px;
  box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.6);
  display: inline-flex;
  flex-direction: column;
  gap: 1px;
  white-space: nowrap;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}
.phone-tap-popup-eyebrow {
  font-size: 8.5px;
  font-weight: 700;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  color: #6FB7DA;
}

/* Make app-content the positioning context for the tap overlay */
.app-content { position: relative; }

/* ===== COVERED CALL SCREEN (Day 90) ===== */
.cc-screen {
  background: linear-gradient(168deg, #0E1B2C 0%, #1B4D7E 100%);
  color: #ffffff;
  border-radius: 14px;
  padding: 14px 14px 12px;
  margin: 0;
  animation: ccIn 0.6s cubic-bezier(0.4, 0, 0.4, 1) both;
}
@keyframes ccIn {
  0%   { opacity: 0; transform: translateY(8px); filter: blur(4px); }
  100% { opacity: 1; transform: translateY(0); filter: blur(0); }
}
.cc-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
}
.cc-eyebrow {
  font-family: 'Manrope', sans-serif;
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #6FB7DA;
}
.cc-meta {
  font-family: 'Manrope', sans-serif;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.50);
}
.cc-title {
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 6px;
}
.cc-title .cc-accent {
  font-weight: 300;
  font-style: italic;
  color: #84C6A2;
}
.cc-explainer {
  font-size: 11.5px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.74);
  margin-bottom: 10px;
}
.cc-grid {
  background: rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 8px 12px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
}
.cc-row {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  padding: 3px 0;
  border-bottom: 1px dashed rgba(111, 183, 218, 0.10);
}
.cc-row:last-child { border-bottom: 0; }
.cc-row > span:first-child {
  color: rgba(255, 255, 255, 0.55);
  font-weight: 500;
}
.cc-row .val {
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: #ffffff;
}
.cc-row .val.up   { color: #84C6A2; }
.cc-row .val.down { color: #d56e6e; }

.cc-payoff {
  background: rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 8px 10px;
  margin-bottom: 10px;
}
.cc-payoff-svg {
  width: 100%;
  height: 60px;
  display: block;
}
.cc-payoff-caption {
  font-size: 10px;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.50);
  text-align: center;
  margin-top: 4px;
}

.cc-actions {
  display: flex;
  gap: 8px;
}
.cc-btn {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  border: 0;
  padding: 9px 14px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.cc-btn.ghost {
  background: transparent;
  color: rgba(255, 255, 255, 0.65);
  border: 1px solid rgba(111, 183, 218, 0.32);
}
.cc-btn.ghost:hover { color: #ffffff; border-color: #6FB7DA; }
.cc-btn.primary {
  flex: 1;
  background: #6FB7DA;
  color: #0A2D52;
  border: 2px solid #6FB7DA;
}
.cc-btn.primary:hover {
  background: transparent;
  color: #6FB7DA;
}

/* OHLC overlay drawn on the chart — slow elegant fade so the step
   transition doesn't snap. Lines bloom from invisible to settled. */
.ohlc-overlay {
  animation: ohlcAppear 1.4s cubic-bezier(0.4, 0, 0.4, 1) both;
  transition: opacity 0.8s ease;
}
@keyframes ohlcAppear {
  0%   { opacity: 0; }
  35%  { opacity: 0.4; }
  100% { opacity: 1; }
}

/* Header high/low fade-out animation when AI hides them */
.stat-fade { transition: opacity 0.9s ease, transform 0.9s ease, max-width 0.9s ease; }

@media (max-width: 1240px) {
  .rt-stage { grid-template-columns: 1fr; gap: 24px; }
  .persona-panel { position: static; max-height: none; }
  .ai-panel { position: static; max-height: none; }
  .cockpit { position: static; max-height: none; }
}
`;

// ====== DATA & SIMULATION ======
const INITIAL_PRICE = 674.15;
const INITIAL_TIME = new Date('2026-05-01T09:30:00');

function generateInitialCandles(count = 48) {
  const candles = [];
  let price = INITIAL_PRICE - 3.5;
  for (let i = 0; i < count; i++) {
    const open = price;
    const drift = (Math.random() - 0.45) * 0.4 + Math.sin(i / 8) * 0.15;
    const change = drift + (Math.random() - 0.5) * 0.5;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * 0.35;
    const low = Math.min(open, close) - Math.random() * 0.35;
    const vol = 80 + Math.random() * 220 + (Math.abs(change) * 80);
    const t = new Date(INITIAL_TIME.getTime() + i * 5 * 60 * 1000);
    candles.push({ open, close, high, low, vol, time: t });
    price = close;
  }
  return candles;
}

function generateNextCandle(lastCandle) {
  const open = lastCandle.close;
  const change = (Math.random() - 0.5) * 1.0;
  const close = open + change;
  const high = Math.max(open, close) + Math.random() * 0.35;
  const low = Math.min(open, close) - Math.random() * 0.35;
  const vol = 80 + Math.random() * 220 + (Math.abs(change) * 80);
  const t = new Date(lastCandle.time.getTime() + 5 * 60 * 1000);
  return { open, close, high, low, vol, time: t };
}

// Simple SMA
function sma(values, period, idx) {
  if (idx < period - 1) return null;
  let sum = 0;
  for (let i = idx - period + 1; i <= idx; i++) sum += values[i];
  return sum / period;
}

// Simple EMA
function ema(values, period) {
  const result = [];
  const k = 2 / (period + 1);
  let prev = values[0];
  for (let i = 0; i < values.length; i++) {
    const v = i === 0 ? values[0] : values[i] * k + prev * (1 - k);
    result.push(v);
    prev = v;
  }
  return result;
}

// RSI
function rsi(values, period) {
  const result = new Array(values.length).fill(null);
  if (values.length < period + 1) return result;
  let gains = 0, losses = 0;
  for (let i = 1; i <= period; i++) {
    const d = values[i] - values[i-1];
    if (d >= 0) gains += d; else losses -= d;
  }
  let avgG = gains / period, avgL = losses / period;
  result[period] = 100 - (100 / (1 + (avgG / (avgL || 0.0001))));
  for (let i = period + 1; i < values.length; i++) {
    const d = values[i] - values[i-1];
    const g = d >= 0 ? d : 0;
    const l = d < 0 ? -d : 0;
    avgG = (avgG * (period - 1) + g) / period;
    avgL = (avgL * (period - 1) + l) / period;
    result[i] = 100 - (100 / (1 + (avgG / (avgL || 0.0001))));
  }
  return result;
}

// MACD
function macd(values, fast = 12, slow = 26, sig = 9) {
  const efast = ema(values, fast);
  const eslow = ema(values, slow);
  const dif = values.map((_, i) => efast[i] - eslow[i]);
  const dea = ema(dif, sig);
  const hist = dif.map((d, i) => d - dea[i]);
  return { dif, dea, hist };
}

// ====== AI STATE ======
function computeAIState(day, sectionDwell, indicatorTaps, marketEvent, ignoredOrderBook) {
  const patterns = [];
  const actions = [];
  let reasoning = '';
  let reasoningMeta = '';

  if (day === 1) {
    patterns.push({ text: 'No history yet. Default layout active.', conf: '—' });
    reasoning = 'I have nothing to act on yet. The interface is in its default arrangement. I am observing which sections you engage with and how long.';
    reasoningMeta = 'session_count=1 · confidence=null';
  } else if (day === 7) {
    patterns.push({ text: <>Chart engagement consistent across all <em>7</em> sessions</>, conf: '0.92' });
    patterns.push({ text: <><em>5m</em> timeframe used in <em>6</em> of 7 sessions</>, conf: '0.88' });
    if (indicatorTaps.RSI || indicatorTaps.BOLL) {
      patterns.push({ text: <>RSI and BOLL frequently consulted together</>, conf: '0.71' });
    }
    if (ignoredOrderBook) {
      patterns.push({ text: <>Order book skipped in last <em>4</em> sessions</>, conf: '0.58' });
    }
    patterns.push({ text: <>Average session: <em>3m 14s</em>, most active 9:30–10:30am ET</>, conf: '0.84' });
    if (ignoredOrderBook) {
      actions.push({ verb: 'Considering', descr: 'Demote Order Book panel below the fold', when: 'Need 3 more sessions to confirm', applied: false });
    }
    reasoning = 'Patterns are forming. I see you reach for RSI and BOLL together — they likely mean one thing to you. I have not yet hidden anything; I want to be sure.';
    reasoningMeta = 'session_count=7 · holding_back=true';
  } else if (day === 30) {
    patterns.push({ text: <><em>RSI + BOLL + Vol</em> co-used in <em>26</em> of 30 sessions</>, conf: '0.94' });
    patterns.push({ text: <>Order book unviewed in <em>27</em> sessions</>, conf: '0.91' });
    patterns.push({ text: <>Stoch RSI tapped once, never returned to</>, conf: '0.86' });
    patterns.push({ text: <>Sells within <em>2%</em> drawdown in 4 of 5 losing trades</>, conf: '0.79' });
    patterns.push({ text: <>Most active 9:30–10:45am ET, weekdays</>, conf: '0.96' });
    actions.push({ verb: 'Applied', descr: 'Order Book demoted to "More" drawer', when: '12 sessions ago · undo available', applied: true });
    actions.push({ verb: 'Applied', descr: 'BOLL auto-loads when RSI is opened', when: '8 sessions ago', applied: true });
    actions.push({ verb: 'Pending', descr: 'Confirm step on sells inside 2% drawdown', when: 'Holding for next quiet moment', applied: false });
    reasoning = 'I have stopped showing you what you do not use. I am surfacing what you reach for, in the order you reach for it. There is a loss pattern I want to interrupt — I will not block, only ask.';
    reasoningMeta = 'session_count=30 · interventions=2 · pending=1';
  } else {
    patterns.push({ text: <><em>RSI + BOLL + Vol</em> is your default reading triplet</>, conf: '0.97' });
    patterns.push({ text: <>You hold <em>Mon–Wed</em>, exit by Thursday close</>, conf: '0.88' });
    patterns.push({ text: <>Drafted then cancelled <em>14</em> orders this quarter</>, conf: '0.93' });
    patterns.push({ text: <>Position size shrinks <em>40%</em> after a losing day</>, conf: '0.85' });
    patterns.push({ text: <>Reads tech news, never the SEC filings tab</>, conf: '0.91' });
    actions.push({ verb: 'Applied', descr: 'Default layout: candles + RSI + BOLL + Vol', when: '60 days ago', applied: true });
    actions.push({ verb: 'Applied', descr: 'Order Book hidden, surfaces on volume anomaly', when: '60 days ago', applied: true });
    actions.push({ verb: 'Applied', descr: 'Cool-down on order entry after a 2% loss day', when: '45 days ago', applied: true });
    if (marketEvent) {
      actions.push({ verb: 'Active now', descr: 'Surfacing Order Book — unusual depth on bid side', when: 'this is one of those moments', applied: false, active: true });
    }
    reasoning = marketEvent
      ? 'Order book imbalance just shifted hard to the bid side — the kind of moment that usually matters even to traders who do not normally read Level 2. I have surfaced it. You can dismiss and I will keep it tucked away.'
      : 'The interface looks the way you do. Quiet most of the time. I am watching for the moments where what I have hidden deserves to come back.';
    reasoningMeta = `session_count=90 · interventions=3 · ${marketEvent ? 'event_active=true' : 'monitoring'}`;
  }
  return { patterns, actions, reasoning, reasoningMeta };
}

// ====== COMPONENTS ======
function StatusBar() {
  return (
    <div className="status-bar">
      <span>9:41</span>
      <div className="status-icons">
        <svg width="18" height="11" viewBox="0 0 18 11" fill="none">
          <rect x="0" y="6" width="3" height="5" rx="0.5" fill="currentColor" />
          <rect x="5" y="4" width="3" height="7" rx="0.5" fill="currentColor" />
          <rect x="10" y="2" width="3" height="9" rx="0.5" fill="currentColor" />
          <rect x="15" y="0" width="3" height="11" rx="0.5" fill="currentColor" />
        </svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <path d="M8 11C8.83 11 9.5 10.33 9.5 9.5C9.5 8.67 8.83 8 8 8C7.17 8 6.5 8.67 6.5 9.5C6.5 10.33 7.17 11 8 11Z" fill="currentColor"/>
          <path d="M8 5C5.79 5 3.85 5.94 2.5 7.5L4 9C5 7.8 6.43 7 8 7C9.57 7 11 7.8 12 9L13.5 7.5C12.15 5.94 10.21 5 8 5Z" fill="currentColor" opacity="0.8"/>
          <path d="M8 1C4.69 1 1.78 2.45 0 4.95L1.5 6.5C2.97 4.4 5.32 3 8 3C10.68 3 13.03 4.4 14.5 6.5L16 4.95C14.22 2.45 11.31 1 8 1Z" fill="currentColor" opacity="0.6"/>
        </svg>
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke="currentColor" strokeOpacity="0.5"/>
          <rect x="2" y="2" width="19" height="8" rx="1.5" fill="currentColor"/>
          <rect x="23" y="4" width="2" height="4" rx="1" fill="currentColor" opacity="0.5"/>
        </svg>
      </div>
    </div>
  );
}

function CandleChart({ candles, day, marketEvent, ohlcLevels }) {
  const w = 340, h = 180, padR = 36, padL = 4;
  const closes = candles.map(c => c.close);
  const allHigh = Math.max(...candles.map(c => c.high));
  const allLow = Math.min(...candles.map(c => c.low));
  const range = allHigh - allLow;
  const padTop = 8, padBot = 8;

  const xFor = (i) => padL + (i / (candles.length - 1)) * (w - padR - padL);
  const yFor = (p) => padTop + ((allHigh - p) / range) * (h - padTop - padBot);

  // Indicators - only show ones the AI surfaces
  const ma5 = candles.map((_, i) => sma(closes, 5, i));
  const ma20 = candles.map((_, i) => sma(closes, 20, i));
  const ema9 = ema(closes, 9);

  // BOLL = SMA(20) ± 2*stddev(20)
  const bollUB = candles.map((_, i) => {
    if (i < 19) return null;
    const m = sma(closes, 20, i);
    let s = 0;
    for (let j = i - 19; j <= i; j++) s += (closes[j] - m) ** 2;
    return m + 2 * Math.sqrt(s / 20);
  });
  const bollLB = candles.map((_, i) => {
    if (i < 19) return null;
    const m = sma(closes, 20, i);
    let s = 0;
    for (let j = i - 19; j <= i; j++) s += (closes[j] - m) ** 2;
    return m - 2 * Math.sqrt(s / 20);
  });

  const linePath = (vals) => {
    let p = '';
    let started = false;
    vals.forEach((v, i) => {
      if (v == null) return;
      const cmd = !started ? 'M' : 'L';
      p += `${cmd}${xFor(i).toFixed(2)},${yFor(v).toFixed(2)} `;
      started = true;
    });
    return p;
  };

  const candleW = ((w - padR - padL) / candles.length) * 0.7;
  const lastCandle = candles[candles.length - 1];
  const lastY = yFor(lastCandle.close);
  const lastUp = lastCandle.close >= lastCandle.open;

  // Show all indicators on day 1, narrow to the user's set as days advance
  const showAll = day <= 7;
  const showAdaptive = day >= 30;
  const showMA5 = showAll || showAdaptive;
  const showMA20 = showAll;
  const showBoll = showAll || showAdaptive;
  const showEMA9 = showAll;

  // y-axis labels
  const yLabels = [
    allHigh,
    allHigh - range * 0.25,
    allHigh - range * 0.5,
    allHigh - range * 0.75,
    allLow,
  ];

  return (
    <div className="chart-svg-wrap">
      <svg className="chart-svg" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        {/* horizontal grid */}
        {[0.25, 0.5, 0.75].map((r, i) => (
          <line key={i} x1={0} x2={w - padR} y1={padTop + (h - padTop - padBot) * r} y2={padTop + (h - padTop - padBot) * r} stroke="#1f2024" strokeWidth="0.5" strokeDasharray="2,3"/>
        ))}

        {/* BOLL bands */}
        {showBoll && (
          <>
            <path d={linePath(bollUB)} stroke="#d56e6e" strokeWidth="0.8" fill="none" opacity="0.5"/>
            <path d={linePath(bollLB)} stroke="#d56e6e" strokeWidth="0.8" fill="none" opacity="0.5"/>
          </>
        )}
        {/* MAs */}
        {showMA20 && <path d={linePath(ma20)} stroke="#a989d6" strokeWidth="0.9" fill="none"/>}
        {showMA5 && <path d={linePath(ma5)} stroke="#f5b050" strokeWidth="0.9" fill="none"/>}
        {showEMA9 && <path d={linePath(ema9)} stroke="#6ea3d6" strokeWidth="0.9" fill="none" opacity="0.85"/>}

        {/* Candles */}
        {candles.map((c, i) => {
          const x = xFor(i);
          const isUp = c.close >= c.open;
          const color = isUp ? '#16A8A0' : '#d56e6e';
          const bodyTop = yFor(Math.max(c.open, c.close));
          const bodyH = Math.max(0.6, Math.abs(yFor(c.open) - yFor(c.close)));
          return (
            <g key={i}>
              <line x1={x} x2={x} y1={yFor(c.high)} y2={yFor(c.low)} stroke={color} strokeWidth="0.6"/>
              <rect x={x - candleW/2} y={bodyTop} width={candleW} height={bodyH} fill={color}/>
            </g>
          );
        })}

        {/* dashed line to last price */}
        <line x1={xFor(candles.length - 1)} x2={w - padR} y1={lastY} y2={lastY} stroke={lastUp ? '#16A8A0' : '#d56e6e'} strokeWidth="0.6" strokeDasharray="2,2"/>

        {/* Yesterday's OHLC overlay (drawn when AI offer accepted) */}
        {ohlcLevels && (
          <g className="ohlc-overlay">
            {ohlcLevels.map(lv => (
              <g key={lv.label}>
                <line x1={0} x2={w - padR} y1={yFor(lv.value)} y2={yFor(lv.value)}
                      stroke="#6FB7DA" strokeWidth="0.7" strokeDasharray="3,2.5" opacity="0.85"/>
                <text x={4} y={yFor(lv.value) - 1.6} fill="#6FB7DA"
                      style={{fontFamily: "'Manrope', sans-serif", fontWeight: 600, fontSize: '5px', letterSpacing: '0.12em', textTransform: 'uppercase'}}>
                  Y · {lv.label}
                </text>
              </g>
            ))}
          </g>
        )}
      </svg>

      <div className="chart-y-axis">
        {yLabels.map((v, i) => <span key={i}>{v.toFixed(2)}</span>)}
      </div>

      <div className={`last-price-tag ${lastUp ? '' : 'down'}`} style={{ right: 0, top: `${(lastY / h) * 100}%` }}>
        {lastCandle.close.toFixed(2)}
      </div>
    </div>
  );
}

function MACDPanel({ candles }) {
  const closes = candles.map(c => c.close);
  // Standard MACD params (12 / 26 / 9). Warm-up window is 26 candles, which
  // fits comfortably inside the 48-candle initial buffer.
  const { dif, dea, hist } = useMemo(() => macd(closes, 12, 26, 9), [candles.length]);
  const w = 340, h = 50, padR = 36, padL = 4;
  const warmup = 26;
  const allVals = [...dif, ...dea, ...hist].filter(v => v != null && !isNaN(v));
  const max = Math.max(...allVals, 0.01);
  const min = Math.min(...allVals, -0.01);
  const range = Math.max(max - min, 0.01);
  const xFor = (i) => padL + (i / (candles.length - 1)) * (w - padR - padL);
  const yFor = (v) => 4 + ((max - v) / range) * (h - 8);
  const zeroY = yFor(0);
  const barW = ((w - padR - padL) / candles.length) * 0.5;

  const linePath = (vals, period = 0) => {
    let p = '';
    let started = false;
    vals.forEach((v, i) => {
      if (v == null || isNaN(v) || i < period) return;
      const cmd = !started ? 'M' : 'L';
      p += `${cmd}${xFor(i).toFixed(2)},${yFor(v).toFixed(2)} `;
      started = true;
    });
    return p;
  };

  const last = dif.length - 1;

  return (
    <div className="ind-panel">
      <div className="ind-panel-header">
        <span className="ind-panel-name">MACD(12,26,9)</span>
        <span style={{color:'#a989d6'}}>MACD: {hist[last]?.toFixed(2)}</span>
        <span style={{color:'#f5d050'}}>DIF: {dif[last]?.toFixed(2)}</span>
        <span style={{color:'#f5b050'}}>DEA: {dea[last]?.toFixed(2)}</span>
      </div>
      <svg className="ind-svg" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <line x1={0} x2={w - padR} y1={zeroY} y2={zeroY} stroke="#2a2b30" strokeWidth="0.5"/>
        {hist.map((v, i) => {
          if (v == null || isNaN(v) || i < warmup) return null;
          const x = xFor(i);
          const y = yFor(v);
          const positive = v >= 0;
          return (
            <rect key={i} x={x - barW/2} y={Math.min(y, zeroY)} width={barW} height={Math.max(0.5, Math.abs(y - zeroY))} fill={positive ? '#0F7570' : '#8a3e3e'} opacity="0.9"/>
          );
        })}
        <path d={linePath(dif, warmup)} stroke="#f5d050" strokeWidth="0.9" fill="none"/>
        <path d={linePath(dea, warmup)} stroke="#f5b050" strokeWidth="0.9" fill="none"/>
      </svg>
      <div className="ind-y-axis">
        <span>{max.toFixed(2)}</span>
        <span>{min.toFixed(2)}</span>
      </div>
    </div>
  );
}

function RSIPanel({ candles }) {
  const closes = candles.map(c => c.close);
  const r24 = useMemo(() => rsi(closes, 24), [candles.length]);
  const r48 = useMemo(() => rsi(closes, 48), [candles.length]);
  const w = 340, h = 50, padR = 36, padL = 4;

  const xFor = (i) => padL + (i / (candles.length - 1)) * (w - padR - padL);
  const yFor = (v) => 4 + ((100 - v) / 100) * (h - 8);

  const linePath = (vals) => {
    let p = '';
    let started = false;
    vals.forEach((v, i) => {
      if (v == null) return;
      const cmd = !started ? 'M' : 'L';
      p += `${cmd}${xFor(i).toFixed(2)},${yFor(v).toFixed(2)} `;
      started = true;
    });
    return p;
  };

  const last = r24.length - 1;

  return (
    <div className="ind-panel">
      <div className="ind-panel-header">
        <span style={{color:'#d56e6e'}}>RSI(24): {r24[last]?.toFixed(1)}</span>
        <span style={{color:'#f5b050'}}>RSI(48): {r48[last]?.toFixed(1)}</span>
        <span style={{color:'#6ea3d6'}}>RSI(96): 51.6</span>
      </div>
      <svg className="ind-svg" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <line x1={0} x2={w - padR} y1={yFor(70)} y2={yFor(70)} stroke="#2a2b30" strokeWidth="0.5" strokeDasharray="2,2"/>
        <line x1={0} x2={w - padR} y1={yFor(30)} y2={yFor(30)} stroke="#2a2b30" strokeWidth="0.5" strokeDasharray="2,2"/>
        <path d={linePath(r24)} stroke="#d56e6e" strokeWidth="0.9" fill="none"/>
        <path d={linePath(r48)} stroke="#f5b050" strokeWidth="0.9" fill="none"/>
      </svg>
      <div className="ind-y-axis">
        <span>100</span>
        <span>0</span>
      </div>
    </div>
  );
}

function VolPanel({ candles }) {
  const w = 340, h = 50, padR = 36, padL = 4;
  const vols = candles.map(c => c.vol);
  const maxV = Math.max(...vols);
  const ma5v = candles.map((_, i) => {
    if (i < 4) return null;
    let s = 0;
    for (let j = i - 4; j <= i; j++) s += vols[j];
    return s / 5;
  });
  const ma10v = candles.map((_, i) => {
    if (i < 9) return null;
    let s = 0;
    for (let j = i - 9; j <= i; j++) s += vols[j];
    return s / 10;
  });

  const xFor = (i) => padL + (i / (candles.length - 1)) * (w - padR - padL);
  const yFor = (v) => 4 + ((maxV - v) / maxV) * (h - 8);
  const barW = ((w - padR - padL) / candles.length) * 0.7;

  const linePath = (vals) => {
    let p = '';
    let started = false;
    vals.forEach((v, i) => {
      if (v == null) return;
      const cmd = !started ? 'M' : 'L';
      p += `${cmd}${xFor(i).toFixed(2)},${yFor(v).toFixed(2)} `;
      started = true;
    });
    return p;
  };

  const last = candles.length - 1;
  const lastUp = candles[last].close >= candles[last].open;

  return (
    <div className="ind-panel">
      <div className="ind-panel-header">
        <span className="ind-panel-name">Vol: {vols[last].toFixed(0)}K</span>
        <span style={{color:'#f5b050'}}>MA(5): {ma5v[last]?.toFixed(0)}K</span>
        <span style={{color:'#d96cae'}}>MA(10): {ma10v[last]?.toFixed(0)}K</span>
      </div>
      <svg className="ind-svg" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        {vols.map((v, i) => {
          const isUp = candles[i].close >= candles[i].open;
          return <rect key={i} x={xFor(i) - barW/2} y={yFor(v)} width={barW} height={h - yFor(v) - 4} fill={isUp ? '#0F7570' : '#8a3e3e'} opacity="0.85"/>;
        })}
        <path d={linePath(ma5v)} stroke="#f5b050" strokeWidth="0.9" fill="none"/>
        <path d={linePath(ma10v)} stroke="#d96cae" strokeWidth="0.9" fill="none"/>
      </svg>
      <div className="ind-y-axis">
        <span>{maxV.toFixed(0)}K</span>
        <span>0</span>
      </div>
    </div>
  );
}

function KDJPanel({ candles }) {
  const w = 340, h = 50, padR = 36, padL = 4;
  // Real KDJ(9,3,3) over the actual candles: RSV = (close - low_n) / (high_n - low_n) × 100
  // K = prevK · 2/3 + RSV · 1/3; D = prevD · 2/3 + K · 1/3; J = 3K − 2D.
  const period = 9;
  const k = [];
  const dline = [];
  const j = [];
  let prevK = 50, prevD = 50;
  for (let i = 0; i < candles.length; i++) {
    if (i < period - 1) { k.push(null); dline.push(null); j.push(null); continue; }
    let highN = -Infinity, lowN = Infinity;
    for (let p = i - period + 1; p <= i; p++) {
      if (candles[p].high > highN) highN = candles[p].high;
      if (candles[p].low  < lowN)  lowN  = candles[p].low;
    }
    const range = Math.max(highN - lowN, 1e-6);
    const rsv = ((candles[i].close - lowN) / range) * 100;
    const curK = prevK * (2/3) + rsv * (1/3);
    const curD = prevD * (2/3) + curK * (1/3);
    const curJ = 3 * curK - 2 * curD;
    k.push(curK); dline.push(curD); j.push(curJ);
    prevK = curK; prevD = curD;
  }
  const xFor = (i) => padL + (i / (candles.length - 1)) * (w - padR - padL);
  // KDJ chart space — show 0..100 with a touch of headroom for J spikes
  const minY = -20, maxY = 120;
  const yFor = (v) => 4 + ((maxY - v) / (maxY - minY)) * (h - 8);
  const linePath = (vals) => {
    let p = '';
    let started = false;
    vals.forEach((v, i) => {
      if (v == null || isNaN(v)) return;
      const cmd = !started ? 'M' : 'L';
      p += `${cmd}${xFor(i).toFixed(2)},${yFor(v).toFixed(2)} `;
      started = true;
    });
    return p;
  };
  const last = candles.length - 1;
  return (
    <div className="ind-panel">
      <div className="ind-panel-header">
        <span className="ind-panel-name">KDJ(9,3,3)</span>
        <span style={{color:'#f5b050'}}>K: {k[last]?.toFixed(1)}</span>
        <span style={{color:'#d96cae'}}>D: {dline[last]?.toFixed(1)}</span>
        <span style={{color:'#a989d6'}}>J: {j[last]?.toFixed(1)}</span>
      </div>
      <svg className="ind-svg" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <line x1={0} x2={w - padR} y1={yFor(80)} y2={yFor(80)} stroke="#2a2b30" strokeWidth="0.5" strokeDasharray="2,2"/>
        <line x1={0} x2={w - padR} y1={yFor(20)} y2={yFor(20)} stroke="#2a2b30" strokeWidth="0.5" strokeDasharray="2,2"/>
        <path d={linePath(k)} stroke="#f5b050" strokeWidth="0.9" fill="none"/>
        <path d={linePath(dline)} stroke="#d96cae" strokeWidth="0.9" fill="none"/>
        <path d={linePath(j)} stroke="#a989d6" strokeWidth="0.9" fill="none"/>
      </svg>
      <div className="ind-y-axis">
        <span>100</span>
        <span>0</span>
      </div>
    </div>
  );
}

// Covered-call mini-screen used when day === 90, signalling the user has
// graduated to options education.
function CoveredCallScreen({ currentPrice }) {
  const px = currentPrice ?? 674.25;
  const strike = +(px * 1.016).toFixed(2);
  const premium = +(px * 0.0042).toFixed(2);
  const breakeven = +(px - premium).toFixed(2);
  const maxProfitPerContract = +((strike - px + premium) * 100).toFixed(0);
  return (
    <div className="cc-screen">
      <div className="cc-header">
        <span className="cc-eyebrow">Day 90 · Options education</span>
        <span className="cc-meta">covered call · 1 contract</span>
      </div>
      <div className="cc-title">
        Sell a covered call <span className="cc-accent">on shares you already own.</span>
      </div>
      <div className="cc-explainer">
        She owns 100 shares of QQQ. Selling a call against them earns premium upfront — at the cost of capping upside at the strike.
      </div>
      <div className="cc-grid">
        <div className="cc-row"><span>Underlying</span><span className="val">QQQ · ${px.toFixed(2)}</span></div>
        <div className="cc-row"><span>Shares owned</span><span className="val">100</span></div>
        <div className="cc-row"><span>Strike (1.6% OTM)</span><span className="val">${strike.toFixed(2)}</span></div>
        <div className="cc-row"><span>Expiry</span><span className="val">14 Jun · 45d</span></div>
        <div className="cc-row"><span>Premium received</span><span className="val up">+${(premium * 100).toFixed(0)} ({premium.toFixed(2)} × 100)</span></div>
        <div className="cc-row"><span>Break-even</span><span className="val">${breakeven.toFixed(2)}</span></div>
        <div className="cc-row"><span>Max profit at expiry</span><span className="val up">+${maxProfitPerContract}</span></div>
        <div className="cc-row"><span>Risk</span><span className="val down">Capital downside if QQQ falls</span></div>
      </div>
      <div className="cc-payoff">
        {/* Simple payoff diagram */}
        <svg viewBox="0 0 200 60" className="cc-payoff-svg" preserveAspectRatio="none">
          <line x1="0" y1="40" x2="200" y2="40" stroke="rgba(255,255,255,0.18)" strokeDasharray="2,2"/>
          <path d="M0,52 L100,18 L160,18 L200,18" stroke="#84C6A2" strokeWidth="1.8" fill="none"/>
          <circle cx="100" cy="18" r="2.4" fill="#6FB7DA"/>
          <text x="102" y="14" fill="#6FB7DA" style={{fontFamily: "'Manrope', sans-serif", fontSize: '5.5px', letterSpacing: '0.08em'}}>STRIKE</text>
        </svg>
        <div className="cc-payoff-caption">Profit caps at strike · downside capped only by share value</div>
      </div>
      <div className="cc-actions">
        <button className="cc-btn ghost">Learn more</button>
        <button className="cc-btn primary">Place covered call →</button>
      </div>
    </div>
  );
}

function PhoneScreen({ day, candles, currentPrice, prevPrice, activeIndicators, marketEvent, ignoredOrderBook, showFriction, onTrade, onAIClick, showAIModal, onCloseAI, onTickerSwitch, ohlcLevels, hideHeaderHL, currentStepId, aiGuideStep }) {
  const isMature = day >= 30;
  const orderBookSurfaced = marketEvent && isMature;
  const [ticker, setTicker] = useState('QQQ');
  const [tickerFlash, setTickerFlash] = useState(false);
  const tickerLabel = ticker === 'RUSA' ? 'ETF · RBC' : 'ETF';
  const tickerSwap = () => {
    setTicker(t => (t === 'QQQ' ? 'RUSA' : 'QQQ'));
    setTickerFlash(true);
    setTimeout(() => setTickerFlash(false), 600);
    if (onTickerSwitch) onTickerSwitch();
  };

  const indicatorList = day === 1
    ? ['MA', 'EMA', 'BOLL', 'SAR', 'AVL', 'VOL', 'MACD', 'KDJ', 'RSI', 'STOCH', 'CCI']
    : day === 7
    ? ['MA', 'EMA', 'BOLL', 'SAR', 'VOL', 'MACD', 'RSI', 'STOCH']
    : day === 30
    ? ['BOLL', 'RSI', 'VOL', 'MACD', 'MA']
    : ['BOLL', 'RSI', 'VOL'];

  const change = currentPrice - 669.16;
  const changePct = (change / 669.16) * 100;
  const isUp = change >= 0;
  const flashClass = prevPrice && currentPrice > prevPrice ? 'flash-up' : prevPrice && currentPrice < prevPrice ? 'flash-down' : '';

  // Compute live indicator overlay values
  const closes = candles.map(c => c.close);
  const last = closes.length - 1;
  const ma5val = sma(closes, 5, last);
  const ma10val = sma(closes, 10, last);
  const ma20val = sma(closes, 20, last);
  const ema9arr = ema(closes, 9);
  const ema21arr = ema(closes, 21);
  const ema200arr = ema(closes, 200);

  const periodStats = [
    { label: 'Today', value: `${changePct >= 0 ? '+' : ''}${changePct.toFixed(2)}%`, up: changePct >= 0 },
    { label: '7 days', value: '+1.82%', up: true },
    { label: '30 days', value: '+4.23%', up: true },
    { label: '90 days', value: '-0.56%', up: false },
    { label: '180 days', value: '+12.41%', up: true },
  ];

  // chart time labels (5-min intervals)
  const fmt = (d) => `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  const timeLabels = [
    fmt(candles[0].time),
    fmt(candles[Math.floor(candles.length / 3)].time),
    fmt(candles[Math.floor(candles.length * 2 / 3)].time),
    fmt(candles[candles.length - 1].time),
  ];

  return (
    <div className="phone">
      <StatusBar />
      <div className="app-screen">
        {showAIModal && (
          <div className="ai-assistant-modal">
            <div className="ai-modal-header">
              <div className="ai-orb"></div>
              <div className="ai-modal-title">AI Assistant</div>
              <span className="ai-modal-close" onClick={onCloseAI}>×</span>
            </div>
            <div className="ai-modal-body">
              <p><strong>I am your trading assistant.</strong> I run only on this phone. Nothing leaves unless you say so.</p>
              <p>I notice the things you reach for and the things you scroll past. Over time, I quiet the parts of the screen you do not need, and I bring back the ones that matter when the moment is right.</p>
              <p>You can see what I have learned about you, and undo any of it, at any time.</p>
              <p style={{color: 'var(--amber)', fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '0.04em', textTransform: 'uppercase'}}>
                Currently observing · session #{day}
              </p>
            </div>
          </div>
        )}

        <div className="app-header">
          <div
            className="app-symbol"
            onClick={tickerSwap}
            style={{ cursor: 'pointer', userSelect: 'none' }}
            title="Switch ticker (QQQ ↔ RUSA)"
          >
            <span className="back-arrow">←</span>
            <span
              className="symbol-name"
              style={{
                transition: 'color 0.3s ease, background 0.3s ease',
                background: tickerFlash ? 'rgba(254,223,1,0.18)' : 'transparent',
                padding: tickerFlash ? '2px 6px' : '0',
                borderRadius: 4,
              }}
            >
              {ticker}
            </span>
            <span className="symbol-tag">{tickerLabel} ▼</span>
          </div>
          <div className="app-actions">
            <button className="ai-assistant-btn" onClick={onAIClick}>
              <div className="ai-orb"></div>
              <span className="ai-assistant-label">AI Assistant</span>
            </button>
            <span className="more-dot">···</span>
          </div>
        </div>

        {/* Last price strip — directly under the QQQ ticker chip */}
        <div className={`ticker-price ${isUp ? 'up' : 'down'}`}>
          <span className={`ticker-price-value ${flashClass}`}>{currentPrice.toFixed(2)}</span>
          <span className={`ticker-price-change ${isUp ? 'up' : 'down'}`}>{isUp ? '▲' : '▼'} {Math.abs(changePct).toFixed(2)}%</span>
        </div>

        <div className="app-content">
          {/* Day-30 adapted "track record" strip */}
          {day === 30 && (
            <div className="day30-strip">
              <div className="day30-eyebrow">UI adapted to her habits · 30 days in</div>
              <div className="day30-metrics">
                <div className="day30-metric"><span className="lbl">Win rate</span><span className="val up">62%</span></div>
                <div className="day30-metric"><span className="lbl">Avg R/R</span><span className="val">1 : 1.8</span></div>
                <div className="day30-metric"><span className="lbl">Trades</span><span className="val">38</span></div>
                <div className="day30-metric"><span className="lbl">P/L</span><span className="val up">+$612</span></div>
              </div>
            </div>
          )}

          {/* Day-90 covered-call screen replaces the chart-and-orderbook flow */}
          {day === 90 ? (
            <CoveredCallScreen currentPrice={currentPrice} />
          ) : (
          <>
          {/* Compact price strip — turnover only; the big price overlays the chart itself */}
          <div className="price-strip">
            <div className="price-strip-meta">
              <span className={`change ${isUp ? 'up' : 'down'}`}>{isUp ? '+' : ''}{changePct.toFixed(2)}%</span>
              <span className="strip-divider" />
              <span className="strip-stat"><span className="strip-stat-label">Turnover</span><span className="strip-stat-value">$26.4B</span></span>
            </div>
          </div>

          {/* Timeframes */}
          <div className="timeframes">
            <span className="tf">1m</span>
            <span className="tf">15m</span>
            <span className="tf">1h</span>
            <span className="tf active">5m</span>
            <span className="tf">1D</span>
            <span className="tf">More ▾</span>
            <div className="tf-more">
              <span className="tf-icon">⌗</span>
              <span className="tf-icon">✎</span>
              <span className="tf-icon">⚙</span>
            </div>
          </div>

          {/* Main chart */}
          <div className="chart-area">
            <CandleChart candles={candles} day={day} marketEvent={marketEvent} ohlcLevels={ohlcLevels}/>
          </div>

          <div className="chart-time-axis">
            {timeLabels.map((t, i) => <span key={i}>{t}</span>)}
          </div>

          {/* Indicator panels — VOL above MACD per latest design pass */}
          <VolPanel candles={candles} />
          <MACDPanel candles={candles} />
          {(day <= 7 || day >= 30) && <RSIPanel candles={candles} />}
          {day === 1 && <KDJPanel candles={candles} />}

          {/* Indicator chips */}
          <div className="indicators">
            {indicatorList.map(ind => {
              const isActive = activeIndicators.includes(ind);
              const isSuggested = day >= 30 && ind === 'BOLL' && activeIndicators.includes('RSI') && !isActive;
              return (
                <span key={ind} className={`ind-chip ${isActive ? 'active' : ''} ${isSuggested ? 'suggested' : ''}`}>
                  {ind}
                </span>
              );
            })}
            <span className="ind-chip-icon">⌗</span>
          </div>

          {/* Period stats */}
          <div className="period-stats">
            {periodStats.map((p, i) => (
              <div key={i} className="period">
                <div className="period-label">{p.label}</div>
                <div className={`period-value ${p.up ? 'up' : 'down'}`}>{p.value}</div>
              </div>
            ))}
          </div>

          {/* Order book section */}
          {(day < 30 || marketEvent) && (
            <>
              <div className="ob-tabs">
                <span className="ob-tab active">Order book</span>
                <span className="ob-tab">Depth</span>
                <span className="ob-tab">Trades</span>
              </div>
              <div className="imbalance-label">
                <span><span className="b-pct">B 66%</span></span>
                <span><span className="s-pct">34% S</span></span>
              </div>
              <div className="imbalance">
                <div className="b" style={{width: '66%'}}></div>
                <div className="s" style={{width: '34%'}}></div>
              </div>
              {orderBookSurfaced && (
                <div className="ai-surface-note">
                  ◆ Bid wall building · 2.4× normal depth — surfaced for review
                </div>
              )}
            </>
          )}

          {day >= 30 && !marketEvent && (
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '10px',
              color: '#5e5f62',
              padding: '16px 0 8px',
              letterSpacing: '0.04em',
              textAlign: 'center',
              borderTop: '1px solid var(--phone-rule)',
              marginTop: '8px',
            }}>
              Order book moved to More — rarely used
            </div>
          )}

          {/* On-phone AI guide — slides in after recognition settles */}
          {aiGuideStep && (() => {
            const guides = {
              bollinger: {
                title: <>Heads up — you tapped the <span className="accent">Bollinger Band.</span></>,
                body: 'Three lines hugging price. The middle is a 20-period moving average; the outer lines sit two standard deviations away — when price reaches one, it\'s statistically extended.',
              },
              volume: {
                title: <>That bar is <span className="accent">volume.</span></>,
                body: 'How many shares traded in that candle. Tall bars on price moves mean conviction; quiet candles reverse easily.',
              },
            };
            const g = guides[aiGuideStep];
            if (!g) return null;
            return (
              <div className="phone-ai-guide" key={aiGuideStep}>
                <div className="phone-ai-guide-eyebrow">
                  <span className="phone-ai-guide-dot" /> AI · ON-DEVICE
                </div>
                <div className="phone-ai-guide-title">{g.title}</div>
                <div className="phone-ai-guide-body">{g.body}</div>
                <div className="phone-ai-guide-actions">
                  <button className="ag-btn primary">Learn more</button>
                  <button className="ag-btn">Change settings</button>
                  <button className="ag-btn">Suggest similar</button>
                </div>
              </div>
            );
          })()}

          {/* Finger-tap indicator overlaying the appropriate part of the phone */}
          {(() => {
            const tapMap = {
              'bollinger':       { label: 'Tapped Bollinger band', pos: { top: '36%', left: '32%' } },
              'ohlc-offer':      { label: 'Tapped 24h high',       pos: { top: '5%',  left: '18%' } },
              'volume':          { label: 'Tapped a volume bar',   pos: { top: '60%', left: '24%' } },
            };
            const tap = currentStepId && tapMap[currentStepId];
            if (!tap) return null;
            return (
              <div className="phone-tap-overlay" style={tap.pos}>
                <div className="phone-tap-popup">
                  <span className="phone-tap-popup-eyebrow">User</span>
                  {tap.label}
                </div>
                <svg className="phone-finger" viewBox="0 0 32 40" aria-hidden="true">
                  <path d="M16 4 C 12 4, 11 7, 11 11 L 11 21 L 8 22 C 5 23, 4 26, 5 28 L 9 36 C 10 38, 12 39, 14 39 L 22 39 C 25 39, 27 37, 27 34 L 27 19 C 27 17, 26 16, 24 16 L 21 16 L 21 11 C 21 7, 20 4, 16 4 Z"
                        fill="#ffffff" stroke="#0A2D52" strokeWidth="1.4" strokeLinejoin="round"/>
                  <circle cx="16" cy="9" r="3.6" fill="#6FB7DA" opacity="0.55"/>
                </svg>
              </div>
            );
          })()}
          </>
          )}
        </div>

        {showFriction && <div className="trade-friction-strip">Take a breath — this matches a pattern from your last 4 losses</div>}
        <div className="app-cta">
          <div className="tools-btn">
            <span className="tools-btn-icon">⌗</span>
            <span>Tools</span>
          </div>
          <button className={`trade-btn ${showFriction ? 'friction' : ''}`} onClick={onTrade}>
            {showFriction ? 'Confirm trade' : 'Trade'}
          </button>
        </div>
      </div>
      <div className="home-bar"></div>
    </div>
  );
}

// Recognition rating — when the AI has observed an action, it rates a few
// candidate responses live: scores fluctuate for ~2.4s, then settle on the
// highest. Re-runs every time the `keyId` (current step) changes.
function RecognitionRating({ keyId }) {
  const options = useMemo(() => [
    { id: 'ask',      label: 'Ask first',   target: 0.83 },
    { id: 'explain',  label: 'Explain now', target: 0.42 },
    { id: 'silent',   label: 'Stay quiet',  target: 0.21 },
    { id: 'defer',    label: 'Defer',       target: 0.08 },
  ], []);
  const [scores, setScores] = useState(() => options.map(() => Math.random() * 0.4 + 0.1));
  const [phase, setPhase] = useState('rating'); // 'rating' | 'settled'
  useEffect(() => {
    setPhase('rating');
    setScores(options.map(() => Math.random() * 0.4 + 0.1));
    const tick = setInterval(() => {
      setScores(prev => prev.map((v, i) => {
        // Drift toward each option's target with jitter
        const target = options[i].target;
        const noise = (Math.random() - 0.5) * 0.10;
        return v + (target - v) * 0.12 + noise;
      }));
    }, 110);
    const settle = setTimeout(() => {
      setScores(options.map(o => o.target));
      setPhase('settled');
      clearInterval(tick);
    }, 2400);
    return () => { clearInterval(tick); clearTimeout(settle); };
  }, [keyId]);

  const winner = options.reduce((w, o, i) => scores[i] > scores[options.indexOf(w)] ? o : w, options[0]);
  return (
    <div className={`recog-rating phase-${phase}`}>
      {options.map((o, i) => {
        const v = Math.max(0, Math.min(1, scores[i]));
        const isWinner = phase === 'settled' && o.id === 'ask';
        return (
          <div key={o.id} className={`recog-rating-row${isWinner ? ' winner' : ''}`}>
            <span className="recog-rating-label">{o.label}</span>
            <div className="recog-rating-bar"><div className="recog-rating-fill" style={{ width: `${v * 100}%` }}/></div>
            <span className="recog-rating-score">{v.toFixed(2)}</span>
            {isWinner && <span className="recog-rating-check">✓</span>}
          </div>
        );
      })}
    </div>
  );
}

// Mock neural-network animation that takes ~1/3 height of the AI panel.
// Layers: 4 input → 6 hidden-1 → 5 hidden-2 → 3 output. Always-on subtle
// firing; intensifies whenever `pulse === 'live'`.
function NeuralNetPanel({ pulse }) {
  const W = 320, H = 140;
  const layers = [
    { count: 4, x: 32 },
    { count: 6, x: 116 },
    { count: 5, x: 204 },
    { count: 3, x: 292 },
  ];
  const nodes = layers.map(l => {
    const step = H / (l.count + 1);
    return Array.from({ length: l.count }, (_, i) => ({ x: l.x, y: step * (i + 1) }));
  });
  const lines = [];
  for (let li = 0; li < layers.length - 1; li++) {
    nodes[li].forEach((a, ai) => nodes[li+1].forEach((b, bi) => {
      lines.push({ a, b, key: `${li}-${ai}-${bi}` });
    }));
  }
  return (
    <div className={`neural-panel${pulse === 'live' ? ' neural-live' : ''}`}>
      <div className="neural-head">
        <span className="neural-eyebrow">On-device model</span>
        <span className="neural-meta">{pulse === 'live' ? 'firing' : 'standby'}</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="neural-svg" preserveAspectRatio="xMidYMid meet">
        {lines.map(({ a, b, key }, idx) => (
          <line key={key} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="currentColor" strokeWidth="0.45" opacity="0.22"/>
        ))}
        {/* Traveling-light pulses — short bright dashes that walk
            along each connection, staggered so the network looks like
            it's firing data forward through the layers. Subset of all
            connections to keep it readable. */}
        {lines.map(({ a, b, key }, idx) => {
          if (idx % 4 !== 0) return null; // pulse only every 4th line
          const dur = 2.2 + (idx % 5) * 0.18;
          const delay = (idx % 7) * 0.28;
          return (
            <line
              key={`p-${key}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              className="nn-pulse"
              style={{ animationDuration: `${dur}s`, animationDelay: `${delay}s` }}
            />
          );
        })}
        {nodes.map((layer, li) => layer.map((n, ni) => (
          <circle
            key={`n-${li}-${ni}`}
            className={`nn-node nn-l${li} nn-${li}-${ni}`}
            cx={n.x} cy={n.y} r={3.4}
            fill="currentColor"
          />
        )))}
      </svg>
      <div className="neural-foot">
        <span>4 → 6 → 5 → 3</span>
        <span className="neural-foot-mark">·</span>
        <span>traits filling in</span>
      </div>
    </div>
  );
}

function AIPanel({ day, sectionDwell, indicatorTaps, marketEvent, ignoredOrderBook, synced, onToggleSync, candles, currentBehavior, persona }) {
  const ai = useMemo(
    () => computeAIState(day, sectionDwell, indicatorTaps, marketEvent, ignoredOrderBook),
    [day, sectionDwell, indicatorTaps, marketEvent, ignoredOrderBook]
  );

  const sectionEntries = [
    { id: 'chart', label: 'Chart', dwell: sectionDwell.chart || 0 },
    { id: 'indicators', label: 'Indicators', dwell: sectionDwell.indicators || 0 },
    { id: 'orderbook', label: 'Order book', dwell: sectionDwell.orderbook || 0 },
    { id: 'news', label: 'News', dwell: sectionDwell.news || 0 },
  ];
  const maxDwell = Math.max(...sectionEntries.map(s => s.dwell), 1);
  const lastCandle = candles[candles.length - 1];

  return (
    <div className="ai-panel">
      <div className="privacy">
        <div className="privacy-state">
          <div className="privacy-dot"></div>
          <span>ON-DEVICE</span>
          <span className="privacy-meta">model lives on this phone</span>
        </div>
        <button className={`sync-toggle ${synced ? 'synced' : ''}`} onClick={onToggleSync}>
          {synced ? 'Synced' : 'Sync to cloud'}
        </button>
      </div>

      <NeuralNetPanel pulse={currentBehavior ? 'live' : 'idle'} />

      {/* AI recognition (replaces the small interpretation card under the net) */}
      <div className={`ai-recognition${currentBehavior ? ' live' : ''}`}>
        <div className="ai-recognition-eyebrow">
          <span className="recog-dot" /> Recognition · {currentBehavior ? 'live' : 'awaiting input'}
        </div>
        {currentBehavior ? (
          <>
            <div className="ai-recognition-event">
              The AI saw <strong>{currentBehavior.label}</strong>.
            </div>
            <div className="ai-recognition-context">
              From KYC: <strong>beginner trader</strong> · ~1y experience · $8K capital · conservative profile.
            </div>
            <div className="ai-recognition-decision">
              <span className="decision-label">Rating responses</span>
              <span className="decision-text">Live confidence scores · settles on the highest.</span>
            </div>
            <RecognitionRating keyId={currentBehavior?.id || 'idle'} />
          </>
        ) : (
          <div className="ai-recognition-empty">
            Watching for the next tap, hover or scroll. Each event flows through the network and triggers a recognition.
          </div>
        )}
      </div>


      {/* Latest interpretation chain — the core demo */}
      <div className="interpretation-card">
        <div className="ai-section-title" style={{color: '#8a8680', marginBottom: 14}}>
          Latest interpretation
          <span className="ai-section-meta" style={{color: '#6e6c66'}}>
            {currentBehavior ? 'live' : 'awaiting input'}
          </span>
        </div>
        {currentBehavior ? (
          <>
            <div className="interpretation-step">
              <span className="interpretation-label">User did</span>
              <span className="interpretation-text"><strong>{currentBehavior.label}</strong> <span style={{color:'#8a8680', fontFamily: "'IBM Plex Mono', monospace", fontSize: '10.5px'}}>· {currentBehavior.meta}</span></span>
            </div>
            <div className="interpretation-step">
              <span className="interpretation-label">AI sees</span>
              <span className="interpretation-text">{currentBehavior.interp.sees}</span>
            </div>
            <div className="interpretation-step">
              <span className="interpretation-label">Interprets</span>
              <span className="interpretation-text">{currentBehavior.interp.interprets}</span>
            </div>
            <div className="interpretation-step">
              <span className="interpretation-label">AI does</span>
              <span className="interpretation-text action">→ {currentBehavior.interp.action}</span>
            </div>
          </>
        ) : (
          <div className="interpretation-empty">
            Click any behavior in the library on the left to see how the AI observes, interprets, and acts.
          </div>
        )}
      </div>

      <div className="ai-panel-section">
        <div className="ai-section-title">
          Live tick
          <span className="ai-section-meta">QQQ · 5m · streaming</span>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px 16px',
          fontSize: '11.5px',
          fontVariantNumeric: 'tabular-nums',
        }}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <span style={{color: 'var(--panel-muted)'}}>Open</span>
            <span style={{fontWeight: 500}}>{lastCandle.open.toFixed(2)}</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <span style={{color: 'var(--panel-muted)'}}>Close</span>
            <span style={{fontWeight: 500, color: lastCandle.close >= lastCandle.open ? '#0F7570' : '#a14848'}}>
              {lastCandle.close.toFixed(2)}
            </span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <span style={{color: 'var(--panel-muted)'}}>High</span>
            <span style={{fontWeight: 500}}>{lastCandle.high.toFixed(2)}</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <span style={{color: 'var(--panel-muted)'}}>Low</span>
            <span style={{fontWeight: 500}}>{lastCandle.low.toFixed(2)}</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', gridColumn: 'span 2'}}>
            <span style={{color: 'var(--panel-muted)'}}>Vol</span>
            <span style={{fontWeight: 500}}>{lastCandle.vol.toFixed(0)}K</span>
          </div>
        </div>
      </div>

      <div className="ai-panel-section">
        <div className="ai-section-title">
          Watching now
          <span className="ai-section-meta">session live</span>
        </div>
        <div className="obs-list">
          {sectionEntries.map(s => {
            const pct = (s.dwell / maxDwell) * 100;
            const dim = s.dwell === 0;
            const mins = Math.floor(s.dwell / 60);
            const secs = s.dwell % 60;
            const display = s.dwell === 0 ? '—' : `${mins}m ${String(secs).padStart(2,'0')}s`;
            return (
              <div key={s.id} className={`obs ${dim ? 'dim' : ''}`}>
                <span className="obs-label">{s.label}</span>
                <div className="obs-bar"><span style={{width: `${pct}%`}}></span></div>
                <span className="obs-time">{display}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="ai-panel-section">
        <div className="ai-section-title">
          Patterns learned
          <span className="ai-section-meta">across {day === 1 ? '1 session' : `${day} days`}</span>
        </div>
        {ai.patterns.length > 0 ? (
          ai.patterns.map((p, i) => (
            <div key={i} className="pattern">
              <span className="pattern-bullet">{String(i+1).padStart(2, '0')}</span>
              <span className="pattern-text">{p.text}</span>
              <span className="pattern-conf">{p.conf}</span>
            </div>
          ))
        ) : (
          <div className="empty">Nothing to share yet. Keep using the app.</div>
        )}
      </div>

      <div className="ai-panel-section">
        <div className="ai-section-title">
          Interface changes
          <span className="ai-section-meta">{ai.actions.length} {ai.actions.length === 1 ? 'item' : 'items'}</span>
        </div>
        {ai.actions.length > 0 ? (
          ai.actions.map((a, i) => (
            <div key={i} className={`action-card ${a.applied ? 'applied' : ''} ${a.active ? 'active' : ''}`}>
              <span className="verb">{a.verb}</span>
              <span className="descr">{a.descr}</span>
              <div className="when">{a.when}</div>
            </div>
          ))
        ) : (
          <div className="empty">No changes queued.</div>
        )}
      </div>

      <div className="ai-panel-section">
        <div className="ai-section-title">Reasoning</div>
        <div className="reasoning">{ai.reasoning}</div>
        <div className="reasoning-meta">
          <span>{ai.reasoningMeta}</span>
        </div>
      </div>
    </div>
  );
}

// ====== USER PERSONAS & BEHAVIOR LIBRARY ======
const PERSONAS = {
  beginner: {
    id: 'beginner',
    label: 'Beginner',
    name: 'New trader',
    desc: 'First 6 weeks · QQQ only · $5K account · learning indicators',
  },
  intermediate: {
    id: 'intermediate',
    label: 'Intermediate',
    name: 'Routine trader',
    desc: '8 months active · 3-4 indicators · stop-loss discipline · QQQ + SPY',
  },
  advanced: {
    id: 'advanced',
    label: 'Advanced',
    name: 'Power trader',
    desc: '5+ years · multi-timeframe · options flow · cross-asset correlation',
  },
  custom: {
    id: 'custom',
    label: '+ More',
    name: 'Additional levels',
    desc: 'Day trader, swing trader, algorithmic — placeholder for future personas',
    placeholder: true,
  },
};

const BEHAVIOR_LIBRARY = {
  beginner: [
    { id: 'b-view-price', icon: '01', label: 'View QQQ price (1m)', meta: 'passive · 60s', category: 'Passive observation', looking: 'Price chart', doing: 'Just looking', interp: { sees: 'New session opened. User landed on price, no chart interaction yet.', interprets: 'Establishing baseline. No predictive signal yet.', action: 'Continue observing. No intervention.' } },
    { id: 'b-tap-candle', icon: '02', label: 'Tap a candlestick', meta: 'curious · 8s', category: 'Passive observation', looking: 'Candle detail popup', doing: 'Tapped candle', interp: { sees: 'First chart interaction. Tapped without prior pattern.', interprets: 'Curious but unguided. Likely doesn\'t know what OHLC means yet.', action: 'On next tap, surface a one-line "what this candle tells you" tooltip.' } },
    { id: 'b-ask-rsi', icon: '03', label: 'Tap RSI — "What is this?"', meta: 'curious · 12s', category: 'Curiosity', looking: 'RSI panel', doing: 'Tapped RSI label', interp: { sees: 'Tapped RSI for the first time. Lingered on the label, not the values.', interprets: 'User does not know what RSI means.', action: 'Surface a 2-sentence plain-language RSI explainer. Mark RSI as "learning" — explainer will shrink as user engages.' } },
    { id: 'b-watch-news', icon: '04', label: 'Scroll news headlines', meta: 'reading · 45s', category: 'Curiosity', looking: 'News feed', doing: 'Scrolling headlines', interp: { sees: '4 headlines scrolled past, no taps. 45s on the news pane.', interprets: 'Reading for context, not for action. Information-gathering mode.', action: 'Note news section as "actively read" — keep visible. Do not surface market alerts during this mode.' } },
    { id: 'b-hover-buy', icon: '05', label: 'Hover Buy button (3m 12s)', meta: 'hesitation · 192s', category: 'Hesitation', looking: 'Order entry screen', doing: 'Hovering Buy', interp: { sees: 'Long pre-action hold: 3m 12s on Buy button. Position size field touched 4 times.', interprets: 'Pre-action anxiety. Likely the position size feels large relative to comfort.', action: 'Surface position calculator. Show "what this trade looks like at 50% size." Do not block — only assist.' } },
    { id: 'b-cancel-draft', icon: '06', label: 'Cancel order draft', meta: 'hesitation · -', category: 'Hesitation', looking: 'Watchlist', doing: 'Cancelled draft', interp: { sees: 'Drafted then cancelled. 4th cancellation this week.', interprets: 'Pattern of indecision at order entry. Confidence not yet built.', action: 'Log to "drafted-then-cancelled" pattern. After 6 instances, surface a small "your usual entries" view with past trades.' } },
    { id: 'b-small-buy', icon: '07', label: 'Place small market order', meta: 'action · 4s', category: 'Action', looking: 'Order confirmation', doing: 'Placed buy order', interp: { sees: 'Market buy filled. Position open, $480 notional.', interprets: 'Cleared the hesitation gate. Watch what happens next — beginners often check obsessively after entry.', action: 'Pre-load position-tracker view. Prepare anti-anxiety nudge for the 4th refresh.' } },
    { id: 'b-anxious-check', icon: '08', label: 'Refresh position 6×', meta: 'anxiety · 10m', category: 'Reaction', looking: 'Position screen', doing: 'Compulsive checking', interp: { sees: 'Position screen opened 6 times in 10 minutes. Each visit under 3s.', interprets: 'Anxiety pattern, not analysis. User is monitoring P&L, not making a decision.', action: 'Soft nudge: "Your position is up 0.4%. Step away — alerts will find you." Do not force, but offer.' } },
    { id: 'b-panic-sell', icon: '09', label: 'Sell on first red candle', meta: 'reaction · 2s', category: 'Reaction', looking: 'Order screen', doing: 'Selling at -0.8%', interp: { sees: 'Sell triggered at -0.8% drawdown. 5th time this pattern fires this month.', interprets: 'Selling into noise, not into a thesis. Drawdown tolerance is below natural volatility.', action: 'Add 5-second cool-down on next sell inside 1% drawdown. Show: "your last 4 trades like this would have recovered."' } },
    { id: 'b-fomo-rebuy', icon: '10', label: 'Re-buy 0.6% higher', meta: 'reaction · 3s', category: 'Reaction', looking: 'Order screen', doing: 'Re-entering', interp: { sees: 'Re-buying same ticker 8 minutes after selling. Price is 0.6% higher.', interprets: 'Classic FOMO loop after panic exit. Compounding emotional cost.', action: 'Surface side-by-side: "Your sell at $520.10 → your buy back at $523.30." Information, not judgment.' } },
    { id: 'b-switch-rusa', icon: '11', label: 'Toggle ticker QQQ ↔ RUSA', meta: 'window-shopping · 6s', category: 'Curiosity', looking: 'Symbol header', doing: 'Comparing tickers', interp: { sees: 'Tapped the ticker pill. Switched QQQ → RUSA → QQQ within 6s. No order action either side.', interprets: 'Window-shopping pattern, 87% confidence. User is comparing the U.S. tech ETF she\'s heard about (QQQ) against the RBC-managed equivalent (RUSA). Curiosity, not commitment.', action: 'Surface side-by-side: "QQQ vs RUSA — MER 0.20% vs 0.39%, holdings 100 vs ~150 large-caps." Offer the Beginner ETF Sandbox: paper-trade $1,000 of either for 7 days. No real money.' } },
  ],

  intermediate: [
    { id: 'i-premarket', icon: '01', label: 'Pre-market scan (8:45 ET)', meta: 'routine · daily', category: 'Routine', looking: 'Watchlist + futures', doing: 'Morning scan', interp: { sees: 'App opened at 8:43 ET. Standard pre-market routine.', interprets: 'Routine confirmed across 28 of 30 weekdays. Predictable opener.', action: 'Pre-load yesterday\'s close + overnight futures + 3 watchlist tickers as the default open view.' } },
    { id: 'i-rsi-vol', icon: '02', label: 'Open RSI + Vol together', meta: 'pattern · 4s', category: 'Routine', looking: 'RSI and Vol panels', doing: 'Indicator setup', interp: { sees: 'RSI and Vol toggled together. 6th time this week.', interprets: 'These two are part of the user\'s reading routine. Likely confirming volume on RSI signal.', action: 'When RSI is opened, auto-load Vol. Save the pairing as a custom indicator preset.' } },
    { id: 'i-tf-switch', icon: '03', label: 'Switch to 5m timeframe', meta: 'routine · 2s', category: 'Routine', looking: '5m candles', doing: 'Changed timeframe', interp: { sees: 'Always switches to 5m within 8s of opening chart.', interprets: 'Default frame is 5m. The 1m and 1h frames are rarely used.', action: 'Set 5m as default chart frame. Demote 1m and 1h in the timeframe picker.' } },
    { id: 'i-set-stop', icon: '04', label: 'Set stop-loss at -1.2%', meta: 'discipline · 6s', category: 'Discipline', looking: 'Stop order screen', doing: 'Configuring stop', interp: { sees: 'Stop set at -1.2% below entry. Consistent with last 12 trades.', interprets: 'Strong stop discipline. Average stop -1.18% with low variance.', action: 'Auto-suggest -1.2% stop on next order entry. Allow override silently.' } },
    { id: 'i-limit-order', icon: '05', label: 'Place limit order', meta: 'action · 8s', category: 'Action', looking: 'Order confirmation', doing: 'Limit submitted', interp: { sees: 'Limit at $521.40, current $521.62. Patient entry.', interprets: 'Doesn\'t chase. Will wait for the price.', action: 'Prepare "limit unfilled after 30m" notification with one-tap adjust option.' } },
    { id: 'i-news-article', icon: '06', label: 'Open one news article', meta: 'reading · 90s', category: 'Routine', looking: 'Article view', doing: 'Reading 1 source', interp: { sees: 'Single article, full read. Source: Reuters.', interprets: 'Selective reader. Not a doomscroller.', action: 'Promote Reuters and Bloomberg in news rail. Demote aggregators.' } },
    { id: 'i-skip-orderbook', icon: '07', label: 'Scroll past order book', meta: 'pattern · -', category: 'Disengagement', looking: 'Below order book', doing: 'Skipping past', interp: { sees: 'Order book scrolled past in 14 of 15 sessions.', interprets: 'Level 2 is not part of the routine. Visual noise for this user.', action: 'Demote order book to "More" drawer. Resurface only on volume anomaly events.' } },
    { id: 'i-partial-profit', icon: '08', label: 'Take 50% profit at +1.5%', meta: 'discipline · 4s', category: 'Discipline', looking: 'Order screen', doing: 'Scaling out', interp: { sees: 'Half-position closed at +1.5%. Stop moved to breakeven.', interprets: 'Disciplined scale-out. Lets the runner run risk-free.', action: 'Pre-fill 50% scale-out at +1.5% on next entry. Suggest stop-to-breakeven afterward.' } },
  ],

  advanced: [
    { id: 'a-multi-tf', icon: '01', label: 'Multi-timeframe scan (1m + 5m + 1h)', meta: 'analysis · 40s', category: 'Analysis', looking: '3 frames', doing: 'Scanning frames', interp: { sees: '1m → 5m → 1h sweep in 38s. Same pattern across 4 of last 5 sessions.', interprets: 'Tactical entry routine: looks for alignment across frames before sizing up.', action: 'Build a "multi-frame view" as a one-tap layout. Synchronize crosshairs across frames.' } },
    { id: 'a-cross-spy', icon: '02', label: 'Cross-reference SPY', meta: 'context · 15s', category: 'Analysis', looking: 'SPY chart', doing: 'Correlation check', interp: { sees: 'Switched to SPY for 15s, returned to QQQ. Pattern: every 4-5 QQQ entries.', interprets: 'Confirms broad-market direction before committing to QQQ trade.', action: 'On QQQ chart, surface SPY 5m mini-chart in corner when user lingers near order entry.' } },
    { id: 'a-orderbook-depth', icon: '03', label: 'Read order book depth', meta: 'analysis · 22s', category: 'Analysis', looking: 'Level 2', doing: 'Studying depth', interp: { sees: '22s on order book. Bid stack scrolled. 9th time this week.', interprets: 'Active Level 2 reader. This user wants depth visible by default.', action: 'Promote order book to top of fold. Highlight bid/ask wall changes >2× normal.' } },
    { id: 'a-conditional-order', icon: '04', label: 'Set OCO bracket', meta: 'discipline · 18s', category: 'Discipline', looking: 'Bracket order', doing: 'Configuring OCO', interp: { sees: 'OCO with stop -0.8% and target +2.1%. R/R ratio 2.6.', interprets: 'Pre-defined risk/reward on every entry. No discretion mid-trade.', action: 'Save preset: "default bracket -0.8 / +2.1." Pre-fill on next entry.' } },
    { id: 'a-options-chain', icon: '05', label: 'Open options chain', meta: 'tool · 8s', category: 'Tools', looking: 'Options chain', doing: 'Viewing strikes', interp: { sees: 'Tapped options 3rd time this session. Hovering on weeklies.', interprets: 'Active options trader, weeklies focus.', action: 'Add options chain as a peer tab to Chart, not a sub-menu.' } },
    { id: 'a-pyramid-position', icon: '06', label: 'Add to winning position', meta: 'action · 6s', category: 'Action', looking: 'Order screen', doing: 'Pyramiding', interp: { sees: 'Adding 30% size to a +1.3% winner. Stop trailed up.', interprets: 'Pyramiding strategy. Adds only to winners, never to losers.', action: 'Track this pattern. Eventually offer "auto-trail stop on add" toggle.' } },
    { id: 'a-pre-market-futures', icon: '07', label: 'Check /ES futures', meta: 'routine · 12s', category: 'Routine', looking: '/ES quote', doing: 'Futures check', interp: { sees: '/ES checked 18 sessions in a row at 8:42 ET.', interprets: 'Pre-market futures is a hard-routine input.', action: 'Show /ES quote in header during pre-market hours (4–9:30 ET) only.' } },
    { id: 'a-thursday-exit', icon: '08', label: 'Exit position Thursday 3pm', meta: 'pattern · -', category: 'Pattern', looking: 'Position screen', doing: 'Closing positions', interp: { sees: '11 of 13 swing positions exited Thursday 2:30–3:15 ET.', interprets: 'Avoids Friday gamma / weekend risk. Hard rule.', action: 'Thursday 2:25 ET, surface "open positions: review for exit" card.' } },
  ],

  custom: [],
};

// User avatar SVG components
function UserAvatar({ persona }) {
  const common = (
    <>
      <circle cx="24" cy="14" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M9 33 C9 25, 16 22, 24 22 C32 22, 39 25, 39 33" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </>
  );
  if (persona === 'beginner') {
    return (
      <svg viewBox="0 0 48 38" style={{color: '#9a9a98'}}>
        {common}
        <text x="35" y="11" fontSize="10" fontFamily="IBM Plex Mono" fill="#e8a559" fontWeight="600">?</text>
      </svg>
    );
  }
  if (persona === 'intermediate') {
    return (
      <svg viewBox="0 0 48 38" style={{color: '#b0b0ae'}}>
        {common}
        <polyline points="32,9 35,6 38,8 41,5" fill="none" stroke="#e8a559" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    );
  }
  if (persona === 'advanced') {
    return (
      <svg viewBox="0 0 48 38" style={{color: '#d8d4cc'}}>
        {common}
        <circle cx="34" cy="6" r="1.4" fill="#e8a559"/>
        <circle cx="38" cy="9" r="1.4" fill="#e8a559"/>
        <circle cx="42" cy="6" r="1.4" fill="#e8a559"/>
        <circle cx="38" cy="13" r="1.4" fill="#e8a559"/>
      </svg>
    );
  }
  // custom / placeholder
  return (
    <svg viewBox="0 0 48 38" style={{color: '#5e5f62'}}>
      <circle cx="24" cy="14" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2,2"/>
      <path d="M9 33 C9 25, 16 22, 24 22 C32 22, 39 25, 39 33" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2,2"/>
    </svg>
  );
}

function UserPersonaPanel({ persona, onPersonaChange, currentBehavior, onBehaviorTrigger, onReset }) {
  const p = PERSONAS[persona];
  const behaviors = BEHAVIOR_LIBRARY[persona] || [];

  // Group behaviors by category preserving order
  const byCategory = {};
  const categoryOrder = [];
  behaviors.forEach(b => {
    if (!byCategory[b.category]) {
      byCategory[b.category] = [];
      categoryOrder.push(b.category);
    }
    byCategory[b.category].push(b);
  });

  return (
    <div className="persona-panel">
      <div className="persona-title">User · simulating</div>

      <div className="persona-card">
        <div className={`persona-avatar ${p.placeholder ? 'placeholder' : ''}`}>
          <UserAvatar persona={persona} />
        </div>
        <div className="persona-meta">
          <div className="persona-label">{p.label}</div>
          <div className="persona-name">{p.name}</div>
          <div className="persona-desc">{p.desc}</div>
        </div>
      </div>

      <div className="persona-switcher">
        {Object.values(PERSONAS).map(pp => (
          <button
            key={pp.id}
            className={`persona-tab ${persona === pp.id ? 'active' : ''} ${pp.placeholder ? 'placeholder' : ''}`}
            onClick={() => onPersonaChange(pp.id)}
          >
            {pp.label}
          </button>
        ))}
      </div>

      <div className="live-activity">
        <div className="activity-row">
          <span className="activity-label"><span className="activity-pulse"></span>Looking</span>
          <span className={`activity-value ${!currentBehavior ? 'muted' : ''}`}>
            {currentBehavior ? currentBehavior.looking : 'Waiting for input…'}
          </span>
        </div>
        <div className="activity-row">
          <span className="activity-label">Doing</span>
          <span className={`activity-value ${!currentBehavior ? 'muted' : ''}`}>
            {currentBehavior ? currentBehavior.doing : 'No action yet'}
          </span>
        </div>
        <div className="activity-row">
          <span className="activity-label">Last</span>
          <span className={`activity-value ${!currentBehavior ? 'muted' : ''}`} style={{fontSize: '11px'}}>
            {currentBehavior ? currentBehavior.label : '—'}
          </span>
        </div>
      </div>

      <div className="behavior-library">
        <div className="library-header">
          <span>Behavior library</span>
          <span className="library-header-count">{behaviors.length} actions</span>
        </div>

        {p.placeholder ? (
          <div className="persona-empty">
            <strong>Placeholder</strong>
            Day Trader, Swing Trader, and Algorithmic personas will live here. Each will bring its own behavior library and AI interpretation set.
          </div>
        ) : (
          categoryOrder.map(cat => (
            <div key={cat}>
              <div className="library-category">{cat}</div>
              {byCategory[cat].map(b => (
                <button
                  key={b.id}
                  className={`behavior-card ${currentBehavior?.id === b.id ? 'recent' : ''}`}
                  onClick={() => onBehaviorTrigger(b)}
                >
                  <span className="behavior-icon">{b.icon}</span>
                  <span className="behavior-body">
                    <span className="behavior-label">{b.label}</span>
                    <span className="behavior-meta">{b.meta}</span>
                  </span>
                </button>
              ))}
            </div>
          ))
        )}
      </div>

      <button className="persona-reset" onClick={onReset}>↻ Reset session</button>
    </div>
  );
}

// ====== POST-COCKPIT GUIDED TOUR ======
// Once the scripted cockpit finishes, a minimal tour kicks in: a dim
// overlay cuts a hole around one panel at a time, with a typed caption
// next to it explaining what's happening. Each step also fires a
// shockwave from the previous panel's centre to the new one. Loops.

const POST_TOUR_STEPS = [
  { sel: '.cockpit-profile',  side: 'right', caption: 'Meet Avery — just registered. KYC: ~1y trading, $8K capital, conservative profile.' },
  { sel: '.thought-bubble',   side: 'right', caption: 'Live thought stream. The AI never sees the user\'s face — only the trail of taps and the inner monologue.' },
  { sel: '.phone-wrap',       side: 'left',  caption: 'She taps the chart. The phone registers the gesture and forwards it to the AI on-device.' },
  { sel: '.neural-panel',     side: 'left',  caption: 'The AI processes the event entirely on-device — no cloud, no profile sold.' },
  { sel: '.ai-recognition',   side: 'left',  caption: 'The AI rates a few candidate responses and picks the highest-confidence one. The rest dim.' },
  { sel: '.phone-wrap',       side: 'left',  caption: 'The AI replies back on the phone — explainer, settings, or "stay quiet". The user stays in control.' },
];

function PostCockpitTour({ visible, step, onNext, onClose }) {
  const [pos, setPos] = useState(null);
  const total = POST_TOUR_STEPS.length;
  const cur = POST_TOUR_STEPS[step % total];
  useEffect(() => {
    if (!visible) { setPos(null); return; }
    const update = () => {
      const el = document.querySelector(cur.sel);
      if (!el) { setPos(null); return; }
      const r = el.getBoundingClientRect();
      setPos({ top: r.top, left: r.left, width: r.width, height: r.height });
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [visible, step, cur.sel]);
  if (!visible || !pos) return null;
  const pad = 12;
  const isLast = (step % total) === total - 1;
  return (
    <>
      {/* Dim the rest of the interface — only the spotlight target and
          the caption stay lit. Spotlight has its own giant box-shadow
          mask, but a backing dim layer fills the rest of the screen. */}
      <div className="post-tour-dim" />
      <div
        className="post-tour-spotlight"
        style={{ top: pos.top - pad, left: pos.left - pad, width: pos.width + pad * 2, height: pos.height + pad * 2 }}
      />
      {/* Caption pinned to bottom-centre — fixed position so it never
          jumps between steps; centred in the empty space below the
          panels for easy reading. */}
      <div className="post-tour-caption" key={step}>
        <div className="post-tour-eyebrow">
          <span className="post-tour-dot" />
          Guided overview · {(step % total) + 1} / {total}
        </div>
        <div className="post-tour-text">
          <Typewriter text={cur.caption} speed={22} />
        </div>
        <div className="post-tour-actions">
          <button className="post-tour-skip" onClick={onClose}>Close</button>
          <button className="post-tour-next" onClick={onNext}>
            {isLast ? 'Loop again →' : 'Next →'}
          </button>
        </div>
      </div>
    </>
  );
}


// Sonar burst — a row of right-curving concentric arcs )))) that pulse
// outward from a panel centre. Slow, soft, never competing with the
// typewriter / rating / neural-net animations.
function SonarBurst({ position, delay = 0, tone = 'cyan' }) {
  const left = position === 'left' ? '17%' : position === 'right' ? '83%' : '50%';
  return (
    <span className={`sonar tone-${tone}`} style={{ left, animationDelay: `${delay}s` }}>
      <svg viewBox="-50 -50 100 100" preserveAspectRatio="xMidYMid meet">
        <path className="sonar-arc sonar-arc-1" d="M 0 -34 A 34 34 0 0 1 0 34" />
        <path className="sonar-arc sonar-arc-2" d="M 0 -24 A 24 24 0 0 1 0 24" />
        <path className="sonar-arc sonar-arc-3" d="M 0 -16 A 16 16 0 0 1 0 16" />
      </svg>
    </span>
  );
}


// ====== ACTION FLOW (User → App → AI neural net → App) ======
// A horizontal strip showing the round-trip of every cockpit action:
// the user avatar, the app, a mock-up neural network firing, and the
// app re-receiving the AI's update. Each `pulse` increment fires the
// animation: a "data packet" travels left → right then loops back.

function ActionFlow({ pulse }) {
  return (
    <div className={`flow${pulse > 0 ? ' flow-active' : ''}`} key={pulse}>
      <div className="flow-track">
        {/* Animated packet that travels along the path on each pulse */}
        <span className="flow-packet flow-packet-1" />
        <span className="flow-packet flow-packet-2" />
        <span className="flow-packet flow-packet-3" />

        <div className="flow-node flow-node-user">
          <div className="flow-icon">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="9" r="3.6" stroke="currentColor" strokeWidth="1.8" />
              <path d="M4.5 19.4 C 4.5 14.8, 8.0 13.2, 12 13.2 C 16.0 13.2, 19.5 14.8, 19.5 19.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <div className="flow-label">User</div>
        </div>

        <div className="flow-node flow-node-app">
          <div className="flow-icon">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="6.5" y="3.5" width="11" height="17" rx="2.4" stroke="currentColor" strokeWidth="1.7"/>
              <line x1="6.5" y1="6.6" x2="17.5" y2="6.6" stroke="currentColor" strokeWidth="1.4"/>
              <line x1="9.5" y1="9.4" x2="14.5" y2="9.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="9.5" y1="11.6" x2="14.5" y2="11.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="9.5" y1="13.8" x2="13" y2="13.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="flow-label">App</div>
        </div>

        <div className="flow-node flow-node-ai">
          <div className="flow-icon flow-icon-net">
            <svg viewBox="0 0 60 32" fill="none" aria-hidden="true">
              {/* 3 input — 4 hidden — 2 output mock neural network */}
              {/* connections drawn first */}
              {[3, 16, 29].map((iy, i) => [4, 12, 20, 28].map((hy, j) => (
                <line key={'a'+i+j} x1={6} y1={iy} x2={26} y2={hy} stroke="currentColor" strokeWidth="0.55" opacity="0.45" />
              )))}
              {[4, 12, 20, 28].map((hy, j) => [10, 22].map((oy, k) => (
                <line key={'b'+j+k} x1={26} y1={hy} x2={48} y2={oy} stroke="currentColor" strokeWidth="0.55" opacity="0.45" />
              )))}
              {/* nodes */}
              {[3, 16, 29].map((y, i) => <circle key={'i'+i} className={`net-node net-i-${i}`} cx={6} cy={y} r={2.2} fill="currentColor" />)}
              {[4, 12, 20, 28].map((y, j) => <circle key={'h'+j} className={`net-node net-h-${j}`} cx={26} cy={y} r={2.2} fill="currentColor" />)}
              {[10, 22].map((y, k) => <circle key={'o'+k} className={`net-node net-o-${k}`} cx={48} cy={y} r={2.4} fill="currentColor" />)}
            </svg>
          </div>
          <div className="flow-label">AI</div>
        </div>

        <div className="flow-node flow-node-update">
          <div className="flow-icon">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="6.5" y="3.5" width="11" height="17" rx="2.4" stroke="currentColor" strokeWidth="1.7"/>
              <path d="M9 13 L11.2 15 L15.5 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flow-label">UI</div>
        </div>
      </div>
      <div className="flow-caption">
        <span>Action</span>
        <span className="flow-arrow">→</span>
        <span>Interface</span>
        <span className="flow-arrow">→</span>
        <span>On-device AI</span>
        <span className="flow-arrow">↩</span>
        <span>Adaptive UI</span>
      </div>
    </div>
  );
}

// ====== ORDER PANEL (advanced order types) ======
// Beginner-first: Market and Limit are the two big buttons, advanced
// types tucked behind a chip so they don't overwhelm a new client.

const ORDER_TYPES_BASIC = [
  { id: 'market',  label: 'Market',  hint: 'Fill at the best price now.' },
  { id: 'limit',   label: 'Limit',   hint: 'Only fill at your price or better.' },
];
const ORDER_TYPES_ADVANCED = [
  { id: 'stop',         label: 'Stop',          hint: 'Trigger a market order when price hits a level.' },
  { id: 'stop-limit',   label: 'Stop-Limit',    hint: 'Trigger a limit order when price hits a level.' },
  { id: 'oco',          label: 'OCO',           hint: 'Two orders, one cancels the other.' },
  { id: 'bracket',      label: 'Bracket',       hint: 'Entry + take-profit + stop-loss in one ticket.' },
  { id: 'trailing',     label: 'Trailing Stop', hint: 'Stop that follows price by a fixed offset.' },
  { id: 'conditional',  label: 'Conditional',   hint: 'Fires only if a condition holds.' },
];

function OrderPanel({ open, onClose, currentPrice }) {
  const [side, setSide] = useState('buy');
  const [type, setType] = useState('market');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [qty, setQty] = useState('10');
  const [limitPx, setLimitPx] = useState((currentPrice ?? 670).toFixed(2));
  const [stopPx, setStopPx] = useState(((currentPrice ?? 670) * 0.99).toFixed(2));
  const [tpPx, setTpPx]     = useState(((currentPrice ?? 670) * 1.02).toFixed(2));
  const [tif, setTif]       = useState('DAY');

  if (!open) return null;
  const allTypes = [...ORDER_TYPES_BASIC, ...ORDER_TYPES_ADVANCED];
  const selected = allTypes.find(t => t.id === type) || ORDER_TYPES_BASIC[0];

  const showLimit  = ['limit', 'stop-limit', 'oco', 'bracket'].includes(type);
  const showStop   = ['stop', 'stop-limit', 'oco', 'trailing', 'conditional'].includes(type);
  const showTP     = ['bracket', 'oco'].includes(type);

  const qtyVal = parseFloat(qty) || 0;
  const px = type === 'market' ? (currentPrice ?? 0)
           : (parseFloat(limitPx) || (currentPrice ?? 0));
  const notional = qtyVal * px;

  return (
    <div className="order-panel" role="dialog" aria-label="Order entry">
      <div className="order-panel-head">
        <div className="order-panel-title">
          <span className="order-panel-eyebrow">Order entry</span>
          <span className="order-panel-symbol">QQQ · {currentPrice?.toFixed(2)}</span>
        </div>
        <button className="order-panel-close" onClick={onClose} aria-label="Close">×</button>
      </div>

      <div className="order-side">
        <button className={`order-side-btn buy${side === 'buy' ? ' active' : ''}`} onClick={() => setSide('buy')}>Buy</button>
        <button className={`order-side-btn sell${side === 'sell' ? ' active' : ''}`} onClick={() => setSide('sell')}>Sell</button>
      </div>

      <div className="order-types">
        <div className="order-types-row">
          {ORDER_TYPES_BASIC.map(t => (
            <button key={t.id} className={`order-type-chip${type === t.id ? ' active' : ''}`} onClick={() => setType(t.id)}>{t.label}</button>
          ))}
          <button className={`order-type-chip more${showAdvanced ? ' active' : ''}`} onClick={() => setShowAdvanced(s => !s)}>
            Advanced {showAdvanced ? '▴' : '▾'}
          </button>
        </div>
        {showAdvanced && (
          <div className="order-types-advanced">
            {ORDER_TYPES_ADVANCED.map(t => (
              <button key={t.id} className={`order-type-chip${type === t.id ? ' active' : ''}`} onClick={() => setType(t.id)}>{t.label}</button>
            ))}
          </div>
        )}
        <div className="order-type-hint">{selected.hint}</div>
      </div>

      <div className="order-fields">
        <div className="order-field">
          <label>Quantity</label>
          <div className="order-input-wrap">
            <input value={qty} onChange={e => setQty(e.target.value)} inputMode="decimal" />
            <span className="order-input-suffix">shares</span>
          </div>
        </div>
        {showLimit && (
          <div className="order-field">
            <label>Limit price</label>
            <div className="order-input-wrap">
              <input value={limitPx} onChange={e => setLimitPx(e.target.value)} inputMode="decimal" />
              <span className="order-input-suffix">USD</span>
            </div>
          </div>
        )}
        {showStop && (
          <div className="order-field">
            <label>{type === 'trailing' ? 'Trail offset' : 'Stop / trigger'}</label>
            <div className="order-input-wrap">
              <input value={stopPx} onChange={e => setStopPx(e.target.value)} inputMode="decimal" />
              <span className="order-input-suffix">{type === 'trailing' ? '%' : 'USD'}</span>
            </div>
          </div>
        )}
        {showTP && (
          <div className="order-field">
            <label>Take-profit</label>
            <div className="order-input-wrap">
              <input value={tpPx} onChange={e => setTpPx(e.target.value)} inputMode="decimal" />
              <span className="order-input-suffix">USD</span>
            </div>
          </div>
        )}
        <div className="order-field">
          <label>Time in force</label>
          <div className="order-tif-row">
            {['DAY', 'GTC', 'IOC', 'FOK'].map(t => (
              <button key={t} className={`order-tif${tif === t ? ' active' : ''}`} onClick={() => setTif(t)}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="order-summary">
        <div className="order-summary-row"><span>Order</span><span className="val">{side === 'buy' ? 'Buy' : 'Sell'} · {selected.label}</span></div>
        <div className="order-summary-row"><span>Estimated notional</span><span className="val">${notional.toFixed(2)}</span></div>
        <div className="order-summary-row"><span>Time in force</span><span className="val">{tif}</span></div>
      </div>

      <div className="order-actions">
        <button className="order-btn ghost" onClick={onClose}>Cancel</button>
        <button className={`order-btn primary ${side}`} onClick={onClose}>
          Preview {side === 'buy' ? 'Buy' : 'Sell'} <span className="arrow">→</span>
        </button>
      </div>

      <div className="order-foot">
        Beginner-friendly defaults · Advanced types stay one tap away
      </div>
    </div>
  );
}

// ====== BEGINNER COCKPIT (BRC mode) ======
// A scripted, beginner-only post-onboarding flow. The user is shown one
// AI-moment at a time; the next card only blobs in once the previous is
// acted on (Save / Skip / Learn / Yes / Hide / etc.). Each card mirrors
// the BRC visual language: white asymmetric corners, eyebrow with cyan
// pulsing dot, italic-accent title, navy pill primary button.

// Random gender-neutral name pool — picked once per session.
const RT_NAME_POOL = [
  { name: 'Riley Park',     initials: 'RP' },
  { name: 'Avery Kim',      initials: 'AK' },
  { name: 'Jordan Lee',     initials: 'JL' },
  { name: 'Morgan Chen',    initials: 'MC' },
  { name: 'Casey Rivera',   initials: 'CR' },
  { name: 'Quinn Tran',     initials: 'QT' },
  { name: 'Reese Patel',    initials: 'RP' },
  { name: 'Hayden Wong',    initials: 'HW' },
  { name: 'Skyler Yang',    initials: 'SY' },
  { name: 'Sage Anderson',  initials: 'SA' },
];
const RT_PICKED_USER = RT_NAME_POOL[Math.floor(Math.random() * RT_NAME_POOL.length)];

const BEGINNER_PROFILE = {
  name: RT_PICKED_USER.name,
  initials: RT_PICKED_USER.initials,
  status: 'Just registered · Today',
  experience: '1 year',
  capital: '$8,000 USD',
  risk: 'Conservative',
  horizon: 'Long-term · Learning',
};

// Neutral avatar — abstract identity mark with monogram. No gendered cues.
function NeutralAvatar({ initials = 'RP' }) {
  return (
    <div className="neutral-avatar" aria-hidden="true">
      <svg viewBox="0 0 64 64">
        <defs>
          <linearGradient id="avatarBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"  stopColor="#1F5C99"/>
            <stop offset="100%" stopColor="#0A2D52"/>
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="url(#avatarBg)"/>
        {/* Concentric arc — abstract identity mark, no human features */}
        <path d="M14 36 A 18 18 0 0 1 50 36" stroke="rgba(111,183,218,0.45)" strokeWidth="1.4" fill="none"/>
        <circle cx="32" cy="32" r="22" stroke="rgba(111,183,218,0.20)" strokeWidth="0.8" fill="none"/>
      </svg>
      <span className="neutral-avatar-monogram">{initials}</span>
    </div>
  );
}

// Name reveal animation — "New user" scrambles slowly into the target name
function FlashingName({ start = 'New user', target = BEGINNER_PROFILE.name, durationMs = 3200 }) {
  const [text, setText] = useState(start);
  useEffect(() => {
    const totalFrames = Math.round(durationMs / 90);
    let frame = 0;
    const len = Math.max(start.length, target.length);
    const id = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      if (frame >= totalFrames) {
        setText(target);
        clearInterval(id);
        return;
      }
      const reveal = Math.floor(progress * target.length);
      const out = Array.from({ length: target.length }, (_, i) => {
        if (i < reveal) return target[i];
        if (target[i] === ' ') return ' ';
        // a mix of letters from start + random alphabet flicker
        const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        return pool[Math.floor(Math.random() * pool.length)];
      }).join('');
      setText(out);
    }, 90);
    return () => clearInterval(id);
  }, [start, target, durationMs]);
  return <span className="flashing-name">{text}</span>;
}

const COCKPIT_SCRIPT = [
  {
    id: 'arrive',
    eyebrow: '00 · The user just signed in',
    thought: 'New app… let me see what\'s on the home screen.',
    title: <>She's <span className="accent">looking around the chart</span> for the first time.</>,
    body: <>A new client. Conservative profile, $8K to invest, ~12 months of casual trading on another app.</>,
    actions: [
      { id: 'continue', label: 'Watch her trade', primary: true },
    ],
  },
  {
    id: 'bollinger',
    eyebrow: '01 · She tapped the chart',
    thought: 'What is that band hugging the price?',
    title: <>She just tapped the <span className="accent">Bollinger Band.</span></>,
    body: <>From KYC: 1y trading, $8K capital, conservative — beginner. The AI wants to explain BOLL but checks first.</>,
    actions: [
      { id: 'learn', label: 'Learn more' },
      { id: 'save', label: 'Save', primary: true },
      { id: 'skip', label: 'Skip', skip: true },
    ],
  },
  {
    id: 'ohlc-offer',
    eyebrow: '02 · She tapped the 24h high',
    thought: 'Yesterday\'s extremes might matter — where exactly did price stop?',
    title: <>Want <span className="accent">yesterday's open, close, high and low</span> drawn on the chart?</>,
    body: <>Prior-day OHLC behaves like natural support / resistance.</>,
    actions: [
      { id: 'draw', label: 'Yes, draw it', primary: true },
      { id: 'skip', label: 'Not now', skip: true },
    ],
  },
  {
    id: 'header-cleanup',
    eyebrow: '03 · Cleaning up the header',
    thought: 'Now those high/low numbers up top feel redundant.',
    title: <>The high and low are <span className="accent">already on the chart now.</span></>,
    body: <>The header chips and the dashed levels say the same thing. I can hide the duplicates.</>,
    actions: [
      { id: 'hide', label: 'Hide them', primary: true },
      { id: 'keep', label: 'Keep both' },
      { id: 'skip', label: 'Later', skip: true },
    ],
  },
  {
    id: 'volume',
    eyebrow: '04 · She tapped a volume bar',
    thought: 'How heavily are people actually trading this?',
    title: <>That's <span className="accent">volume</span> — how many shares changed hands.</>,
    body: <>Spikes mean conviction; quiet candles reverse easily.</>,
    actions: [
      { id: 'learn', label: 'Learn more' },
      { id: 'save', label: 'Save', primary: true },
      { id: 'skip', label: 'Skip', skip: true },
    ],
  },
  {
    id: 'orderbook-demote',
    eyebrow: '05 · Five sessions in, the AI adapts',
    thought: 'I\'ve never used the order book — why is it in my face?',
    title: <>She's ignored the order book in <span className="accent">every session so far.</span></>,
    body: <>The AI proposes moving it under a "More" drawer.</>,
    actions: [
      { id: 'move', label: 'Move it', primary: true },
      { id: 'keep', label: "Keep it visible" },
    ],
  },
  {
    id: 'order-types',
    eyebrow: '06 · She tapped Trade for the first time',
    thought: 'I want to place my first trade. Don\'t overwhelm me.',
    title: <>Beginner-friendly <span className="accent">order entry,</span> with advanced types tucked one tap away.</>,
    body: <>Market and Limit are right there. Stop, OCO, Bracket and Trailing-Stop sit under Advanced.</>,
    actions: [
      { id: 'open', label: 'Open order panel', primary: true },
      { id: 'skip', label: 'Skip', skip: true },
    ],
  },
  {
    id: 'hands-on',
    eyebrow: '07 · Take it from here',
    thought: 'Let me poke around for myself.',
    title: <>Click any panel — the AI <span className="accent">keeps watching, quietly.</span></>,
    body: <>Switch days. Open the order entry. Tap a different indicator. Each new tap fills another trait on the left, and the AI re-rates its next response.</>,
    actions: [
      { id: 'explore', label: 'Start exploring', primary: true },
    ],
  },
];

// Thought bubble that types out the user's current internal thought.
function ThoughtBubble({ thought, stepKey }) {
  return (
    <div className="thought-bubble" key={stepKey}>
      <div className="thought-eyebrow">
        <span className="thought-dot" />She's thinking
      </div>
      <div className="thought-text">
        <Typewriter text={thought || ''} speed={26} />
      </div>
    </div>
  );
}

// Trait map — a small box attached to the bottom of the profile card,
// visualising the traits the AI is filling in as it watches the user.
const TRAIT_DEFS = [
  { id: 'patience',    name: 'Patience',         color: '#6FB7DA' },
  { id: 'risk',        name: 'Risk discipline',  color: '#84C6A2' },
  { id: 'conviction',  name: 'Conviction',       color: '#16A8A0' },
  { id: 'follow',      name: 'Follow-through',   color: '#a989d6' },
];
function TraitMap() {
  const [scores, setScores] = useState([0.18, 0.10, 0.05, 0.08]);
  useEffect(() => {
    const id = setInterval(() => {
      setScores(prev => prev.map(s => Math.min(0.92, s + Math.random() * 0.025)));
    }, 950);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="trait-map">
      <div className="trait-map-eyebrow">
        <span className="trait-map-dot" />
        Trait map · filling in
      </div>
      <div className="trait-map-rows">
        {TRAIT_DEFS.map((t, i) => (
          <div key={t.id} className="trait-row">
            <span className="trait-name">{t.name}</span>
            <div className="trait-bar">
              <div className="trait-fill" style={{ width: `${scores[i] * 100}%`, background: t.color }} />
            </div>
            <span className="trait-score">{Math.round(scores[i] * 100)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CockpitProfile() {
  return (
    <div className="cockpit-profile">
      <div className="cockpit-profile-head">
        <div className="cockpit-avatar"><NeutralAvatar initials={BEGINNER_PROFILE.initials} /></div>
        <div className="cockpit-bio">
          <div className="cockpit-name"><FlashingName /></div>
          <div className="cockpit-status">
            <span className="cockpit-status-dot" />{BEGINNER_PROFILE.status}
          </div>
        </div>
      </div>
      <div className="cockpit-stats">
        <div className="cockpit-stat-row"><span>Experience</span><span className="val">{BEGINNER_PROFILE.experience}</span></div>
        <div className="cockpit-stat-row"><span>Capital</span><span className="val">{BEGINNER_PROFILE.capital}</span></div>
        <div className="cockpit-stat-row"><span>Risk profile</span><span className="val">{BEGINNER_PROFILE.risk}</span></div>
        <div className="cockpit-stat-row"><span>Horizon</span><span className="val">{BEGINNER_PROFILE.horizon}</span></div>
      </div>
    </div>
  );
}

function CockpitStep({ step, index, isCurrent, isDone, onAction }) {
  const cornerAlt = index % 2 === 1;
  return (
    <div className={`cockpit-step${cornerAlt ? ' alt' : ''}${isDone ? ' done' : ''}${isCurrent ? ' current' : ''}`}>
      <div className="cockpit-step-eyebrow">{step.eyebrow}</div>
      <div className="cockpit-step-title">{step.title}</div>
      <div className="cockpit-step-body">{step.body}</div>
      {!isDone && (
        <div className="cockpit-step-actions">
          {step.actions.map(a => (
            <button
              key={a.id}
              className={`cockpit-btn${a.primary ? ' primary' : ''}${a.skip ? ' skip' : ''}`}
              onClick={() => onAction(a.id)}
            >
              {a.label}{a.primary ? <span className="arrow"> →</span> : null}
            </button>
          ))}
        </div>
      )}
      {isDone && (
        <div className="cockpit-step-done">
          <span className="cockpit-step-done-mark">✓</span> Saved to AI memory
        </div>
      )}
    </div>
  );
}

// Live typewriter — types `text` one char at a time, then calls onDone.
function Typewriter({ text, speed = 22, onDone }) {
  const [out, setOut] = useState('');
  useEffect(() => {
    setOut('');
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        if (onDone) setTimeout(onDone, 60);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return <span>{out}<span className="typewriter-caret">▍</span></span>;
}

function plainText(node) {
  if (node == null) return '';
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(plainText).join('');
  if (node.props && node.props.children !== undefined) return plainText(node.props.children);
  return '';
}

function BeginnerCockpit({ stepIndex, doneIds, onAction, onStepEnter, flowPulse, onAdvance }) {
  // Refs so live-tick re-renders of App (which recreate these handlers
  // every render) don't keep wiping our timeouts.
  const onActionRef = useRef(onAction);
  const onStepEnterRef = useRef(onStepEnter);
  useEffect(() => { onActionRef.current = onAction; });
  useEffect(() => { onStepEnterRef.current = onStepEnter; });

  // OBSERVATION — fire as soon as a step enters so the AI panel
  // (Recognition card, neural net) updates immediately. Decision-side
  // effects still happen inside onAction (auto-advance).
  useEffect(() => {
    if (onStepEnterRef.current) onStepEnterRef.current(COCKPIT_SCRIPT[stepIndex]);
  }, [stepIndex]);

  // Auto-advance ~5.8s after the step enters. Fires for the last step too
  // so its decision side-effect lands and the post-cockpit tour can detect
  // the script has finished (Math.min caps cockpitStep at the last index).
  useEffect(() => {
    const id = setTimeout(() => {
      const cur = COCKPIT_SCRIPT[stepIndex];
      const primary = (cur.actions || []).find(a => a.primary) || (cur.actions || [])[0];
      if (primary && onActionRef.current) onActionRef.current(cur, primary.id);
    }, 5800);
    return () => clearTimeout(id);
  }, [stepIndex]);

  const current = COCKPIT_SCRIPT[stepIndex];

  return (
    <div className="cockpit">
      <CockpitProfile />
      <TraitMap />
      <ThoughtBubble thought={current?.thought} stepKey={stepIndex} />
    </div>
  );
}

// ====== TOUR ======
const TOUR_STEPS = [
  { type: 'welcome' },
  {
    type: 'centered',
    step: '01 · The problem',
    title: <>Most trading apps show <span className="accent">everything to everyone.</span></>,
    body: <>A beginner sees the same wall of indicators, depth charts and order types as a 10-year veteran.</>,
  },
  {
    type: 'centered',
    step: '02 · The idea',
    title: <>What if the app <span className="accent">learned what you actually use?</span></>,
    body: <>Quiet, on-device AI that watches each tap, scroll and hover — then recommends the next tool, indicator or order type that's actually worth surfacing.</>,
  },
  {
    type: 'highlight',
    target: 'controls',
    step: '03 · The user',
    title: <>No labels, no buckets — <span className="accent">a trait map that fills itself in.</span></>,
    body: <>Forget beginner / intermediate / advanced. The AI quietly fills in the traits a successful trader has — patience, risk discipline, conviction, follow-through — and prompts the user to develop the ones still missing.</>,
  },
  {
    type: 'highlight',
    target: 'phone',
    step: '04 · The screen',
    title: <>Watch the user <span className="accent">click around her phone.</span></>,
    body: <>Every tap, hover, scroll and skip is visible. The phone reflects exactly what she's doing right now — no replay, no lag.</>,
  },
  {
    type: 'highlight',
    target: 'aiPanel',
    step: '05 · The AI',
    title: <>Watch as AI <span className="accent">learns from her behaviour.</span></>,
    body: <>One sentence at a time: <strong>sees → interprets → acts</strong>. Everything stays on the device.</>,
  },
  {
    type: 'highlight',
    target: 'daySelector',
    step: '06 · Time',
    title: <>See how user and AI <span className="accent">grow together over time.</span></>,
    body: <>Day 1, the screen is loud. Day 30, she has a track record. Day 90, the AI is teaching her covered calls.</>,
  },
  {
    type: 'final',
    step: '07 · Your turn',
    title: <>Watch a guided run of <span className="accent">how the whole loop works.</span></>,
    body: <>The avatar settles into a name. The AI starts narrating in real time. The interface adapts in front of you. <strong>Day 1 → Day 30 → Day 90, in three minutes.</strong></>,
  },
];

// Welcome backdrop — an oversized 3D-tilted phone mockup running a live
// ticking chart, positioned partly off-screen so only ~half is visible.
// Navy tint and a radial vignette keep the welcome card readable.
function WelcomeBackdrop() {
  const [bars, setBars] = useState(() =>
    Array.from({ length: 28 }, () => ({ h: Math.random() * 0.7 + 0.2, up: Math.random() > 0.45 }))
  );
  const [px, setPx] = useState(672.85);
  useEffect(() => {
    const id = setInterval(() => {
      setBars(prev => {
        const next = [...prev.slice(1)];
        next.push({ h: Math.random() * 0.7 + 0.2, up: Math.random() > 0.45 });
        return next;
      });
      setPx(p => +(p + (Math.random() - 0.45) * 1.2).toFixed(2));
    }, 360);
    return () => clearInterval(id);
  }, []);
  const high = Math.max(...bars.map(b => b.h));
  // Jumping P/L on the left — flickers/jumps as if a trader's running tally
  const [pl, setPl]    = useState(1284.50);
  const [plPct, setPp] = useState(2.41);
  useEffect(() => {
    const id = setInterval(() => {
      setPl(p   => +(p   + (Math.random() - 0.45) * 18).toFixed(2));
      setPp(p   => +(p   + (Math.random() - 0.45) * 0.18).toFixed(2));
    }, 480);
    return () => clearInterval(id);
  }, []);
  const plUp = pl >= 0;
  return (
    <div className="welcome-backdrop" aria-hidden="true">
      {/* Jumping P/L tile on the left — blurred, tilted, mirrors the phone */}
      <div className="welcome-bg-pl">
        <div className="welcome-bg-pl-eyebrow">P/L · session</div>
        <div className={`welcome-bg-pl-value ${plUp ? 'up' : 'down'}`}>
          {plUp ? '+' : '−'}${Math.abs(pl).toFixed(2)}
        </div>
        <div className={`welcome-bg-pl-meta ${plUp ? 'up' : 'down'}`}>
          {plPct >= 0 ? '▲' : '▼'} {Math.abs(plPct).toFixed(2)}%
        </div>
        <div className="welcome-bg-pl-spark">
          <svg viewBox="0 0 100 24" preserveAspectRatio="none">
            {bars.slice(-12).map((b, i) => {
              const x = i * (100 / 12) + 4;
              const w = (100 / 12) * 0.6;
              const h = b.h * 18 + 2;
              return <rect key={i} x={x - w/2} y={24 - h} width={w} height={h} fill={b.up ? '#16A8A0' : '#d56e6e'} opacity="0.9"/>;
            })}
          </svg>
        </div>
      </div>

      <div className="welcome-bg-phone-3d">
        <div className="welcome-bg-phone-frame">
          <div className="welcome-bg-phone-notch" />
          <div className="welcome-bg-phone-screen">
            <div className="welcome-bg-phone-status">
              <span>9:41</span>
              <span className="welcome-bg-phone-statusicons">●●●● ▼ 100%</span>
            </div>
            <div className="welcome-bg-phone-symbol">← QQQ <span>ETF ▼</span></div>
            <div className="welcome-bg-phone-price">{px.toFixed(2)} <span className="up">▲ 0.42%</span></div>
            <div className="welcome-bg-phone-tf">
              <span>1m</span><span>15m</span><span>1h</span><span className="active">5m</span><span>1D</span>
            </div>
            <div className="welcome-bg-phone-chart">
              <svg viewBox="0 0 200 110" preserveAspectRatio="none">
                {/* horizontal grid */}
                {[0.25, 0.5, 0.75].map((r, i) => (
                  <line key={i} x1={0} x2={200} y1={110 * r} y2={110 * r}
                        stroke="rgba(111,183,218,0.10)" strokeWidth="0.4" strokeDasharray="2,3"/>
                ))}
                {/* candles */}
                {bars.map((b, i) => {
                  const x = (i + 0.5) * (200 / bars.length);
                  const w = (200 / bars.length) * 0.62;
                  const h = (b.h / high) * 90 + 6;
                  return (
                    <g key={i}>
                      <line x1={x} x2={x} y1={108 - h - 4} y2={108 - h * 0.4} stroke={b.up ? '#16A8A0' : '#d56e6e'} strokeWidth="0.6"/>
                      <rect x={x - w / 2} y={108 - h} width={w} height={h * 0.7}
                            fill={b.up ? '#16A8A0' : '#d56e6e'} opacity="0.92"/>
                    </g>
                  );
                })}
              </svg>
            </div>
            <div className="welcome-bg-phone-vol">
              <svg viewBox="0 0 200 24" preserveAspectRatio="none">
                {bars.map((b, i) => {
                  const x = (i + 0.5) * (200 / bars.length);
                  const w = (200 / bars.length) * 0.62;
                  const h = b.h * 22;
                  return (
                    <rect key={i} x={x - w / 2} y={24 - h} width={w} height={h}
                          fill={b.up ? '#16A8A0' : '#d56e6e'} opacity="0.55"/>
                  );
                })}
              </svg>
            </div>
            <div className="welcome-bg-phone-trade">Trade</div>
          </div>
        </div>
      </div>
      <div className="welcome-backdrop-tint" />
      <div className="welcome-backdrop-vignette" />
    </div>
  );
}

function Tour({ step, refs, onNext, onPrev, onSkip, onClose }) {
  const [pos, setPos] = useState(null);
  const stepData = TOUR_STEPS[step];

  useEffect(() => {
    if (!stepData || stepData.type === 'welcome' || stepData.type === 'final') {
      setPos(null);
      return;
    }
    const ref = refs[stepData.target];
    if (!ref?.current) return;

    const calc = () => {
      const rect = ref.current.getBoundingClientRect();
      setPos({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    };
    calc();
    window.addEventListener('resize', calc);
    window.addEventListener('scroll', calc, true);
    return () => {
      window.removeEventListener('resize', calc);
      window.removeEventListener('scroll', calc, true);
    };
  }, [step, refs, stepData]);

  if (!stepData) return null;

  // Progress dots reflect non-welcome steps (so the welcome screen has none yet).
  const progressTotal = TOUR_STEPS.length - 1;
  const progressIndex = step - 1;
  const progressDots = (
    <div className="tour-progress">
      {Array.from({ length: progressTotal }).map((_, i) => (
        <div key={i} className={`tour-dot ${i === progressIndex ? 'active' : ''}`} />
      ))}
    </div>
  );

  if (stepData.type === 'welcome') {
    return (
      <div className="tour-welcome" key={step}>
        <WelcomeBackdrop />
        <div className="tour-welcome-card">
          <div className="tour-welcome-greeting">
            <span className="greeting-line tour-reveal tour-reveal-1">
              <span className="greeting-dot" />
              <span className="greeting-part">Welcome</span>
            </span>
            <span className="greeting-part greeting-part-second tour-reveal tour-reveal-2">UI/UX Concept Demo</span>
          </div>
          <h1 className="tour-welcome-title tour-reveal tour-reveal-3">
            A trading app that reinvents new-user onboarding <span className="accent">— and grows with you.</span>
          </h1>
          <div className="tour-welcome-credit tour-reveal tour-reveal-4">
            <div className="credit-name">Ruilin Yuan</div>
            <div className="credit-role">
              <span className="credit-label">Candidacy</span>
              <span className="credit-value">Director, Digital Design · RBC</span>
            </div>
          </div>
          <p className="tour-welcome-body tour-reveal tour-reveal-5">
            An interactive prototype. Watches what each user actually reaches for, then quietly reshapes the interface around them — <strong>beginner today, expert in ninety days.</strong>
          </p>
          <div className="tour-card-actions tour-reveal tour-reveal-6" style={{borderTop: 0, paddingTop: 0}}>
            <button className="tour-btn-skip" onClick={onSkip}>Skip</button>
            <button className="tour-btn tour-btn-primary" onClick={onNext}>Begin <span className="arrow">→</span></button>
          </div>
        </div>
      </div>
    );
  }

  if (stepData.type === 'centered' || stepData.type === 'final') {
    const isFinal = stepData.type === 'final';
    // Alternating asymmetric corners — even-numbered narrative steps flip the rounding direction
    const altCorners = step % 2 === 0;
    return (
      <>
        <div className="tour-overlay-dim" />
        <div className="tour-card-floating-centered" key={step}>
          <div className={`tour-card-centered${altCorners ? ' alt' : ''}`}>
            <div className="tour-card-step tour-reveal tour-reveal-1">{stepData.step}</div>
            <h2 className="tour-card-title tour-reveal tour-reveal-2">{stepData.title}</h2>
            <div className="tour-card-body tour-reveal tour-reveal-3">{stepData.body}</div>
            <div className="tour-card-actions tour-reveal tour-reveal-4">
              {progressDots}
              <div className="tour-buttons">
                <button className="tour-btn-skip" onClick={onSkip}>Skip</button>
                <button className="tour-btn tour-btn-secondary" onClick={onPrev}>Back</button>
                <button className="tour-btn tour-btn-primary" onClick={isFinal ? onClose : onNext}>
                  {isFinal ? 'Start exploring →' : 'Next →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!pos) return null;

  return (
    <>
      <div className="tour-overlay">
        <div
          className="tour-spotlight"
          style={{
            top: pos.top - 10,
            left: pos.left - 10,
            width: pos.width + 20,
            height: pos.height + 20,
          }}
        />
      </div>
      <div className="tour-card-floating" key={step}>
        <div className="tour-card-step tour-reveal tour-reveal-1">{stepData.step}</div>
        <h2 className="tour-card-title tour-reveal tour-reveal-2">{stepData.title}</h2>
        <div className="tour-card-body tour-reveal tour-reveal-3">{stepData.body}</div>
        <div className="tour-card-actions tour-reveal tour-reveal-4">
          {progressDots}
          <div className="tour-buttons">
            <button className="tour-btn-skip" onClick={onSkip}>Skip</button>
            <button className="tour-btn tour-btn-secondary" onClick={onPrev}>Back</button>
            <button className="tour-btn tour-btn-primary" onClick={onNext}>
              {step === TOUR_STEPS.length - 2 ? 'Finish' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ====== MAIN ======
export default function App() {
  const [day, setDay] = useState(1);
  const [candles, setCandles] = useState(() => generateInitialCandles());
  const [prevPrice, setPrevPrice] = useState(INITIAL_PRICE);
  const [activeIndicators, setActiveIndicators] = useState([]);
  const [sectionDwell, setSectionDwell] = useState({ chart: 0, indicators: 0, orderbook: 0, news: 0 });
  const [indicatorTaps, setIndicatorTaps] = useState({});
  const [ignoredOrderBook, setIgnoredOrderBook] = useState(false);
  const [marketEvent, setMarketEvent] = useState(false);
  const [synced, setSynced] = useState(false);
  const [showFriction, setShowFriction] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [tickCount, setTickCount] = useState(0);
  const [tourStep, setTourStep] = useState(0); // 0 = welcome, 1-4 highlight, 5 = final, -1 = closed
  const [persona, setPersona] = useState('beginner');
  const [currentBehavior, setCurrentBehavior] = useState(null);

  // ── Beginner Cockpit (BRC mode) ──────────────────────────────
  const [mode, setMode] = useState(() => {
    try { return localStorage.getItem('rt-mode') || 'cockpit'; } catch { return 'cockpit'; }
  });
  useEffect(() => {
    try { localStorage.setItem('rt-mode', mode); } catch {}
  }, [mode]);
  const [cockpitStep, setCockpitStep] = useState(0);
  const [cockpitDone, setCockpitDone] = useState([]);
  const [ohlcLevels, setOhlcLevels] = useState(null);
  const [hideHeaderHL, setHideHeaderHL] = useState(false);
  const [flowPulse, setFlowPulse] = useState(0); // increments each action — fires the action-flow neural-net animation
  const [orderPanelOpen, setOrderPanelOpen] = useState(false);

  // After the AI recognition rating settles (~3s after step entry), reveal an
  // on-phone guide overlay tailored to the current step. Currently only fires
  // for Bollinger; extend the map as more guides are scripted.
  const [aiGuideStep, setAiGuideStep] = useState(null);
  // Post-onboarding tour state — kicks in after the cockpit script finishes.
  const [postTourActive, setPostTourActive] = useState(false);
  const [postTourStep, setPostTourStep] = useState(0);
  useEffect(() => {
    const lastIdx = COCKPIT_SCRIPT.length - 1;
    const lastId = COCKPIT_SCRIPT[lastIdx]?.id;
    const finished = mode === 'cockpit' && cockpitStep >= lastIdx && cockpitDone.includes(lastId);
    if (!finished) { setPostTourActive(false); return; }
    const startId = setTimeout(() => setPostTourActive(true), 1800);
    return () => clearTimeout(startId);
  }, [mode, cockpitStep, cockpitDone]);
  // Manual-advance only — user clicks Next on the caption pop-up.
  useEffect(() => {
    const stepWithGuide = ['bollinger']; // hold off on volume — too soon to push another guide
    const cur = COCKPIT_SCRIPT[cockpitStep]?.id;
    if (mode !== 'cockpit' || !stepWithGuide.includes(cur)) {
      setAiGuideStep(null);
      return;
    }
    setAiGuideStep(null);
    const id = setTimeout(() => setAiGuideStep(cur), 3000);
    return () => clearTimeout(id);
  }, [cockpitStep, mode]);

  // OBSERVATION — runs the moment a step enters. Updates AI panel
  // recognition, neural-net firing state, and any "what the user just did"
  // hints on the phone (Bollinger active, Volume active, etc.). Mirrors the
  // user's action without the AI's decision yet.
  const handleStepEnter = (step) => {
    if (!step) return;
    const obs = (label, sees, interprets, action) => {
      const base = (BEHAVIOR_LIBRARY.beginner || []).find(x => x.id === 'b-tap-candle') || {};
      setCurrentBehavior({ ...base, id: `cockpit-${step.id}`, label, meta: 'observed · live', interp: { sees, interprets, action } });
    };
    switch (step.id) {
      case 'arrive':
        setCurrentBehavior(null);
        break;
      case 'bollinger':
        setActiveIndicators(prev => prev.includes('BOLL') ? prev : [...prev, 'BOLL']);
        setIndicatorTaps(t => ({ ...t, BOLL: (t.BOLL || 0) + 1 }));
        obs('Tapped Bollinger band',
          'User tapped a chart overlay element (Bollinger).',
          'Curious about indicators. Doesn\'t know what BOLL stands for yet.',
          'Offer a one-line explainer — but ask consent first.');
        break;
      case 'ohlc-offer':
        obs('Tapped 24h high',
          'User tapped a non-interactive header chip (24h high).',
          'She\'s anchoring to yesterday\'s extremes — interest in horizontal levels.',
          'Offer to draw prior-day OHLC as dashed levels on the chart.');
        break;
      case 'header-cleanup':
        obs('Same number, two places',
          'OHLC levels are now drawn on chart; header still shows duplicate H/L.',
          'Header chips no longer carry new information for her.',
          'Suggest hiding the duplicates to reclaim header space.');
        break;
      case 'volume':
        setActiveIndicators(prev => prev.includes('VOL') ? prev : [...prev, 'VOL']);
        obs('Tapped a volume bar',
          'User tapped the volume sub-panel for the first time.',
          'Looking for conviction signals on the candles she\'s reading.',
          'Offer a one-line explainer of what the bar height + colour mean.');
        break;
      case 'orderbook-demote':
        obs('Skipped order book × 5 sessions',
          'Order book scrolled past in 5 of 5 sessions.',
          'Level-2 isn\'t part of her routine — visual noise.',
          'Demote OB into a "More" drawer; resurface only on volume anomalies.');
        break;
      case 'order-types':
        obs('Tapped Trade for the first time',
          'User tapped the Trade button.',
          'Beginner placing first ticket — easy to overwhelm.',
          'Show Market + Limit primary, hide advanced types behind one tap.');
        break;
      default:
        break;
    }
  };

  // DECISION — runs when an action is clicked or auto-advance fires.
  // Applies the AI's response (drawing, hiding, demoting, opening), bumps
  // the flow pulse, and steps the script forward.
  const handleCockpitAction = (step, actionId) => {
    setCockpitDone(d => d.includes(step.id) ? d : [...d, step.id]);
    setFlowPulse(p => p + 1);
    if (step.id === 'order-types' && actionId === 'open') {
      setOrderPanelOpen(true);
    }
    if (step.id === 'ohlc-offer' && actionId === 'draw') {
      const highs = candles.map(c => c.high);
      const lows = candles.map(c => c.low);
      const cHigh = Math.max(...highs);
      const cLow = Math.min(...lows);
      const span = cHigh - cLow;
      setOhlcLevels([
        { label: 'High',  value: cHigh - span * 0.06 },
        { label: 'Close', value: cHigh - span * 0.30 },
        { label: 'Open',  value: cLow  + span * 0.30 },
        { label: 'Low',   value: cLow  + span * 0.06 },
      ]);
      setSectionDwell(s => ({ ...s, chart: s.chart + 12 }));
    }
    if (step.id === 'header-cleanup' && actionId === 'hide') {
      setHideHeaderHL(true);
    }
    if (step.id === 'orderbook-demote' && actionId === 'move') {
      setIgnoredOrderBook(true);
    }
    setCockpitStep(s => Math.min(s + 1, COCKPIT_SCRIPT.length - 1));
  };

  const resetCockpit = () => {
    setCockpitStep(0);
    setCockpitDone([]);
    setOhlcLevels(null);
    setHideHeaderHL(false);
    setActiveIndicators([]);
    setIgnoredOrderBook(false);
    setIndicatorTaps({});
    setCurrentBehavior(null);
    setOrderPanelOpen(false);
    setFlowPulse(p => p + 1);
  };

  const phoneRef = useRef(null);
  const aiPanelRef = useRef(null);
  const daySelectorRef = useRef(null);
  const controlsRef = useRef(null);
  const tourRefs = { phone: phoneRef, aiPanel: aiPanelRef, daySelector: daySelectorRef, controls: controlsRef };

  // Live tick simulation - new candle every 3s
  useEffect(() => {
    const id = setInterval(() => {
      setCandles(prev => {
        const next = generateNextCandle(prev[prev.length - 1]);
        setPrevPrice(prev[prev.length - 1].close);
        return [...prev.slice(1), next];
      });
      setTickCount(t => t + 1);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const currentPrice = candles[candles.length - 1].close;

  const handleDayChange = (newDay) => {
    setDay(newDay);
    setSectionDwell({ chart: 0, indicators: 0, orderbook: 0, news: 0 });
    setActiveIndicators([]);
    setIndicatorTaps({});
    setMarketEvent(false);
    setShowFriction(false);
    if (newDay >= 7) setIgnoredOrderBook(true);
    else setIgnoredOrderBook(false);
  };

  const action = (type) => {
    switch(type) {
      case 'chart':
        setSectionDwell(s => ({...s, chart: s.chart + 30}));
        break;
      case 'rsi':
        setActiveIndicators(prev => prev.includes('RSI') ? prev : [...prev, 'RSI']);
        setIndicatorTaps(t => ({...t, RSI: (t.RSI||0)+1}));
        setSectionDwell(s => ({...s, indicators: s.indicators + 18}));
        break;
      case 'boll':
        setActiveIndicators(prev => prev.includes('BOLL') ? prev : [...prev, 'BOLL']);
        setIndicatorTaps(t => ({...t, BOLL: (t.BOLL||0)+1}));
        setSectionDwell(s => ({...s, indicators: s.indicators + 22}));
        break;
      case 'skip-ob':
        setIgnoredOrderBook(true);
        break;
      case 'wait':
        setSectionDwell(s => ({...s, chart: s.chart + 45}));
        break;
      case 'trade':
        if (day >= 30) setShowFriction(true);
        break;
      case 'event':
        setMarketEvent(true);
        break;
    }
  };

  const reset = () => {
    setActiveIndicators([]);
    setSectionDwell({ chart: 0, indicators: 0, orderbook: 0, news: 0 });
    setIndicatorTaps({});
    setMarketEvent(false);
    setShowFriction(false);
    setIgnoredOrderBook(day >= 7);
  };

  return (
    <div className="rt-root">
      <style>{STYLES}</style>

      {tourStep >= 0 && (
        <Tour
          step={tourStep}
          refs={tourRefs}
          onNext={() => setTourStep(s => (s + 1 < TOUR_STEPS.length ? s + 1 : -1))}
          onPrev={() => setTourStep(s => Math.max(0, s - 1))}
          onSkip={() => setTourStep(-1)}
          onClose={() => setTourStep(-1)}
        />
      )}

      <div className="rt-header">
        <div className="rt-brand">
          <div>
            <div className="rt-title-en">
              R-Trade <span className="rt-title-cn" style={{fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', color: 'var(--panel-muted)', letterSpacing: '0.04em', fontWeight: 400}}>· adaptive interface</span>
            </div>
          </div>
        </div>
        <div className="header-tools">
          <button className="tour-restart" onClick={() => setTourStep(0)}>↻ Replay tour</button>
          <div className="mode-toggle" role="tablist" aria-label="View mode">
            <button
              className={`mode-toggle-btn${mode === 'classic' ? ' active' : ''}`}
              onClick={() => setMode('classic')}
              role="tab"
            >Classic</button>
            <button
              className={`mode-toggle-btn${mode === 'cockpit' ? ' active' : ''}`}
              onClick={() => setMode('cockpit')}
              role="tab"
            >Beginner Cockpit</button>
          </div>
        </div>
      </div>

      {/* Post-cockpit guided tour overlay */}
      <PostCockpitTour
        visible={mode === 'cockpit' && postTourActive}
        step={postTourStep}
        onNext={() => { setPostTourStep(s => s + 1); setFlowPulse(p => p + 1); }}
        onClose={() => { setPostTourActive(false); }}
      />

      {/* Sonar wave — a soft set of right-curving arcs ))))) emit from
          each panel in slow sequence. Subtle on purpose — won't compete
          with the typewriter / rating / neural-net animations. */}
      {mode === 'cockpit' && (
        <div className="rt-wave" key={flowPulse} aria-hidden="true">
          <SonarBurst position="left"   delay={0} />
          <SonarBurst position="middle" delay={1.6} />
          <SonarBurst position="right"  delay={3.2} tone="sage" />
        </div>
      )}

      <div className={`rt-stage${mode === 'cockpit' ? ' rt-stage--cockpit' : ''}`}>
        <div ref={controlsRef}>
          {mode === 'cockpit' ? (
            <BeginnerCockpit
              stepIndex={cockpitStep}
              doneIds={cockpitDone}
              onAction={handleCockpitAction}
              onStepEnter={handleStepEnter}
              flowPulse={flowPulse}
            />
          ) : (
          <UserPersonaPanel
            persona={persona}
            onPersonaChange={(p) => {
              setPersona(p);
              setCurrentBehavior(null);
              reset();
            }}
            currentBehavior={currentBehavior}
            onBehaviorTrigger={(b) => {
              setCurrentBehavior(b);
              // Map behavior to existing simulation actions for phone state
              if (b.id === 'b-ask-rsi' || b.id === 'i-rsi-vol') {
                setActiveIndicators(prev => prev.includes('RSI') ? prev : [...prev, 'RSI']);
                setIndicatorTaps(t => ({...t, RSI: (t.RSI||0)+1}));
                setSectionDwell(s => ({...s, indicators: s.indicators + 18}));
              }
              if (b.id === 'i-rsi-vol') {
                setActiveIndicators(prev => prev.includes('VOL') ? prev : [...prev, 'VOL']);
              }
              if (b.id === 'b-view-price' || b.id === 'b-tap-candle' || b.id === 'a-multi-tf') {
                setSectionDwell(s => ({...s, chart: s.chart + 30}));
              }
              if (b.id === 'b-watch-news' || b.id === 'i-news-article') {
                setSectionDwell(s => ({...s, news: s.news + 60}));
              }
              if (b.id === 'i-skip-orderbook') {
                setIgnoredOrderBook(true);
              }
              if (b.id === 'a-orderbook-depth') {
                setSectionDwell(s => ({...s, orderbook: s.orderbook + 22}));
              }
              if (b.id === 'b-panic-sell' || b.id === 'b-hover-buy') {
                if (day >= 30) setShowFriction(true);
              }
            }}
            onReset={() => {
              reset();
              setCurrentBehavior(null);
            }}
          />
          )}

          {mode === 'cockpit' && (
            <button className="cockpit-reset" onClick={resetCockpit}>↻ Restart guided run</button>
          )}

        </div>

        <div className="phone-wrap" ref={phoneRef}>
          <OrderPanel open={orderPanelOpen} onClose={() => setOrderPanelOpen(false)} currentPrice={currentPrice} />
          <PhoneScreen
            day={day}
            candles={candles}
            currentPrice={currentPrice}
            prevPrice={prevPrice}
            activeIndicators={activeIndicators}
            marketEvent={marketEvent}
            ignoredOrderBook={ignoredOrderBook}
            showFriction={showFriction}
            showAIModal={showAIModal}
            ohlcLevels={ohlcLevels}
            hideHeaderHL={hideHeaderHL}
            currentStepId={mode === 'cockpit' ? COCKPIT_SCRIPT[cockpitStep]?.id : null}
            aiGuideStep={aiGuideStep}
            onTrade={() => {
              if (day >= 30 && !showFriction) setShowFriction(true);
              else setShowFriction(false);
            }}
            onAIClick={() => setShowAIModal(true)}
            onCloseAI={() => setShowAIModal(false)}
            onTickerSwitch={() => {
              const b = BEHAVIOR_LIBRARY.beginner.find(x => x.id === 'b-switch-rusa');
              if (b) {
                setCurrentBehavior(b);
                setSectionDwell(s => ({...s, chart: s.chart + 6}));
                setPersona('beginner');
              }
            }}
          />
          <div className="day-selector-wrap day-selector-below" ref={daySelectorRef}>
            <div className="day-label">Simulate AI maturity</div>
            <div className="day-selector">
              {[1, 30, 90].map(d => (
                <button key={d} className={day === d ? 'active' : ''} onClick={() => handleDayChange(d)}>
                  Day {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div ref={aiPanelRef}>
          <AIPanel
            day={day}
            sectionDwell={sectionDwell}
            indicatorTaps={indicatorTaps}
            marketEvent={marketEvent}
            ignoredOrderBook={ignoredOrderBook}
            synced={synced}
            onToggleSync={() => setSynced(s => !s)}
            candles={candles}
            currentBehavior={currentBehavior}
            persona={persona}
          />
        </div>
      </div>
    </div>
  );
}
