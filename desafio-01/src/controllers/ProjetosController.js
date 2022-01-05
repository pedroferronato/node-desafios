const database = require('../models')

class ProjetosController {
    static async insertProjeto(req, res) {
        const projetoRecebido = req.body
        try {
            if (!projetoRecebido.tasks) {
                return res.status(400).json({
                    erro: 'Campo \'tasks\' deve receber um valor',
                    mensagem: "Verifique o preenchimento dos campos obrigatórios"
                })
            }
            const projetoRegistrado = await database.Projetos.create(
                projetoRecebido,
                { include: [{ association: 'tasks' }] }
            ) // Realiza o registro de um novo projeto com suas tasks

            return res.status(201).json(projetoRegistrado)
        } catch (error) {
            if (error.parent) {
                if (error.parent.errno == 1364) {
                    return res.status(400).json({
                        erro: error.message,
                        mensagem: "Verifique o preenchimento dos campos obrigatórios"
                    })
                }
            }
            return res.status(500).json({ erro: error })
        }
    }

    static async selectAllProjetos(req, res) {
        try {
            const projetos = await database.Projetos.findAll(
                {
                    include: {
                        association: 'tasks',
                        attributes: [
                            "title",
                            "taskRelevance",
                            "completed",
                            "createdAt",
                            "updatedAt"
                        ]
                    }
                })

            return res.json(projetos)
        } catch (error) {
            return res.status(500).json({ erro: error })
        }
    }
}

module.exports = ProjetosController