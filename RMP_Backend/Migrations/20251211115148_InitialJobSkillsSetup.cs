using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RMP_Backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialJobSkillsSetup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CandidateSkills_Skill_SkillId",
                table: "CandidateSkills");

            migrationBuilder.DropForeignKey(
                name: "FK_JobPreferredSkill_Jobs_JobId",
                table: "JobPreferredSkill");

            migrationBuilder.DropForeignKey(
                name: "FK_JobPreferredSkill_Skill_SkillId",
                table: "JobPreferredSkill");

            migrationBuilder.DropForeignKey(
                name: "FK_JobRequiredSkill_Jobs_JobId",
                table: "JobRequiredSkill");

            migrationBuilder.DropForeignKey(
                name: "FK_JobRequiredSkill_Skill_SkillId",
                table: "JobRequiredSkill");

            migrationBuilder.DropForeignKey(
                name: "FK_ReviewSkills_Skill_SkillId",
                table: "ReviewSkills");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Skill",
                table: "Skill");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JobRequiredSkill",
                table: "JobRequiredSkill");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JobPreferredSkill",
                table: "JobPreferredSkill");

            migrationBuilder.DropColumn(
                name: "SkillName",
                table: "Skill");

            migrationBuilder.RenameTable(
                name: "Skill",
                newName: "Skills");

            migrationBuilder.RenameTable(
                name: "JobRequiredSkill",
                newName: "JobRequiredSkills");

            migrationBuilder.RenameTable(
                name: "JobPreferredSkill",
                newName: "JobPreferredSkills");

            migrationBuilder.RenameColumn(
                name: "Importance",
                table: "JobRequiredSkills",
                newName: "Weightage");

            migrationBuilder.RenameIndex(
                name: "IX_JobRequiredSkill_SkillId",
                table: "JobRequiredSkills",
                newName: "IX_JobRequiredSkills_SkillId");

            migrationBuilder.RenameColumn(
                name: "Importance",
                table: "JobPreferredSkills",
                newName: "Weightage");

            migrationBuilder.RenameIndex(
                name: "IX_JobPreferredSkill_SkillId",
                table: "JobPreferredSkills",
                newName: "IX_JobPreferredSkills_SkillId");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Skills",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Skills",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Skills",
                table: "Skills",
                column: "SkillId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_JobRequiredSkills",
                table: "JobRequiredSkills",
                columns: new[] { "JobId", "SkillId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_JobPreferredSkills",
                table: "JobPreferredSkills",
                columns: new[] { "JobId", "SkillId" });

            migrationBuilder.AddForeignKey(
                name: "FK_CandidateSkills_Skills_SkillId",
                table: "CandidateSkills",
                column: "SkillId",
                principalTable: "Skills",
                principalColumn: "SkillId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JobPreferredSkills_Jobs_JobId",
                table: "JobPreferredSkills",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "JobId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JobPreferredSkills_Skills_SkillId",
                table: "JobPreferredSkills",
                column: "SkillId",
                principalTable: "Skills",
                principalColumn: "SkillId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JobRequiredSkills_Jobs_JobId",
                table: "JobRequiredSkills",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "JobId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JobRequiredSkills_Skills_SkillId",
                table: "JobRequiredSkills",
                column: "SkillId",
                principalTable: "Skills",
                principalColumn: "SkillId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ReviewSkills_Skills_SkillId",
                table: "ReviewSkills",
                column: "SkillId",
                principalTable: "Skills",
                principalColumn: "SkillId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CandidateSkills_Skills_SkillId",
                table: "CandidateSkills");

            migrationBuilder.DropForeignKey(
                name: "FK_JobPreferredSkills_Jobs_JobId",
                table: "JobPreferredSkills");

            migrationBuilder.DropForeignKey(
                name: "FK_JobPreferredSkills_Skills_SkillId",
                table: "JobPreferredSkills");

            migrationBuilder.DropForeignKey(
                name: "FK_JobRequiredSkills_Jobs_JobId",
                table: "JobRequiredSkills");

            migrationBuilder.DropForeignKey(
                name: "FK_JobRequiredSkills_Skills_SkillId",
                table: "JobRequiredSkills");

            migrationBuilder.DropForeignKey(
                name: "FK_ReviewSkills_Skills_SkillId",
                table: "ReviewSkills");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Skills",
                table: "Skills");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JobRequiredSkills",
                table: "JobRequiredSkills");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JobPreferredSkills",
                table: "JobPreferredSkills");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Skills");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Skills");

            migrationBuilder.RenameTable(
                name: "Skills",
                newName: "Skill");

            migrationBuilder.RenameTable(
                name: "JobRequiredSkills",
                newName: "JobRequiredSkill");

            migrationBuilder.RenameTable(
                name: "JobPreferredSkills",
                newName: "JobPreferredSkill");

            migrationBuilder.RenameColumn(
                name: "Weightage",
                table: "JobRequiredSkill",
                newName: "Importance");

            migrationBuilder.RenameIndex(
                name: "IX_JobRequiredSkills_SkillId",
                table: "JobRequiredSkill",
                newName: "IX_JobRequiredSkill_SkillId");

            migrationBuilder.RenameColumn(
                name: "Weightage",
                table: "JobPreferredSkill",
                newName: "Importance");

            migrationBuilder.RenameIndex(
                name: "IX_JobPreferredSkills_SkillId",
                table: "JobPreferredSkill",
                newName: "IX_JobPreferredSkill_SkillId");

            migrationBuilder.AddColumn<string>(
                name: "SkillName",
                table: "Skill",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Skill",
                table: "Skill",
                column: "SkillId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_JobRequiredSkill",
                table: "JobRequiredSkill",
                columns: new[] { "JobId", "SkillId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_JobPreferredSkill",
                table: "JobPreferredSkill",
                columns: new[] { "JobId", "SkillId" });

            migrationBuilder.AddForeignKey(
                name: "FK_CandidateSkills_Skill_SkillId",
                table: "CandidateSkills",
                column: "SkillId",
                principalTable: "Skill",
                principalColumn: "SkillId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JobPreferredSkill_Jobs_JobId",
                table: "JobPreferredSkill",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "JobId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JobPreferredSkill_Skill_SkillId",
                table: "JobPreferredSkill",
                column: "SkillId",
                principalTable: "Skill",
                principalColumn: "SkillId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JobRequiredSkill_Jobs_JobId",
                table: "JobRequiredSkill",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "JobId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JobRequiredSkill_Skill_SkillId",
                table: "JobRequiredSkill",
                column: "SkillId",
                principalTable: "Skill",
                principalColumn: "SkillId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ReviewSkills_Skill_SkillId",
                table: "ReviewSkills",
                column: "SkillId",
                principalTable: "Skill",
                principalColumn: "SkillId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
