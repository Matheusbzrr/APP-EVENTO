import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCountLikesPerPostProcedure1734395417179 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE PROCEDURE CountLikesPerPostFiltre(IN p_idPost INT)
      BEGIN
          SELECT 
              postIdPost AS PostID,
              COUNT(*) AS LikeCount
          FROM 
              \`like\`
          WHERE 
              postIdPost = p_idPost
          GROUP BY 
              postIdPost;
      END;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP PROCEDURE IF EXISTS CountLikesPerPostFiltre;
    `);
  }
}
