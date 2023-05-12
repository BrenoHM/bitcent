import servicos from "@/logic/core"
import Transacao from "@/logic/core/financas/Transacao"
import { useCallback, useContext, useEffect, useState } from "react"
import AutenticacaoContext from "../contexts/AutenticacaoContext"

export type TipoExibicao = "lista" | "grade"

export default function useTransacao() {
    const { usuario } = useContext(AutenticacaoContext)
    const [data, setData] = useState<Date>(new Date())
    const [tipoExibicao, setTipoExibicao] = useState<TipoExibicao>("lista")
    const [transacoes, setTransacoes] = useState<Transacao[]>([])
    const [transacao, setTransacao] = useState<Transacao | null>(null)
    const [saldo, setSaldo] = useState<number>(0)

    const buscarTransacoes = useCallback(async function () {
        if(!usuario) return
        const transacoes = await servicos.transacao.consultarPorMes(usuario, data)
        setTransacoes(transacoes)
        calculaSaldo(transacoes)
    }, [usuario, data])

    useEffect(() => {
        buscarTransacoes()
    }, [buscarTransacoes, data])

    async function salvar(transacao: Transacao) {
        if(!usuario) return
        servicos.transacao.salvar(transacao, usuario)
        setTransacao(null)
        await buscarTransacoes()
    }
    
    async function excluir(transacao: Transacao) {
        if(!usuario) return
        await servicos.transacao.excluir(transacao, usuario)
        setTransacao(null)
        await buscarTransacoes()
    }

    const calculaSaldo = (transacoes: any) => {
        
        var saldo = transacoes.reduce((acumulador: number, transacao: Transacao) => {
            
            return transacao.tipo == 'receita' ? acumulador += transacao.valor : transacao.tipo == 'despesa' ? acumulador -= transacao.valor : 0
            
        }, 0);        

        setSaldo(saldo);

    }

    return {
        data,
        transacoes,
        transacao,
        tipoExibicao,
        saldo,
        salvar,
        excluir,
        selecionar: setTransacao,
        alterarData: setData,
        alterarExibicao: setTipoExibicao,
    }
}