import {Component, ElementRef, HostListener, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {Node} from './models/Node.model';
import {Edge} from './models/Edge.model';
import html2canvas from 'html2canvas';
import { itemsTypes } from './itemsTypes.enum';
import {calcEdgeAngle, calcEdgeCenterX, calcEdgeCenterY, calcEdgeLength} from './utilities/edge-functions';


@Component({
  selector: 'app-flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class FlowchartComponent implements OnInit {

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
  }

  url = null;
  index1: number;
  index2: number;
  showIds: boolean;
  nodeClicked: boolean;
  nodes: Node[] = [];
  edges: Edge[] = [];
  displayBounds;
  radius = 25;
  border = 2;
  message: string;
  itemsTypes = itemsTypes;
  clickedId1 = -1;
  clickedId2 = -1;
  edgeId = -1;


  ngOnInit(): void {
    const div = document.getElementById('graph-display');
    this.displayBounds = div.getBoundingClientRect();
    this.showIds = true;
  }


  clickId = (id) => {
    let removed = false;
    this.nodes.map((node) => {
      // tslint:disable-next-line:triple-equals
      if (node.id == id) {
        if (node.bg === '#f2f2f2') {
          node.bg = 'white';
          removed = true;
        } else {
          node.bg = '#f2f2f2';
        }
      }

    });
    if (removed) {
      this.clickedId1 = -1;
      this.clickedId2 = -1;
    } else if (this.clickedId1 === -1) {
      this.clickedId1 = id;
    } else if (this.clickedId2 === -1) {
      this.clickedId2 = id;
    } else {
      this.clickedId1 = id;
      this.clickedId2 = -1;
    }

  }

  removeEdge(edge): void {

    this.edges = this.edges.filter((e) => e !== edge
    );
  }

  clickId2 = (id) => {

    if (this.clickedId1 !== -1) {
      this.clickedId2 = id;
      this.nodes.map((node) => {
        // tslint:disable-next-line:triple-equals
        if (node.id == id) {
          node.bg = '#f2f2f2';
        }

      });
    }
  }

  findCenter(markers): object {
    let lat = 0;
    let lng = 0;

    for (const item of markers) {
      lat += item.lat;
      lng += item.lng;
    }

    lat /= markers.length;
    lng /= markers.length;

    return {x: lat, y: lng};
  }

  newNode(): void {
    const element = document.getElementById('graph-display');
    const x = element.clientWidth / 2;
    const y = element.clientHeight / 2;
    const newNode = new Node(this.nodes.length + 1, x, y, this.radius, this.border, 'ecrire ...', itemsTypes.process, 'white');
    this.nodes.push(newNode);
  }

  newDecisionNode(): void {
    const element = document.getElementById('graph-display');
    const x = element.clientWidth / 2;
    const y = element.clientHeight / 2;
    const newNode = new Node(this.nodes.length + 1, x, y, this.radius, this.border, 'ecrire ...', itemsTypes.decision, 'whitesmoke');
    this.nodes.push(newNode);
  }

  newEndNode(): void {
    const element = document.getElementById('graph-display');

    const x = element.clientWidth / 2;
    const y = element.clientHeight / 2;
    const newNode = new Node(this.nodes.length + 1, x, y, this.radius, this.border, '', itemsTypes.end, 'transparent');
    this.nodes.push(newNode);
  }

  newEdge(): void {
    let node1;
    let node2;
    if (this.clickedId1 === -1 || this.clickedId2 === -1) {
      return;
    }
    // Checks if node at the given index exists
    if (this.nodes[this.clickedId1 - 1]) {
      node1 = this.nodes[this.clickedId1 - 1];
    } else {
      this.message = `Node ${this.clickedId1} doesn't exists.`;
    }

    // Checks if node at the given index exists
    if (this.nodes[this.clickedId2 - 1]) {
      node2 = this.nodes[this.clickedId2 - 1];
    } else {
      this.message = `Node ${this.clickedId2} doesn't exists.`;
    }

    if (node1 === node2) {
      this.message = `You can't set an edge of a node to the node itself.`;
    }

    // If both nodes exists it is checked if the edge between them already exists
    if (node1 && node2 && node1 !== node2) {
      const edgeExists = this.checkIfEdgeExists(node1, node2);

      // If not a new edge is created, otherwise a message is printed
      if (!edgeExists) {
        const edge = new Edge(this.edges.length, '', new Array<Node>(node1, node2));
        this.edges.push(edge);
        this.nodes.map((node) => {
          // tslint:disable-next-line:triple-equals
          if (node.id == this.clickedId1 || node.id == this.clickedId2) {
            if (node.type === itemsTypes.end) {
              node.bg = 'transparent';
            } else {
              node.bg = 'white';
            }
          }

        });
        this.clickedId1 = -1;
        this.clickedId2 = -1;


      } else {
        this.message = `The Edge between node ${node1.getId()} and node ${node2.getId()} already exists.`;
      }
    }
  }

  checkIfEdgeExists = (node1, node2) => {
    for (const edge of this.edges) {
      if (edge[0] === node1 && edge[1] === node2) {
        return true;
      } else if (edge[0] === node2 && edge[1] === node1) {
        return true;
      }
    }
    return false;
  }


  mouseDown(event, node): void {
    const div = document.getElementById('graph-display');
    this.displayBounds = div.getBoundingClientRect();
    const scrollTop = window.pageYOffset || (document.documentElement || document.body).scrollTop;
    const mousemove = this.renderer.listen('document', 'mousemove', (e) => {

      console.log(document.documentElement.scrollWidth, document.documentElement.scrollHeight);
      // console.log(document.body.clientHeight);
      if ((e.clientX - node.getRadius() - node.getBorder()) < this.displayBounds.x) {
        node.setX(this.displayBounds.x);

      } else if ((e.clientX + node.getRadius() + node.getBorder()) > this.displayBounds.x + this.displayBounds.width) {
        node.setX(this.displayBounds.x + this.displayBounds.width - 2 * node.getRadius() - node.getBorder());

      } else {
        node.setX(e.clientX - node.getRadius() - node.getBorder());

      }

      if ((e.clientY - node.getRadius() - node.getBorder()) < this.displayBounds.y) {
        node.setY(this.displayBounds.y + scrollTop);

      } else if ((e.clientY + node.getRadius() + node.getBorder()) > this.displayBounds.y + this.displayBounds.height) {
        node.setY(this.displayBounds.y + this.displayBounds.height - 2 * node.getRadius() - node.getBorder() + scrollTop);

      } else {
        node.setY(Math.abs(e.clientY) - node.getRadius() - node.getBorder() + scrollTop);

      }
      // console.log(`new node : ${node.getX()} , ${node.getY()}`);
    });

    const mouseup = this.renderer.listen('document', 'mouseup', (evt) => {
      mousemove();
    });
  }


  clearMessage(): void {
    this.message = '';
  }

  length(n1, n2): number {
    return Math.floor(calcEdgeLength(n1, n2));
  }

  centerX(n1, n2): number {
    return Math.round(calcEdgeCenterX(n1, n2));
  }

  centerY(n1, n2): number {
    return Math.round(calcEdgeCenterY(n1, n2));
  }

  angle(n1, n2): number {
    return calcEdgeAngle(n1, n2);
  }

  modifier(id: number): void {
    this.nodes.map((node) => {
      // tslint:disable-next-line:triple-equals
      if (node.id == id) {
        node.modifiable = true;
      }
    });

  }

  supprimer(id: number): void {
    this.nodes = this.nodes.filter((node) => node.id !== id);
  }

  delete(): void {
    if (this.clickedId1 !== -1) {
      this.nodes = this.nodes.filter((node) => node.id !== this.clickedId1);
      this.edges = this.edges.filter((edge) => {
        for (let i = 0; i < 2; i++) {
          if (edge.nodes[i].id === this.clickedId1) {
            return false;
          }
        }
        return true;
      });
    } else if (this.edgeId !== -1) {
      this.edges = this.edges.filter((edge) => edge.id !== this.edgeId);
    }
  }

  save(): void {
    /**
     * change it with dom-to image
     * https://github.com/tsayen/dom-to-image
     */
    const screenshotTarget = document.getElementById('graph-display');

    html2canvas(screenshotTarget).then((canvas) => {
      console.log(canvas.toDataURL('image/png'));
      this.url = canvas.toDataURL('image/png');
    });

    this.reset();
  }

  onEnter(id, e): void {
    this.nodes.map((node) => {
      // tslint:disable-next-line:triple-equals
      if (node.id == id) {
        node.value = e.target.value;
        node.modifiable = false;
      }
    });
  }

  changeValue(edge: Edge): void {
    this.edges.map((e) => {
      // tslint:disable-next-line:triple-equals
      if (edge.id == e.id) {
        e.modifiable = !e.modifiable;
      }
    });
  }

  onEdgeEnter(id: number, $event: any): void {
    this.edges.map((e) => {
      if (e.id == id) {
        e.value = $event.target.value;
        e.modifiable = false;
      }
    });
  }

  reset(): void {
    this.nodes = [];
    this.edges = [];
  }

  clickEdgeId(id: number): void {
    this.edgeId = id;
  }

  edit(): void {
    if (this.clickedId1 !== -1) {
      this.nodes.map((node) => {
          if (node.id === this.clickedId1) {
            node.modifiable = !node.modifiable;
          }
          return node;
        }
      );
    }
  }

}
