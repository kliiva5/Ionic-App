import { Component } from '@angular/core';
import { Expense } from 'src/app/model/Expense';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  expenses: Expense[];
  totalCost: number;

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.expenseService.getExpenses().subscribe( result => {
      this.expenses = result;
      this.totalCost = this.calculateTotalCost();
    })
  }

  calculateTotalCost() {
    let totalCost = 0;

    for( let i = 0; i < this.expenses.length; i++)
    {
      totalCost += this.expenses[i].amount;
    }

    return totalCost;
  }

  removeExpense(expense: any) {
    this.expenseService.deleteExpense(expense.docId).then(() => {
      this.totalCost = this.calculateTotalCost();
    });
  }
}
