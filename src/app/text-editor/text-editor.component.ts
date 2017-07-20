import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {
  @Input() text: string;
  @Output() textChange = new EventEmitter();
  editor;
  editorOptions;
  constructor() { }

  ngOnInit() {
    this.editorOptions = {
      theme: 'snow',
      modules: {
        toolbar: {
          container: [['bold', 'italic', 'underline',
            'strike', 'image', 'blockquote', 'bullet'],               // custom button values
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction

          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          [{ 'align': [] }],
          ],
          handlers: {
            image: this.imageHandler.bind(this)
          }
        }
      },
    }
  }
  onEditorBlured(quill) {

  }

  onEditorFocused(quill) {

  }

  onEditorCreated(quill) {
    this.editor = quill;
  }

  onContentChanged({ quill, html, text }) {
    const el = document.createElement('html')
    el.innerHTML = html;
    const as = el.getElementsByTagName('a');
    for (let i = 0; i < as.length; i++) {
      const a = as.item(i);
      if (a.href && a.href.indexOf('https://ref.gamer.com.tw/redir.php?url=') >= 0) {
        let ref = a.href.replace('https://ref.gamer.com.tw/redir.php?url=', '');
        ref = decodeURIComponent(ref);
        a.href = ref;
        this.text = el.innerHTML;
        return;
      }
    }
    this.textChange.emit(this.text);
  }
  imageHandler() {
    const range = this.editor.getSelection();
    const value = prompt('What is the image URL');
    this.editor.insertEmbed(range.index, 'image', value, null);
  }
}
