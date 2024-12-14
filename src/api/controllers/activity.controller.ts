import { Request, Response } from "express";
import activityService from "../../domain/services/activity.service";
import { CreateActivityDTO } from "../../domain/dtos/activity/createActivity.dto";
class ActivityController {
    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const activities = await activityService.getAllActivities(); 
            res.json(activities);
        } catch (err) {
            console.error("Erro ao listar atividades:", err);
            res.status(500).send({ message: "Erro ao tentar listar todas as atividades" });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const activityData: CreateActivityDTO = req.body;
            console.log("Dados recebidos para criação:", activityData); 

            const activity = await activityService.createActivity(activityData);
            res.status(201).json(activity);
        } catch (err: any) {
            console.error("Erro ao criar atividade:", err.message || err); 
            res.status(500).send({
                message: "Erro ao criar atividade",
                error: err.message || "Erro desconhecido"
            });
        }
    }
}

export default new ActivityController();
