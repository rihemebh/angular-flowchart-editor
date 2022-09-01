import {Node} from './Node.model';

export class Edge{
  private _id: number;
  // tslint:disable-next-line:variable-name
  private _value = '';
  modifiable = false;
  private _length: number;
  private _angle: number;
  private _center = {x: 0, y: 0};
  private _nodes: Array<Node>;


  constructor(id: number, value: string, nodes: Array<Node>) {
    this._id = id;
    this._value = value;
    this._nodes = nodes;
  }

  get id(): number {
    return this._id;
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }

  get length(): number {
    return this._length;
  }

  set length(value: number) {
    this._length = value;
  }

  get angle(): number {
    return this._angle;
  }

  set angle(value: number) {
    this._angle = value;
  }

  get center(): { x: number; y: number } {
    return this._center;
  }

  set center(value: { x: number; y: number }) {
    this._center = value;
  }

  get nodes(): Array<Node> {
    return this._nodes;
  }

  set nodes(value: Array<Node>) {
    this._nodes = value;
  }
}
