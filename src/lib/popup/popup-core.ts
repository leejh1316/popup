import { PlacementStrategy } from "./placement/PlacementStrategy";
import { usePlacement } from "./placement/usePlacement";
import type { Options, Placement } from "./types/index";
import type { Coordinate } from "./types/placement";
import { throttle } from "./util/throttle";

export function createPopup(
  reference: HTMLElement,
  popup: HTMLElement,
  options?: Options,
): Popup {
  return new Popup(reference, popup, options);
}

const defaultGap = 10;
const defaultPlacement: Placement = "right-top";
const defaultOptions: Options = {
  placement: defaultPlacement,
  event: {
    resize: true,
    scroll: true,
  },
  mode: {
    auto: true,
  },
  gap: defaultGap,
};

export class Popup {
  private options: Options;
  private referenceElement: HTMLElement;
  private popupElement: HTMLElement;
  private placementStrategy: PlacementStrategy;
  private defaultCoordinate: Coordinate;
  private originPopupSize: { width: string; height: string };
  //event에 .bind를 하면 새 참조가 만들어짐 이를 받기위한 변수
  private bindModeFunction: any;
  constructor(
    referenceElement: HTMLElement,
    popupElement: HTMLElement,
    options?: Options,
  ) {
    this.options = { ...defaultOptions, ...options };
    this.referenceElement = referenceElement;
    this.popupElement = popupElement;
    this.originPopupSize = (() => {
      const { width, height } = getComputedStyle(popupElement);
      return { width, height };
    })();
    this.bindModeFunction = throttle(this.modeManage.bind(this), 100);
    this.update();
    document.body.insertBefore(this.popupElement, null);
  }
  // 팝업요소 업데이트 함수
  private update(): void {
    this.placementStrategy = usePlacement(
      this.options.placement,
      this.referenceElement.getBoundingClientRect(),
      this.popupElement.getBoundingClientRect(),
      this.options,
    );
    this.defaultCoordinate = this.placementStrategy.getCoordinate();
    this.eventManage();
    this.modeManage();
    this.place(this.defaultCoordinate);
  }
  //옵션 수정 함수
  public setOptions(options: Options) {
    this.options = { ...this.options, ...options };
    this.update();
  }
  // 팝옵요소의 좌표를 지정하는 함수
  private place(coord: Coordinate): void {
    this.popupElement.style.position = "absolute";
    this.popupElement.style.width = this.originPopupSize.width;
    this.popupElement.style.height = this.originPopupSize.height;
    this.popupElement.style.top = `${coord.top}px`;
    this.popupElement.style.left = `${coord.left}px`;
  }
  /* modes */
  private modeManage(): void {
    this.positionUpdate();
    this.auto();
  }

  // 26.02.03 수정 scroll이나 resize로 인한 위치변경시 위치 재조정
  private positionUpdate(): void {
    const place = usePlacement(
      this.options.placement,
      this.referenceElement.getBoundingClientRect(),
      this.popupElement.getBoundingClientRect(),
      this.options,
    );
    this.place(place.getCoordinate());
  }

  private auto(): void {
    if (this.options.mode?.auto) {
      const placementArray: Placement[] = [
        "top",
        "top-right",
        "top-left",
        "right",
        "right-top",
        "right-bottom",
        "bottom",
        "bottom-right",
        "bottom-left",
        "left",
        "left-top",
        "left-bottom",
      ];
      if (this.placementStrategy.checkOverflow()) {
        for (const placement of placementArray) {
          // if (this.placementStrategy.getPlacementName() === placement) continue;
          const place = usePlacement(
            placement,
            this.referenceElement.getBoundingClientRect(),
            this.popupElement.getBoundingClientRect(),
            this.options,
          );
          if (!place.checkOverflow()) {
            this.place(place.getCoordinate());
            break;
          }
        }
      }
    }
  }
  private eventManage(): void {
    if (this.options.event?.resize)
      window.addEventListener("resize", this.bindModeFunction);
    else window.removeEventListener("resize", this.bindModeFunction);
    if (this.options.event?.scroll)
      window.addEventListener("scroll", this.bindModeFunction);
    else window.removeEventListener("scroll", this.bindModeFunction);
  }
}
