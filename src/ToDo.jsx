/* eslint-disable react/display-name */
import SideBar from "./components/SideBar";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/th"; // only in VITE

import { MTableToolbar } from "material-table";
import { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useCookies } from "react-cookie";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers";

function Main() {
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  const [time, setTime] = useState(new Date());
  const [columns, setColumns] = useState([
    // { title: "กิจกรรม", field: "name" },
    // {
    //   title: "วันเวลา",
    //   field: "when",
    //   initialEditValue: "yyyy-MM-ddTHH:mm:ss",
    // },

    {
      title: "กิจกรรม",
      field: "name",
    },
    {
      title: "วัน/เวลา",
      field: "when",
      type: "datetime",
      initialEditValue: time,
      render: (rowData) => {
        return moment(rowData.when).format("D MMM YY เวลา HH:mm น.");
      },
      editComponent: () => (
        <LocalizationProvider dateAdapter={AdapterDateFns} >
          <DateTimePicker
            label="Date-time"
            value={time}
            timezone="default"
            onChange={(newValue) => {
              console.log("Input DateTime: "+newValue);
              setTime(newValue);
            }}
          />
        </LocalizationProvider>
      ),
    },
  ]);

  const [data, setData] = useState([]);
  const defaultMaterialTheme = createTheme();
  const [cookies] = useCookies(["token"]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("info");
  const handleOpenSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const fetchActivities = () => {
    axios
      .get(`${import.meta.env.VITE_APP_API}/activities`, {
        headers: { Authorization: "Bearer " + cookies["token"] },
        timeout: 10 * 1000,
      })
      .then((response) => {
        setData(response.data);
        console.log("Fetch Activities successfully.");
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("timeout");
        } else {
          console.log(error.response.status + " error: can't get activities.");
        }
      });
  };

  useEffect(() => {
    moment.locale("th");
    fetchActivities();
  }, []);

  return (
    <div id="outer-container">
      <SideBar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
      <div id="page-wrap">
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            variant="filled"
            onClose={handleCloseSnackbar}
            severity={snackbarType}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable
            icons={tableIcons}
            options={{
              headerStyle: {
                fontFamily: "Kanit",
              },
              rowStyle: {
                fontFamily: "Kanit",
              },
              searchFieldStyle: {
                fontFamily: "Kanit",
              },
              actionsCellStyle: {
                fontFamily: "Kanit",
              },
              actionsColumnIndex: -1,
            }}
            components={{
              Toolbar: (props) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ flex: 1 }}></div>
                  <div style={{ textAlign: "center", flex: 2 }}>
                    <h1>React ToDo List</h1>
                  </div>
                  <div style={{ flex: 1 }}>
                    <MTableToolbar {...props} />
                  </div>
                </div>
              ),
            }}
            title={""}
            columns={columns}
            data={data}
            editable={{
              onRowAddCancelled: () => {
                /* do nothing */
              },
              onRowUpdateCancelled: () => {
                /* do nothing */
              },
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    axios
                      .post(
                        `${import.meta.env.VITE_APP_API}/activities`,
                        { Name: newData.name, When: newData.when },
                        {
                          headers: {
                            Authorization: "Bearer " + cookies["token"],
                          },
                          timeout: 10 * 1000,
                        }
                      )
                      .then((response) => {
                        newData.idActivity = response.data.idActivity;
                        setData([...data, newData]);
                        console.log("Add new activity.");
                        setTime(new Date());
                        fetchActivities();
                      })
                      .catch((error) => {
                        if (error.code === "ECONNABORTED") {
                          console.log("timeout");
                        } else {
                          handleOpenSnackbar(
                            "FAIL to add new Activity.",
                            "error"
                          );
                          console.log("newData.when = " + newData.when);
                          console.log(
                            error.response.status + " error: can't add row."
                          );
                        }
                      });
                    handleOpenSnackbar("Activity has benn added.", "success");
                    resolve();
                  }, 1000);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    axios
                      .put(
                        `${import.meta.env.VITE_APP_API}/activities/` +
                          oldData.idActivity,
                        {
                          Name: newData.name,
                          // Time need to be +7 hours due to the date convert to ISO (Indochina timezone)
                          When: new Date(time.setHours(time.getHours() + 7)),
                        },
                        {
                          headers: {
                            Authorization: "Bearer " + cookies["token"],
                          },
                          timeout: 10 * 1000,
                        }
                      )
                      .then(() => {
                        // TIME DEBUGBING
                        // console.log("Old date-time: " + oldData.when);
                        // console.log("New date-time: " + newData.when);
                        // console.log("Time state: " + time);
                        // console.log("Time ISO-date: " + time.toISOString());
                        // time.setHours(time.getHours() + 7);
                        // console.log("Time setHour: " + time.toISOString());
                        // console.log("Time ISO-date adjusted: " + time.toISOString());

                        const dataUpdate = [...data];
                        const index = oldData.tableData.idActivity;
                        dataUpdate[index] = newData;
                        setData([...dataUpdate]);
                        console.log("Update Activity successfully.");

                        // Reset time
                        setTime(new Date());

                        fetchActivities();
                      })
                      .catch((error) => {
                        handleOpenSnackbar("FAIL to update Activity.", "error");
                        if (error.code === "ECONNABORTED") {
                          console.log("timeout");
                        } else {
                          console.log(
                            error.response.status +
                              " error: can't update activity."
                          );
                        }
                      });
                    handleOpenSnackbar("Activity has been Updated.", "info");
                    resolve();
                  }, 1000);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    axios
                      .delete(
                        `${import.meta.env.VITE_APP_API}/activities/` +
                          oldData.idActivity,
                        {
                          headers: {
                            Authorization: "Bearer " + cookies["token"],
                          },
                          timeout: 10 * 1000,
                        }
                      )
                      .then(() => {
                        const dataDelete = [...data];
                        const index = oldData.tableData.idActivity;
                        dataDelete.splice(index, 1);
                        setData([...dataDelete]);
                        console.log("Delete Activity successfully.");
                        fetchActivities();
                      })
                      .catch((error) => {
                        handleOpenSnackbar("FAIL to delete Activity.", "error");
                        if (error.code === "ECONNABORTED") {
                          console.log("timeout");
                        } else {
                          console.log(
                            error.response.status +
                              " error: can't delete activity."
                          );
                        }
                      });
                    handleOpenSnackbar("Activity has been deleted.", "success");
                    resolve();
                  }, 1000);
                }),
            }}
          />
        </ThemeProvider>
      </div>
    </div>
  );
}

export default Main;
