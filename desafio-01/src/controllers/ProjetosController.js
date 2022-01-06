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
            const projetos = await database.Projetos.findAll({
                include: {
                    association: 'tasks',
                    attributes: [
                        "id",
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
            const projeto = await database.Projetos.findOne({
                where: { id: id },
                include: {
                    association: 'tasks',
                    attributes: [
                        "id",
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
            return res.status(500).json({ erro: error.message })
        }
    }

    static async deleteProjetoById(req, res) {
        const { id } = req.params
        try {
            const projeto = await database.Projetos.findOne({ where : { id : id } })
            if (!projeto) return res.status(404).json({ erro : "Projeto não encontrado" })

            await database.Projetos.destroy({ where : { id : id } })
            return res.status(204).json()
        } catch (error) {
            return res.status(500).json({ erro: error.message })
        }
    }

    // Atualiza somente os dados referentes à tabela projetos
    static async updateProjetoById(req, res) {
        const { id } = req.params
        const projetoUpdate = req.body
        try {
            const projeto = await database.Projetos.findOne({ where : { id : id } })
            if (!projeto) return res.status(404).json({ erro : "Projeto não encontrado" })

            await database.Projetos.update(projetoUpdate, { where : { id : id } })
            const projetoAtualizado = await database.Projetos.findOne({ where : { id : id} })

            return res.json(projetoAtualizado)
        } catch (error) {
            return res.status(500).json({ erro: error.message })
        }
    }

    static async addTaskInProjeto(req, res) {
        const { id } = req.params
        const task = req.body
        try {
            const projeto = await database.Projetos.findOne({ where : { id : id } })
            if (!projeto) return res.status(404).json({ erro : "Projeto não encontrado" })

            const novaTask = await database.Tasks.create({...task, projeto_id : id})
            
            return res.status(201).json(novaTask)
        } catch (error) {
            if (error.parent) {
                if (error.parent.errno == 1364) {
                    return res.status(400).json({
                        erro: error.message,
                        mensagem: "Verifique o preenchimento dos campos obrigatórios"
                    })
                }
            }
            return res.status(500).json({ erro: error.message })
        }
    }

    static async deleteTaskById(req, res) {
        const { taskId } = req.params
        try {
            const task = await database.Tasks.findOne({ where : { id : taskId } })
            if (!task) return res.status(404).json({ erro : "Task não encontrada" })
        
            await database.Tasks.destroy({ where : { id : taskId} })
            return res.status(204).json()
        } catch (error) {
            return res.status(500).json({ erro: error.message })
        }
    }

    static async updateTaskById(req, res) {
        const { taskId } = req.params
        const taskUpdate = req.body

        try {
            const task = await database.Tasks.findOne({ where : { id : taskId } })
            if (!task) return res.status(404).json({ erro : "Task não encontrada" })

            await database.Tasks.update(taskUpdate, { where : { id : taskId } })
            const taskAtualizada = await database.Tasks.findOne({ where : { id : taskId} })

            return res.json(taskAtualizada)
        } catch (error) {
            return res.status(500).json({ erro: error.message })
        }
    }
}

module.exports = ProjetosController