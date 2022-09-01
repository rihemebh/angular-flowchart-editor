import {itemsTypes} from '../itemsTypes.enum';

export class Node {
  id: number;
  xPos: number;
  yPos: number;
  radius: number;
  border: number;
  value = 'ecrire ...';
  type: itemsTypes;
  modifiable = false;
  bg: string;
  constructor(id: number, x: number, y: number, r: number, b: number, value: string, type: itemsTypes, bg){
    this.id = id;
    this.xPos = x;
    this.yPos = y;
    this.radius = r;
    this.border = b;
    this.value = value;
    this.type  = type;
    this.bg = bg;
  }

  getId = () => this.id;
	getX = () => this.xPos;
	getY = () => this.yPos;
	getRadius = () => this.radius;
	getBorder = () => this.border;
  getValue = () => this.value;
  getType = () => this.type;

	getNodeCenterX = () => {
    return this.xPos + this.radius;
  }

	getNodeCenterY = () => {
    return this.yPos + this.radius;
  }

	setX = xPos => {
		this.xPos = xPos;
	}

	setY = yPos => {
		this.yPos = yPos;
	}

	setRadius = radius => {
		this.radius = radius;
	}

  setValue = value => {
    this.value = value;
  }

  setModifiable = () => {
    this.modifiable = !this.modifiable;
  }

}
