import "iview";
import { IQueryBlock, IQuery } from "./iquery";

export class QueryBlock implements IQueryBlock {
  /**
   *
   */

  public blocks: IQuery[] = new Array<IQuery>();
  public logic: "and" | "or";
  public and(query: IQuery): IQuery {
    if (this.blocks.length > 0) {
      query.logic = "and";
    }
    this.blocks.push(query);
    return this;
  }
  public or(query: IQuery): IQuery {
    if (this.blocks.length > 0) {
      query.logic = "or";
    }
    this.blocks.push(query);
    return this;
  }
}
// export let Logic: number = 'and' | 'or';

// export class Query implements IQuery {
//   public logic: "and" | "or";
//   public operator: "gt" | "ge" | "eq" | "lt" | "le" | "ne" | "match";
//   public prop: string;
//   public value: any;

//   public and(query: IQueryBlock): IQueryBlock {
//     throw new Error("Method not implemented.");
//   }
//   public or(query: IQueryBlock): IQueryBlock {
//     throw new Error("Method not implemented.");
//   }
// }
