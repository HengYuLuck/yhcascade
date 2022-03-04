import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'yhCascade';
  mockGroup = [
    {
      "id": 1,
      "parent_id": null,
      "name": "sgroup",
      "NodeNumber": 2,
      "Threats": 105,
      "level": 1,
      "Servers": 3,
      "disconnectedTotal": 1,
      "subgroup": [
        {
          "id": 3,
          "parent_id": 1,
          "name": "secgroup",
          "NodeNumber": 1,
          "Threats": 105,
          "level": 2,
          "Servers": 2,
          "disconnectedTotal": 0
        }
      ]
    },
    {
      "id": 2,
      "parent_id": null,
      "name": "fgroup",
      "NodeNumber": 0,
      "Threats": 1,
      "level": 1,
      "Servers": 1,
      "disconnectedTotal": 0,
      "subgroup": [
        {
          "id": 4,
          "parent_id": 2,
          "name": "testgroup",
          "NodeNumber": 1,
          "Threats": 1,
          "level": 2,
          "Servers": 1,
          "disconnectedTotal": 0
        }
      ]
    }
  ];

  onChange(event: any) {
    console.log(event);
  }
}
