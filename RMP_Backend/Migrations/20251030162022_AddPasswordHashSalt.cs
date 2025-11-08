using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RMP_Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddPasswordHashSalt : Migration
    {
        /// <inheritdoc />
       protected override void Up(MigrationBuilder migrationBuilder)
{
    // Drop old PasswordHash if it exists as string
    migrationBuilder.DropColumn(
        name: "PasswordHash",
        table: "Users"
    );

    // Add new PasswordHash byte[] column
    migrationBuilder.AddColumn<byte[]>(
        name: "PasswordHash",
        table: "Users",
        type: "varbinary(max)",
        nullable: false,
        defaultValue: new byte[0]
    );

    // Add PasswordSalt byte[] column
    migrationBuilder.AddColumn<byte[]>(
        name: "PasswordSalt",
        table: "Users",
        type: "varbinary(max)",
        nullable: false,
        defaultValue: new byte[0]
    );
}


        /// <inheritdoc />
       protected override void Down(MigrationBuilder migrationBuilder)
{
    migrationBuilder.DropColumn(
        name: "PasswordHash",
        table: "Users"
    );

    migrationBuilder.DropColumn(
        name: "PasswordSalt",
        table: "Users"
    );

    migrationBuilder.AddColumn<string>(
        name: "PasswordHash",
        table: "Users",
        type: "nvarchar(max)",
        nullable: false,
        defaultValue: ""
    );
}

    }
}
