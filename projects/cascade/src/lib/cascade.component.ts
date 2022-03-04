import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {cascadeJs} from '../assets/cascade'
const json = [
  {
    id: '1',
    name: '壹',
    subgroup: [
      {
        id: '1.1',
        name: '壹壹',
      },
      {
        id: '1.2',
        name: '壹贰',
        subgroup: [
          {
            id: '1.2.1',
            name: '壹贰壹',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: '贰',
  },
  {
    id: '3',
    name: '叁',
    subgroup: [
      {
        id: '3.1',
        name: '叁壹',
        subgroup: [
          {
            id: '3.1.1',
            name: '叁壹壹',
          },
        ],
      },
      {
        id: '3.2',
        name: '叁贰',
        subgroup: [
          {
            id: '3.2.1',
            name: '叁贰壹',
          },
          {
            id: '3.2.2',
            name: '叁贰贰',
            subgroup: [
              {
                id: '3.2.2.1',
                name: '叁贰贰壹',
              },
            ],
          },
        ],
      },
    ],
  },
];

@Component({
  selector: 'yh-cascade',
  template: `
    <div id="cascade-wrap" (click)="onChange()"></div>
  `,
  styles: [
    `
      #cascade-wrap {
        width: 733px;
        height: 244px;
        background: #31385A;
        box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.5);
        border-radius: 4px;
        border: 1px solid #3E4A88;
        margin-top: 40px;
        color: #fff;
      }

      ::ng-deep .cascade {
        display: flex;
        /*height: calc(100% - 50px);*/
        height: calc(100%);
        flex-direction: row;
        justify-content: flex-start;
        user-select: none;
      }

      .cascade > div {
        width: 100px;
      }

      ::ng-deep .cascade > div .item:hover {
        border-radius: 2px;
        border: 1px solid rgba(255, 255, 255, 0.24);
      }

      /* 包含子项添加右尖括号当做指针 */
      ::ng-deep .cascade .subgroup {
        position: relative;
      }

      ::ng-deep .cascade .subgroup:after {
        content: '>';
        display: block;
        position: absolute;
        top: 0;
        right: 20px;
      }

      /* 当前选中项 */
      ::ng-deep .cascade .item.checked {
        color: red;
      }

      ::ng-deep .layoutBox {
        height: 100%;
        border-top: 1px solid rgba(255, 255, 255, 0.13);
        border-right: 1px solid rgba(255, 255, 255, 0.13);
        overflow: auto;
      }

      ::ng-deep .item {
        height: 26px;
        margin: 10px 18px;
      }

    `
  ]
})
export class CascadeComponent implements OnInit {
  @Input() options: any;
  @Output() outer = new EventEmitter<any>();  //选择节点事件
  yhCascade: any;

  constructor() {
  }

  ngOnInit(): void {
    if(!this.yhCascade){
      this.yhCascade = cascadeJs(json, 'cascade-wrap');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.options) {
      this.yhCascade = cascadeJs(this.options, 'cascade-wrap');
    }
  }

  onChange() {
    if (this.options) {
      this.outer.emit(this.yhCascade.getCurrentValue());
    }
  }

}
