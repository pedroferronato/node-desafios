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

            if (!projetos) return res.status(404).json({ erro: "Nenhum projeto encontrado" })

            return res.json(projetos)
        } catch (error) {
            return res.status(500).json({ erro: error.message })
        }
    }

    static async selectByIdProjeto(req, res) {
        try {
            const { id } = req.params
            const projeto = await database.Projetos.findOne(
                {
                    where: { id : id },
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

            if (!projeto) return res.status(404).json({ erro: "Nenhum projeto encontrado" })

            return res.json(projeto)
        } catch (error) {
            console.log(error);
            return res.status(500).json({ erro: error.message })
        }
    }
}

module.exports = ProjetosController