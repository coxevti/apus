import React, {
    ChangeEvent,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react'
import cogoToast from 'cogo-toast'
import * as Yup from 'yup'

import {
    Wrapper,
    Header,
    LoadingContent,
    ContentInput,
    GroupInput,
    Input,
    ActionForm,
    LoadingContentModal,
    ContainerTable
} from './styles'

import Button from 'components/Button'
import Table from 'components/Table'
import api from 'services/api'
import { Edit2, Trash2, Plus } from 'react-feather'
import Modal from 'components/Modal'
import Loading from 'components/Loading'
import { Form } from '@unform/web'
import InputForm from 'components/Input'
import { FormHandles } from '@unform/core'
import getValidationErrors from 'utils/getValidationErrors'
import axios from 'axios'

interface AddressProps {
    cep: number
    rua: string
    numero: number
    bairro: string
    cidade: string
}

interface ClientProps {
    id: string
    nome: string
    cpf: string
    email: string
    endereco?: AddressProps
    cidade?: string
    actions: string
}

interface HeaderProps {
    id: string
    nome: string
    cpf: string
    email: string
    cidade?: string
    actions: string
}

const Dashboard: React.FC = () => {
    const formRef = useRef<FormHandles>(null)
    const [listClients, setListClients] = useState<ClientProps[]>([])
    const [showModal, setShowModal] = useState(false)
    const [idEditClient, setIdEditClient] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingModal, setLoadingModal] = useState(false)
    const [q, setQ] = useState('')
    const [inputDisable, inputDisableSet] = useState(true)
    const [modalTitle, setModalTitle] = useState('')

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            const response = await api.get('/clientes')
            const data = response.data.map((item: ClientProps) => {
                return {
                    id: item.id,
                    nome: item.nome,
                    cpf: item.cpf,
                    email: item.email,
                    endereco: item.endereco,
                    cidade: item.endereco?.cidade,
                    actions: ''
                }
            })
            setListClients(data)
            setLoading(false)
        })()
    }, [])

    function headers(): HeaderProps {
        return {
            id: 'ID',
            nome: 'Nome',
            cpf: 'CPF',
            email: 'Email',
            cidade: 'Cidade',
            actions: ''
        }
    }

    const handleNewSubmit = useCallback(
        async (data) => {
            try {
                formRef.current?.setErrors({})
                const schema = Yup.object().shape({
                    nome: Yup.string().required('Nome obrigatório'),
                    cpf: Yup.string()
                        .min(11, 'CPF inválido')
                        .required('CPF obrigatório'),
                    email: Yup.string()
                        .email('Digite um e-mail válido')
                        .required('E-mail obrigatório'),
                    endereco: Yup.object().shape({
                        cep: Yup.string().required('Cep obrigatório'),
                        numero: Yup.string().required('Número obrigatório'),
                        rua: Yup.string().required('Rua obrigatório'),
                        bairro: Yup.string().required('Bairro obrigatório'),
                        cidade: Yup.string().required('Cidade obrigatório')
                    })
                })
                await schema.validate(data, { abortEarly: false })
                const response = await api.post<ClientProps>('/clientes', data)
                setListClients([
                    ...listClients,
                    {
                        id: response.data.id,
                        nome: response.data.nome,
                        cpf: response.data.cpf,
                        email: response.data.email,
                        endereco: response.data.endereco,
                        cidade: response.data.endereco?.cidade,
                        actions: ''
                    }
                ])
                setShowModal(false)
            } catch (error) {
                if (error instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(error)
                    formRef.current?.setErrors(errors)
                    error.errors.forEach((err: string) => {
                        cogoToast.error(err, { hideAfter: 5 })
                    })
                }
            }
        },
        [listClients]
    )

    const handleEditSubmit = async (): Promise<void> => {
        try {
            const data = formRef.current?.getData()
            const response = await api.put(`/clientes/${idEditClient}`, data)
            const updateListUser = listClients.map((cliente) =>
                cliente.id === idEditClient
                    ? {
                          id: response.data.id,
                          nome: response.data.nome,
                          cpf: response.data.cpf,
                          email: response.data.email,
                          endereco: response.data.endereco,
                          cidade: response.data.endereco?.cidade,
                          actions: ''
                      }
                    : cliente
            )
            setListClients([...updateListUser])
            setShowModal(false)
            formRef.current?.reset()
            cogoToast.success('Cliente editado com sucesso', { hideAfter: 5 })
        } catch (error) {
            cogoToast.error(error.response.data.message, { hideAfter: 5 })
        }
    }

    const handleDelete = async (id: string): Promise<void> => {
        try {
            await api.delete(`/clientes/${id}`)
            const deleteUser = listClients.filter((user) => user.id !== id)
            setListClients(deleteUser)
            cogoToast.success('Cliente excluido com sucesso', { hideAfter: 5 })
        } catch (error) {
            cogoToast.error(error.response.data.message, { hideAfter: 5 })
        }
    }

    function handleClose(): void {
        setShowModal(false)
    }

    function handleEdit(user: ClientProps): void {
        formRef.current?.setData({
            nome: user.nome,
            cpf: user.cpf,
            email: user.email,
            endereco: {
                cep: user.endereco?.cep,
                numero: user.endereco?.numero,
                rua: user.endereco?.rua,
                bairro: user.endereco?.bairro,
                cidade: user.endereco?.cidade
            }
        })
        setIdEditClient(user.id)
        setModalTitle('Editar cliente')
        setShowModal(true)
    }

    const handleInputFocus = useCallback(() => {
        setIsFocused(true)
    }, [])

    const handleInputBlur = useCallback(() => {
        setIsFocused(false)
    }, [])

    function search(items: ClientProps[]) {
        return items.filter((item) => {
            return (
                item.nome.toString().toLowerCase().indexOf(q.toLowerCase()) > -1
            )
        })
    }

    const handleCep = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length != 8) return
        inputDisableSet(true)
        setLoadingModal(true)
        const response = await axios.get(
            `https://viacep.com.br/ws/${e.target.value}/json/`
        )
        formRef.current?.setFieldValue('endereco.rua', response.data.logradouro)
        formRef.current?.setFieldValue('endereco.bairro', response.data.bairro)
        formRef.current?.setFieldValue(
            'endereco.cidade',
            response.data.localidade
        )
        const numeroInput = formRef.current?.getFieldRef('endereco.numero')
        numeroInput.focus()
        inputDisableSet(false)
        setLoadingModal(false)
    }, [])

    const handleModalShowNew = () => {
        formRef.current?.reset()
        setIdEditClient('')
        setModalTitle('Adicionar cliente')
        setShowModal(true)
        const nomeInput = formRef.current?.getFieldRef('nome')
        nomeInput.focus()
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = (e: any) => {
        idEditClient.length == 0 ? handleNewSubmit(e) : handleEditSubmit()
    }

    return (
        <Wrapper>
            <Header>
                <h1>Clientes(s)</h1>
                <Button type="button" width="auto" onClick={handleModalShowNew}>
                    <Plus />
                    Novo Cliente
                </Button>
            </Header>
            {loading ? (
                <LoadingContent>
                    <Loading />
                </LoadingContent>
            ) : (
                <>
                    <ContentInput isFocused={isFocused}>
                        <Input
                            type="search"
                            name="search"
                            id="search"
                            placeholder="Pesquisar"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            autoFocus
                        />
                    </ContentInput>
                    <ContainerTable>
                        <Table
                            items={search(listClients)}
                            headers={headers()}
                            headersHide={['id', 'endereco']}
                            customRenderers={{
                                actions: function Action(it) {
                                    return (
                                        <>
                                            <Button
                                                type="button"
                                                width="auto"
                                                className="btn-edit"
                                                onClick={() => handleEdit(it)}
                                            >
                                                <Edit2 size={15} />
                                            </Button>
                                            <Button
                                                type="button"
                                                width="auto"
                                                className="btn-destroy"
                                                onClick={() =>
                                                    handleDelete(it.id)
                                                }
                                            >
                                                <Trash2 size={15} />
                                            </Button>
                                        </>
                                    )
                                }
                            }}
                        />
                    </ContainerTable>
                </>
            )}
            <Modal title={modalTitle} show={showModal}>
                {loadingModal ? (
                    <LoadingContentModal>
                        <Loading />
                    </LoadingContentModal>
                ) : (
                    ''
                )}

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <InputForm
                        type="text"
                        name="nome"
                        id="nome"
                        placeholder="Nome"
                        text="Nome"
                        autoFocus
                    />
                    <GroupInput>
                        <InputForm
                            type="text"
                            name="cpf"
                            id="cpf"
                            placeholder="CPF"
                            text="CPF"
                            maxLength={11}
                        />
                        <InputForm
                            type="email"
                            name="email"
                            id="email"
                            placeholder="E-mail"
                            text="E-mail"
                        />
                    </GroupInput>
                    <GroupInput marginBottom="15px">
                        <InputForm
                            type="text"
                            name="endereco.cep"
                            id="cep"
                            placeholder="Cep"
                            maxLength={8}
                            text="Cep"
                            onChange={handleCep}
                        />
                        <InputForm
                            type="text"
                            name="endereco.numero"
                            id="numero"
                            placeholder="Número"
                            text="Número"
                        />
                    </GroupInput>
                    <InputForm
                        type="text"
                        name="endereco.rua"
                        id="rua"
                        placeholder="Rua"
                        disabled={inputDisable}
                        text="Rua"
                    />
                    <GroupInput>
                        <InputForm
                            type="text"
                            name="endereco.bairro"
                            id="bairro"
                            placeholder="Bairro"
                            text="Bairro"
                            disabled={inputDisable}
                        />
                        <InputForm
                            type="text"
                            name="endereco.cidade"
                            id="cidade"
                            placeholder="Cidade"
                            text="Cidade"
                            disabled={inputDisable}
                        />
                    </GroupInput>
                    <ActionForm>
                        <Button
                            type="submit"
                            width="auto"
                            className="btn-submit"
                        >
                            Cadastrar
                        </Button>
                        <Button
                            type="button"
                            width="auto"
                            onClick={handleClose}
                            className="btn-close"
                        >
                            Cancelar
                        </Button>
                    </ActionForm>
                </Form>
            </Modal>
        </Wrapper>
    )
}

export default Dashboard
