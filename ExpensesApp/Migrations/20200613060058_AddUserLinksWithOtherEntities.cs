using Microsoft.EntityFrameworkCore.Migrations;

namespace ExpensesApp.Migrations
{
    public partial class AddUserLinksWithOtherEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "AddedById",
                table: "Expenses",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "AddedById",
                table: "Comments",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Username = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    Token = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_AddedById",
                table: "Expenses",
                column: "AddedById");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_AddedById",
                table: "Comments",
                column: "AddedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Users_AddedById",
                table: "Comments",
                column: "AddedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Expenses_Users_AddedById",
                table: "Expenses",
                column: "AddedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Users_AddedById",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Expenses_Users_AddedById",
                table: "Expenses");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Expenses_AddedById",
                table: "Expenses");

            migrationBuilder.DropIndex(
                name: "IX_Comments_AddedById",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "AddedById",
                table: "Expenses");

            migrationBuilder.DropColumn(
                name: "AddedById",
                table: "Comments");
        }
    }
}
