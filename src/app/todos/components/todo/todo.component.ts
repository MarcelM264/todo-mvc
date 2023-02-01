import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ElementRef,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit, OnChanges {
  @Input('todo') todoProps?: TodoInterface;
  @Input('isEditing') isEditingProps?: boolean;
  @Output('setEditingId') setEditingIdEvent: EventEmitter<
    string | null
  > = new EventEmitter();

  editingText: string = '';
  @ViewChild('textInput') textInput!: ElementRef;

  constructor(private todoService: TodosService) {}

  ngOnInit(): void {
    if(this.todoProps)
    this.editingText = this.todoProps.text;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
    if (this.isEditingProps) {
      setTimeout(() => {
        this.textInput.nativeElement.focus();
      }, 0);
    }
  }

  setTodoInEditMode(): void {
    console.log('setTodoInEditMode');
    if(this.todoProps)
    this.setEditingIdEvent.emit(this.todoProps.id);
  }

  removeTodo(): void {
    console.log('removeTodo');
    if(this.todoProps)
    this.todoService.removeTodo(this.todoProps.id);
  }

  toggleTodo(): void {
    console.log('toggleTodo');
    if(this.todoProps)
    this.todoService.toggleTodo(this.todoProps.id);
  }

  changeText(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
    console.log('changeText');
  }

  changeTodo(): void {
    console.log('change todo', this.editingText);
    if(this.todoProps)
    this.todoService.changeTodo(this.todoProps.id, this.editingText);
    this.setEditingIdEvent.emit(null);
  }
}
