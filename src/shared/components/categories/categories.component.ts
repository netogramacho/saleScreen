import { CategoriesService } from 'src/shared/services/categories.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SideDialogComponent } from '../side-dialog/side-dialog.component';
import { MatTable } from '@angular/material/table';
import { Category } from 'src/shared/interfaces/category';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  @ViewChild(SideDialogComponent) sideDialog!: SideDialogComponent;
  @ViewChild(MatTable) table!: MatTable<any>;

  categories!: Category[];
  loading = true;
  displayedColumns = [
    'prc_id',
    'prc_name',
    'prc_tax',
    'edit',
    'delete',
  ];
  isDialogOpen = false;
  currCategory: Category;

  constructor(
    private categoriesService: CategoriesService,
    private snackBar: MatSnackBar
  ) {
    this.currCategory = {
      categoryName: '',
      categoryTax: 0,
    };
  }

  ngOnInit(): void {
    this.categoriesService.categories$.subscribe((categories) => {
      this.categories = categories;
    });

    this.categoriesService.laoding$.subscribe((load: boolean) => {
      this.loading = load;
    });
  }

  prepareAddCategory() {
    this.isDialogOpen = true;
  }

  saveCategory() {
    let category = { ...this.currCategory };

    category.categoryTax = category.categoryTax / 100;
    if (category.categoryId) {
      this.categoriesService.updateCategory(this.currCategory).subscribe(
        () => {
          this.snackBar.open('Categoria editada com sucesso.', '', {
            duration: 3000,
          });
        },
        (error) => {
          this.snackBar.open(error.error.error, '', { duration: 5000 });
        }
      );
    } else {
      this.categoriesService.createCategory(this.currCategory).subscribe(
        () => {
          this.snackBar.open('Produto criada com sucesso.', '', {
            duration: 3000,
          });
        },
        (error) => {
          this.snackBar.open(error.error.error, '', { duration: 5000 });
        }
      );
    }
    this.sideDialog.close();
    this.clearCurrCategory();
  }

  editCategory(category: Category) {
    this.currCategory = { ...category };
    console.log(this.currCategory);
    this.isDialogOpen = true;
  }

  deleteCategory(category: Category) {
    this.categoriesService.deleteCategory(category).subscribe(
      () => {
        this.snackBar.open('Categoria excluída com sucesso.', '', {
          duration: 3000,
        });
      },
      (error) => {
        this.snackBar.open(error.error.error, '', {duration: 5000});
      }
    );
  }

  clearCurrCategory() {
    this.currCategory = {
      categoryName: '',
      categoryTax: 0,
    };
  }
}
