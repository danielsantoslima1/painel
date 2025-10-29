import Editor from "@/components/Editor"
import PanelFrame from "@/components/PanelFrame"
import management, {
  boletimManagementType
} from "@/serverside/boletim/management"
import { serversideReponse } from "@/serverside/core/serversideResponse"
import { ArrowBack, Check, Delete, Publish, Save } from "@mui/icons-material"
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Tooltip,
  Typography
} from "@mui/material"
import { ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers"
import { GetServerSideProps, NextPage } from "next"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useMemo, useRef, useState } from "react"
import "suneditor/dist/css/suneditor.min.css"

const salasTematicas: string[] = [
  " A) RCPN – Registro Civil das Pessoas Naturais",
  "B) RI – Registro de Imóveis",
  "C) RTD e RCPJ – Registro de Títulos e Documentos e Civil das Pessoas Jurídicas",
  "D) TN – Tabelionato de Notas",
  "E) TP – Tabelionato de Protesto de Títulos",
  "F) Acórdãos do Conselho Superior da Magistratura do Estado de São Paulo",
  "G) Decisões da Corregedoria Geral da Justiça do Estado de São Paulo",
  "H) Relação Administrativa entre Notários e Registradores e o Poder Delegante",
  "I) Responsabilidade Civil de Notários e Registradores",
  "J) Personalidade Jurídica das Unidades Extrajudiciais",
  "K) O Direito Tributário aplicado às atividades notariais e de registro",
  "L) O Direito do Trabalho aplicado às atividades notariais e de registro",
  "M) Gestão e Atendimento/Tecnologia da Informação",
  "N) Concursos",
  "O) A interinidade/designação nas atividades notarial e de registro",
  "P) LGPD e Compliance para Cartórios"
]

export const getServerSideProps: GetServerSideProps<
  serversideReponse<boletimManagementType>
> = async context => {
  return management(context)
}

