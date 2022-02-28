import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  IconButton,
} from '@mui/material'
import { visuallyHidden } from '@mui/utils';
import { RiDeleteBinLine, RiFileChartLine, RiPencilLine } from 'react-icons/ri'
import { format } from '../../utils/documentTreatment';
import { formatDate, getAge } from '../../utils/formatDate';
import Confirm from '../../modals/Confirm';

import { api } from '../../services/api'
import { Update } from '../../modals/User';
import { Alert } from '../../modals';
import { User } from '../../types';
import { calculateAge } from '../../utils/calculateAge';

interface Data {
  user_id: string,
  patient_id: string,
  firstname: string,
  lastname: string,
  age: number,
  document: string,
  email: string,
  birth_date: string,
  created_at: string,
  options: any
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'firstname',
    numeric: false,
    disablePadding: false,
    label: 'Nome',
  },
  {
    id: 'lastname',
    numeric: false,
    disablePadding: false,
    label: 'Sobrenome',
  },
  {
    id: 'age',
    numeric: true,
    disablePadding: false,
    label: 'Idade',
  },
  {
    id: 'document',
    numeric: false,
    disablePadding: false,
    label: 'CPF',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'E-mail',
  },
  {
    id: 'birth_date',
    numeric: false,
    disablePadding: false,
    label: 'Nascido em',
  },
  {
    id: 'created_at',
    numeric: false,
    disablePadding: false,
    label: 'Criado em (registro)',
  },
  {
    id: 'options',
    numeric: false,
    disablePadding: false,
    label: 'Opções',
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

type Result = {
  answers: string
  created_at: string
  id: string
  updated_at: string
}

type TableProps = {
  users: User[]
  getUserDataFunc: VoidFunction
}

export default function EnhancedTable({ users, getUserDataFunc }: TableProps) {
  const navigate = useNavigate()

  const [rows, setRows] = useState<Array<Data>>([])
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('firstname');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(7);
  const [selectedUserId, setSelectedUserId] = useState('')

  function handleSelectUserId(userId: string) {
    setSelectedUserId(userId)
  }

  async function handleDelete() {
    try {
      await api.delete(`/users/${selectedUserId}`).then(() => {
        getUserDataFunc()
        handleDeleteClose()
      })
    } catch (error) {
      console.log('Não foi possível deletar o usuário.')
    }
  }

  async function handleRedirect(userId: string) {
    if (userId) {
      try {
        await api.get(`users/${userId}`).then(response => {
          const user = response.data as User

          // if (user.results.length) {
          //   navigate(`/results/${userId}`)
          // } else {
          //   handleNrAlertOpen()
          // }
        })
      } catch (error) {
        
      }
    }
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  useEffect(() => {
    const patients = users.filter((value) => {
      return value.patient !== null
    })

    const arr = patients.map(user => {
      return {
        user_id: user.user_id,
        document: user.document,
        email: user.email,
        firstname: user.patient.firstname,
        lastname: user.patient.lastname,
        patient_id: user.patient_id,
        birth_date: formatDate(user.patient.birth_date),
        created_at: formatDate(user.created_at),
        age: Number(calculateAge(user.patient.birth_date)),
        options: null
      }
    }) || []

    setRows(arr as Array<Data>)
  }, [users])

  // Delete Confirmation
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  
  function handleDeleteOpen() {
    setDeleteConfirm(true)
  }

  function handleDeleteClose() {
    setDeleteConfirm(false)
  }

  // Update Modal
  const [updateModal, setUpdateModal] = useState(false)

  function handleUpdateOpen() {
    setUpdateModal(true)
  }

  function handleUpdateClose() {
    setUpdateModal(false)
    getUserDataFunc()
  }

  // No Results Alert
  const [nrAlert, setNrAlert] = useState(false)

  function handleNrAlertOpen() {
    setNrAlert(true)
  }

  function handleNrAlertClose() {
    setNrAlert(false)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Alert
        isOpen={nrAlert}
        onCloseFunc={handleNrAlertClose}
        message={`O paciente não possuí resultados para serem exibidos!`}
        title={`Nenhum resultado encontrado`}
        type="error"
      />
      <Update
        isOpen={updateModal}
        onCloseFunc={handleUpdateClose}
        title={`Editar dados do paciente`}
        selectedId={selectedUserId}
      />
      <Confirm
        isOpen={deleteConfirm}
        onCloseFunc={handleDeleteClose}
        message={`
          Os dados do paciente referenciado serão deletados efetivamente.
          Deseja realmente continuar?
        `}
        title={`Deletar paciente`}
        type="warning"
        handleFunc={handleDelete}
      />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {rows ? stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      onClick={() => { handleSelectUserId(row.user_id as string) }}
                      tabIndex={-1}
                      key={row.user_id}
                    >
                      <TableCell align="right">{row.firstname}</TableCell>
                      <TableCell align="right">{row.lastname}</TableCell>
                      <TableCell align="right">{row.age} anos</TableCell>
                      <TableCell align="right">{row.document}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.birth_date}</TableCell>
                      <TableCell align="right">{row.created_at}</TableCell>
                      <TableCell align="center">
                        <IconButton>
                          <RiPencilLine onClick={() => { handleUpdateOpen() }} />
                        </IconButton>
                        <IconButton>
                          <RiDeleteBinLine onClick={() => { handleDeleteOpen() }} />
                        </IconButton>
                        <IconButton>
                          <RiFileChartLine onClick={() => { handleRedirect(row.user_id as string) }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                }) : 
                <TableRow
                  hover
                  tabIndex={-1}
                >
                  <TableCell align="right">-</TableCell>
                  <TableCell align="right">-</TableCell>
                  <TableCell align="right">-</TableCell>
                  <TableCell align="right">-</TableCell>
                  <TableCell align="right">-</TableCell>
                  <TableCell align="right">-</TableCell>
                  <TableCell align="center">-</TableCell>
                </TableRow>
              }
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[7, 14, 21]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}