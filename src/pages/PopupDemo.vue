<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { createPopup, Popup } from "../lib/popup";
import type { Placement } from "../lib/popup/types/options";

// All placements
const placements: Placement[] = [
  "top",
  "top-left",
  "top-right",
  "bottom",
  "bottom-left",
  "bottom-right",
  "left",
  "left-top",
  "left-bottom",
  "right",
  "right-top",
  "right-bottom",
];

// Current selected placement
const currentPlacement = ref<Placement>("bottom");

const autoMode = ref(false);

// Popup instance
let popupInstance = ref<Popup | null>(null);

function changePlacement(placement: Placement) {
  currentPlacement.value = placement;
  if (popupInstance.value) {
    popupInstance.value.setOptions({
      placement: placement,
      gap: 12,
    });
  }
}

// mode change
watch(autoMode, (newValue) => {
  if (popupInstance.value) {
    popupInstance.value.setOptions({
      mode: { auto: newValue },
    });
  }
});

onMounted(() => {
  const reference = document.querySelector("#main-reference") as HTMLElement;
  const popup = document.querySelector("#main-popup") as HTMLElement;

  if (reference && popup) {
    popupInstance.value = createPopup(reference, popup, {
      placement: currentPlacement.value,
      gap: 12,
      mode: { auto: autoMode.value },
    });
  }
});

onBeforeUnmount(() => {
  // Cleanup
  const popup = document.querySelector("#main-popup");
  if (popup) {
    popup.remove();
  }
});
</script>

<template>
  <div class="demo-page">
    <header class="demo-header">
      <h1>JS 팝업</h1>
      <p>경량 팝업 위치 지정 라이브러리</p>
    </header>

    <!-- Main Demo Section -->
    <section class="demo-section">
      <h2>데모</h2>
      <p class="section-desc">
        현재 위치: <code>{{ currentPlacement }}</code>
      </p>

      <div class="main-demo-area">
        <div id="main-reference" class="reference-box">
          기준 요소
          <div id="main-popup" class="popup-box">
            {{ currentPlacement }}
          </div>
        </div>
      </div>
    </section>

    <!-- Mode  -->
    <section class="demo-section">
      <h2>모드 선택</h2>
      <p class="section-desc">자동 모드 켜기/끄기</p>
      <div>
        <label>
          <input
            type="checkbox"
            v-model="autoMode"
            @change="changePlacement(currentPlacement)"
          />
          자동 모드
        </label>
      </div>
    </section>

    <!-- Placement Selector -->
    <section class="demo-section">
      <h2>위치 선택</h2>
      <p class="section-desc">클릭하여 팝업 위치 변경</p>

      <div class="placement-grid">
        <!-- Top Row -->
        <div class="placement-row">
          <button
            v-for="p in ['top-left', 'top', 'top-right'] as Placement[]"
            :key="p"
            class="placement-btn"
            :class="{ active: currentPlacement === p }"
            @click="changePlacement(p)"
          >
            {{ p }}
          </button>
        </div>

        <!-- Middle Rows -->
        <div class="placement-row middle">
          <button
            v-for="p in ['left-top', 'right-top'] as Placement[]"
            :key="p"
            class="placement-btn"
            :class="{ active: currentPlacement === p }"
            @click="changePlacement(p)"
          >
            {{ p }}
          </button>
        </div>

        <div class="placement-row middle">
          <button
            v-for="p in ['left', 'right'] as Placement[]"
            :key="p"
            class="placement-btn"
            :class="{ active: currentPlacement === p }"
            @click="changePlacement(p)"
          >
            {{ p }}
          </button>
        </div>

        <div class="placement-row middle">
          <button
            v-for="p in ['left-bottom', 'right-bottom'] as Placement[]"
            :key="p"
            class="placement-btn"
            :class="{ active: currentPlacement === p }"
            @click="changePlacement(p)"
          >
            {{ p }}
          </button>
        </div>

        <!-- Bottom Row -->
        <div class="placement-row">
          <button
            v-for="p in [
              'bottom-left',
              'bottom',
              'bottom-right',
            ] as Placement[]"
            :key="p"
            class="placement-btn"
            :class="{ active: currentPlacement === p }"
            @click="changePlacement(p)"
          >
            {{ p }}
          </button>
        </div>
      </div>
    </section>

    <!-- Code Example -->
    <section class="demo-section">
      <h2>사용법</h2>
      <div class="code-block">
        <pre><code>const reference = document.querySelector('#reference')
