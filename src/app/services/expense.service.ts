import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Expense } from '../model/Expense';

import { map } from 'rxjs/operators'
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private expenseCollection: AngularFirestoreCollection<Expense>;

  private expenses: Observable<Expense[]>;
 
  constructor(db: AngularFirestore) {
    this.expenseCollection = db.collection<Expense>('expenses');

    this.expenses = this.expenseCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const docId = a.payload.doc.id;
          return { docId, ...data }
        })
      })
    )
  }

  getExpenses() {
    return this.expenses;
  }

  getExpense(id: string) {
    return this.expenseCollection.doc(id).valueChanges();
  }

  updateExpense(expense: Expense, id: string) {
    return this.expenseCollection.doc(id).update(expense);
  }

  addExpense(expense: Expense) {
    return this.expenseCollection.add(expense);
  }

  deleteExpense(id: string) {
    return this.expenseCollection.doc(id).delete();
  }

  calculateTotalCost() {
    // TODO: Calculate the sum of expenses
  }
}
