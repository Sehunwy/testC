import {
  TableColumn,
  TableRenderCreateElementData,
  TableRenderCreateElementResult,
  TableColumnRenderParams
} from "iview";

type HCol = (
  el?: string | object | Function,
  data?:
    | string
    | TableRenderCreateElementData
    | TableRenderCreateElementResult
    | TableRenderCreateElementResult[],
  vnode?: string | TableRenderCreateElementResult[]
) => TableRenderCreateElementResult;

export { HCol };
export * from "iview";
