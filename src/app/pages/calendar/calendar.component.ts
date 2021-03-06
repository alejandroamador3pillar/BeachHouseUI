import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, Inject } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, addMonths, intervalToDuration } from 'date-fns';
import { Observable, Subject, forkJoin } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, } from 'angular-calendar';
import { CalendarService, ReserveService, UsersService } from 'src/app/services/service.index';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ParametersService } from '../../services/parameters/parameters.service';
import { IParameterModel } from '../../models/parameter.model';
import { IReservationModel } from '../../models/reservation.model';
import { SocialAuthService, SocialUser } from 'lib';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUserModel } from 'src/app/models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

const colors: any = {
  reserved: {
    primary: '#7B7B7B', //'#363636',
    secondary: '#7B7B7B',
  },
  enable: {
    primary: '#D24DFF',
    secondary: '#D24DFF',
  },
  owned: {
    primary: '#D24DFF',
    secondary: '#D24DFF',
  },
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./calendar.component.css'],
  templateUrl: './calendar.component.html',
})
export class CalendarComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  parameters: IParameterModel[] = [];

  view: CalendarView = CalendarView.Month;
  today: number = Date.now();
  clear: boolean = false;
  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;

  checkIn: any = "";
  checkOut: any = "";
  clearVisible: boolean = false;
  errorDescrption: string = "";
  nights: number = 0;
  static calendar;

  constructor(private modal: NgbModal, private calendarService: CalendarService, public dialog: MatDialog,
    private parametersService: ParametersService, private _snackBar: MatSnackBar) {
    CalendarComponent.calendar = this;
  }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      // if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0 ) {
      this.activeDayIsOpen = false;
      this.clear = false;


      if (this.checkIn !== "") {
        this.checkOut = date;
        console.log('second: ' + this.checkOut); //Validate days
        this.reservePopUp();
        /* if(this.validateReservation()){
          console.log("Date error")
        }
        else{
          this.errorPopUp(this.errorDescrption);
        } */
      }
      else {
        this.checkIn = date;
        this.clearVisible = true;
        console.log('first: ' + this.checkIn);//Apply style
      }
      /* } else {
        this.activeDayIsOpen = false;
        this.clear =true;
      } */
      this.viewDate = date;
    }
  }

  eventTimesChanged({ event, newStart, newEnd, }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(event: CalendarEvent): void {
    this.events = [
      ...this.events,
      event,
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  getReservations(start: string, end: string): void {
    // this.calendarService.getReservations()
    // .subscribe(reservations => this.reservations = reservations);
  }

  getAvailableDates(month: number, year: number): void {
    /*  this.calendarService.getAvailableDates(month, year)
       .subscribe(availableDates => this.availableDates = availableDates);
  */

    /* this.calendarService.getAvailableDates(month, year).then((dias: ReserveComponent[]) => {
      console.log(`Fetched ${dias.length} dates.`)
    }); */
    //this.availableDates.push();
    //.subscribe(availableDates => this.availableDates = availableDates);
  }

  ngOnInit(): void {
    this.setDates();
    this.getParameters();
  }

  setDates(): void {

    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var currentMonth = month;

    const dates = {
      month0: null,
      month1: null,
      month2: null,
      month3: null,
      month4: null,
      month5: null
    };

    let newEvent: CalendarEvent;

    for (let i = month, j = 0; i < (month + 6); i++, j++) {

      var currentYear = year;
      if (i == 13) {
        currentMonth = 1;
        year + 1;
      }

      dates[`month${j}`] = this.calendarService.getAvailableDates(currentMonth, year);
      currentMonth++;
    }

    forkJoin(dates).subscribe(arrayOfData => {
      const months = Object.keys(arrayOfData);

      for (let j = 0; j < months.length; j++) {
        const monthsData = arrayOfData[months[j]] as IReservationModel[];

        for (let k = 0; k < monthsData.length; k++) {
          //if ( new Date(monthsData[k].date).toLocaleString() >=  new Date().toLocaleString()){

          if (monthsData[k].available) {
            /* newEvent =
                        {
                          title: 'Day Enable to Reserve',
                          start: startOfDay(new Date(monthsData[k].date)),
                          end: endOfDay(new Date(monthsData[k].date)),
                          color: colors.enable,
                          draggable: false,
                          resizable: {
                            beforeStart: true,
                            afterEnd: true,
                          }}; */
          }
          else {
            newEvent =
            {
              title: 'Day Reserved',
              start: startOfDay(new Date(monthsData[k].date)),
              end: endOfDay(new Date(monthsData[k].date)),
              color: colors.reserved,
              draggable: false,
              //cssClass:
              resizable: {
                beforeStart: true,
                afterEnd: true,
              }
            };
            this.addEvent(newEvent);
          }

          //}
        }
      }
    });
  }

  cancelPopUp(): void {


    this.dialog.open(DialogData, {
      data: {
        title: 'Reservation'
      }
    });
  }

  reservePopUp(): void {

    this.nights = intervalToDuration({ start: new Date(this.checkIn), end: new Date(this.checkOut) }).days;

    this.dialog.open(DialogData, {
      data: {
        title: 'Confirm your reservation',
        description: "",
        checkIn: new Date(this.checkIn).toUTCString(),// + ' ' + this.parameters[0].value ,
        checkOut: new Date(this.checkOut).toUTCString(),//  + ' ' + this.parameters[1].value ,
        isError: false,
        terms: this.parameters[2].value,
        nights: this.nights,

      }
    });
  }

  errorPopUp(error: string) {
    //You must select at least one night for your reservation. Please change your selection.
    this.dialog.open(DialogData, {
      data: {
        title: 'Error',
        description: error,
        isError: true,
        checkIn: "",
        checkOut: "",
        terms: "",
        nights: 0,
        price: 30 * this.nights,
      }
    });
  }

  clearDates() {
    this.checkIn = "";
    this.checkOut = "";
    this.clearVisible = false;
    this.errorDescrption = "";
    this.nights = 0;
    console.log('first:' + this.checkIn + '  second' + this.checkOut)
    //return to styles
  }

  getParameters(): void {
    this.parametersService.getParameters()
      .subscribe(parameters => this.parameters = parameters);
  }

  validateReservation(): boolean {
    if (isSameDay(this.checkIn, this.checkOut)) {
      this.errorDescrption = "You can't select the check Out the same day as Check In ";
      return false;
    }
    else {
      return true;
    }

  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Dismiss");
    setTimeout(this._snackBar.dismiss.bind(this._snackBar), 5000);
  }

}

///Dialog Data component
@Component({
  selector: 'dialog-data',
  // styleUrls: ['.dialog-data.css'],
  templateUrl: 'dialog-data.html',
})
export class DialogData {
  //Users data
  users: IUserModel[] = [];
  displayedColumns: string[] = ['lastName', 'firstName', 'email'];
  dataSource = new MatTableDataSource<IUserModel>();

  //Everything else
  title: string = "";
  description: string = "";
  isError: boolean = false;
  checkIn: string = "";
  checkOut: string = "";
  nights: number = 0;
  terms: string = "";
  checked = false;
  error: any;
  loading = false;
  user: SocialUser;
  price: number;
  isAdmin: boolean;
  ownRes = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialogRef: MatDialogRef<DialogData>, @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private calendarService: CalendarService, private authService: SocialAuthService, private reserveService: ReserveService,
    private userService: UsersService) {
    this.getUserData();
    this.getPrice();
  }
  close(): void {
    this.description = "";
    CalendarComponent.calendar.events = [];
    CalendarComponent.calendar.setDates();
    this.dialogRef.close();
  }

  getUsers(): void {
    this.userService.getUsers(this.user.id)
      .subscribe(users => {
        this.users = users;
        this.loading = false;
        this.dataSource = new MatTableDataSource<IUserModel>(this.users);
        this.dataSource.paginator = this.paginator;
      });
    console.log(this.users);
  }

  getPrice() {
    this.reserveService.getPrice(new Date(this.data.checkIn), this.data.nights).subscribe(price => { this.price = price });
  }

  getUserData() {
    this.authService.authState.subscribe(user => {
      this.user = user;
      this.userService.isAdmin(user.id).subscribe(valid => {
        if (valid == 200) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      },
        error => { this.isAdmin = false; console.log(error.error) })
    });
  }

  setReservation() {
    console.log(this.data);
    this.loading = true;
    this.calendarService.setReservation(this.data, this.user.id)
      .subscribe(x => {
        this.description = x;
        this.loading = false;
        CalendarComponent.calendar.openSnackBar("Success");
      },
        error => {
          this.error = error.error;
          this.loading = false;
          CalendarComponent.calendar.openSnackBar(error.error);
        });

    this.close();
  }
}
