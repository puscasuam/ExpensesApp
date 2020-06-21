using Microsoft.EntityFrameworkCore.Migrations;

namespace ExpensesApp.Migrations
{
    public partial class AddExpenseUserSplitUniqueId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ExpenseUserSplit_ExpenseId",
                table: "ExpenseUserSplit");

            migrationBuilder.CreateIndex(
                name: "IX_ExpenseUserSplit_ExpenseId_UserId",
                table: "ExpenseUserSplit",
                columns: new[] { "ExpenseId", "UserId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ExpenseUserSplit_ExpenseId_UserId",
                table: "ExpenseUserSplit");

            migrationBuilder.CreateIndex(
                name: "IX_ExpenseUserSplit_ExpenseId",
                table: "ExpenseUserSplit",
                column: "ExpenseId");
        }
    }
}
