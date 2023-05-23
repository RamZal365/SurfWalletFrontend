import React, {Component} from 'react';
import { allSurfboards } from '../../services/api/surfboards';
import { DataGrid } from '@mui/x-data-grid';

//import { createTheme } from '@mui/material/styles';

class Surfboards extends Component {
  constructor(props){
    super(props);
    const columns =  [
      {
        field: 'name',
        headerName: 'Name',
        renderCell: (params) => (
          <strong>
            <a href={`/surfboard/${params.id}`}>{params.value}</a>
          </strong>),
      },
      {
        field:'brand',
        headerName: 'Brand'
      },
      {
        field:'description',
        headerName: 'Description'
      },
      {
        field:'fins_material',
        headerName: 'Fins material'
      },
      {
        field:'length',
        headerName: 'Length'
      },
      {
        field:'material',
        headerName: 'Material'
      },
      {
        field:'number_of_fins',
        headerName: 'Number of fins'
      },
      {
        field:'owner',
        headerName: 'Owner'
      },
      {
        field:'thickness',
        headerName: 'Thickness'
      },
      {
        field:'volume',
        headerName: 'Volume'
      },
      {
        field:'width',
        headerName: 'Width'
      },
    ];
    this.state = {
      columns: columns,
      rows: [],
    }
    this.surfboardsCache = null;
  }

  componentDidMount() {
    this.initializeSurfboards();
  }

  

  async initializeSurfboards(){
    try{
      const response = await allSurfboards();
      this.setState({ rows: response.data}); // Update the state with surfboard data
      this.surfboardsCache = Object.assign({}, this.state.surfboards);
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
                rows={this.state.rows}
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
export default Surfboards
