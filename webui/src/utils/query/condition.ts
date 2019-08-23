import { IQuery, IQueryBlock, ICondition } from "./iquery";
import { QueryBlock } from "./queryblock";
export class Condtion implements ICondition {
  [key: string]: any;
  public operator?: "gt" | "ge" | "eq" | "lt" | "le" | "ne" | "match";
  public prop?: string;
  public value?: any;
  public logic: "" | "and" | "or";
  /**
   *
   */
  constructor(
    prop?: string,
    operator?: "gt" | "ge" | "eq" | "lt" | "le" | "ne" | "match",
    value?: any
  ) {
    this.prop = prop;
    this.operator = operator;
    this.value = value;
  }
  public and(query: IQuery): IQuery {
    let block = new QueryBlock();
    block.and(this);
    block.and(query);
    return block;
  }
  public or(query: IQuery): IQuery {
    let block = new QueryBlock();
    block.or(this);
    block.or(query);
    return block;
  }
}
