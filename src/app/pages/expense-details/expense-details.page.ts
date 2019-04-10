import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';
import { ActivatedRoute } from '@angular/router';
import { Expense } from 'src/app/model/Expense';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.page.html',
  styleUrls: ['./expense-details.page.scss'],
})
export class ExpenseDetailsPage implements OnInit {

  expense: Expense;
  expenseId: string;

  constructor(private expenseService: ExpenseService, 
              private route: ActivatedRoute,
              private loadingController: LoadingController,
              private navigationController: NavController) { }

  ngOnInit() {
    this.expenseId = this.route.snapshot.params['id'];
    if(this.expenseId){
      this.loadExpenseDetails();
    }
  }

  async loadExpenseDetails() {
    const loading = await this.loadingController.create({
      message: 'Loading expense details...'
    });
    await loading.present();

    this.expenseService.getExpense(this.expenseId).subscribe( retrievedExpense => {
      loading.dismiss();
      this.expense = retrievedExpense;
    });
  }

  async saveExpenseDetails() {
    const loading = await this.loadingController.create({
      message: 'Saving expense details...'
    });
    await loading.present();

    if(this.expenseId){
      this.expenseService.updateExpense(this.expense, this.expenseId).then(() => {
        loading.dismiss();
        this.navigationController.navigateBack('home');
      });
    } else {
      this.expenseService.addExpense(this.expense).then(() => {
        loading.dismiss();
        this.navigationController.navigateBack('home');
      });
    }
  }



}
