export class Task {
  constructor(id, title, description = '', category = 'other', deadline = null, isCompleted = false) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.deadline = deadline;
    this.isCompleted = isCompleted;
    this.createdAt = new Date();
  }

  toggleComplete() {
    this.isCompleted = !this.isCompleted;
  }

  update(title, description, category, deadline) {
    this.title = title;
    this.description = description;
    this.category = category;
    this.deadline = deadline;
  }
} 