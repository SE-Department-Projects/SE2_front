import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() columns: Array<{ field: string; header: string }> = [];
  @Input() data: Array<any> = [];
  @Input() actions: Array<{ label?: string; icon: string }> = [];
  @Output() actionClick = new EventEmitter<{
    action: { label: string; icon: string };
    row: any;
  }>();

  onActionClick(action: { label?: string; icon: string }, row: any) {
    console.log(action, row);

    this.actionClick.emit({
      action: { label: action.label ?? '', icon: action.icon },
      row,
    });
  }
}
