export interface IStudent {
  Id: number;
  Name: string;
}

export let someOne: { stu: IStudent };

class Student implements IStudent {
  public Id: number;
  public Name: string;
}

export namespace Test {
  export let stu: IStudent = new Student();
}

// let stu = new Student();
// stu.Id = 5;

export default IStudent;
