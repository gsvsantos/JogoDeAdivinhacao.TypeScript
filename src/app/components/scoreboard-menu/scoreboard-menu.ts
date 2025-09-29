import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScoreEntry } from '../../models/ScoreEntry';

@Component({
  selector: 'app-scoreboard-menu',
  imports: [RouterLink],
  templateUrl: './scoreboard-menu.html',
  styleUrl: './scoreboard-menu.scss',
})
export class ScoreboardMenu implements OnInit {
  public scoreboard: ScoreEntry[] = [];

  public ngOnInit(): void {
    this.loadScoreboard();
  }

  public clearScoreboard(): void {
    localStorage.removeItem('scoreboard');
    this.scoreboard = [];
  }

  private loadScoreboard(): void {
    const scoreboardString = localStorage.getItem('scoreboard');

    if (scoreboardString) {
      this.scoreboard = JSON.parse(scoreboardString) as ScoreEntry[];
      this.scoreboard.sort((entry1, entry2) => entry1.score - entry2.score);
    } else {
      this.scoreboard = [];
    }
  }
}
