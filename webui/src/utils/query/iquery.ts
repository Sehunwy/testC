export interface IQuery {
  logic: "" | "and" | "or";
  and(query: IQuery): IQuery;
  or(query: IQuery): IQuery;
}

export interface IQueryBlock extends IQuery {
  blocks: IQuery[];
}

export interface ICondition extends IQuery {
  operator?: "gt" | "ge" | "eq" | "lt" | "le" | "ne" | "match";
  prop?: string;
  value?: any;
}
