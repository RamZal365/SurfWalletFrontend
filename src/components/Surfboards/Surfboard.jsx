import React, {Component} from 'react'
import { getSurfboard, updateSurfboard, createSurfboard } from '../../services/api/surfboards'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import {FINS_MATERIALS, SURFBOARD_MATERIALS} from '../../constants';

class Surfboard extends Component {

  constructor(props) {
    super(props);
    var url = window.location.href.split('/')
    this.surfboardId = url.length === 5 ? url[4] : false
    this.state = {
      name: "React",
      surfboard: {
        name: "",
        brand: "",
        description: "",
        fins_material: "",
        images: "",
        length: "",
        material: "",
        number_of_fins: "",
        owner: "",
        thickness: "",
        volume: "",
        width: ""
      },
      editMode: this.surfboardId ? false : true,
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.surfboardCache = null
    if (this.surfboardId){
      this.initializeSurfboard();
    }
  }

  async initializeSurfboard(){
    try{
      const response = await getSurfboard(this.surfboardId);
      this.setState({ surfboard: response.data }); // Update the state with surfboard data
      this.surfboardCache = Object.assign({}, this.state.surfboard);
      console.log(this.state.surfboard);
    }
    catch (error) {
      console.error(error);
    }
  }

  async saveSurfboard(){
    try{
      delete this.state.surfboard.images
      var response = null
      if (this.surfboardId){
        response = await updateSurfboard(this.surfboardId, this.state.surfboard);
      } else {
        response = await createSurfboard(this.state.surfboard);
      }

      if (response.status === 200){
        this.setState({ surfboard: response.data }); // Update the state with surfboard data
        this.surfboardCache = Object.assign({}, this.state.surfboard);
        console.log(this.state.surfboard);
      }
      else{
        console.error(response.message);
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  onChange(event){
    var surfboard = this.state.surfboard;
    surfboard[event.target.name] = event.target.value
    this.setState({surfboard: surfboard})
  }

  onEdit(){
    this.surfboardCache = Object.assign({}, this.state.surfboard);
    this.setState({editMode: true})
  }
  onSave(){
    this.saveSurfboard()
    this.setState({editMode: false})
  }
  onCancel(){
    this.setState({surfboard: this.surfboardCache})
    this.setState({editMode: false})
  }
  

  render(){
    const theme = createTheme();

  return (
    <>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
          <div key={this.state.surfboard.id}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography component="span" variant="h3" color="primary" align="center">
                 {this.state.editMode ? (
                    <TextField
                      id="surfboardNameId"
                      label="Name"
                      name="name"
                      type="text"
                      value={this.state.surfboard.name}
                      onChange={this.onChange}
                    />
                  ) : (this.state.surfboard.name)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box  component="img"
                      sx={{
                        height: 233,
                        width: 350,
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 },
                      }}
                      alt="The house from the offer."
                      src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                      align="center"/>
              </Grid>
              <Grid item xs={12}>
                <Typography component="span" variant="body1" color="primary">
                  Description: {this.state.editMode ? (
                    <TextField
                      id="surfboardDescriptionId"
                      label="Description"
                      name="description"
                      type="text"
                      value={this.state.surfboard.description}
                      onChange={this.onChange}
                    />
                  ) : (this.state.surfboard.description)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography component="span" variant="body1" color="primary">
                  Brand: {this.state.editMode ? (
                    <TextField
                      id="surfboardBrandId"
                      label="Brand"
                      name="brand"
                      type="text"
                      value={this.state.surfboard.brand}
                      onChange={this.onChange}
                    />
                  ) : (this.state.surfboard.brand)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography component="span" variant="body1" color="primary">
                  Number of fins: {this.state.editMode ? (
                    <TextField
                      id="surfboardNumber_of_finsId"
                      label="Number of fins"
                      name="number_of_fins"
                      type="number"
                      value={this.state.surfboard.number_of_fins}
                      onChange={this.onChange}
                    />
                  ) : (this.state.surfboard.number_of_fins)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography component="span" variant="body1" color="primary">
                  Material: {this.state.editMode ? (
                    <>
                      <InputLabel id="surfboardMaterialId">Material</InputLabel>
                      <Select
                        id="surfboardMaterialId"
                        name="material"
                        value={this.state.surfboard.material}
                        label="Material"
                        onChange={this.onChange}
                      > 
                        {Object.keys(SURFBOARD_MATERIALS).map(key => ( 
                          <MenuItem value={key}>{SURFBOARD_MATERIALS[key]}</MenuItem>
                        ))}
                      </Select>
                    </>
                  ) : (SURFBOARD_MATERIALS[this.state.surfboard.material])}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography component="span" variant="body1" color="primary">
                  Fins material: {this.state.editMode ? (
                    <>
                    <InputLabel id="surfboardFinsMaterialId">Fins Material</InputLabel>
                    <Select
                      id="surfboardFinsMaterialId"
                      label="Fins material"
                      name="fins_material"
                      value={this.state.surfboard.fins_material}
                      onChange={this.onChange}
                    > 
                      {Object.keys(FINS_MATERIALS).map(key => ( 
                        <MenuItem value={key}>{FINS_MATERIALS[key]}</MenuItem>
                      ))}
                    </Select>
                  </>
                  ) : (FINS_MATERIALS[this.state.surfboard.fins_material])}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography component="span" variant="body1" color="primary">
                  Length: {this.state.editMode ? (
                    <TextField
                      id="surfboardLengthId"
                      label="Length"
                      name="length"
                      type="number"
                      value={this.state.surfboard.length}
                      onChange={this.onChange}
                    />
                  ) : (this.state.surfboard.length)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography component="span" variant="body1" color="primary">
                  Width: {this.state.editMode ? (
                    <TextField
                      id="surfboardWidthId"
                      label="Width"
                      name="width"
                      type="number"
                      value={this.state.surfboard.width}
                      onChange={this.onChange}
                    />
                  ) : (this.state.surfboard.width)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography component="span" variant="body1" color="primary">
                  Thickness: {this.state.editMode ? (
                    <TextField
                      id="surfboardThicknessId"
                      label="Thickness"
                      name="thickness"
                      type="number"
                      value={this.state.surfboard.thickness}
                      onChange={this.onChange}
                    />
                  ) : (this.state.surfboard.thickness)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography component="span" variant="body1" color="primary">
                  Volume: {this.state.editMode ? (
                    <TextField
                      id="surfboardVolumeId"
                      label="Volume"
                      name="volume"
                      type="number"
                      value={this.state.surfboard.volume}
                      onChange={this.onChange}
                    />
                  ) : (this.state.surfboard.volume)}
                </Typography>
              </Grid>
                {this.state.editMode ? (
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button variant="contained" color="primary" onClick={this.onSave}>
                        Save
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button variant="contained" color="primary" onClick={this.onCancel}>
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                 
                ) : (
                  <Button variant="contained" color="primary" onClick={this.onEdit}>
                        Edit
                  </Button>
                )}
              
            </Grid>
          </div>
      </Container>
    </ThemeProvider>
    
    </>
  )}
}

export default Surfboard