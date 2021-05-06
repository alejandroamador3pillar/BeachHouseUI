import { Component, OnInit } from '@angular/core';
declare function init_plugins();

@Component({
  selector: 'app-no-page-found',
  templateUrl: './no-page-found.component.html',
  styleUrls: ['./no-page-found.component.css']
})
export class NoPageFoundComponent implements OnInit {
  anio: number = new Date().getFullYear();
  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
