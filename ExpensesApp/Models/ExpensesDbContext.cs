using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace ExpensesApp.Models
{
    public class ExpensesDbContext : IdentityDbContext
    {

        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Comment> Comments { get; set; }

        public ExpensesDbContext(DbContextOptions<ExpensesDbContext> options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Expense>()
                .HasMany(c => c.Comments)
                .WithOne(e => e.Expense)
                .OnDelete(DeleteBehavior.Cascade);
        }

    }
}
