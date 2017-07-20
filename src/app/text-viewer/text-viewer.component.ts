import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-viewer',
  templateUrl: './text-viewer.component.html',
  styleUrls: ['./text-viewer.component.css']
})
export class TextViewerComponent implements OnInit {
  @Input() text: string;
  @Output() textChange = new EventEmitter();
  editor;
  editorOptions;
  constructor() { }

  ngOnInit() {
    this.editorOptions = {
      theme: 'bubble',
      modules: {
        toolbar: false
      },
    }
  }
  onEditorBlured(quill) {

  }

  onEditorFocused(quill) {

  }

  onEditorCreated(quill) {
    this.editor = quill;
    this.editor.enable(false)
  }

  onContentChanged({ quill, html, text }) {
    this.textChange.emit(this.text);
  }
  imageHandler() {
    const range = this.editor.getSelection();
    const value = prompt('What is the image URL');
    this.editor.insertEmbed(range.index, 'image', value, null);
  }
}
