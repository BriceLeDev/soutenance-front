import { Component, inject, OnInit } from '@angular/core';
import { TransactionControlerService } from '../../openapi/services/services';
import { Router } from '@angular/router';
import { PageResponseTransactionResponse, Transaction, TransactionResponse } from '../../openapi/services/models';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatDatepickerModule,FormsModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent implements OnInit{

  private transactionService = inject(TransactionControlerService)
  private router = inject(Router)
  public startDate: Date | null = null;
  public endDate: Date | null = null;
  public transactions : PageResponseTransactionResponse = {}
  ngOnInit(): void {
      this.getAllTransactions()
  }

  public getAllTransactions(){

    this.transactionService.getAllTransaction()
    .subscribe({
      next : (data)=>{
        this.transactions = data
      },
      error : (err)=>{

        console.log(err)
      }

    })

  }

  public dateClicked(){
    if (this.startDate === null) {
      alert(" Veuillez Choisir d'abord la date début!")

    }
  }

  formatDate(date: Date | null): string {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return "";
  }


  public reserachBetween2Date(){

  }
  public onClick(transaction : TransactionResponse){

    this.router.navigate(["admin/abonnment/" + transaction.abonnementId])
  }
}
