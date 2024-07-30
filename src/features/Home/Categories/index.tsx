import React from 'react';
import styled from '@emotion/styled';
import { Grid, CenteredContainer, StatusHandler } from '@components/common';
import { useGetCategories } from '@apis/categories/hooks/useGetCategories';
import { CategoryLocationState } from '@internalTypes/dataTypes';
import { Link } from 'react-router-dom';
import { ROUTE_PATH } from '@routes/path';
import { getDynamicPath } from '@utils/getDynamicPath';
import ThemeItem from './CategoryItem';

const GRID_GAP = 0;
const GRID_COLUMNS = 6;

export default function Categories() {
  const { data, isError, isLoading, error } = useGetCategories();
  const isEmpty = !data || data?.length === 0;

  return (
    <CategoriesContainer>
      <CenteredContainer maxWidth="md">
        <StatusHandler isLoading={isLoading} isError={isError} isEmpty={isEmpty} error={error}>
          <Grid gap={GRID_GAP} columns={GRID_COLUMNS}>
            {data?.map((category) => (
              <Link
                key={category.id}
                to={getDynamicPath(ROUTE_PATH.CATEGORY, { categoryId: String(category.id) })}
                state={
                  {
                    color: category.color,
                    name: category.name,
                    description: category.description,
                  } as CategoryLocationState
                }
              >
                <ThemeItem imageUrl={category.imageUrl} name={category.name} />
              </Link>
            ))}
          </Grid>
        </StatusHandler>
      </CenteredContainer>
    </CategoriesContainer>
  );
}

const CategoriesContainer = styled.section`
  padding-top: 45px;
  padding-bottom: 23px;
`;