const Novo: NextPage<serversideReponse<boletimManagementType>> = props => {
  const [id, setId] = useState<number | null>(props.data.id || null)

  const [aprovado, setAprovado] = useState<string>(props.data.aprovado || "N")
  const [aprovadopor, setAprovadopor] = useState<string>(
    props.data.aprovado_nome || ""
  )
  const [aprovadoem, setAprovadoem] = useState<string>(
    props.data.aprovado_em?.toString() || ""
  )

  const [publicado, setPublicado] = useState<string>(
    props.data.publicado || "N"
  )

  const [activeStep, setActiveStep] = useState(0)

  const [showDeleteHistoria, setShowDeleteHistoria] = useState<boolean>(false)

  const [alertMessage, setAlertMessage] = useState<string>("")
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const SunEditor = useMemo(
    () => dynamic(() => import("suneditor-react"), { ssr: false }),
    []
  )

  const [sunEditorTitleHTML, setSunEditorTitleHTML] = useState<string>("")
  const [sunEditorTextoHTML, setSunEditorTextoHTML] = useState<string>("")
  const [sunEditorNotaRedacaoHTML, setSunEditorNotaRedacaoHTML] =
    useState<string>("")
  const [selecionadas, setSelecionadas] = useState<string[]>([])

  const handleToggle = (sala: string) => {
    setSelecionadas(
      prev =>
        prev.includes(sala)
          ? prev.filter(item => item !== sala) // desmarca
          : [...prev, sala] // marca
    )
  }

  const editorRef = useRef<any>(null)

  const saveButtonAction = async () => {
    // if (activeStep === 0) {
    //   try {
    //     if (!boletimTipo)
    //       throw new Error("Selecione o tipo de boletim a ser criado")
    //     if (!boltimData) throw new Error("Entre com a data do boletim")
    //     setLoading(true)
    //     const provider = new Provider()
    //     const response = await provider.call<{ boletim_id: number }>(
    //       "api",
    //       "boletim.salvar",
    //       { boletim_tipo_id: boletimTipo, data: boltimData },
    //       undefined,
    //       { headers: { credential: ctx.usuario?.credential } }
    //     )
    //     if (!response.success)
    //       throw new Error(response.message?.toString() || "Erro")
    //     setAprovado("N")
    //     setAprovadoem("")
    //     setAprovadopor("")
    //     setPublicado("N")
    //     setPublicadoem("")
    //     setPublicadopor("")
    //     setNeedSaveBe(false)
    //     setId(response.data?.boletim_id ?? null)
    //     router.push(`/boletim/${response.data?.boletim_id}`)
    //     setActiveStep(1)
    //   } catch (error: any) {
    //     setAlerMessage(error.message)
    //     setShowAlert(true)
    //     setLoading(false)
    //   } finally {
    //     setLoading(false)
    //     setTimeout(() => {
    //       setShowAlert(false)
    //     }, 6000)
    //   }
    // }
    // if (activeStep === 1) {
    //   await updateConteudo()
    //   setActiveStep(2)
    // }
    // if (activeStep === 2) {
    //   await updateObservacao()
    //   setActiveStep(3)
    // }
  }

  const aproveThis = async () => {
    // try {
    //   setLoading(true)
    //   const provider = new Provider()
    //   const response = await provider.call<{
    //     aprovado: "N" | "S"
    //     aprovadoPor: string
    //     aprovadoEm: string
    //   }>(
    //     "api",
    //     "boletim.aprovarboletim",
    //     undefined,
    //     { idboletim: id },
    //     { headers: { credential: ctx.usuario?.credential } }
    //   )
    //   if (!response.success) throw new Error(response.message?.toString() || "")
    //   setAprovado(response.data?.aprovado || "")
    //   setAprovadoem(response.data?.aprovadoEm || "")
    //   setAprovadopor(response.data?.aprovadoPor || "")
    //   setLoading(false)
    //   setAlerMessage(response.message?.toString() || "")
    //   setShowAlert(true)
    // } catch (error: any) {
    //   setAlerMessage(error.message)
    //   setShowAlert(true)
    //   setLoading(false)
    // } finally {
    //   setLoading(false)
    //   setTimeout(() => {
    //     setShowAlert(false)
    //   }, 6000)
    // }
  }

  const publishThis = async () => {
    // try {
    //   setLoading(true)
    //   const provider = new Provider()
    //   const response = await provider.call<{
    //     publicado: "N" | "S"
    //     publicadoPor: string
    //     publicadoEm: string
    //   }>(
    //     "api",
    //     "boletim.publicarboletim",
    //     undefined,
    //     { idboletim: id },
    //     { headers: { credential: ctx.usuario?.credential } }
    //   )
    //   if (!response.success) throw new Error(response.message?.toString() || "")
    //   setPublicado(response.data?.publicado || "")
    //   setPublicadoem(response.data?.publicadoEm || "")
    //   setPublicadopor(response.data?.publicadoPor || "")
    //   setLoading(false)
    //   setAlerMessage(response.message?.toString() || "")
    //   setShowAlert(true)
    // } catch (error: any) {
    //   setAlerMessage(error.message)
    //   setShowAlert(true)
    //   setLoading(false)
    // } finally {
    //   setLoading(false)
    //   setTimeout(() => {
    //     setShowAlert(false)
    //   }, 6000)
    // }
  }

  type EditorField = "titulo" | "texto" | "nota"

  const handleEditorChange = (field: EditorField, content: string) => {
    switch (field) {
      case "titulo":
        setSunEditorTitleHTML(content)
        break
      case "texto":
        setSunEditorTextoHTML(content)
        break
      case "nota":
        setSunEditorNotaRedacaoHTML(content)
        break
    }
  }

  return (
    <PanelFrame
      dense
      alerMessage={alertMessage}
      showAlert={showAlert}
      title={`Nova História do Ofício`}
      loading={loading}
      locals={[
        {
          href: "/",
          iconName: "home",
          text: "Home"
        },
        {
          href: "/historia",
          iconName: "newspaper",
          text: "Histórias do Ofício"
        }
        // {
        //   href: props.metadata.url ?? "",
        //   iconName: props.metadata.icone ?? "",
        //   text: props.metadata.nome ?? ""
        // }
      ]}
      closeAlert={() => {
        setShowAlert(false)
      }}
      outsideContent={
        <Paper sx={{ p: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
              <Tooltip title="Voltar">
                <IconButton
                  color="warning"
                  onClick={() => {
                    router.push("/boletim")
                  }}
                >
                  <ArrowBack />
                </IconButton>
              </Tooltip>
            </Grid>

            <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    <Tooltip title="Anterior">
                      <IconButton
                        disabled={activeStep === 0}
                        onClick={() => {
                          setActiveStep(actualValue => actualValue - 1)
                        }}
                      >
                        <ArrowLeftIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    {publicado === "N" && (
                      <Tooltip title="Salvar">
                        <IconButton onClick={saveButtonAction}>
                          <Save color="info" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    {aprovado === "N" && publicado === "N" && (
                      <Tooltip title="Aprovar">
                        <IconButton onClick={aproveThis}>
                          <Check color="success" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    {publicado === "N" && (
                      <Tooltip title="Publicar">
                        <IconButton onClick={publishThis}>
                          <Publish />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    {publicado === "N" && id && (
                      <Tooltip title="Excluir">
                        <IconButton
                          onClick={() => {
                            setShowDeleteHistoria(true)
                          }}
                        >
                          <Delete color="error" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    <Tooltip title="Próximo">
                      <IconButton
                        disabled={activeStep === 3}
                        onClick={() => {
                          // if (activeStep === 0 && needSaveHistoria) {
                          //   setAlertMessage("Salve antes de seguir adiante.")
                          //   setShowAlert(true)
                          //   setTimeout(() => {
                          //     setShowAlert(false)
                          //   }, 4000)
                          //   return
                          // }
                          // if (activeStep === 1 && needSaveContent) {
                          //   setAlerMessage("Salve antes de seguir adiante.")
                          //   setShowAlert(true)
                          //   setTimeout(() => {
                          //     setShowAlert(false)
                          //   }, 4000)
                          //   return
                          // }
                          // if (activeStep === 2 && needSaveObservacao) {
                          //   setAlerMessage("Salve antes de seguir adiante")
                          //   setShowAlert(true)
                          //   setTimeout(() => {
                          //     setShowAlert(false)
                          //   }, 4000)
                          //   return
                          // }
                          // setActiveStep(actualValue => actualValue + 1)
                        }}
                      >
                        <ArrowRightIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper sx={{ padding: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Stepper activeStep={activeStep}>
                  <Step>
                    <StepLabel>Criação da História</StepLabel>
                  </Step>

                  <Step>
                    <StepLabel>Conteúdo da História</StepLabel>
                  </Step>

                  <Step>
                    <StepLabel
                      optional={
                        <Typography variant="caption">Opcional</Typography>
                      }
                    >
                      Observações
                    </StepLabel>
                  </Step>

                  <Step>
                    <StepLabel>Resumo</StepLabel>
                  </Step>
                </Stepper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper sx={{ padding: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="body1" fontWeight="500">
                  Título:
                </Typography>
                <Editor
                  height="300"
                  onChange={content => handleEditorChange("titulo", content)}
                  content={sunEditorTitleHTML}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="body1" fontWeight="500">
                  Texto:
                </Typography>
                <Editor
                  height="300"
                  onChange={content => handleEditorChange("texto", content)}
                  content={sunEditorTextoHTML}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="body1" fontWeight="500">
                  Nota da Redação INR:
                </Typography>
                <Editor
                  height="300"
                  onChange={content => handleEditorChange("nota", content)}
                  content={sunEditorNotaRedacaoHTML}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="h6" fontWeight="600">
                  Salas Temáticas:
                </Typography>
                <FormGroup>
                  {salasTematicas.map((sala, index) => (
                    <FormControlLabel
                      label={sala}
                      componentsProps={{
                        typography: { fontWeight: 500 }
                      }}
                      control={
                        <Checkbox
                          checked={selecionadas.includes(sala)}
                          onChange={() => handleToggle(sala)}
                        />
                      }
                    />
                  ))}
                </FormGroup>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </PanelFrame>
  )
}

export default Novo
