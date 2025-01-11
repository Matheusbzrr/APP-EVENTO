import { Router } from "express";
import PostController from "../controllers/post.controller";
import { upload } from "../../config/multer.config";

class PostRoutes {
  router = Router();
  controller = PostController;

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    /**
     * @openapi
     * /posts:
     *   get:
     *     tags:
     *       - Posts
     *     summary: Obter todos os posts
     *     description: Retorna uma lista de todos os posts cadastrados no sistema.
     *     responses:
     *       200:
     *         description: Lista de posts retornada com sucesso.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   idPost:
     *                     type: number
     *                     description: ID do post.
     *                     example: 1
     *                   imageUrl:
     *                     type: string
     *                     description: URL da imagem do post.
     *                     example: "https://example.com/image.jpg"
     *                   description:
     *                     type: string
     *                     description: Descrição do post.
     *                     example: "Descrição detalhada do post."
     *                   participant:
     *                     type: object
     *                     description: Dados do participante associado ao post.
     *                     properties:
     *                       idParticipant:
     *                         type: number
     *                         description: ID do participante.
     *                         example: 1
     *                       name:
     *                         type: string
     *                         description: Nome do participante.
     *                         example: "John Doe"
     *                       email:
     *                         type: string
     *                         description: E-mail do participante.
     *                         example: "john.doe@example.com"
     *                       companyName:
     *                         type: string
     *                         description: Nome da empresa do participante.
     *                         example: "Tech Solutions"
     *                   likes:
     *                     type: array
     *                     description: Lista de likes associados ao post.
     *                     items:
     *                       type: object
     *                       properties:
     *                         idLike:
     *                           type: number
     *                           description: ID do like.
     *                           example: 10
     *                         participant:
     *                           type: object
     *                           description: Dados do participante que realizou o like.
     *                           properties:
     *                             idParticipant:
     *                               type: number
     *                               description: ID do participante.
     *                               example: 2
     *                             name:
     *                               type: string
     *                               description: Nome do participante.
     *                               example: "Jane Doe"
     *                             email:
     *                               type: string
     *                               description: E-mail do participante.
     *                               example: "jane.doe@example.com"
     *                             companyName:
     *                               type: string
     *                               description: Empresa do participante.
     *                               example: "Innovation Inc."
     *       500:
     *         description: Erro ao buscar os posts.
     */
    this.router.get("/posts", this.controller.getAllPosts);

    /**
     * @openapi
     * /posts/participant:
     *   get:
     *     tags:
     *       - Posts
     *     summary: Obter posts por e-mail do participante
     *     description: Retorna posts associados a um e-mail de participante.
     *     parameters:
     *       - name: email
     *         in: query
     *         required: true
     *         description: E-mail do participante para buscar os posts.
     *         schema:
     *           type: string
     *           example: "john.doe@example.com"
     *     responses:
     *       200:
     *         description: Posts retornados com sucesso.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   idPost:
     *                     type: number
     *                     description: ID do post.
     *                     example: 1
     *                   imageUrl:
     *                     type: string
     *                     description: URL da imagem do post.
     *                     example: "https://example.com/image.jpg"
     *                   description:
     *                     type: string
     *                     description: Descrição do post.
     *                     example: "Descrição detalhada do post."
     *                   participant:
     *                     type: object
     *                     description: Dados do participante associado ao post.
     *                     properties:
     *                       idParticipant:
     *                         type: number
     *                         description: ID do participante.
     *                         example: 1
     *                       name:
     *                         type: string
     *                         description: Nome do participante.
     *                         example: "John Doe"
     *                       email:
     *                         type: string
     *                         description: E-mail do participante.
     *                         example: "john.doe@example.com"
     *                       companyName:
     *                         type: string
     *                         description: Nome da empresa do participante.
     *                         example: "Tech Solutions"
     *                   likes:
     *                     type: array
     *                     description: Lista de likes associados ao post.
     *                     items:
     *                       type: object
     *                       properties:
     *                         idLike:
     *                           type: number
     *                           description: ID do like.
     *                           example: 10
     *                         participant:
     *                           type: object
     *                           description: Dados do participante que realizou o like.
     *                           properties:
     *                             idParticipant:
     *                               type: number
     *                               description: ID do participante.
     *                               example: 2
     *                             name:
     *                               type: string
     *                               description: Nome do participante.
     *                               example: "Jane Doe"
     *                             email:
     *                               type: string
     *                               description: E-mail do participante.
     *                               example: "jane.doe@example.com"
     *                             companyName:
     *                               type: string
     *                               description: Empresa do participante.
     *                               example: "Innovation Inc."
     *       400:
     *         description: E-mail inválido.
     *       404:
     *         description: Nenhum post encontrado para o e-mail fornecido.
     *       500:
     *         description: Erro ao buscar posts por e-mail.
     */
    this.router.get(
      "/posts/participant",
      this.controller.getPostsByParticipantEmail
    );

    /**
     * @openapi
     * /posts:
     *   post:
     *     tags:
     *       - Posts
     *     summary: Criar um novo post
     *     description: Cria um novo post associado a um participante.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               idParticipant:
     *                 type: number
     *                 description: ID do participante associado ao post.
     *                 example: 1
     *               imageUrl:
     *                 type: string
     *                 description: URL da imagem do post.
     *                 example: "https://example.com/image.jpg"
     *               description:
     *                 type: string
     *                 description: Descrição do post.
     *                 example: "Descrição detalhada do post."
     *     responses:
     *       201:
     *         description: Post criado com sucesso.
     *       400:
     *         description: Dados inválidos fornecidos.
     *       500:
     *         description: Erro ao criar o post.
     */
    this.router.post(
      "/posts",
      upload.single("image"),
      this.controller.createPost
    );
    /**
     * @openapi
     * /posts/{id}:
     *   delete:
     *     tags:
     *       - Posts
     *     summary: Excluir um post
     *     description: Exclui um post existente com base no ID fornecido.
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID do post a ser excluído.
     *         schema:
     *           type: integer
     *           example: 5
     *     responses:
     *       204:
     *         description: Post excluído com sucesso.
     *       404:
     *         description: Post não encontrado.
     *       500:
     *         description: Erro ao excluir o post.
     */
    this.router.delete("/posts/:id", this.controller.deletePost);
    /**
     * @openapi
     * /posts/{id}/{idParticipant}:
     *   patch:
     *     tags:
     *       - Posts
     *     summary: Atualizar um post
     *     description: Atualiza um post existente com base no ID do post e no ID do participante.
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID do post a ser atualizado.
     *         schema:
     *           type: integer
     *           example: 5
     *       - name: idParticipant
     *         in: path
     *         required: true
     *         description: ID do participante associado ao post.
     *         schema:
     *           type: integer
     *           example: 1
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               description:
     *                 type: string
     *                 description: Nova descrição do post.
     *                 example: "Nova descrição do post."
     *               image:
     *                 type: string
     *                 format: binary
     *                 description: Nova imagem do post.
     *     responses:
     *       200:
     *         description: Post atualizado com sucesso.
     *       400:
     *         description: Dados inválidos fornecidos.
     *       404:
     *         description: Post não encontrado ou participante não autorizado.
     *       500:
     *         description: Erro ao atualizar o post.
     */
    this.router.patch("/posts/:id/:idParticipant", upload.single("image"), (req, res, next) => {
      console.log("Arquivo recebido pelo multer:", req.file);
      next();
    }, this.controller.updatePost);
  }
}

export default new PostRoutes().router;
