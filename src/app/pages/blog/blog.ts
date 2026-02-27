import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  standalone: true,
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {
  expanded = false;

  toggleBlogCards() {
    this.expanded = !this.expanded;
  }
}