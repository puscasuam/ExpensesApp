using Microsoft.EntityFrameworkCore.Migrations;

namespace ExpensesApp.Migrations
{
    public partial class AddExpenseUserSplit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ExpenseUserSplit",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SplitedAmount = table.Column<double>(nullable: false),
                    ExpenseId = table.Column<long>(nullable: false),
                    UserId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExpenseUserSplit", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExpenseUserSplit_Expenses_ExpenseId",
                        column: x => x.ExpenseId,
                        principalTable: "Expenses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExpenseUserSplit_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ExpenseUserSplit_ExpenseId",
                table: "ExpenseUserSplit",
                column: "ExpenseId");

            migrationBuilder.CreateIndex(
                name: "IX_ExpenseUserSplit_UserId",
                table: "ExpenseUserSplit",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExpenseUserSplit");
        }
    }
}
