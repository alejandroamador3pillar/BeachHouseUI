import { Component, OnInit } from '@angular/core';
//import { SeasonsService } from 'src/app/services/service.index';
import { ISeasonModel } from '../../models/season.model';
import { SocialUser } from 'lib';
import {MatSnackBar} from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { SeasonsService } from 'src/app/services/seasons/seasons.service';

const SEASON_SCHEMA = {
  "id": "Number",
  "descriptionSeason": "Text",
  "typeseason": "Number",
  "startdate": "date",
  "enddate": "date",
  "ACTIVE": "Boolean"
}





@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})
export class SeasonsComponent implements OnInit {
  seasons: ISeasonModel[] = [];
  season: ISeasonModel;
   displayedColumns: string[] = ['descriptionSeason', 'startdate', 'enddate', '$$edit'];
  durationInSeconds = 5;
  dataSchema = SEASON_SCHEMA;
  loading = true;

  constructor(private seasonsService: SeasonsService) { }

  ngOnInit(): void {
    this.getSeasons();
  }

  getSeasons(): void {
    this.seasonsService.getSeasons()
      .subscribe(parameters => {this.seasons = parameters;
      this.loading = false;});
  }

  setSeason(season: ISeasonModel): void{

   // season.updated_by = "103205611098648087343";//pending to add current user
    //console.log(parameter);

    this.seasonsService.setSeasons(season)
    .subscribe((data) => {
        console.log(data);
        this.openSnackBar(data);
        return true;
    },
    (error) => {
      console.log(error);
      this.openSnackBar(error);
      this.season = null;
      //return of();
      return false;
    });
  } 

  openSnackBar(data: any) {
    /* this.snackBar.openFromComponent(ParametersComponent, {
      duration: this.durationInSeconds * 1000,
    }); */
  }

  /* getUsers(): void {
    this.parametersService.getUsers()
      .subscribe(users => this.users = users);
  }
 */

}
