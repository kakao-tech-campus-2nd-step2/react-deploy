import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

type Member = {
  id: number;
  email: string;
  name: string;
  point: number;
};

const data: Member[] = [
  {
    id: 1,
    email: 'test@email.com',
    name: '닉네임',
    point: 5000,
  },
  {
    id: 2,
    email: 'test2@email.com',
    name: '닉네임2',
    point: 10000,
  },
];

const columns: ColumnDef<Member>[] = [
  {
    header: '이메일',
    accessorKey: 'email',
    cell: ({ row }) => <div>{row.getValue('email')}</div>,
  },
  {
    header: '이름',
    accessorKey: 'name',
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    header: '보유 포인트',
    accessorKey: 'point',
    cell: ({ row }) => <div>{row.getValue('point')} P</div>,
  },
  {
    header: '포인트 추가하기',
    accessorKey: 'addPoint',
    cell: () => <Button>추가하기</Button>,
  },
];

export const MemberTable = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer width="100%">
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id} fontSize="medium" textAlign="center">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id} fontSize="medium">
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id} textAlign="center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
