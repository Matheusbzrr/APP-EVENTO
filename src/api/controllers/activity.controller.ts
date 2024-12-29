import { Request, Response } from "express";
import activityService from "../../domain/services/activity.service";
import { CreateActivityDTO } from "../../domain/dtos/activity/createActivity.dto";
import { DatabaseError } from "../../domain/exceptions/data-base-error";
import { NotFoundError } from "../../domain/exceptions/not-found-error";
import { ValidationError } from "../../domain/exceptions/validation-error";
class ActivityController {
    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const activities = await activityService.getAllActivities(); 
            res.json(activities);
        } catch (err) {
            console.error("Erro ao listar atividades:", err);

            if (err instanceof TypeError){
                res.status(503).send({ message: err.message})
            }
            else if (err instanceof DatabaseError) {
                res.status(503).send({ message: err.message });
            }
            else if (err instanceof NotFoundError) {
                res.status(404).send({ message: err.message });
            }
            else {
                res.status(500).send({ message: "Ocorreu um erro inesperado." });
            }
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const activityData: CreateActivityDTO = req.body;
            console.log("Dados recebidos para criação:", activityData);
            const activity = await activityService.createActivity(activityData);
            res.status(201).json(activity);
        } catch (err: any) {
            console.error("Erro ao criar atividade:", err); 
            if (err instanceof ValidationError) {
                res.status(400).send({ message: err.message });
            } else if (err instanceof TypeError) {
                res.status(500).send({ message:err.message });
            } else if (err instanceof DatabaseError) {
                res.status(503).send({ message: err.message });
            } else {
                res.status(500).json({
                    message: "Erro ao criar atividade.",
                    error: err.message || "Erro desconhecido.",
                });
            }
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await activityService.deleteActivity(Number(id));
            res.status(204).send(); // No content response
        } catch (err: any) {
            console.error("Erro ao excluir atividade:", err.message || err);
            if (err instanceof NotFoundError) {
                res.status(404).send({ message: err.message });
            } else if (err instanceof DatabaseError){
                res.status(503).send({ message: err.message });
            } else if (err instanceof TypeError) {
                res.status(500).send({ message:err.message });
            } else {
                res.status(500).json({
                    message: "Erro ao excluir atividade.",
                    error: err.message || "Erro desconhecido.",
                });
            }
        }
    }
    async findById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
          const activity = await activityService.getActivityById(Number(id));
          res.json(activity);
        } catch (err) {
          console.error("Erro ao buscar atividade por ID:", err);
          if (err instanceof NotFoundError) {
            res.status(404).send({ message: err.message });
          } else if (err instanceof DatabaseError) {
            res.status(503).send({ message: err.message });
          } else {
            res.status(500).send({ message: "Erro ao buscar a atividade." });
          }
        }
      }
}

export default new ActivityController();
