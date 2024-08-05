import { ColumnDef } from '@tanstack/react-table';

import { useMember } from '@/api/hooks/useMember';
import { Member } from '@/types/memberType';

import { UpDownDots } from '@/components/Loading/UpDownDots';
import { OneTextContainer } from '@/components/OneTextContainer';

import { AddPointModal } from './AddPointModal';
import { MemberTable } from './MemberTable';

export const MemberSection = () => {
  const { members, status, error } = useMember({});

  if (error) {
    return <OneTextContainer>{error.message}</OneTextContainer>;
  }

  if (status === 'pending') {
    return <UpDownDots />;
  }

  if (!members) {
    return <OneTextContainer>유저가 없습니다.</OneTextContainer>;
  }

  return <MemberTable members={members} columns={columns} />;
};

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
    cell: ({ row }) => <AddPointModal member={row.original} />,
  },
];
