import React, {Component} from 'react'
import { allSpots } from '../../services/api/spots'
import { DataGrid } from '@mui/x-data-grid';

class Spots extends Component{
  constructor(props){
    super(props);
    const columns =  [
    {
      field: 'name',
        headerName: 'Name',
        renderCell: (params) => (
          <strong>
            <a href={`/spot/${params.id}`}>{params.value}</a>
          </strong>),
    },
    {
      field: 'city',
      headerName: 'City'
    },
    {
      field: 'country',
      headerName: 'Country'
    },
    {
      field: 'creator',
      headerName: 'Creator'
    },
    {
      field: 'latitude',
      headerName: 'Latitude'
    },
    {
      field: 'long_description',
      headerName: 'Long_description'
    },
    {
      field: 'longitude',
      headerName: 'Longitude'
    },
    {
      field: 'short_description',
      headerName: 'Short_description'
    }
    ];
    this.state = {
      columns: columns,
      spots: [],
    }
    this.spotsCache = null;
  }

  componentDidMount() {
    this.initializeSpots();
  }
  
  async initializeSpots(){
    try{
      const response = await allSpots();
      this.setState({ spots: response.data}); // Update the state with surfboard data
      this.spotsCache = Object.assign({}, this.state.spots);
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
                rows={this.state.spots}
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

export default Spots