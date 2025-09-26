import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: '../styles.scss',
})
export class App implements OnInit {
  public numberInput: number = 1;
  public secretNumber: number = 0;
  private minNumber: number = 1;
  private maxNumber: number = 100;

  public gameIsOver: boolean = false;

  public tipIsLessThan: number = 100;
  public tipIsHigherThan: number = 1;

  public ngOnInit(): void {
    this.secretNumber = this.numberRandomizer(this.minNumber, this.maxNumber);
  }

  public guess(): void {
    if (this.numberInput < this.secretNumber) this.tipIsHigherThan = this.numberInput;
    else if (this.numberInput > this.secretNumber) this.tipIsLessThan = this.numberInput;
    else this.gameIsOver = true;
  }

  public restart(): void {
    this.numberInput = 1;
    this.tipIsHigherThan = 1;
    this.tipIsLessThan = 100;
    this.gameIsOver = false;
    this.secretNumber = this.numberRandomizer(this.minNumber, this.maxNumber);
  }

  private numberRandomizer(min: number, max: number): number {
    const minNumberCeiled = Math.ceil(min);
    const maxNumberCeiled = Math.floor(max);

    return Math.floor(Math.random() * (maxNumberCeiled - minNumberCeiled + 1) + minNumberCeiled);
  }
}
