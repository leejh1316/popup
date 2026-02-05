# popup

팝업, 툴팁, 드롭다운 메뉴 등의 요소를 기준 요소(Reference)에 맞춰 자동으로 배치해주는 라이브러리입니다.

## 특징

- **12가지 위치 지원**: 상하좌우 및 각 모서리를 포함한 다양한 배치 옵션.
- **자동 위치 조정 (`auto` mode)**: 화면 밖으로 벗어날 경우 자동으로 최적의 위치를 찾아 재배치.
- **스크롤 및 리사이즈 감지**: 윈도우 스크롤이나 크기 변경 시 위치 자동 업데이트.
- **옵션**: 간격(gap), 이벤트 감지 설정 등 제어 가능.

## 설치 (Installation)

```bash
npm install @leejaehyeok/popup

```

## 사용 방법 (Usage)

### 기본 사용법 (Basic Example)

```html
<!-- 기준 요소 (Reference) -->
<div id="reference">기준 요소 (Ref)</div>

<!-- 팝업 요소 (Popup) -->
<div id="popup">
  <h3>Popup Title</h3>
  <p>생성된 팝업입니다.</p>
</div>

<script>
  const reference = document.querySelector("#reference");
  const popup = document.querySelector("#popup");

  const myPopup = createPopup(reference, popup, {
    placement: "left-top",
    mode: {
      auto: true,
    },
    gap: 12,
  });
</script>
```

## API

### `createPopup(reference, popup, options)`

팝업 인스턴스를 생성하는 함수입니다.

- **Parameters**
  - `reference`: `HTMLElement` - 팝업의 기준이 되는 요소.
  - `popup`: `HTMLElement` - 배치될 팝업 요소.
  - `options`: `Options` (Optional) - 설정 옵션 객체.
- **Returns**: `Popup` 인스턴스

### `Popup` Methods

- **`setOptions(options: Options)`**: 생성 후 옵션을 동적으로 변경하고 위치를 업데이트합니다.
  ```typescript
  popupInstance.setOptions({ placement: "top", gap: 20 });
  ```
  w

### 설정 옵션 (`Options`)

```typescript
interface Options {
  placement?: Placement;
  gap?: number;
  mode?: Mode;
  event?: Event;
}
```

#### 1. `placement` (Default: `'right-top'`)

팝업이 기준 요소의 어디에 위치할지 결정합니다.

| 분류       | 옵션 값                                 | 설명                                |
| ---------- | --------------------------------------- | ----------------------------------- |
| **Top**    | `top`, `top-left`, `top-right`          | 위쪽 (중앙/왼쪽 정렬/오른쪽 정렬)   |
| **Bottom** | `bottom`, `bottom-left`, `bottom-right` | 아래쪽 (중앙/왼쪽 정렬/오른쪽 정렬) |
| **Left**   | `left`, `left-top`, `left-bottom`       | 왼쪽 (중앙/위쪽 정렬/아래쪽 정렬)   |
| **Right**  | `right`, `right-top`, `right-bottom`    | 오른쪽 (중앙/위쪽 정렬/아래쪽 정렬) |

#### 2. `gap` (Default: `10`)

기준 요소(Reference)와 팝업 요소(Popup) 사이의 간격(px)을 설정합니다.

#### 3. `mode`

팝업의 동작 모드를 설정합니다.

```typescript
interface Mode {
  auto?: boolean; // 화면 밖으로 벗어날 경우 여유 공간으로 자동 배치 (Default: true)
}
```

#### 4. `event`

위치 업데이트를 트리거할 이벤트를 설정합니다.

```typescript
interface Event {
  resize?: boolean; // 윈도우 크기 변경 시 업데이트 (Default: true)
  scroll?: boolean; // 스크롤 시 업데이트 (Default: true)
}
```
