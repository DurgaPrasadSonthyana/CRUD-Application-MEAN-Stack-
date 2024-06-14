import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from '../service/user.service';
import User from '../types/user';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardHeader } from '@angular/material/card';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule, MatCard, MatCardHeader, MatButton, MatIconModule, MatIconButton,
    MatTableModule, MatPaginatorModule, MatSortModule, RouterLink, MatFormFieldModule, MatInputModule,
    FlexLayoutModule
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['name', 'email', 'age', 'address', 'action'];
  userService = inject(UserService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.userService.getUsers().subscribe(result => {
      this.users = result;
      this.dataSource.data = this.users;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  delete(id: string) {
    const ok = confirm("Are you sure you want to delete this user?");
    if (ok) {
      this.userService.deleteUser(id).subscribe(() => {
        alert('User deleted successfully');
        this.users = this.users.filter(u => u._id !== id);
        this.dataSource.data = this.users;
      });
    }
  }
}
