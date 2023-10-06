import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const TrainTable = ({ trainData }) => {

//   const handleClick = () => {
//     console.log("Hello")
    
//   }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750     }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">TrainNumber</StyledTableCell>
            <StyledTableCell align="right">Departure Time</StyledTableCell>
            <StyledTableCell align="right" colSpan={2}>
              Seats Available
            </StyledTableCell>
            <StyledTableCell align="right" colSpan={2}>
              Prices
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="right">Sleeper</StyledTableCell>
            <StyledTableCell align="right">AC</StyledTableCell>
            <StyledTableCell align="right">Sleeper</StyledTableCell>
            <StyledTableCell align="right">AC</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {trainData.map((train, index) => (
            <StyledTableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {train.name}
              </StyledTableCell>
              <StyledTableCell align = "right">
                {train.trainNumber}
              </StyledTableCell>
              <StyledTableCell align="right">
                {train.departureTime.Hours}:{train.departureTime.Minutes}
              </StyledTableCell>
              <StyledTableCell align="right">{train.seatAvailability.sleeper}</StyledTableCell>
              <StyledTableCell align="right">{train.seatAvailability.AC}</StyledTableCell>
              <StyledTableCell align="right">{train.prices.sleeper}</StyledTableCell>
              <StyledTableCell align="right">{train.prices.AC}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TrainTable;
