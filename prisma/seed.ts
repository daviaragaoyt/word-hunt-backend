// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Opcional: Apagar dados existentes para um seed limpo em desenvolvimento
    // Se você quer que o professor seja sempre o mesmo, é bom apagar e recriar.
    await prisma.user.deleteMany({});
    await prisma.word.deleteMany({});

    console.log(`Iniciando seed...`)

    // Crie o professor fixo
    const professor = await prisma.user.create({
        data: {
            username: 'Weverson',
            password: 'CodePlac123', // Lembre-se: usar hash para produção!
            role: 'professor',
        },
    })
    console.log(`Professor criado: ${professor.username}`)

    console.log(`Seed finalizado.`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })