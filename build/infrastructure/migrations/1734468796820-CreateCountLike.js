"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCountLikesPerPostProcedure1734395417179 = void 0;
class CreateCountLikesPerPostProcedure1734395417179 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
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
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      DROP PROCEDURE IF EXISTS CountLikesPerPostFiltre;
    `);
        });
    }
}
exports.CreateCountLikesPerPostProcedure1734395417179 = CreateCountLikesPerPostProcedure1734395417179;
