import { Group, Title } from '@mantine/core';
import { CategoryType } from '../../../../types/category';
import { HomarrCardWrapper } from '../../Tiles/HomarrCardWrapper';
import { useEditModeStore } from '../../Views/useEditModeStore';
import { useGridstack } from '../gridstack/use-gridstack';
import { WrapperContent } from '../WrapperContent';
import { CategoryEditMenu } from './CategoryEditMenu';

interface DashboardCategoryProps {
  category: CategoryType;
}

export const DashboardCategory = ({ category }: DashboardCategoryProps) => {
  const { refs, apps, widgets } = useGridstack('category', category.id);
  const isEditMode = useEditModeStore((x) => x.enabled);

  return (
    <HomarrCardWrapper pt={10} mx={10} isCategory>
      <Group position="apart" align="center">
        <Title order={3}>{category.name}</Title>
        {isEditMode ? <CategoryEditMenu category={category} /> : null}
      </Group>
      <div
        className="grid-stack grid-stack-category"
        data-category={category.id}
        ref={refs.wrapper}
      >
        <WrapperContent apps={apps} refs={refs} widgets={widgets} />
      </div>
    </HomarrCardWrapper>
  );
};
