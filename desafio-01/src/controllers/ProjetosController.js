const database = require('../models')

class ProjetosController {
    static async insertProjeto(req, res) {
        const projetoRecebido = req.body
        try {
            const projetoRegistrado = await database.Projetos.create(projetoRecebido)

            const tasks = projetoRecebido.tasks
            
            for (let i = 0; i < tasks.length; i++) {
                const task = tasks[i];
                task.projeto_id = projetoRegistrado.id
                await database.Tasks.create(task)
            }

            const projeto = await database.Projetos.findByPk(projetoRegistrado.id, {
                include: { 
                    association: 'tasks',
                    attributes: ['title', 'taskRelevance', 'completed', 'createdAt', 'updatedAt']
                }
            })
            
            return res.status(201).json(projeto)
        } catch (error) {
            if (error.parent) {
                if (error.parent.errno == 1364) {
                    return res.status(400).json({
                        erro: error.message,
                        mensagem: "Verifique o preenchimento dos campos obrigatórios"
                    })
                }
            }
            return res.status(500).json({ erro: error.message})
        }
    }
}

module.exports = ProjetosController