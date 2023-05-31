import React, {Component} from 'react'
import { allWetsuits } from '../../services/api/wetsuits'
import { DataGrid } from '@mui/x-data-grid';


class Wetsuits extends Component{
  constructor(props){
    super(props);
    const columns =  [
      {
        field: 'name',
        headerName: 'Name',
        renderCell: (params) => (
          <strong>
            <a href={`/wetsuit/${params.id}`}>{params.value}</a>
          </strong>),
      },
      {
        field: 'brand',
        headerName: 'Brand'
      },
      {
        field: 'chest',
        headerName: 'Chest'
      },
      {
        field: 'chest_thickness',
        headerName: 'Chest thickness'
      },
      {
        field: 'description',
        headerName: 'Description'
      },
      {
        field: 'extremities_thickness',
        headerName: 'Extremities thickness'
      },
      {
        field: 'height',
        headerName: 'Height'
      },
      {
        field: 'owner',
        headerName: 'Owner'
      },
      {
        field: 'waist',
        headerName: 'Waist'
      },
      {
        field: 'weight',
        headerName: 'Weight'
      }
    ];
    this.state = {
      columns: columns,
      wetsuits: [],
    }
    this.wetsuitsCache = null;
  }

  componentDidMount() {
    this.initializeWetsuits();
  }

  async initializeWetsuits(){
    try{
      const response = await allWetsuits();
      this.setState({ wetsuits: response.data}); // Update the state with surfboard data
      this.wetsuitsCache = Object.assign({}, this.state.wetsuits);
    }
    catch (error) {
      console.error(error);
    }
  }

  render(){
    //const theme = createTheme();    
    return (
    <>
    <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={this.state.wetsuits}
                columns={this.state.columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
              />
            </div>
    </>
  )}
}

export default Wetsuits