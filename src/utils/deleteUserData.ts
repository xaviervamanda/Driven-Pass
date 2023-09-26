import { PrismaService } from "../prisma/prisma.service";

export class deleteUserData {
    constructor(private readonly prisma: PrismaService) {}

    async deleteAll(userId: number){
        await this.prisma.card.deleteMany({
            where: { userId }
        })
        await this.prisma.note.deleteMany({
            where: { userId }
        })
        await this.prisma.credential.deleteMany({
            where: { userId }
        })
        await this.prisma.user.delete({
            where: { id: userId }
        })
        return "All user data deleted!"
    }
}