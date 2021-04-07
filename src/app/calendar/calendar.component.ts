import { Component, OnInit ,  ChangeDetectionStrategy,  ViewChild,  TemplateRef, Inject} from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, addMonths} from 'date-fns';
import { Observable, Subject, forkJoin } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView,} from 'angular-calendar';
import { CalendarService} from './calendar.service';
import { ReserveComponent} from '../reserve/reserve.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IReservationModel} from '../domain/ReservationModel';



const colors: any = {  
  reserved: {
    primary: '#363636',
    secondary: '#363636',
  },
  enable: {
    primary: '#D24DFF',
    secondary: '#D24DFF',
  },
  owned :{
    primary: '#D24DFF',
    secondary: '#D24DFF',
  },

};

@Component({
  selector: 'app-calendar',  
  changeDetection: ChangeDetectionStrategy.OnPush,  
  styleUrls: ['./calendar.component.css'],
  templateUrl: './calendar.component.html',
})
export class CalendarComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  reservations: ReserveComponent[];
  availableDates: ReserveComponent[]= [];
  view: CalendarView = CalendarView.Month;
  today: number = Date.now();

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  /* actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    }, 
  ]; */

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private calendarService: CalendarService, public dialog: MatDialog) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
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
    this.calendarService.getReservations()
    .subscribe(reservations => this.reservations = reservations);
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
     //this.dayClicked()
  }  

   setDates(): void{

      var month = new Date().getMonth()+1;
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
      
      for(let i = month, j = 0; i < (month + 6); i++, j++){

         var currentYear = year;
          if(i == 13){
            currentMonth = 1;
              year + 1;
          } 
          
          dates[`month${j}`] = this.calendarService.getAvailableDates(currentMonth, year);
          currentMonth++;
      }

      forkJoin(dates).subscribe(arrayOfData => {
        const months = Object.keys(arrayOfData);

        for(let j = 0; j < months.length; j++){
          const monthsData = arrayOfData[months[j]] as IReservationModel[];

          for(let k = 0; k < monthsData.length; k++){
            //if ( new Date(monthsData[k].date).toLocaleString() >=  new Date().toLocaleString()){
                    
              if (monthsData[k].available)
              {
                newEvent =
                            {
                              title: 'Day Enable to Reserve',
                              start: startOfDay(new Date(monthsData[k].date)),
                              end: endOfDay(new Date(monthsData[k].date)),
                              color: colors.enable,
                              draggable: false,
                              resizable: {
                                beforeStart: true,
                                afterEnd: true,
                              }};
              }
              else{
                newEvent =
                          {
                            title: 'Day Reserved',
                            start: startOfDay(new Date(monthsData[k].date)),
                            end: endOfDay(new Date(monthsData[k].date)),
                            color: colors.reserved,
                            draggable: false,
                            resizable: {
                              beforeStart: true,
                              afterEnd: true,
                            }};
              } 
            this.addEvent(newEvent);
          //}
          }
        }      
      });
  } 

  reservePopUp(): void {

    
    this.dialog.open(DialogData, {
      data: {
        title: 'Reservation'
      }
    });
    this.calendarService.setReservation();
    /*this.events = [];
    this.setDates();*/
  }

  cancelPopUp(): void {
     /* emailSend: Boolean;
    this.calendarService.getCancelReservation( 101790084427153843849, 12).subscribe(x => emailSend = x); */

    //if (emailSend){
      this.dialog.open(DialogData, {
      data: {
        title: 'Cancelation'
      }
    });
   // }
    
    /*this.events = [];
    this.setDates();*/
  }
  
}


@Component({
    selector: 'dialog-data',
    templateUrl: 'dialog-data.html',
  })
  export class DialogData {
    constructor(public dialogRef: MatDialogRef<DialogData>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    title: string = "";
    close(): void {
      this.dialogRef.close();
    }
  }