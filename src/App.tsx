import React, { Fragment, useState } from 'react';
import { METAR, rawMetarToSVG } from 'metar-plot'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    button: {
      width: "100%",
      height: "100%"
    },
    title: {
      flexGrow: 1,
    },
    textarea: {
      width: "100%"
    },
    buttonContainer: {
      display: "flex",
      width: "100%",
      flexGrow: 1,
      flexDirection: "row-reverse"
    },
    form: {
      margin: "64px",
      padding: "16px",
    },
    results: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridGap: "10px",
      margin: "64px",
    },
    resultTitle: {
      margin: "8px",
      flexgrow: 1
    },
    metarbox: {
      height: "calc(50% - 4px)"
    },
    metarText: {
      height: "100%"
    }
  }),
);

export default function App() {
  const classes = useStyles();
  const [raw, setRaw] = useState("")
  let metar: string
  let svg: any
  let svgM: any
  try {
    metar = JSON.stringify(new METAR(raw), null, 1)
    let blob1 = new Blob([rawMetarToSVG(raw, "350px", "350px")], { type: 'image/svg+xml' });
    let blob2 = new Blob([rawMetarToSVG(raw, "350px", "350px", true)], { type: 'image/svg+xml' })
    svg = URL.createObjectURL(blob1);
    svgM = URL.createObjectURL(blob2)
  } catch (e) {
    metar = "Invalid METAR"
    svg = ""
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <WbSunnyIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            METAR Plot Demo
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper elevation={4} className={classes.form}>
        <div className={classes.title} >
          <TextField className={classes.textarea} color="primary" id="filled-basic"
            label="Raw METAR" variant="filled" onChange={(event) => { setRaw(event.target.value) }} />
        </div>
        <a href="http://aviationweather.gov/metar/data">NOAA Sample data</a>
      </Paper>
      <div className={classes.results}>
        <div>
          <Paper elevation={4} className={classes.metarText}>
            <Typography variant="h6" className={classes.resultTitle}>
              Parsed Metar
            </Typography>
            <Typography variant="body1" className={classes.resultTitle}>
              <pre>{metar}</pre>
            </Typography>
          </Paper>
        </div>
        <div>
          <Paper elevation={4} className={classes.metarbox}>
            <Typography variant="h6" className={classes.resultTitle}>
              Metar Plot (🇺🇸 🇨🇦)
          </Typography>
            <img src={svg} />
          </Paper>
          <Paper elevation={4} className={classes.metarbox}>
            <Typography variant="h6" className={classes.resultTitle}>
              Metar Plot (🇺🇳)
          </Typography>
            <img src={svgM} />
          </Paper>
        </div>
      </div>
    </div>
  );
}
