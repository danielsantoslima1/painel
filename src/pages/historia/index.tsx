import DataGrid from "@/components/DataGrid"
import PanelFrame from "@/components/PanelFrame"
import Provider from "@/provider"
import { Add, Search, Visibility } from "@mui/icons-material"
import { Box, Button, Fab, Grid, Paper, TextField } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"

const Historia: NextPage<any> = props => {
  const [historiaData, setHistoriaData] = useState<dayjs.Dayjs | null>(
    dayjs(new Date())
  )

  const [alertMessage, setAlertMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [loading, setLoading] = useState(false)

  const [total, setTotal] = useState(0)
  const [pagina, setPagina] = useState(0)
  const [limite, setLimite] = useState(5)

  const router = useRouter()

  return (
    <PanelFrame
      dense
      alerMessage={alertMessage}
      showAlert={showAlert}
      title="Histórias do Ofício"
      locals={[
        {
          href: "/",
          iconName: "home",
          text: "Home"
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
        <Box
          sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => {
              router.push("/historia/novo")
            }}
          >
            <Add />
          </Fab>
        </Box>
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper sx={{ padding: 2 }}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <TextField
                  fullWidth
                  label="Título"
                  // value={numeroBE}
                  // onChange={event => {
                  //   setNumeroBE(+event.target.value.replace(/[^0-9]/g, ""))
                  // }}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*"
                  }}
                  // onKeyDown={e => {
                  //   if (e.key === "Enter") search()
                  // }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="pt-br"
                >
                  <DatePicker
                    sx={{ width: "100%" }}
                    value={historiaData}
                    onChange={e => {
                      setHistoriaData(e)
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <Button
                  variant="contained"
                  startIcon={<Search />}
                  fullWidth
                  size="large"
                  // onClick={search}
                  // onKeyDown={e => {
                  //   e.preventDefault()
                  //   if (e.key === "Enter") search()
                  // }}
                >
                  Buscar
                </Button>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <DataGrid
                  loading={loading}
                  headers={[
                    { align: "left", text: "Título", attrName: "titulo" },
                    // { align: "center", text: "Número", attrName: "numero" },
                    // { align: "center", text: "Tipo", attrName: "tipo" },
                    { align: "center", text: "Data", attrName: "data" }
                  ]}
                  // data={listaBoletim}
                  hasActions
                  actions={[
                    {
                      icon: <Visibility />,
                      name: "visualizar",
                      text: "Visualizar"
                    }
                  ]}
                  actionTrigger={(
                    id: number,
                    actionName: string,
                    sendExtraProp?: string | undefined
                  ) => {
                    if (actionName === "visualizar") {
                      router.push(`/historias/${id}`)
                    }
                  }}
                  pagination={{
                    count: total,
                    rowsPerPage: limite,
                    page: pagina,
                    onPageChange: async (page: number) => {
                      try {
                        setLoading(true)
                        setPagina(page)

                        const provider = new Provider()
                        // const response = await provider.call(
                        //   "api",
                        //   "boletim.listaboletim",
                        //   {
                        //     numero: numeroBE,
                        //     data: boltimData,
                        //     boletimTipo: boletimTipo,
                        //     pagina: page,
                        //     limite: limite
                        //   },
                        //   undefined,
                        //   { headers: { credential: ctx.usuario?.credential } }
                        // )

                        // if (!response.success)
                        //   throw new Error(response.message?.toString() || "")

                        // setListaBoletim(response.data.list)
                        // setTotal(response.data.count)

                        // setLoading(false)
                      } catch (error: any) {
                        setAlertMessage(error.message)
                        setShowAlert(true)
                        setLoading(false)
                      } finally {
                        setTimeout(() => {
                          if (showAlert) setShowAlert(false)
                        }, 6000)
                      }
                    },
                    onRowsPerPageChange: async (rowsPerPAge: number) => {
                      try {
                        setLoading(true)
                        setLimite(rowsPerPAge)

                        const provider = new Provider()
                        // const response = await provider.call(
                        //   "api",
                        //   "boletim.listaboletim",
                        //   {
                        //     numero: numeroBE,
                        //     data: boltimData,
                        //     boletimTipo: boletimTipo,
                        //     pagina: pagina,
                        //     limite: rowsPerPAge
                        //   },
                        //   undefined,
                        //   { headers: { credential: ctx.usuario?.credential } }
                        // )

                        // if (!response.success)
                        //   throw new Error(response.message?.toString() || "")

                        // setListaBoletim(response.data.list)
                        // setTotal(response.data.count)

                        // setLoading(false)
                      } catch (error: any) {
                        setAlertMessage(error.message)
                        setShowAlert(true)
                        setLoading(false)
                      } finally {
                        setTimeout(() => {
                          if (showAlert) setShowAlert(false)
                        }, 6000)
                      }
                    },
                    rowsPerPageOptions: [5, 10, 25, 50, 100]
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </PanelFrame>
  )
}

export default Historia
