using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TodoWeb.Models.Datas
{
    public class TodoDbContext(DbContextOptions<TodoDbContext> options) : DbContext(options)
    {
        public DbSet<TodoItem> TodoItems { get; set; } = null!;
        public DbSet<TodoCustomer> TodoCustomers { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TodoItem>()
                .HasOne(ti => ti.TodoCustomer)
                .WithMany(tc => tc.TodoItems)
                .HasForeignKey(ti => ti.TodoCustomerId)
                .OnDelete(DeleteBehavior.Cascade);
        }

    }
}

