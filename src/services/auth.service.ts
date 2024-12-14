import { Repository } from "typeorm";
import { Participant } from "../domain/models/participant";
import { AppDataSource } from "../db/data-source";
import jwt from "jsonwebtoken";

export class AuthService {
  private participantRepository: Repository<Participant>;

  constructor() {
    this.participantRepository = AppDataSource.getRepository(Participant);
  }

  async login(email: string): Promise<string | null> {
    if (!AppDataSource.isInitialized) {
      throw new Error("Banco de dados não inicializado");
    }

    const participant = await this.participantRepository.findOne({
      where: { email },
    });

    if (!participant) {
      return null;
    }

    const token = jwt.sign(
      {
        idParticipant: participant.idParticipant,
        email: participant.email,
        name: participant.name,
      },
      process.env.JWT_SECRET || "minha-chave-secreta",
      { expiresIn: "1h" }
    );

    return token;
  }
}

export default new AuthService();
