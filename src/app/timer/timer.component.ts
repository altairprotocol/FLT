import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() beginTime!: string;
  @Input() endTime!: string;
  @Input() minsLeft!: string;

  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  private intervalId: any;

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startCountdown() {
    console.log(this.minsLeft);

    if (this.minsLeft) {

      // Calculate the end time based on the minutes left
      const endDate = new Date();
      endDate.setMinutes(endDate.getMinutes() + Number(this.minsLeft));

      this.intervalId = setInterval(() => {
        const now = new Date();
        const timeLeft = endDate.getTime() - now.getTime();

        if (timeLeft <= 0) {
          clearInterval(this.intervalId);
          this.days = this.hours = this.minutes = this.seconds = 0;
        } else {
          this.days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
          this.hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          this.minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
          this.seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        }
      }, 1000);

    } else if (this.endTime) {

      // Work with startTime and endTime if minsLeft is not provided
      const endDate = new Date(this.endTime);

      this.intervalId = setInterval(() => {
        const now = new Date();
        const timeLeft = endDate.getTime() - now.getTime();
        console.log("🚀 ~ TimerComponent ~ this.intervalId=setInterval ~ timeLeft:", timeLeft)

        if (timeLeft <= 0) {
          clearInterval(this.intervalId);
          this.days = this.hours = this.minutes = this.seconds = 0;
        } else {
          this.days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
          console.log("🚀 ~ TimerComponent ~ this.intervalId=setInterval ~ days:", this.days)
          this.hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          this.minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
          this.seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        }
      }, 1000);
    } else {
    }
  }

}
