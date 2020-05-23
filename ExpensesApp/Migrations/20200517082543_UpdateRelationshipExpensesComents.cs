using Microsoft.EntityFrameworkCore.Migrations;

namespace ExpensesApp.Migrations
{
    public partial class UpdateRelationshipExpensesComents : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "ExpenseId",
                table: "Comments",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "ExpenseId",
                table: "Comments",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long));
        }
    }
}