const popup = document.querySelector('#popup')

const myPopup = createPopup(reference, popup, {
  placement: '{{ currentPlacement }}',
  mode: {
    auto: {{ autoMode }}
  },
  gap: 12
})</code>
    </pre>
      </div>
    </section>

    <!-- Options Section -->
    <section class="demo-section">
      <h2>옵션</h2>
      <div class="options-table">
        <div class="option-row header">
          <span>옵션명</span>
          <span>타입</span>
          <span>기본값</span>
        </div>
        <div class="option-row">
          <span>placement</span>
          <span>Placement</span>
          <span>right-top</span>
        </div>
        <div class="option-row">
          <span>gap</span>
          <span>number</span>
          <span>10</span>
        </div>
        <div class="option-row">
          <span>mode.auto</span>
          <span>boolean</span>
          <span>true</span>
        </div>
        <div class="option-row">
          <span>event.resize</span>
          <span>boolean</span>
          <span>true</span>
        </div>
        <div class="option-row">
          <span>event.scroll</span>
          <span>boolean</span>
          <span>true</span>
        </div>
      </div>
    </section>

    <!-- All Placements Visual -->
    <section class="demo-section">
      <h2>모든 위치 목록</h2>
      <div class="placements-list">
        <span v-for="p in placements" :key="p" class="placement-tag">
          {{ p }}
        </span>
      </div>
    </section>
  </div>
</template>

<style scoped>
.demo-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 24px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.demo-header {
  text-align: center;
  margin-bottom: 60px;
}
.demo-header h1 {
  font-size: 36px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 12px;
}
.demo-header p {
  color: #888;
  font-size: 16px;
}

.demo-section {
  margin-bottom: 56px;
}
.demo-section h2 {
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 8px;
}
.section-desc {
  color: #666;
  font-size: 14px;
  margin-bottom: 24px;
}
.section-desc code {
  background: #222;
  padding: 2px 8px;
  border-radius: 4px;
  color: #a78bfa;
  font-family: "SF Mono", "Monaco", monospace;
}

/* Main Demo Area */
.main-demo-area {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 40px;
  background: #111;
  border-radius: 12px;
  border: 1px solid #222;
}

.reference-box {
  width: 150px;
  height: 150px;
  background-color: #19a1a8;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  position: relative;
}

.popup-box {
  width: 80px;
  height: 40px;
  background-color: #2375ff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 500;
  color: #fff;
}

/* Placement Grid */
.placement-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  padding: 32px;
  background: #111;
  border-radius: 12px;
  border: 1px solid #222;
}
.placement-row {
  display: flex;
  gap: 12px;
}
.placement-row.middle {
  justify-content: space-between;
  width: 100%;
  max-width: 380px;
}
.placement-btn {
  background: #222;
  color: #888;
  border: 1px solid #333;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  min-width: 100px;
}
.placement-btn:hover {
  background: #2a2a2a;
  color: #fff;
  border-color: #444;
}
.placement-btn.active {
  background: #2375ff;
  color: #fff;
  border-color: #2375ff;
}

/* Code Block */
.code-block {
  background: #111;
  border: 1px solid #222;
  border-radius: 10px;
  padding: 20px 24px;
  overflow-x: auto;
}
.code-block pre {
  margin: 0;
}
.code-block code {
  font-family: "SF Mono", "Monaco", "Consolas", monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #e0e0e0;
}

/* Options Table */
.options-table {
  background: #111;
  border: 1px solid #222;
  border-radius: 10px;
  overflow: hidden;
}
.option-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 14px 20px;
  border-bottom: 1px solid #222;
  font-size: 14px;
  color: #ccc;
}
.option-row:last-child {
  border-bottom: none;
}
.option-row.header {
  background: #1a1a1a;
  font-weight: 600;
  color: #fff;
}
.option-row span:first-child {
  font-family: "SF Mono", "Monaco", monospace;
  color: #a78bfa;
}
.option-row.header span:first-child {
  color: #fff;
}

/* Placements List */
.placements-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.placement-tag {
  background: #222;
  color: #888;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-family: "SF Mono", "Monaco", monospace;
}
</style>
