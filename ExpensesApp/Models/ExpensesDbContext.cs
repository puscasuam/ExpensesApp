using Microsoft.EntityFrameworkCore;


namespace ExpensesApp.Models
{
    public class ExpensesDbContext : DbContext
    {
        public ExpensesDbContext(DbContextOptions<ExpensesDbContext> options)
            : base(options)
        {
        }

        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Expense>()
                .HasMany(c => c.Comments)
                .WithOne(e => e.Expense)
                .OnDelete(DeleteBehavior.Cascade);
        }

    }
}
