import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalOpenSource = new BehaviorSubject<boolean>(false);
  modalOpen$ = this.modalOpenSource.asObservable();
  private modalDataSource = new BehaviorSubject<any>(null);
  modalData$ = this.modalDataSource.asObservable();

  constructor() {}

  openModal(data?: any): void {
    this.modalDataSource.next(data);
    this.modalOpenSource.next(true);
  }

  closeModal(): void {
    this.modalDataSource.next(null);
    this.modalOpenSource.next(false);
  }
}
