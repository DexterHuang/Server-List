import { MdSnackBar } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-copy-string-area',
  templateUrl: './copy-string-area.component.html',
  styleUrls: ['./copy-string-area.component.css']
})
export class CopyStringAreaComponent implements OnInit {
  @Input() string: string;
  constructor(private snackBar: MdSnackBar) { }

  ngOnInit() {
  }
  onClick() {
    this.snackBar.open('以複製了"' + this.string + '"至你的剪貼簿!', '', {
      duration: 2000,
    })
  }
}
